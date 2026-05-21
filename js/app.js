// ─── ESTADO GLOBAL ─────────────────────────────────────────────────────────
let restauranteAtivo = null;  // objeto do restaurante escolhido
let carrinho = {};            // { produtoId: quantidade }
let adicionais = {};          // { produtoId: ['ad_id', ...] }
let observacoes = {};         // { produtoId: 'texto da observação' }
let produtoEmEdicao = null;   // id do produto cujo modal está aberto

// ─── CARRINHO ──────────────────────────────────────────────────────────────

function alterarQtd(id, delta) {
  const atual = carrinho[id] || 0;
  const nova  = Math.max(0, atual + delta);

  if (nova === 0) {
    delete carrinho[id];
    delete adicionais[id];   // remove adicionais se o produto sair do carrinho
    delete observacoes[id];  // remove observação também
  } else {
    carrinho[id] = nova;
  }

  atualizarQtdTela(id, nova);
  atualizarBotaoAdicionais(id, nova);
  atualizarBotaoObs(id, nova);
  atualizarCarrinho();
}

function atualizarQtdTela(id, qtd) {
  const el = document.getElementById('qtd-' + id);
  if (el) el.textContent = qtd;
}

// Mostra/esconde o botão "Adicionais" no card, e atualiza seu texto
function atualizarBotaoAdicionais(id, qtd) {
  const btn = document.getElementById('btn-adicional-' + id);
  if (!btn) return; // produto sem categoria elegível não tem esse botão
  btn.style.display = qtd > 0 ? 'inline-flex' : 'none';

  const temAdicionais = adicionais[id] && adicionais[id].length > 0;
  btn.classList.toggle('tem-adicionais', temAdicionais);
  btn.textContent = temAdicionais
    ? `🧀 ${adicionais[id].length} adicional${adicionais[id].length > 1 ? 'is' : ''}`
    : '🧀 Adicionais';
}

// Mostra/esconde o botão "Obs." no card e atualiza seu visual
function atualizarBotaoObs(id, qtd) {
  const btn = document.getElementById('btn-obs-' + id);
  if (!btn) return;
  btn.style.display = qtd > 0 ? 'inline-flex' : 'none';

  const temObs = observacoes[id] && observacoes[id].trim() !== '';
  btn.classList.toggle('tem-adicionais', temObs); // reutiliza a mesma classe visual
  btn.textContent = temObs ? '📝 Obs. ✓' : '📝 Obs.';
}



function calcularTotal() {
  if (!restauranteAtivo) return 0;
  const todosProdutos = obterTodosProdutos(restauranteAtivo);

  const totalProdutos = Object.entries(carrinho).reduce((soma, [id, qtd]) => {
    const p = todosProdutos.find(x => x.id === id);
    return soma + (p ? p.preco * qtd : 0);
  }, 0);

  const totalAdicionais = Object.entries(adicionais).reduce((soma, [prodId, adsIds]) => {
    const cat = obterCategoriaDoProduto(prodId);
    if (!cat) return soma;
    const lista = ADICIONAIS_POR_CATEGORIA[cat.categoria] || [];
    return soma + adsIds.reduce((s, aid) => {
      const a = lista.find(x => x.id === aid);
      return s + (a ? a.preco : 0);
    }, 0);
  }, 0);

  return totalProdutos + totalAdicionais;
}

function totalItens() {
  return Object.values(carrinho).reduce((s, v) => s + v, 0);
}

function atualizarCarrinho() {
  const total = calcularTotal();
  const qtd   = totalItens();

  document.getElementById('btn-carrinho-qtd').textContent = qtd;
  document.getElementById('btn-carrinho').style.display = qtd > 0 ? 'flex' : 'none';
  document.getElementById('total-valor').textContent = formatarDinheiro(total);

  renderizarItensCarrinho();
}

// ─── RENDERIZAR ITENS DO CARRINHO ──────────────────────────────────────────

function renderizarItensCarrinho() {
  const lista = document.getElementById('carrinho-itens');
  if (!restauranteAtivo) return;

  const todos    = obterTodosProdutos(restauranteAtivo);
  const entradas = Object.entries(carrinho).filter(([, q]) => q > 0);

  if (entradas.length === 0) {
    lista.innerHTML = `
      <div class="carrinho-vazio">
        <span>🛒</span>
        <p>Seu carrinho está vazio</p>
        <small>Adicione itens do cardápio</small>
      </div>`;
    return;
  }

  lista.innerHTML = entradas.map(([id, qtd]) => {
    const p = todos.find(x => x.id === id);
    if (!p) return '';

    const adsDoItem = adicionais[id] || [];
    const cat = obterCategoriaDoProduto(id);
    const listaAds = cat ? (ADICIONAIS_POR_CATEGORIA[cat.categoria] || []) : [];

    const tagsAdicionais = adsDoItem.map(aid => {
      const a = listaAds.find(x => x.id === aid);
      return a ? `<span class="adicional-tag">+ ${a.nome}</span>` : '';
    }).join('');

    const obsDoItem = observacoes[id] ? observacoes[id].trim() : '';

    return `
      <div class="item-carrinho">
        <div class="item-info">
          <strong>${p.nome}</strong>
          ${tagsAdicionais ? `<div class="adicionais-do-item">${tagsAdicionais}</div>` : ''}
          ${obsDoItem ? `<div class="obs-do-item">📝 ${obsDoItem}</div>` : ''}
          <span>${formatarDinheiro(p.preco * qtd)}</span>
        </div>
        <div class="item-qtd">
          <button class="btn-qtd" onclick="alterarQtd('${id}', -1)">−</button>
          <span>${qtd}</span>
          <button class="btn-qtd" onclick="alterarQtd('${id}', +1)">+</button>
        </div>
      </div>`;
  }).join('');
}

// ─── ENDEREÇOS RECENTES (localStorage) ────────────────────────────────────

const CHAVE_ENDERECOS = 'point_enderecos_recentes';
const LIMITE_ENDERECOS = 3;

function obterEnderecos() {
  try { return JSON.parse(localStorage.getItem(CHAVE_ENDERECOS) || '[]'); }
  catch { return []; }
}

function salvarEndereco(endereco) {
  const limpo = endereco.trim();
  if (!limpo) return;
  let lista = obterEnderecos().filter(e => e !== limpo);
  lista.unshift(limpo);
  lista = lista.slice(0, LIMITE_ENDERECOS);
  localStorage.setItem(CHAVE_ENDERECOS, JSON.stringify(lista));
}

function renderizarEnderecos() {
  const lista = obterEnderecos();
  const container = document.getElementById('enderecos-recentes');
  if (lista.length === 0) { container.innerHTML = ''; return; }
  container.innerHTML = `
    <p class="label-recente">Endereços recentes:</p>
    ${lista.map(e => `
      <button class="btn-endereco-recente" onclick="selecionarEndereco('${e.replace(/'/g, "\\'")}')">
        📍 ${e}
      </button>
    `).join('')}
  `;
}

function selecionarEndereco(e) {
  document.getElementById('endereco-input').value = e;
}

// ─── FORMA DE PAGAMENTO ────────────────────────────────────────────────────

function selecionarPagamento(forma) {
  document.querySelectorAll('.btn-pagamento').forEach(b => b.classList.remove('ativo'));
  document.querySelector(`[data-pagamento="${forma}"]`).classList.add('ativo');
  const campoTroco = document.getElementById('campo-troco');
  campoTroco.style.display = forma === 'dinheiro' ? 'block' : 'none';
  if (forma !== 'dinheiro') document.getElementById('troco-input').value = '';
}

function obterPagamentoSelecionado() {
  const ativo = document.querySelector('.btn-pagamento.ativo');
  return ativo ? ativo.dataset.pagamento : null;
}

// ─── MONTAR MENSAGEM DO WHATSAPP ───────────────────────────────────────────

function montarMensagem() {
  const todos     = obterTodosProdutos(restauranteAtivo);
  const pagamento = obterPagamentoSelecionado();
  const endereco  = document.getElementById('endereco-input').value.trim();
  const troco     = document.getElementById('troco-input').value.trim();
  const total     = calcularTotal();
  const nomesPagamento = { dinheiro: 'Dinheiro', pix: 'Pix', cartao: 'Cartão' };

  const linhas = [
    `*PEDIDO:*`,
  ];

  Object.entries(carrinho).forEach(([id, qtd]) => {
    const p = todos.find(x => x.id === id);
    if (!p) return;
    linhas.push(`• ${qtd}x ${p.nome} — ${formatarDinheiro(p.preco * qtd)}`);

    const adsDoItem = adicionais[id] || [];
    if (adsDoItem.length > 0) {
      const cat = obterCategoriaDoProduto(id);
      const listaAds = cat ? (ADICIONAIS_POR_CATEGORIA[cat.categoria] || []) : [];
      adsDoItem.forEach(aid => {
        const a = listaAds.find(x => x.id === aid);
        if (a) linhas.push(`   + ${a.nome} — ${formatarDinheiro(a.preco)}`);
      });
    }

    const obs = observacoes[id] ? observacoes[id].trim() : '';
    if (obs) linhas.push(`   📝 ${obs}`);
  });

  linhas.push(``);
  linhas.push(`*TOTAL: ${formatarDinheiro(total)}*`);
  linhas.push(``);
  linhas.push(`*Pagamento:* ${nomesPagamento[pagamento]}`);
  if (pagamento === 'dinheiro' && troco) linhas.push(`*💵 Troco para:* R$ ${troco}`);
  linhas.push(``);
  linhas.push(`*Endereço:* ${endereco}`);

  return linhas.join('\n');
}

// ─── ENVIAR PEDIDO ─────────────────────────────────────────────────────────

function enviarPedido() {
  if (!estaAberto(restauranteAtivo)) {
    mostrarAlerta('Estabelecimento fechado no momento!');
    return;
  }

  const qtd       = totalItens();
  const endereco  = document.getElementById('endereco-input').value.trim();
  const pagamento = obterPagamentoSelecionado();

  if (qtd === 0)  { mostrarAlerta('Adicione pelo menos um item ao carrinho!'); return; }
  if (!endereco)  { document.getElementById('endereco-input').focus(); mostrarAlerta('Informe o endereço de entrega!'); return; }
  if (!pagamento) { mostrarAlerta('Escolha a forma de pagamento!'); return; }

  salvarEndereco(endereco);
  salvarUltimoPedido();

  const mensagem = montarMensagem();
  const url = `https://wa.me/${restauranteAtivo.whatsapp}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

// ─── HORÁRIO DE FUNCIONAMENTO ──────────────────────────────────────────────

function estaAberto(restaurante) {
  const agora    = new Date();
  const diaSemana = agora.getDay();  // 0 = domingo, 6 = sábado
  const hora      = agora.getHours();
  const h         = restaurante.horario;

  const diaOk  = h.diasSemana.includes(diaSemana);
  const horaOk = hora >= h.abertura && hora < h.fechamento;

  return diaOk && horaOk;
}

function nomeDia(num) {
  return ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][num];
}

function textoHorario(restaurante) {
  const h    = restaurante.horario;
  const dias = h.diasSemana.map(nomeDia).join(', ');
  return `${dias} · ${h.abertura}h às ${h.fechamento}h`;
}

function aplicarStatusHorario() {
  const aberto  = estaAberto(restauranteAtivo);
  const badge   = document.getElementById('badge-horario');
  const btnEnviar = document.getElementById('btn-enviar');

  if (!badge) return;

  if (aberto) {
    badge.textContent = '🟢Aberto agora';
    badge.className   = 'badge-horario aberto';
  } else {
    const texto = textoHorario(restauranteAtivo);
    badge.textContent = `🔴Fechado`;
    badge.className   = 'badge-horario fechado';
  }

  // Bloqueia ou libera o botão de envio
  btnEnviar.disabled = !aberto;
  btnEnviar.title    = aberto ? '' : 'Estabelecimento fechado no momento';
}



function abrirCarrinho() {
  renderizarItensCarrinho();
  renderizarEnderecos();
  document.getElementById('drawer').classList.add('aberto');
  document.getElementById('overlay').classList.add('aberto');
}

function fecharCarrinho() {
  document.getElementById('drawer').classList.remove('aberto');
  document.getElementById('overlay').classList.remove('aberto');
}

function fecharTudo() {
  fecharModalAdicionais();
  fecharCarrinho();
}

// ─── MODAL DE ADICIONAIS ────────────────────────────────────

function abrirModalAdicionais(produtoId) {
  produtoEmEdicao = produtoId;

  const cat = obterCategoriaDoProduto(produtoId);
  if (!cat) return;

  const listaAds      = ADICIONAIS_POR_CATEGORIA[cat.categoria] || [];
  const jaSelecionados = adicionais[produtoId] || [];

  const todos   = obterTodosProdutos(restauranteAtivo);
  const produto = todos.find(x => x.id === produtoId);

  document.getElementById('modal-titulo').textContent =
    `Adicionais — ${produto ? produto.nome : ''} 🧀`;
  document.getElementById('modal-subtitulo').textContent =
    'Opcional — selecione o que quiser adicionar';

  document.getElementById('modal-lista-adicionais').innerHTML = listaAds.map(a => `
    <label class="adicional-item">
      <input
        type="checkbox"
        class="adicional-check"
        value="${a.id}"
        ${jaSelecionados.includes(a.id) ? 'checked' : ''}
      />
      <span class="adicional-nome">${a.nome}</span>
      <span class="adicional-preco">+ ${formatarDinheiro(a.preco)}</span>
    </label>
  `).join('');

  document.getElementById('modal-adicionais').classList.add('aberto');
  document.getElementById('overlay').classList.add('aberto');
}

function fecharModalAdicionais() {
  document.getElementById('modal-adicionais').classList.remove('aberto');
  produtoEmEdicao = null;
}

function pularAdicionais() {
  fecharModalAdicionais();
  document.getElementById('overlay').classList.remove('aberto');
}

function confirmarAdicionais() {
  if (!produtoEmEdicao) return;

  const checks       = document.querySelectorAll('.adicional-check:checked');
  const selecionados = Array.from(checks).map(c => c.value);

  if (selecionados.length > 0) {
    adicionais[produtoEmEdicao] = selecionados;
  } else {
    delete adicionais[produtoEmEdicao];
  }

  atualizarBotaoAdicionais(produtoEmEdicao, carrinho[produtoEmEdicao] || 0);
  atualizarCarrinho();

  fecharModalAdicionais();
  document.getElementById('overlay').classList.remove('aberto');
}

// ─── MODAL DE OBSERVAÇÃO ────────────────────────────────────

function abrirModalObs(produtoId) {
  produtoEmEdicao = produtoId;

  const todos   = obterTodosProdutos(restauranteAtivo);
  const produto = todos.find(x => x.id === produtoId);

  document.getElementById('modal-titulo').textContent =
    `Observação — ${produto ? produto.nome : ''} 📝`;
  document.getElementById('modal-subtitulo').textContent =
    'Opcional — informe preferências ou restrições';

  // Alterna modos dentro do modal
  document.getElementById('modal-modo-adicionais').style.display = 'none';
  document.getElementById('modal-modo-obs').style.display = 'block';

  // Preenche com observação já existente
  const input = document.getElementById('obs-input');
  input.value = observacoes[produtoId] || '';
  atualizarContadorObs();

  document.getElementById('modal-adicionais').classList.add('aberto');
  document.getElementById('overlay').classList.add('aberto');
}

function atualizarContadorObs() {
  const input = document.getElementById('obs-input');
  document.getElementById('obs-count').textContent = input.value.length;
}

function pularObs() {
  fecharModalObs();
}

function confirmarObs() {
  if (!produtoEmEdicao) return;

  const texto = document.getElementById('obs-input').value.trim();
  if (texto) {
    observacoes[produtoEmEdicao] = texto;
  } else {
    delete observacoes[produtoEmEdicao];
  }

  atualizarBotaoObs(produtoEmEdicao, carrinho[produtoEmEdicao] || 0);
  atualizarCarrinho();
  fecharModalObs();
}

function fecharModalObs() {
  // Restaura o modal para o modo de adicionais para a próxima abertura
  document.getElementById('modal-modo-adicionais').style.display = 'block';
  document.getElementById('modal-modo-obs').style.display = 'none';
  fecharModalAdicionais();
  document.getElementById('overlay').classList.remove('aberto');
}



function selecionarRestaurante(id) {
  restauranteAtivo = RESTAURANTES[id];
  carrinho    = {};
  adicionais  = {};
  observacoes = {};
  renderizarCardapio();
  atualizarCarrinho();
  document.getElementById('tela-escolha').style.display = 'none';
  document.getElementById('tela-cardapio').style.display = 'block';
  aplicarCorRestaurante();
  limparPesquisa();
  renderizarUltimosPedidos();
}

function voltarEscolha() {
  document.getElementById('tela-cardapio').style.display = 'none';
  document.getElementById('tela-escolha').style.display = 'flex';
  restauranteAtivo = null;
  carrinho    = {};
  adicionais  = {};
  observacoes = {};
}

function aplicarCorRestaurante() {
  document.documentElement.style.setProperty('--cor-ativa', restauranteAtivo.cor);
  document.documentElement.style.setProperty('--cor-ativa-escura', restauranteAtivo.corEscura);
  document.getElementById('nome-restaurante').textContent = restauranteAtivo.nome;
  document.getElementById('header-emoji').textContent = restauranteAtivo.emoji;
  aplicarStatusHorario();
  aplicarRodapeCardapio();
}

function aplicarRodapeCardapio() {
  const r = restauranteAtivo;

  // Horário no rodapé
  document.getElementById('rodape-horario-texto').textContent =
    `${textoHorario(r)}`;

  // WhatsApp
  const linkWpp = document.getElementById('rodape-wpp');
  linkWpp.href = `https://wa.me/${r.whatsapp}`;

  // Instagram — esconde se vazio
  const linkIg = document.getElementById('rodape-instagram');
  if (r.redes.instagram) {
    linkIg.href = r.redes.instagram;
    linkIg.style.display = '';
  } else {
    linkIg.style.display = 'none';
  }

}

// ─── RENDERIZAR CARDÁPIO ───────────────────────────────────────────────────

function renderizarCardapio() {
  const container = document.getElementById('cardapio-container');
  container.innerHTML = restauranteAtivo.cardapio.map(cat => `
    <section class="categoria">
      <h2 class="titulo-categoria">${cat.icone} ${cat.categoria}</h2>
      <div class="grade-produtos">
        ${cat.produtos.map(p => {
          const btnAdicionais = cat.aceitaAdicionais ? `
            <button
              class="btn-adicional-produto"
              id="btn-adicional-${p.id}"
              style="display:none"
              onclick="abrirModalAdicionais('${p.id}')"
            >🧀 Adicionais</button>
          ` : '';

          // Botão de observação disponível para TODOS os produtos
          const btnObs = `
            <button
              class="btn-adicional-produto"
              id="btn-obs-${p.id}"
              style="display:none"
              onclick="abrirModalObs('${p.id}')"
            >📝 Obs.</button>
          `;
          return `
            <div class="card-produto">
              <div class="produto-info">
                <strong>${p.nome}</strong>
                <p>${p.descricao}</p>
                <span class="preco">${formatarDinheiro(p.preco)}</span>
                <div class="btns-produto">
                  ${btnAdicionais}
                  ${btnObs}
                </div>
              </div>
              <div class="controle-qtd">
                <button class="btn-qtd" onclick="alterarQtd('${p.id}', -1)">−</button>
                <span id="qtd-${p.id}" class="valor-qtd">0</span>
                <button class="btn-qtd" onclick="alterarQtd('${p.id}', +1)">+</button>
              </div>
            </div>`;
        }).join('')}
      </div>
    </section>
  `).join('');
}

// ─── PESQUISA DE PRODUTOS ──────────────────────────────────────────────────

function filtrarProdutos(termo) {
  const termoBaixo = termo.trim().toLowerCase();
  let algumVisivel = false;

  document.querySelectorAll('.card-produto').forEach(card => {
    const nome = card.querySelector('strong').textContent.toLowerCase();
    const bate = termoBaixo === '' || nome.includes(termoBaixo);
    card.classList.toggle('oculto', !bate);
    if (bate) algumVisivel = true;
  });

  document.querySelectorAll('.categoria').forEach(sec => {
    const temVisivel = sec.querySelector('.card-produto:not(.oculto)');
    sec.classList.toggle('oculto', !temVisivel);
  });

  const container = document.getElementById('cardapio-container');
  let aviso = document.getElementById('aviso-pesquisa');
  if (!algumVisivel && termoBaixo !== '') {
    if (!aviso) {
      aviso = document.createElement('p');
      aviso.id = 'aviso-pesquisa';
      aviso.className = 'aviso-sem-resultado';
      aviso.textContent = 'Nenhum produto encontrado.';
      container.appendChild(aviso);
    }
  } else {
    if (aviso) aviso.remove();
  }
}

function limparPesquisa() {
  const input = document.getElementById('input-pesquisa');
  if (input) input.value = '';
  filtrarProdutos('');
}

// ─── ÚLTIMOS PEDIDOS (localStorage) ───────────────────────────────────────

const CHAVE_PEDIDOS  = 'point_ultimos_pedidos';
const LIMITE_PEDIDOS = 1;

function obterUltimosPedidos() {
  try { return JSON.parse(localStorage.getItem(CHAVE_PEDIDOS) || '[]'); }
  catch { return []; }
}

function salvarUltimoPedido() {
  const todos = obterTodosProdutos(restauranteAtivo);
  const total = calcularTotal();

  const itens = Object.entries(carrinho).map(([id, qtd]) => {
    const p = todos.find(x => x.id === id);
    return p ? `${qtd}x ${p.nome}` : '';
  }).filter(Boolean);

  const pedido = {
    restauranteId:   restauranteAtivo.id,
    restauranteNome: restauranteAtivo.nome,
    emoji:           restauranteAtivo.emoji,
    itens,
    total: formatarDinheiro(total),
    data:  new Date().toLocaleDateString('pt-BR'),
  };

  let lista = obterUltimosPedidos();
  lista.unshift(pedido);
  lista = lista.slice(0, LIMITE_PEDIDOS);
  localStorage.setItem(CHAVE_PEDIDOS, JSON.stringify(lista));
}

function renderizarUltimosPedidos() {
  const container = document.getElementById('ultimos-pedidos');
  if (!container) return;

  const lista = obterUltimosPedidos().filter(
    p => p.restauranteId === restauranteAtivo.id
  );

  if (lista.length === 0) { container.innerHTML = ''; return; }

  container.innerHTML = `
    <div class="ultimos-pedidos-wrap">
      <p class="label-ultimos">🕘 Último pedido</p>
      ${lista.slice(0, 1).map((p, i) => `
        <button class="btn-ultimo-pedido" onclick="repetirPedido(${i})">
          <span class="ultimo-emoji">${p.emoji}</span>
          <span class="ultimo-info">
            <strong>${p.itens.join(', ')}</strong>
            <small>${p.total} · ${p.data}</small>
          </span>
          <span class="ultimo-repetir">↩ repetir</span>
        </button>
      `).join('')}
    </div>
  `;
}

function repetirPedido(indice) {
  const lista = obterUltimosPedidos().filter(
    p => p.restauranteId === restauranteAtivo.id
  );
  const pedido = lista[indice];
  if (!pedido) return;

  carrinho    = {};
  adicionais  = {};
  observacoes = {};
  const todos = obterTodosProdutos(restauranteAtivo);

  pedido.itens.forEach(item => {
    const match = item.match(/^(\d+)x (.+)$/);
    if (!match) return;
    const qtd     = parseInt(match[1], 10);
    const nome    = match[2];
    const produto = todos.find(p => p.nome === nome);
    if (produto) carrinho[produto.id] = qtd;
  });

  todos.forEach(p => {
    atualizarQtdTela(p.id, carrinho[p.id] || 0);
    atualizarBotaoAdicionais(p.id, carrinho[p.id] || 0);
    atualizarBotaoObs(p.id, carrinho[p.id] || 0);
  });

  atualizarCarrinho();
  mostrarAlerta('Pedido carregado! Abra o carrinho para enviar ✓');
}

// ─── UTILITÁRIOS ───────────────────────────────────────────────────────────

function obterTodosProdutos(restaurante) {
  return restaurante.cardapio.flatMap(cat => cat.produtos);
}

function obterCategoriaDoProduto(produtoId) {
  if (!restauranteAtivo) return null;
  return restauranteAtivo.cardapio.find(cat =>
    cat.produtos.some(p => p.id === produtoId)
  ) || null;
}

function formatarDinheiro(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function mostrarAlerta(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('visivel');
  setTimeout(() => toast.classList.remove('visivel'), 3000);
}