# 🍔 Point Delivery

Cardápio digital com envio de pedidos via WhatsApp para duas hamburguerias de um mesmo grupo.

Projeto real, desenvolvido para uso em comércio local. Sem aplicativo, sem cadastro, sem taxa por pedido.

---

## Sobre o projeto

O cliente acessa o site, escolhe a hamburgueria, monta o pedido, informa o endereço e a forma de pagamento — e o pedido vai direto para o WhatsApp do estabelecimento, já formatado e pronto para ser lido.

Duas hamburguerias atendidas pelo mesmo site, cada uma com cardápio, WhatsApp e horário próprios:

- **Point Burguer** — hambúrgueres e pastéis artesanais
- **Point na Brasa** — smash burgers e hambúrgueres grelhados no carvão

---

## Funcionalidades

- Seleção da hamburgueria na tela inicial
- Cardápio organizado por categorias com controle de quantidade
- Pesquisa de produtos em tempo real
- Adicionais por produto (queijo, bacon, ovo etc.) com lista específica por categoria
- Observações por produto (sem cebola, bem passado, sem molho...)
- Carrinho com total calculado automaticamente
- Endereço com salvamento dos últimos 3 endereços via localStorage
- Seleção de forma de pagamento: Dinheiro, Pix ou Cartão
- Campo de troco quando pagamento em dinheiro
- Verificação de horário de funcionamento — bloqueia envio quando fechado
- Pedido enviado via WhatsApp com mensagem formatada
- Último pedido salvo para repetição rápida
- Rodapé com redes sociais e horário de funcionamento do estabelecimento
- Layout mobile first, responsivo para tablets e desktops

---

## Mensagem gerada no WhatsApp

```
*ITENS DO PEDIDO:*
• 2x X-Burguer — R$ 45,80
   + Bacon — R$ 4,00
   + Queijo extra — R$ 3,00
   📝 sem cebola, bem passado
• 1x Pastel de Frango — R$ 13,90
   + Catupiry — R$ 3,50
• 1x Refrigerante Lata — R$ 6,90
   📝 gelado por favor

*TOTAL: R$ 77,10*

*Pagamento:* Dinheiro
*Troco para:* R$ 100

*Endereço:* Rua das Flores, 123, Centro
```

---

## Tecnologias

- HTML5
- CSS3
- JavaScript puro (sem frameworks)
- localStorage (endereços e histórico de pedidos)
- Font Awesome 6 (ícones)
- Google Fonts — Bebas Neue e Barlow
- WhatsApp API via link `wa.me`

Sem backend. Sem banco de dados. Sem dependências para instalar.

---

## Estrutura do projeto

```
point-delivery/
├── index.html          # Estrutura completa da interface
├── css/
│   └── estilo.css      # Todo o visual
└── js/
    ├── cardapio.js     # Dados dos restaurantes, produtos e adicionais
    └── app.js          # Lógica: carrinho, pedido, localStorage, WhatsApp
```

---

## Como configurar

Abra `js/cardapio.js` e preencha os dados reais de cada restaurante.

**WhatsApp** — formato DDI + DDD + número, sem espaços:
```js
whatsapp: '5582999991111',
```

**Redes sociais** — deixe vazio `''` para esconder o ícone:
```js
redes: {
  instagram: 'https://instagram.com/perfil',
},
```

**Horário de funcionamento:**
```js
horario: {
  diasSemana: [2, 3, 4, 5, 6, 0], // 0=dom, 1=seg ... 6=sáb
  abertura: 17,   // hora de abertura (formato 24h)
  fechamento: 23, // hora de fechamento
},
```

**Adicionais por categoria** — edite a constante `ADICIONAIS_POR_CATEGORIA` no mesmo arquivo:
```js
'Hambúrgueres': [
  { id: 'hb_01', nome: 'Queijo extra', preco: 3.00 },
  { id: 'hb_02', nome: 'Bacon',        preco: 4.00 },
],
```

**Produtos** — cada produto dentro da categoria:
```js
{ id: 'pb_01', nome: 'X-Burguer', descricao: 'Descrição aqui', preco: 22.90 },
```

> O `id` deve ser único em todo o arquivo. Não repita ids.

---

## Como publicar

**GitHub Pages:**
1. Suba os arquivos em um repositório público
2. Vá em Settings → Pages → Branch: main
3. O site ficará disponível em `usuario.github.io/nome-do-repo`

**Netlify (arrastar e soltar):**
1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta `point-delivery` para a área de deploy
3. Site no ar em menos de um minuto

**Hostinger ou similar:**
1. Acesse o Gerenciador de Arquivos no painel
2. Faça upload de todos os arquivos dentro de `public_html`
3. Configure o domínio apontando para o servidor

---

## Licença

Projeto de uso privado — desenvolvido para cliente específico.  
Código disponível para referência e aprendizado.
