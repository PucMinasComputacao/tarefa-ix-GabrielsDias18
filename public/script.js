const data = {
    produtos: [
        {
            id: 1,
            nome: "iPhone 15 Pro",
            preco: 7999.00,
            categoria: "Celulares",
            imagem: "unsplash.com",
            descricao: "Tela Super Retina XDR, chip A17 Pro e sistema de câmera potente.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Samsung Galaxy S24 Ultra",
            preco: 6899.90,
            categoria: "Celulares",
            imagem: "unsplash.com",
            descricao: "Câmera de 200MP, inteligência artificial integrada e caneta S Pen.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "MacBook Air M3",
            preco: 11499.00,
            categoria: "Notebooks",
            imagem: "unsplash.com",
            descricao: "Superfino, rápido e com bateria que dura o dia todo.",
            emEstoque: true
        },
        {
            id: 4,
            nome: "Notebook Gamer Dell G15",
            preco: 5499.00,
            categoria: "Notebooks",
            imagem: "unsplash.com",
            descricao: "Placa de vídeo RTX 3050, processador Core i5 e tela de 120Hz.",
            emEstoque: false
        },
        {
            id: 5,
            nome: "Mouse Gamer Sem Fio",
            preco: 299.90,
            categoria: "Acessórios",
            imagem: "unsplash.com",
            descricao: "Sensor de alta precisão, cliques leves e bateria recarregável.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Teclado Mecânico RGB",
            preco: 450.00,
            categoria: "Acessórios",
            imagem: "unsplash.com",
            descricao: "Switches azuis táteis, iluminação customizável e layout ABNT2.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "Console PlayStation 5",
            preco: 3999.00,
            categoria: "Games",
            imagem: "unsplash.com",
            descricao: "Carregamento ultra-rápido no SSD e imersão com feedback tátil.",
            emEstoque: true
        },
        {
            id: 8,
            nome: "Jogo EA Sports FC 26",
            preco: 349.90,
            categoria: "Games",
            imagem: "unsplash.com",
            descricao: "O simulador de futebol mais realista com os maiores craques mundiais.",
            emEstoque: false
        }
    ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");



function formatPrice(preco) {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

    card.style.padding = "15px";

    const title = document.createElement("h3");
    title.classList.add("card-title");
    title.textContent = produto.nome;

    const categoryText = document.createElement("p");
    categoryText.textContent = `Categoria: ${produto.categoria}`;

    const priceText = document.createElement("p");
    priceText.textContent = formatPrice(produto.preco);

    const btnDetails = document.createElement("button");
    btnDetails.textContent = "Ver detalhes";
    btnDetails.addEventListener("click", () => {
        showProductDetails(produto);
    });

    const btnHighlight = document.createElement("button");
    btnHighlight.textContent = "Destacar";
    btnHighlight.addEventListener("click", () => {
        card.classList.toggle("highlight");
    });

    card.appendChild(title);
    card.appendChild(categoryText);
    card.appendChild(priceText);
    card.appendChild(btnDetails);
    card.appendChild(btnHighlight);

    return card;
}


function renderProducts(produtos) {
    // Limpa a lista atual (Exigência B.3)
    productList.innerHTML = ""; 

    produtos.forEach(produto => {
        const cardElement = createProductCard(produto);
        productList.appendChild(cardElement);
    });

    const allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
        // Ação simples exigida: imprimir no console o data-id do card
        console.log("Card renderizado - ID:", card.getAttribute("data-id"));
    });
}

function renderCategories() {
    const categorias = ["Todas"];

    data.produtos.forEach(produto => {
        if (!categorias.includes(produto.categoria)) {
            categorias.push(produto.categoria);
        }
    });

    categorySelect.innerHTML = "";

    categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        categorySelect.appendChild(option);
    });
}


function showProductDetails(produto) {
    const statusEstoque = produto.emEstoque ? "Em Estoque" : "Esgotado";
    
    productDetails.innerHTML = `
        <h3>Detalhes do Produto</h3>
        <p><strong>Nome:</strong> ${produto.nome}</p>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Status:</strong> ${statusEstoque}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

function filterProducts() {
    const textSearch = searchInput.value.toLowerCase();
    const categorySelected = categorySelect.value;

    const produtosFiltrados = data.produtos.filter(produto => {
        const bateTexto = produto.nome.toLowerCase().includes(textSearch);
        const bateCategoria = categorySelected === "Todas" || produto.categoria === categorySelected;
        
        return bateTexto && bateCategoria;
    });

    renderProducts(produtosFiltrados);
}


searchInput.addEventListener("input", filterProducts);

categorySelect.addEventListener("change", filterProducts);

btnRender.addEventListener("click", () => {
    searchInput.value = "";
    categorySelect.value = "Todas";
    renderProducts(data.produtos);
});

renderCategories();
renderProducts(data.produtos); 
