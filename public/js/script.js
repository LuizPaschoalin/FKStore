const container = document.getElementById("products");
const filter = document.getElementById("filter");
const category = {};

const btnPesquisa = document.querySelector("#pesquisa");
btnPesquisa.addEventListener("click", () => {
  window.location.href = "../src/pages/pesquisa.html";
});

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    console.log(json);

    let selected = "cu";
    filter.addEventListener("change", () => {
      selected = filter.value;
      constructor(selected);
    });

    const categorySet = new Set();
    json.forEach((value) => {
      categorySet.add(value.category);
    });

    categorySet.forEach((category) => {
      const option = document.createElement("option");
      option.textContent = category;
      filter.appendChild(option);
    });

    json.forEach((element) => {
      const rating = element.rating.rate;
      const starHtml = getStars(rating);
      container.innerHTML += `
        <div class="item ${element.category}">
            <div class="name">"${element.title}"</div>
            <div class="image"><img class="img" src="${element.image}"></div>
            <div class="price">R$${element.price}</div>
            <div class="rating">${starHtml}</div>
            <div>${element.rating.rate}</div>
            <button class="maisDetalhes" id="${element.id}">Mais detalhes</button>
        </div>
    `;
      const maisDetalhes = document.querySelectorAll(".maisDetalhes");
      maisDetalhes.forEach((divItem) => {
        divItem.addEventListener("click", () => {
          const itemId = divItem.id;
          window.location.href = `../src/pages/item.html?id=${itemId}`;
        });
      });
    });

    function constructor(selected) {
      if (selected === "all") {
        container.innerHTML = "";
        json.forEach((element) => {
          const rating = element.rating.rate;
          const starHtml = getStars(rating);
          container.innerHTML += `
            <div class="item ${element.category}">
                <div class="name">${element.title}</div>
                <div class="image"><img class="img" src="${element.image}"></div>
                <div class="price">R$${element.price}</div>
                <div class="rating">${starHtml}</div>
                <div>${element.rating.rate}</div>
                <button class="maisDetalhes" id="${element.id}">Mais detalhes</button>
            </div>
        `;
          const maisDetalhes = document.querySelectorAll(".maisDetalhes");
          maisDetalhes.forEach((divItem) => {
            divItem.addEventListener("click", () => {
              const itemId = divItem.id;
              window.location.href = `../src/pages/item.html?id=${itemId}`;
            });
          });
        });
      } else {
        const productsByClass = json.filter((element) => {
          return element.category === selected;
        });
        container.innerHTML = "";
        productsByClass.forEach((element) => {
          const rating = element.rating.rate;
          const starHtml = getStars(rating);
          container.innerHTML += `
            <div class="item ${element.category}">
                <div class="name">${element.title}</div>
                <div class="image"><img class="img" src="${element.image}"></div>
                <div class="price">R$${element.price}</div>
                <div class="rating">${starHtml}</div>
                <div>${element.rating.rate}</div>
                <button class="maisDetalhes" id="${element.id}">Mais detalhes</button>
            </div>
        `;
          const maisDetalhes = document.querySelectorAll(".maisDetalhes");
          maisDetalhes.forEach((divItem) => {
            divItem.addEventListener("click", () => {
              const itemId = divItem.id;
              window.location.href = `../src/pages/item.html?id=${itemId}`;
            });
          });
        });
      }
    }
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
