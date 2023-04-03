// const baseUrl = `https://drab-headscarf-moth.cyclic.app/`;
const searchQuery = localStorage.getItem("searchQuery");
// const menuItem = localStorage.getItem("menu-item");
// const row = document.querySelector(".appendRow");
// const token = localStorage.getItem("token") || null;

const cartStore = document.getElementById("cart-store");
const token = localStorage.getItem("token");
const total_items = document.getElementById("total-items");
const summary_total_item = document.getElementById("summary-total-item");
const firstTotal = document.getElementById("first-total");
const secondTotal = document.getElementById("second-total");
let totalSum = 0;
window.addEventListener("load", async () => {
  try {
    let res = await fetch(`${baseUrl}cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await res.json();
    if (data.msg == "success") {
      showData(data.data);
      // console.log(data.data);
      total_items.innerText = data.data.length + " items";
      summary_total_item.innerText = "ITEMS " + data.data.length;
      for (const item of data.data) {
        totalSum += parseInt(item.cost);
      }
      firstTotal.innerText = "₹ " + totalSum;
      secondTotal.innerText = "₹ " + totalSum;
    } else {
      console.log("some problem");
      // console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
});

function showData(data) {
  //   cartStore.innerHTML = null;
  let newData = data
    .map((item, index) =>
      card(
        item._id,
        item.img,
        item.title,
        item.description.substring(0, 50) + "...",
        item.label,
        item.cost,
        item.type,
        item.food_type,
        index
      )
    )
    .join("");

  cartStore.innerHTML = newData;
  //   cartFunctionalities();
}

function card(_id, img, title, description, label, cost, type, food_type, i) {
  return `<div class="row mb-4 d-flex justify-content-between align-items-center allCartDiv" id="${i}">
  <div class="col-md-2 col-lg-2 col-xl-2">
    <img
      src="${img}"
      class="img-fluid rounded-3"
      alt="Cotton T-shirt"
    />
  </div>
  <div class="col-md-3 col-lg-3 col-xl-3">
    <h6 class="text-muted">${title}</h6>
    <h6 class="text-black mb-0">${description}</h6>
  </div>
  <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
    <button
      class="btn btn-link px-2"
      onclick="changeQuantity(-1,${i})"
    >
      <i class="fas fa-minus"></i>
    </button>

    <input
      id="${i}"
      min="0"
      name="quantity"
      value="1"
      type="text"
      class="form-control form-control-sm allCartInput"
      data-cost=${cost}
    />

    <button
   
      class="btn btn-link px-2"
      onclick="changeQuantity(1,${i})"
    >
      <i class="fas fa-plus"></i>
    </button>
  </div>
  <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
    <h6 class="mb-0 item-cost" data-cost=${cost}>₹ ${cost}</h6>
  </div>
  <div class="col-md-1 col-lg-1 col-xl-1 text-end">
  <button class="text-muted cart_buttons" style="background-color: white; border: none" onclick='deleteCart("${_id}")'>
      
      <i class="fa-solid fa-trash" ></i>
  </button>
  </div>
</div>

<hr class="my-4" />`;
}

// function cartFunctionalities() {
//   const allInput = document.querySelectorAll(".allCartInput");
//   console.log(allInput);
//   //   for (let i = 0; i < allCartDiv.length; i++) {
//   //     allCartDiv[i];
//   //   }
// }
function changeQuantity(amt, index) {
  const allCartDiv = document.querySelectorAll(".allCartDiv");

  for (let i = 0; i < allCartDiv.length; i++) {
    const inputId = allCartDiv[i].id;
    if (inputId == index) {
      const parentDiv = document.getElementById(inputId);
      const inputTag = parentDiv.querySelector("input");
      const cost = parentDiv.querySelector("h6.item-cost");
      totalSum -= parseInt(inputTag.value);
      let newValue = parseInt(inputTag.value) + parseInt(amt);
      if (newValue < 0) {
        newValue = 0;
      }
      console.log(cost);
      inputTag.value = newValue;
      let price = parseFloat(cost.dataset.cost);
      let newCost = price * newValue;
      cost.textContent = "₹ " + newCost;
    }
  }
  const allInputs = document.querySelectorAll(".allCartInput");
  console.log(allInputs);
  let totalCost = 0;
  for (const input of allInputs) {
    totalCost += parseInt(input.value) * parseInt(input.dataset.cost);
  }

  totalSum = totalCost;
  firstTotal.innerText = "₹ " + totalSum;
  secondTotal.innerText = "₹ " + totalSum;
}

//payment page
const checkoutBtn = document.getElementById("checkout");
checkoutBtn.addEventListener("click", () => {
  localStorage.setItem("total-sum", totalSum);
  window.location.href = "payment.html";
});

async function deleteCart(cartId) {
  cartId = String(cartId);
  let obj = { cartId };
  try {
    let res = await fetch(`${baseUrl}cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(obj),
    });
    let data = await res.json();
    if (data.msg == "success") {
      showData(data.data);
      window.location.href = "cart.html";
      // total_items.innerText = data.data.length + " items";
      // summary_total_item.innerText = "ITEMS " + data.data.length;
      // for (const item of data.data) {
      //   totalSum += parseInt(item.cost);
      // }
      // console.log(totalSum);
      // firstTotal.innerText = "₹ " + totalSum;
      // secondTotal.innerText = "₹ " + totalSum;
    } else {
      console.log("some problem");
    }
  } catch (error) {
    console.log(error);
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
