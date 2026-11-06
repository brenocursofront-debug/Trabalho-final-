/* ==========================================================
   DADOS DO SITE: é AQUI que você edita tudo.
   - Informações do restaurante (nome, endereço, horários...)
   - Categorias e pratos do cardápio
   - Fotos: coloque os arquivos na pasta "images" e use o
     mesmo nome no campo "image" de cada prato.
   Os textos e preços abaixo são apenas exemplos.
   ========================================================== */

const RESTAURANT = {
  name: "Casa Brasa",
  tagline: "Cozinha de fogo, ingredientes da estação e mesa farta.",
  currency: "BRL",
  address: "[SEU ENDEREÇO], [CIDADE - UF]",
  hours: "[DIAS]: [HH:MM - HH:MM]",
  phone: "[TELEFONE]",
  whatsapp: "", // só números com DDI e DDD, ex.: 5511999999999 (deixe vazio para ocultar o botão)
  heroImage: "images/hero.jpg",
  aboutImage: "images/sobre.jpg",
  aboutTitle: "Uma casa feita para sentar e ficar",
  aboutText:
    "Conte aqui a história do restaurante: quem somos, de onde vêm os ingredientes e o que torna a sua cozinha especial.",
};

/* Tags aceitas (use as que quiser): "vegetariano", "vegano", "sem glúten", "picante" */
const MENU = [
  {
    id: "entradas",
    title: "Entradas",
    description: "Para começar a mesa.",
    items: [
      {
        name: "Bruschetta Caprese",
        description: "Pão italiano tostado, tomate fresco, manjericão e mussarela de búfala.",
        price: 28,
        image: "images/bruschetta.jpg",
        tags: ["vegetariano"],
        details: "Servida com azeite extravirgem. Acompanha 4 unidades.",
      },
      {
        name: "Carpaccio de Carne",
        description: "Lâminas finas de filé, rúcula, parmesão e molho de mostarda.",
        price: 42,
        image: "images/carpaccio.jpg",
        tags: ["sem glúten"],
        details: "Servido gelado. Pode ser pedido sem a mostarda.",
      },
      {
        name: "Burrata com Tomates",
        description: "Burrata cremosa, tomates confitados e pesto de manjericão.",
        price: 46,
        image: "images/burrata.jpg",
        tags: ["vegetariano", "sem glúten"],
        details: "Ótima para dividir.",
      },
    ],
  },
  {
    id: "pratos",
    title: "Pratos principais",
    description: "Feitos na hora, no ponto certo.",
    items: [
      {
        name: "Risoto de Cogumelos",
        description: "Arroz arbóreo, mix de cogumelos frescos, vinho branco e parmesão.",
        price: 64,
        image: "images/risoto.jpg",
        tags: ["vegetariano"],
        details: "Preparo em cerca de 25 minutos.",
      },
      {
        name: "Filé com Fritas",
        description: "Filé mignon grelhado, batatas fritas rústicas e manteiga de ervas.",
        price: 78,
        image: "images/file.jpg",
        tags: [],
        details: "Escolha o ponto da carne ao pedir.",
      },
      {
        name: "Salmão Grelhado",
        description: "Salmão com crosta de ervas, purê de batata-doce e legumes salteados.",
        price: 82,
        image: "images/salmao.jpg",
        tags: ["sem glúten"],
        details: "Peixe fresco do dia.",
      },
      {
        name: "Spaghetti Arrabiata",
        description: "Massa artesanal, molho de tomate, alho e pimenta calabresa.",
        price: 58,
        image: "images/massa.jpg",
        tags: ["vegano", "picante"],
        details: "Pode ser pedido sem pimenta.",
      },
    ],
  },
  {
    id: "sobremesas",
    title: "Sobremesas",
    description: "Para fechar com doçura.",
    items: [
      {
        name: "Petit Gâteau",
        description: "Bolinho quente de chocolate com sorvete de creme.",
        price: 32,
        image: "images/petit-gateau.jpg",
        tags: ["vegetariano"],
        details: "Preparo em 12 minutos.",
      },
      {
        name: "Tiramisù",
        description: "Camadas de café, mascarpone e cacau, receita tradicional.",
        price: 30,
        image: "images/tiramisu.jpg",
        tags: ["vegetariano"],
        details: "",
      },
      {
        name: "Cheesecake de Frutas Vermelhas",
        description: "Base crocante, creme suave e calda de frutas vermelhas.",
        price: 34,
        image: "images/cheesecake.jpg",
        tags: ["vegetariano"],
        details: "",
      },
    ],
  },
  {
    id: "bebidas",
    title: "Bebidas",
    description: "Geladas e feitas na hora.",
    items: [
      {
        name: "Limonada Suíça",
        description: "Limão batido com gelo e um toque de hortelã.",
        price: 14,
        image: "images/limonada.jpg",
        tags: ["vegano", "sem glúten"],
        details: "",
      },
      {
        name: "Suco Natural",
        description: "Fruta da estação, sem açúcar adicionado.",
        price: 12,
        image: "images/suco.jpg",
        tags: ["vegano", "sem glúten"],
        details: "Pergunte pelo sabor do dia.",
      },
      {
        name: "Caipirinha",
        description: "Cachaça, limão, açúcar e gelo. Pode ser trocada por vodka.",
        price: 24,
        image: "images/caipirinha.jpg",
        tags: ["vegano"],
        details: "Contém álcool. Venda proibida para menores de 18 anos.",
      },
    ],
  },
];
