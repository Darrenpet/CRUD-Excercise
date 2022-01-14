let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

//READ;
console.log(cart);
function readCart(cart) {
  document.querySelector("#cart").innerHTML = "";
  cart.forEach((product, position) => {
    document.querySelector("#cart").innerHTML += `
       <div class="card mb-3">
              <div class="row g-0">
                 <div class="col-md-4">
                 <img src="${product.img}" class="img-fluid rounded-start" alt="...">
                 </div>
                 <div class="col-md-8">
                 <div class="card-body">
                    <h5 class="card-title">${product.Title}</h5>
                    <p class="card-text" ${product.Price}>Price:</p>
                    <p class="card-text" ${product.Genre}>Genre:</p>
                 </div>
                 <div class="d-flex mb-3 justify-content-between">
                <label class="form-label">Quantity:</label>
                <input type="number" min=1 id="remove${position}" value=${product.qty} onchange="updateCart(${position})" />
              </div>
                </div>
              </div>
        </div>
     `;
  });
}
readCart(cart);
// UPDATE
function updateCart(position) {
  cart[position] = { ...cart[position], qty };
  localStorage.setItem("cart", JSON.stringify(cart));
  readCart(cart);
}

// DELETE
function deleteFromCart(position) {
  cart.splice(position, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  readCart(cart);
}

CHECKOUT;
function checkout() {
  cart.length = 0;
  localStorage.removeItem("cart");
  readCart();
}
