const btnPesquisa = document.querySelector("#btnPesquisar");
const inputPesquisa = document.querySelector("#inputPesquisa");
const products = document.querySelector("#produtos");

let lista = []; //array para armazenar a lista de produtos

//event listener para realizar a pesquisa no click
btnPesquisa.addEventListener("click", () => {
  if (inputPesquisa.value.trim() !== "" && isNaN(inputPesquisa.value)) {
    search();
  } else {
    products.innerHTML = `
    <div id="error">
      <p>Valor inválido, insira um valor válido para a pesquisa</p>
      <img src="../../public/assets/img/forbidden.svg" id="searchError">
    </div>
    `;
  }
});

//event listener para realizar a pesquisa ao apertar enter
inputPesquisa.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    if (inputPesquisa.value.trim() !== "" && isNaN(inputPesquisa.value)) {
      search();
    } else {
      products.innerHTML = `
    <div id="error">
      <p>Valor inválido, insira um valor válido para a pesquisa</p>
      <img src="../../public/assets/img/forbidden.svg" id="searchError">
    </div>
    `;
    }
  }
});

//função de pesquisa
function search() {
  const pesquisa = inputPesquisa.value.toLowerCase();
  //Realiza a busca dos itens baseados na palavra pesquisada
  const resultado = lista.filter((item) => {
    const regex = new RegExp(`(^|\\s)${pesquisa}\\b`, "i");
    return regex.test(item.title);
  });

  products.innerHTML = "";
  if (resultado.length === 0) {
    products.innerHTML = `
    <div id="error">
      <p>Nenhum produto encontrado</p>
      <img src="../../public/assets/img/search-error.svg" id="searchError">
    </div>
    `;
  } else {
    resultado.forEach((element) => {
      const rating = element.rating.rate;
      const starHtml = getStars(rating);
      products.innerHTML += `
            <div class="item ${element.category}"   >
              <div class="name">${element.title}</div>
              <div class="image"><img class="img" src="${element.image}"></div>
              <div class="price">R$${element.price}</div>
              <div class="stars">${starHtml}</div>
              <div class="stars">${element.rating.rate}</div> 
              <button class="maisDetalhes" id="${element.id}">Mais detalhes</button>  
            </div>
            `;
      const maisDetalhes = document.querySelectorAll(".maisDetalhes");
      maisDetalhes.forEach((divItem) => {
        divItem.addEventListener("click", () => {
          const itemId = divItem.id;
          window.location.href = `../../src/pages/item.html?id=${itemId}`;
        });
      });
    });
  }

  console.log(resultado);              
}

function searchProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Erro ao carregar os produtos. Status: ${response.status}`
        );
      }
    })
    .then((data) => {
      lista = data;
    })
    .catch((error) => {
      console.error(`Erro ao carregar os produtos: ${error.message}`);
    });
}

searchProducts();

window.addEventListener("pageshow", () => {
  inputPesquisa.value = ""; // Limpa o valor do campo de pesquisa
});

function getStars(rating) {
  let starHtml = "";
  let fullStars = Math.floor(rating);
  let halfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starHtml += '<i class="fa fa-star"></i>';
    } else if (halfStar && i === fullStars) {
      starHtml += '<i class="fa fa-star-half"></i>';
    } else {
      starHtml += '<i class="fa fa-star-o"></i>';
    }
  }
  return starHtml;
}
