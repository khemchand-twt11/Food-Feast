const payment_btn = document.getElementById("pay-btn");
let totalSum = localStorage.getItem("total-sum");
payment_btn.innerHTML = "Pay ₹" + totalSum;
payment_btn.addEventListener("click", () => {
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
  setTimeout(() => {
    localStorage.removeItem("total-sum");
    window.location.href = "index.html";
  }, 3000);
});
