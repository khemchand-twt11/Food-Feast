// const baseUrl = `https://drab-headscarf-moth.cyclic.app/`;
const searchQuery = localStorage.getItem("searchQuery");
const menuItem = localStorage.getItem("menu-item");
const row = document.querySelector(".appendRow");
const token = localStorage.getItem("token") || null;
if (searchQuery) {
  window.addEventListener("load", async () => {
    try {
      let res = await fetch(`${baseUrl}menu/${searchQuery}`);
      console.log(`${baseUrl}menu/${searchQuery}`);
      let data = await res.json();
      console.log(data.data);
      showData(data.data);
      localStorage.removeItem("searchQuery");
    } catch (error) {
      console.log(error);
    }
  });
} else if (menuItem) {
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
} else {
  window.addEventListener("load", async () => {
    try {
      let res = await fetch(`${baseUrl}menu`);
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

  row.innerHTML = newData;
  cartFunctionalities();
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
        <button type="button" class="btn btn-primary cart-btn" data-id="${_id}">
          Add
        </button>
      </div>
    </div>
  </div>
</div>`;
}

const allItemsMenu = document.querySelectorAll(".menu__card");

for (const item of allItemsMenu) {
  item.addEventListener("click", async () => {
    try {
      let res = await fetch(`${baseUrl}menu/?item=${item.dataset.name}`);

      console.log(`${baseUrl}menu/${menuItem}`);
      let data = await res.json();
      console.log(data.data);
      showData(data.data);
    } catch (error) {
      console.log(error);
    }
  });
}
function cartFunctionalities() {
  const allCartBtn = document.querySelectorAll(".cart-btn");
  for (const btn of allCartBtn) {
    btn.addEventListener("click", async () => {
      const obj = {
        menuId: btn.dataset.id,
      };
      try {
        let res = await fetch(`${baseUrl}cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(obj),
        })
          .then((res) => res.json())
          .then((data) => alert(data.msg));

        console.log(`${baseUrl}menu/${menuItem}`);
        let data = await res.json();
        console.log(data.data);
        showData(data.data);
      } catch (error) {
        console.log(error);
      }
    });
  }
}

/*

Swal.fire({
      title: "Done!",
      text: "Product Added To Cart!",
      icon: "success",
      customClass: {
        title: "my-title-class",
        content: "my-content-class",
        icon: "icon-success",
        confirmButton: "my-confirm-button-class",
      },
    });
*/
