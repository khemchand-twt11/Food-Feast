// const baseUrl = `https://drab-headscarf-moth.cyclic.app/`;
const searchQuery = localStorage.getItem("searchQuery");
const menuItem = localStorage.getItem("menu-item");
const row = document.querySelector(".appendRow");

if (searchQuery) {
  window.addEventListener("load", async () => {
    try {
      let res = await fetch(`${baseUrl}menu/${searchQuery}`);
      console.log(`${baseUrl}menu/${searchQuery}`);
      let data = await res.json();
      console.log(data.data);
      localStorage.removeItem("searchQuery");
    } catch (error) {
      console.log(error);
    }
  });
}

if (menuItem) {
  window.addEventListener("load", async () => {
    try {
      let res = await fetch(`${baseUrl}menu/?item=${menuItem}`);
      console.log(`${baseUrl}menu/${menuItem}`);
      let data = await res.json();
      console.log(data.data);
      showData(data.data);
      localStorage.removeItem("menu-item");
    } catch (error) {
      console.log(error);
    }
  });
}
function showData(data) {
  row.innerHTML = null;
  let newData = data
    .map((item) =>
      card(
        item._id,
        item.img,
        item.title,
        item.description.substring(0, 50) + "...",
        item.label,
        item.cost,
        item.type,
        item.food_type
      )
    )
    .join("");
  console.log(newData);
  row.innerHTML = newData;
}

function card(_id, img, title, description, label, cost, type, food_type) {
  return ` <div class="col-md-3 mb-4" id="${_id}" data-type="${type}" data-food_type="${food_type}">
  <div class="card menu-card">
    <img src="${img}" alt="..." />
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <p class="mb-0 menu-title" >${title}</p>
        <img src="${label}" class="me-2" alt="vegetarian indicator" width="6%" />
      </div>
      <p class="card-text menu-desc">
      ${description}
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <p class="card-price mb-0">₹ ${cost}/-</p>
        <button type="button" class="btn btn-primary">
          Add
        </button>
      </div>
    </div>
  </div>
</div>`;
}
/*
 

        
_id
6425cd53684d690969534169
img
"https://d1rgpf387mknul.cloudfront.net/products/PLP/web/2x_web_20221128…"
title
"Veg Whopper"
description
"Our signature Whopper with 7 layers between the buns. Extra crunchy ve…"
label
"https://www.burgerking.in/static/media/veg.2d5a7ccc.svg"
cost
169
type
"whopper"
food_type
"veg"
 */
