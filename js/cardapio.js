/* Aqui ficam os dados dos dois restaurantes. Para adicionar ou remover produtos, edite este arquivo. */

const RESTAURANTES = {

  // POINT BURGUER
  point_burguer: {
    id: 'point_burguer',
    nome: 'Point Burguer',
    slogan: 'Hambúrgueres & Pastéis Artesanais',
    emoji: '🍔',
    cor: '#efc21e',
    corEscura: '#d8ac0d',
    whatsapp: '558287660172', // ← Troque pelo número real

    redes: {
      instagram: 'https://www.instagram.com/pointburguer1',
      whatsappcontato: '998877665544',
    },

    // Horário de funcionamento — formato 24h
    // diasSemana: 0=dom, 1=seg, 2=ter, 3=qua, 4=qui, 5=sex, 6=sáb
    horario: {
      diasSemana: [ 4, 5, 6, 0, 1, 2], // qui a ter
      abertura: 15,   // 18:00
      fechamento: 22, // 22:30
    },

    cardapio: [
      {
        categoria: 'Hamburgueres Caseiros',
        icone: ' ',
        aceitaAdicionais: true,
        produtos: [
          { id: 'pb_01', nome: 'Misto',                       descricao: 'Pão bola, presunto, queijo mussarela e salada',                                                  preco: 6.00 },
          { id: 'pb_02', nome: 'X-Queijo',                    descricao: 'Pão bola, queijo coalho, queijo mussarela, cheddar e salada',                                    preco: 8.00 },
          { id: 'pb_03', nome: 'X-Burguer Catupiry Caseiro',  descricao: 'Pão bola, hambúrguer caseiro e catupiry',                                                        preco: 9.00 },
          { id: 'pb_04', nome: 'X-Burguer Cheddar Caseiro',   descricao: 'Pão bola, hambúrguer caseiro e queijo cheddar',                                                  preco: 9.00 },
          { id: 'pb_05', nome: 'X-Burguer Coalho',            descricao: 'Pão bola, hambúrguer artesanal e queijo coalho',                                                 preco: 9.00 },
          { id: 'pb_06', nome: 'X-Bacon',                     descricao: 'Pão bola, bacon, presunto, queijo mussarela, ovos e salada',                                     preco: 10.00 },
          { id: 'pb_07', nome: 'X-Burguer',                   descricao: 'Pão bola, hambúrguer caseiro, presunto, queijo mussarela e salada',                              preco: 11.00 },
          { id: 'pb_08', nome: 'X-Calabresa',                 descricao: 'Pão bola, calabresa, presunto, queijo mussarela, ovos e salada',                                 preco: 10.00 },
          { id: 'pb_09', nome: 'X-Frango Catupiry',           descricao: 'Pão bola, frango, catupiry, salada e milho',                                                     preco: 10.00 },
          { id: 'pb_10', nome: 'X-Calabresa Catupiry',        descricao: 'Pão bola, calabresa, catupiry, salada e milho',                                                  preco: 10.00 },
          { id: 'pb_11', nome: 'X-Frango',                    descricao: 'Pão bola, filé de frango, presunto, queijo mussarela, bacon e salada',                           preco: 12.00 },
          { id: 'pb_12', nome: 'X-Burguer Especial',          descricao: 'Pão bola, hambúrguer caseiro, presunto, mussarela, milho, cebola e salada',                      preco: 12.00 },
          { id: 'pb_13', nome: 'X-Calaburguer',               descricao: 'Pão bola, hambúrguer caseiro, calabresa, presunto, mussarela e salada',                          preco: 15.00 },
          { id: 'pb_14', nome: 'X-Burguer Bacon',             descricao: 'Pão bola, hambúrguer caseiro, bacon, presunto, queijo mussarela e salada',                       preco: 15.00 },
          { id: 'pb_15', nome: 'X-Calabacon',                 descricao: 'Pão bola, calabresa, bacon, ovos, presunto, queijo mussarela e salada',                          preco: 14.00 },
          { id: 'pb_16', nome: 'X-Calafrango',                descricao: 'Pão bola, filé de frango, bacon, calabresa, presunto, queijo mussarela e salada',                preco: 15.00 },
          { id: 'pb_17', nome: 'X-Burgão',                    descricao: 'Pão bola, 2 hambúrgueres artesanais, presunto, queijo mussarela e salada',                       preco: 17.00 },
          { id: 'pb_18', nome: 'X-Burguer Bacon Especial',    descricao: 'Pão bola, hambúrguer caseiro, bacon, milho, presunto, mussarela, cebola e salada',               preco: 17.00 },
          { id: 'pb_19', nome: 'X-Burguer Frango',            descricao: 'Pão bola, hambúrguer caseiro, frango, presunto, mussarela e salada',                             preco: 15.00 },
          { id: 'pb_20', nome: 'X-Triplo Burguer',            descricao: 'Pão bola, 3 hambúrgueres caseiros, 3 queijos e molho barbecue',                                  preco: 23.00 },
          { id: 'pb_21', nome: 'X-Point Burguer',             descricao: 'Pão bola, 2 hambúrgueres, 2 queijos, queijo mussarela, bacon, calabresa, frango, ovos e salada', preco: 28.00 },
        ],
      },
      {
        categoria: "Hamburgueres Industriais",
        icone: ' ',
        aceitaAdicionais: true,
        produtos: [
          { id: 'pb_22', nome: 'X-Burguer Industrial',          descricao: 'Pão bola, hambúrguer industrial, salada, presunto e mussarela',                                    preco: 8.00 },
          { id: 'pb_23', nome: 'X-Burguer Catupiry Industrial', descricao: 'Pão bola, 2 hambúrgueres industrial, catupiry',                                                    preco: 9.00 },
          { id: 'pb_24', nome: 'X-Burguer Cheddar Industrial',  descricao: 'Pão bola, 2 hambúrgueres industrial, cheddar',                                                     preco: 9.00 },
          { id: 'pb_25', nome: 'X-Americano',                   descricao: 'Pão bola, hambúrguer industrial, ovo, presunto, mussarela e salada',                               preco: 10.00 },
          { id: 'pb_26', nome: 'X-Bacon Burguer',               descricao: 'Pão bola, hambúrguer industrial, bacon, presunto, mussarela e salada',                             preco: 13.00 },
          { id: 'pb_27', nome: 'X-Burguer Duplo',               descricao: 'Pão bola, 2 hambúrgueres industrial, ovo, cheddar, presunto, mussarela e salada',                  preco: 13.00 },
          { id: 'pb_28', nome: 'X-Calabresa Burguer',           descricao: 'Pão bola, hambúrguer industrial, ovo, calabresa, mussarela e salada',                              preco: 13.00 },
          { id: 'pb_29', nome: 'X-Frango Burguer',              descricao: 'Pão bola, hambúrguer industrial, frango, presunto, mussarela e salada',                            preco: 13.00 },
          { id: 'pb_30', nome: 'X-Tudo',                        descricao: 'Pão bola, 3 hambúrgueres industrial, calabresa, frango, bacon, ovo, presunto, mussarela e salada', preco: 24.00 },
        ],
      },
      {
        categoria: 'Pastéis',
        icone: ' ',
        aceitaAdicionais: true,
        produtos: [
          { id: 'pb_31', nome: 'Pastel Presunto', descricao: 'Presunto', preco: 6.00 },
          { id: 'pb_32', nome: 'Pastel Calabresa', descricao: 'Calabresa', preco: 6.00 },
          { id: 'pb_33', nome: 'Pastel Misto', descricao: 'Presunto e queijo', preco: 6.00 },
          { id: 'pb_34', nome: 'Pastel Queijo', descricao: 'Queijo', preco: 6.00 },
          { id: 'pb_35', nome: 'Pastel Frango', descricao: 'Frango', preco: 6.00 },
          { id: 'pb_36', nome: 'Pastel Frango Catupiry', descricao: 'Frango desfiado, catupiry e orégano', preco: 7.00 },
          { id: 'pb_37', nome: 'Pastel Frango c/ Cheddar', descricao: 'Frango desfiado, cheddar e orégano', preco: 7.00 },
          { id: 'pb_38', nome: 'Pastel Frango c/ Queijo', descricao: 'Frango desfiado, mussarela e orégano', preco: 7.00 },
          { id: 'pb_39', nome: 'Pastel Frango Hot', descricao: 'Frango desfiado, mussarela e batata palha', preco: 8.00 },
          { id: 'pb_40', nome: 'Pastel Frango Especial', descricao: 'Frango desfiado, catupiry, milho e mussarela', preco: 9.00 },
          { id: 'pb_41', nome: 'Pastel Calabresa c/ Queijo', descricao: 'Calabresa e mussarela', preco: 7.00 },
          { id: 'pb_42', nome: 'Pastel Calabresa c/ Catupiry', descricao: 'Calabresa e catupiry', preco: 7.00 },
          { id: 'pb_43', nome: 'Pastel Calafrango', descricao: 'Calabresa e frango', preco: 8.00 },
          { id: 'pb_44', nome: 'Hot de Calabresa', descricao: 'Calabresa, mussarela, catupiry e batata palha', preco: 9.00 },
          { id: 'pb_45', nome: 'Calabresa Especial', descricao: 'Calabresa, mussarela, catupiry e milho', preco: 9.00 },
          { id: 'pb_46', nome: 'Calafrango Especial', descricao: 'Calabresa, frango, queijo e milho', preco: 10.00 },
          { id: 'pb_47', nome: 'Pastel Pizza', descricao: 'Frango, presunto, mussarela, milho e tomate', preco: 10.00 },
          { id: 'pb_48', nome: 'Pastel 4 Queijos', descricao: 'Cheddar, catupiry, mussarela e queijo coalho', preco: 9.00 },
          { id: 'pb_49', nome: 'Pastel Charque c/ Queijo', descricao: 'Charque e queijo', preco: 9.00 },
          { id: 'pb_50', nome: 'Pastel Charque c/ Catupiry', descricao: 'Charque e catupiry', preco: 9.00 },
          { id: 'pb_51', nome: 'Pastel Doce Nutella', descricao: 'Nutella', preco: 8.00 },
          { id: 'pb_52', nome: 'Pastel Doce Romeu e Julieta', descricao: 'Queijo e goiabada', preco: 8.00 },
        ],
      },
      {
        categoria: 'Refrigerantes',
        icone: ' ',
        produtos: [
          { id: 'pb_53', nome: 'Pepsi Caçulinha',   descricao: '',   preco: 3.00 },
          { id: 'pb_54', nome: 'Guaraná Caçulinha', descricao: '',   preco: 3.00 },
          { id: 'pb_54', nome: 'Coca Cola Lata',    descricao: '',   preco: 6.00 },
          { id: 'pb_55', nome: 'Guaraná Lata',      descricao: '',   preco: 6.00 },
          { id: 'pb_56', nome: 'Guaraná 1L',        descricao: '',   preco: 8.00 },
          { id: 'pb_57', nome: 'Coca Cola 1,5L',    descricao: '',   preco: 11.00 },
        ],
      },
    ],
  },

  // POINT NA BRASA
  point_brasa: {
    id: 'point_brasa',
    nome: 'Point na Brasa',
    slogan: 'Hambúrgueres Grelhados no Carvão',
    emoji: '🔥',
    cor: '#e35702',
    corEscura: '#b34400',
    whatsapp: '558296890363', // ← Troque pelo número real

    redes: {
      instagram: 'https://www.instagram.com/pointnabrasa1',
      whatsappcontato: '998877665544',
    },

   horario: {
      diasSemana: [ 4, 5, 6, 0, 1, 2], // qui a ter
      abertura: 18,   // 18:00
      fechamento: 22, // 22:30
    },

    cardapio: [
      {
        categoria: 'Na Brasa',
        icone: ' ',
        aceitaAdicionais: true,
        produtos: [
          { id: 'br_01', nome: 'Classic Burguer', descricao: 'Pão na brasa, hambúrguer de 150g, queijo mussarela e cebola',                          preco: 16.00 },
          { id: 'br_02', nome: 'O Bruto',         descricao: 'Pão na brasa, hambúrguer de 150g, queijo coalho e cebola caramelizada',                preco: 17.00 },
          { id: 'br_03', nome: 'O Arretado',      descricao: 'Pão na brasa, hambúrguer de 150g, bacon, queijo mussarela e cebola',                   preco: 20.00 },
          { id: 'br_04', nome: 'Oxe',             descricao: 'Pão na brasa, hambúrguer de 150g, queijo cheddar, abacaxi, mel e cebola caramelizada', preco: 20.00 },
          { id: 'br_05', nome: 'De Coragem',      descricao: 'Pão na brasa, 2 hambúrgueres de 150g, queijo mussarela e cebola caramelizada',         preco: 24.00 },
          { id: 'br_06', nome: 'Bruto em Dobro',  descricao: 'Pão na brasa, 2 hambúrgueres de 150g, queijo coalho duplo e cebola caramelizada',      preco: 24.00 },
          { id: 'br_07', nome: 'Moda do Chef',  descricao: 'Pão na brasa, 2 hambúrgueres de 150g, cheddar duplo, abacaxi e cebola caramelizada',      preco: 27.00 },
          { id: 'br_08', nome: 'Bruto do Sertão', descricao: 'Pão na brasa, 3 hambúrgueres de 150g, queijo mussarela triplo e cebola caramelizada',  preco: 30.00 },
        ],
      },
      {
        categoria: 'Refrigerantes',
        icone: ' ',
        produtos: [
          { id: 'br_09', nome: 'Pepsi Caçulinha',     descricao: '',   preco: 3.00 },
          { id: 'br_10', nome: 'Guaraná Caçulinha',   descricao: '',   preco: 3.00 },
          { id: 'br_11', nome: 'Coca Cola Lata',      descricao: '',   preco: 6.00 },
          { id: 'br_12', nome: 'Guaraná Lata',        descricao: '',   preco: 6.00 },
          { id: 'br_13', nome: 'Guaraná 1L',          descricao: '',   preco: 8.00 },
          { id: 'br_14', nome: 'Coca Cola 1,5L',      descricao: '',   preco: 11.00 },
        ],
      },
    ],
  },
};

// ADICIONAIS POR CATEGORIA
// Cada categoria elegível define seus próprios adicionais aqui.
// Para alterar, basta editar a lista da categoria correspondente.
const ADICIONAIS_POR_CATEGORIA = {

  'Hamburgueres Caseiros': [
    { id: 'hc_01', nome: 'Hamburguer',   preco: 6.00 },
  ],

  'Hamburgueres Industriais': [
    { id: 'hi_01', nome: 'Hamburguer',   preco: 3.00 },
  ],

  'Pastéis': [
    { id: 'ps_01', nome: 'Tomate',       preco: 1.00 },
    { id: 'ps_02', nome: 'Milho',        preco: 1.00 },
    { id: 'ps_03', nome: 'Batata Palha', preco: 1.00 },
  ],

  'Na Brasa': [
    { id: 'bb_01', nome: 'Abacaxi',         preco: 3.00 },
    { id: 'bb_02', nome: 'Mel',             preco: 1.00 },
    { id: 'bb_03', nome: 'Bacon',           preco: 4.00 },
    { id: 'bb_04', nome: 'Picles',          preco: 2.00 },
    { id: 'bb_05', nome: 'Queijo Coalho',   preco: 3.00 },
    { id: 'bb_06', nome: 'Mussarela',       preco: 3.00 },
    { id: 'bb_07', nome: 'Cheddar',         preco: 3.00 },
    { id: 'bb_08', nome: 'Hambúrguer 150g', preco: 8.00 },
  ],

};