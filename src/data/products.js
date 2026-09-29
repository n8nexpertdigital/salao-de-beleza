export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Sérum Facial Aura Glow - Vitamina C 15%',
    category: 'skincare',
    categoryLabel: 'Skincare',
    tagline: 'Ilumina, combate os radicais livres e uniforme o tom da pele instantaneamente.',
    description: 'Fórmula exclusiva com 15% de Vitamina C estabilizada, Ácido Hialurônico e Extrato de Orquídea Imperial. Estimula o colágeno, reduz manchas solares e restaura o brilho natural com absorção imediata sem efeito oleoso.',
    price: 189.90,
    originalPrice: 229.90,
    installment: '3x de R$ 63,30 sem juros',
    rating: 4.9,
    reviewsCount: 184,
    badge: 'Mais Vendido',
    badgeType: 'bestseller',
    image: '/images/serum_vitc.jpg',
    skinType: 'Pele Normal, Mista e Seca',
    ingredients: ['Vitamina C 15%', 'Ácido Hialurônico', 'Extrato de Orquídea'],
    volume: '30ml / 1.0 fl. oz',
    benefits: [
      'Reduz visivelmente manchas e linhas de expressão em 14 dias',
      'Textura ultra leve de rápida absorção',
      'Ação antioxidante comprovada contra poluição e luz azul',
      'Fórmula 100% vegana e livre de parabenos'
    ]
  },
  {
    id: 'prod-2',
    name: 'Creme Hidratante Lumière Rose Hialurônico',
    category: 'skincare',
    categoryLabel: 'Skincare',
    tagline: 'Hidratação profunda 72h com toque de veludo e aroma suave de Rosas de Grasse.',
    description: 'Desenvolvido para restaurar a barreira cutânea e preencher microfissuras da pele. Enriquecido com Niacinamida 5% e Manteiga de Karité para máxima nutrição e efeito pele de pêssego.',
    price: 164.90,
    originalPrice: 199.90,
    installment: '3x de R$ 54,96 sem juros',
    rating: 4.8,
    reviewsCount: 142,
    badge: '-17% OFF',
    badgeType: 'discount',
    image: '/images/hyaluronic_cream.jpg',
    skinType: 'Todas as peles, inclusive sensíveis',
    ingredients: ['Ácido Hialurônico Multiponderal', 'Niacinamida 5%', 'Rosas Francesas'],
    volume: '50ml / 1.7 oz',
    benefits: [
      'Retém a umidade da pele por até 72 horas seguidas',
      'Reduz a sensibilidade e a vermelhidão',
      'Acabamento aveludado perfeito como pré-maquiagem'
    ]
  },
  {
    id: 'prod-3',
    name: 'Máscara Capilar Jardin de Soie - Queratina & Argan',
    category: 'haircare',
    categoryLabel: 'Capilar',
    tagline: 'Reconstrução intensiva para fios danificados, ressecados ou quimicamente tratados.',
    description: 'Tratamento de salão na sua casa. Concentrado de Aminoácidos da Seda, Óleo de Argan Puro e Queratina Vegetal que selam a cutícula, eliminam o frizz e devolvem o brilho espelhado.',
    price: 139.90,
    originalPrice: 169.90,
    installment: '2x de R$ 69,95 sem juros',
    rating: 5.0,
    reviewsCount: 210,
    badge: 'Novo',
    badgeType: 'new',
    image: '/images/hair_mask.jpg',
    skinType: 'Cabelos Secos, Porosos e Danificados',
    ingredients: ['Óleo de Argan Marroquino', 'Proteínas da Seda', 'Queratina Vegetal'],
    volume: '200g / 7.05 oz',
    benefits: [
      'Elimina o frizz na primeira aplicação',
      'Proteção térmica contra secador e chapinha',
      'Fios 5x mais resistentes à quebra'
    ]
  },
  {
    id: 'prod-4',
    name: 'Batom Velvet Matte Rose Velours Luxury',
    category: 'makeup',
    categoryLabel: 'Maquiagem',
    tagline: 'Cor intensa, textura aveludada e hidratação com Vitamina E por 12 horas.',
    description: 'O tom Nude Rosado perfeito para destacar qualquer tom de pele. Embalagem magnética folheada em tom ouro rosa, com fórmula enriquecida com Ácido Hialurônico para lábios volumosos sem ressecar.',
    price: 98.90,
    originalPrice: 119.90,
    installment: '2x de R$ 49,45 sem juros',
    rating: 4.9,
    reviewsCount: 95,
    badge: 'Edição Ouro',
    badgeType: 'bestseller',
    image: '/images/lipstick_matte.jpg',
    skinType: 'Lábios de todos os tipos',
    ingredients: ['Ácido Hialurônico Lábial', 'Vitamina E', 'Manteiga de Cacau Organic'],
    volume: '3.8g / 0.13 oz',
    benefits: [
      'Duração de 12h sem borrar ou transferir',
      'Sensação de lábios macios e nutridos',
      'Acabamento mate aveludado de altíssima cobertura'
    ]
  },
  {
    id: 'prod-5',
    name: 'Perfume Fleur de Rose - Eau de Parfum 100ml',
    category: 'perfume',
    categoryLabel: 'Perfumaria',
    tagline: 'Uma fragrância marcante e sofisticada com notas de Peônia, Baunilha Bourbon e Âmbar.',
    description: 'Criado pelos mestres perfumistas de Grasse, Fleur de Rose é uma celebração da feminilidade elegante. Frasco em cristal lapidado com laço de veludo artesanal.',
    price: 349.90,
    originalPrice: 419.90,
    installment: '6x de R$ 58,31 sem juros',
    rating: 4.9,
    reviewsCount: 318,
    badge: 'Luxo',
    badgeType: 'bestseller',
    image: '/images/perfume.jpg',
    skinType: 'Perfumaria Fina',
    ingredients: ['Peônia Rosa', 'Baunilha de Madagascar', 'Âmbar Dourado'],
    volume: '100ml / 3.4 fl. oz',
    benefits: [
      'Alta fixação por até 16 horas na pele',
      'Fragrância exclusiva e inesquecível',
      'Frasco de coleção em cristal maciço'
    ]
  },
  {
    id: 'prod-6',
    name: 'Kit Ritual Skincare Completo Ultimate Glow (4 Itens)',
    category: 'kits',
    categoryLabel: 'Kits & Combos',
    tagline: 'O ritual completo para transformar a saúde da sua pele em 4 passos simples.',
    description: 'Inclui: Sérum Vitamina C 30ml + Creme Hialurônico 50ml + Óleo Facial Restaurador 30ml + Gua Sha em Quartzo Rosa autêntico. Embalado em caixa de presente de alta gramatura com acabamento em folha de ouro.',
    price: 399.90,
    originalPrice: 539.90,
    installment: '6x de R$ 66,65 sem juros',
    rating: 5.0,
    reviewsCount: 450,
    badge: 'Economize R$ 140',
    badgeType: 'discount',
    image: '/images/kit_routine.jpg',
    skinType: 'Todos os tipos de pele',
    ingredients: ['Vitamina C', 'Ácido Hialurônico', 'Quartzo Rosa Purificado'],
    volume: 'Kit Completo Luxo',
    benefits: [
      'Economia de R$ 140,00 comparado à compra avulsa',
      'Inclui pedra Gua Sha em Quartzo Rosa para drenagem facial',
      'Caixa presenteável inclusa sem custo adicional'
    ]
  }
];

export const REVIEWS_LIST = [
  {
    id: 'rev-1',
    author: 'Mariana Siqueira',
    city: 'São Paulo, SP',
    rating: 5,
    date: 'Há 2 dias',
    text: 'O Sérum de Vitamina C mudou completamente minha pele! Minha dermatologista elogiou o viço e as manchas de sol clarearam muito em 2 semanas.',
    productName: 'Sérum Facial Aura Glow',
    avatar: 'M'
  },
  {
    id: 'rev-2',
    author: 'Juliana Cavalcanti',
    city: 'Rio de Janeiro, RJ',
    rating: 5,
    date: 'Há 5 dias',
    text: 'A entrega foi super rápida (chegou em 2 dias!) e o perfume Fleur de Rose dura o dia todo. O cheiro é divino, recebo elogios onde passo!',
    productName: 'Perfume Fleur de Rose EDP',
    avatar: 'J'
  },
  {
    id: 'rev-3',
    author: 'Fernanda Lima',
    city: 'Curitiba, PR',
    rating: 5,
    date: 'Há 1 semana',
    text: 'Comprei o Kit de Skincare no Quiz de Beleza e amei! O creme hialurônico não deixa a pele oleosa e o Gua Sha é delicioso de usar à noite.',
    productName: 'Kit Ritual Skincare Completo',
    avatar: 'F'
  }
];
