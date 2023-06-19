const API_URL = "https://makeup-api.herokuapp.com/api/v1/products.json";
const productListElement = document.getElementById("productList");
const paginationElement = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");
const clearButton = document.getElementById("clearButton");
const productsPerPage = 10;
let currentPage = 1;
let totalProducts = 0;
let allProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        allProducts = await response.json();
        totalProducts = allProducts.length;
        displayProductsByPage();
        displayPagination();
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProductsByPage() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const products = allProducts.slice(startIndex, endIndex);
    const searchKeyword = searchInput.value.trim().toLowerCase();

    let filteredProducts = products;
    if (searchKeyword !== "") {
        filteredProducts = products.filter((product) => {
            return (
                product.brand.toLowerCase().includes(searchKeyword) ||
                product.name.toLowerCase().includes(searchKeyword) ||
                product.description.toLowerCase().includes(searchKeyword)
            );
        });
    }

    displayProducts(filteredProducts);
}

function displayProducts(products) {
    productListElement.innerHTML = "";

    products.forEach((product) => {
        const productElement = createProductElement(product);
        productListElement.appendChild(productElement);
    });
}

function createProductElement(product) {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const brandElement = document.createElement("h2");
    brandElement.textContent = product.brand;

    const nameElement = document.createElement("h3");
    nameElement.textContent = product.name;

    const priceElement = document.createElement("p");
    priceElement.textContent = `Price: ${product.price}`;

    const imageElement = document.createElement("img");
    imageElement.src = product.image_link;

    const linkElement = document.createElement("a");
    linkElement.href = product.product_link;
    linkElement.textContent = "Product Link";

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = truncateDescription(product.description);

    productElement.appendChild(brandElement);
    productElement.appendChild(nameElement);
    productElement.appendChild(priceElement);
    productElement.appendChild(imageElement);
    productElement.appendChild(linkElement);
    productElement.appendChild(descriptionElement);

    return productElement;
}

function truncateDescription(description) {
    const MAX_LINES = 4;
    const MAX_LENGTH_PER_LINE = 40;
    const MAX_CHARACTERS = MAX_LINES * MAX_LENGTH_PER_LINE;

    if (description.length > MAX_CHARACTERS) {
        return description.substring(0, MAX_CHARACTERS) + "...";
    }

    return description;
}

function displayPagination() {
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    paginationElement.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.classList.add("page-link");

        if (i === currentPage) {
            pageLink.classList.add("active");
        }

        pageLink.addEventListener("click", () => {
            currentPage = i;
            displayProductsByPage();
            displayPagination();
        });

        paginationElement.appendChild(pageLink);
    }
}

searchInput.addEventListener("input", () => {
    currentPage = 1;
    displayProductsByPage();
    displayPagination();
});

clearButton.addEventListener("click", () => {
    searchInput.value = "";
    currentPage = 1;
    displayProductsByPage();
    displayPagination();
});

fetchProducts();
