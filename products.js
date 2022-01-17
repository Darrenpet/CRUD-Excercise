let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [
      {
        Title: "Harry Potter and The Sorcerer's Stone",
        Author: "J.K. Rowling",
        Genre: "Fantasy Fiction",
        Price: "210",
        img: "https://www.rif.org/sites/default/files/Book_Covers/sorcerersstone.jpg",
      },
      {
        Title: "The Lord of the Rings",
        Author: "J.R.R. Tolkien",
        Genre: "Fantasy Fiction",
        Price: "196",
        img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg",
      },
      {
        Title: "To Kill A Mockingbird",
        Author: "Harper Lee",
        Genre: "Thriller",
        Price: "152",
        img: "https://cdn.britannica.com/21/182021-050-666DB6B1/book-cover-To-Kill-a-Mockingbird-many-1961.jpg",
      },
      {
        Title: "The Lion, The Witch and The Wardrobe",
        Author: "C.S. Lewis",
        Genre: "Fantasy Fiction",
        Price: "204",
        img: "https://katongboy.files.wordpress.com/2012/07/dsc04143_3.jpg",
      },
      {
        Title: "Mary Poppins",
        Author: "P.L. Travers",
        Genre: "Comedy",
        Price: "314",
        img: "https://images.gr-assets.com/books/1327947805l/152380.jpg",
      },
      {
        Title: "The Da Vinci Code",
        Author: "Dan Brown",
        Genre: "Thriller",
        Price: "214",
        img: "https://www.thoughtco.com/thmb/oGlBWzkZq5dhT-IfpPC3c-l-kcY=/736x1131/filters:fill(auto,1)/the-da-vinci-code-589f9cee3df78c4758a2d9e7.jpg",
      },
    ];

let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// READ
function readProducts(products) {
  document.querySelector("#products").innerHTML = "";
  products.forEach((product, position) => {
    document.querySelector("#products").innerHTML += `
      <div class="card border-dark border-5">
        <img src="${product.img}" class="card-img-top" alt="${product.Title}">
        <div class="card-body bg-muted">
          <h5 class="card-title">${product.Title}</h5>
          <p class="card-text">R${product.Price}</p>
          <p class="card-text">${product.Genre}</p>
          <div class="d-flex mb-3">
            <input type="number" class="form-control border-dark border-3" value=1 min=1 id="addToCart${position}">
            <button type="button" class="btn btn-success border-dark border-3 ms-3" onclick="addToCart(${position})">Add to Cart<i class="fas fa-cart-plus"></i></button>
          </div>
          
          
          
          </div>
          <div class="d-flex justify-content-end card-footer">
            <button type="button" class="btn btn-primary w-50 border-dark border-3" data-bs-toggle="modal" data-bs-target="#editProduct${position}" >
              Edit
            </button>
            <button type="button" class="btn btn-danger w-50 border-dark border-3 ms-3" onclick="deleteProduct(${position})" >
              Delete
            </button>
          </div>
      </div>






      <div
                class="modal fade"
                id="editProduct${position}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Edit ${product.Title}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="editTitle${position}" class="form-label">Title</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editTitle${position}"
                          id="editTitle${position}"
                          value="${product.Title}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editGenre${position}" class="form-label">Genre</label>
                        <select
                          class="form-select"
                          name="editGenre${position}"
                          id="editGenre${position}"
                        >
                          <option value="ALl">All</option>
                          <option value="Fantasy Fiction">Fantasy Fiction</option>
                          <option value="Thriller">Thriller</option>
                          <option value="Comedy">Comedy</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="editPrice${position}" class="form-label">Price</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editPrice${position}"
                          id="editPrice${position}"
                          value="${product.Price}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editImg${position}" class="form-label">Image URL</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editImg${position}"
                          id="editImg${position}"
                          value="${product.img}"
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        onclick="updateProduct(${position})"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
    `;
  });
}

readProducts(products);
showCartBadge();

// CREATE
function createProduct() {
  let Title = document.querySelector("#addTitle").value;
  let Genre = document.querySelector("#addGenre").value;
  let Price = document.querySelector("#addPrice").value;
  let img = document.querySelector("#addImg").value;

  try {
    if (!Title || !Price || !img)
      throw new Error("Please fill in all the fields");
    products.push({
      Title,
      Genre,
      Price,
      img,
    });
    console.log(products);
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// UPDATE
function updateProduct(position) {
  let Title = document.querySelector(`#editTitle${position}`).value;
  let Genre = document.querySelector(`#editGenre${position}`).value;
  let Price = document.querySelector(`#editPrice${position}`).value;
  let img = document.querySelector(`#editImg${position}`).value;

  try {
    if (!Title || !Price || !img)
      throw new Error("Please fill in all the fields");
    products[position] = {
      Title,
      Genre,
      Price,
      img,
    };
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// DELETE
function deleteProduct(position) {
  let confirmation = confirm(
    "Are you sure you want to delete the selected product?"
  );

  if (confirmation) {
    products.splice(position, 1);
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  }
}

// ADD TO CART
function addToCart(position) {
  let qty = document.querySelector(`#addToCart${position}`).value;
  let added = false;
  cart.forEach((product) => {
    if (product.Title == products[position].Title) {
      alert(
        `You have successfully added ${qty} ${products[position].Title} to the cart`
      );
      product.qty = parseInt(product.qty) + parseInt(qty);
      added = true;
    }
  });
  if (!added) {
    cart.push({ ...products[position], qty });
    alert(
      `You have successfully added ${qty} ${products[position].Title} to the cart`
    );
  }
  console.log(cart);

  showCartBadge();

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update Cart Badge
function showCartBadge() {
  document.querySelector("#badge").innerHTML = cart ? cart.length : "";
}

// SORT BY GENRE
function sortGenre() {
  let genre = document.querySelector("#sortGenre").value;

  if (genre == "All") {
    return readProducts(products);
  }

  let foundProducts = products.filter((product) => {
    return product.Genre == genre;
  });

  readProducts(foundProducts);
  console.log(foundProducts);
}

// SORT BY NAME
function sortName() {
  let direction = document.querySelector("#sortName").value;

  let sortedProducts = products.sort((a, b) => {
    if (a.Title.toLowerCase() < b.Title.toLowerCase()) {
      return -1;
    }
    if (a.Title.toLowerCase() > b.Title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  if (direction == "descending") sortedProducts.reverse();
  console.log(sortedProducts);
  readProducts(products);
}

// SORT BY PRICE
function sortPrice() {
  let direction = document.querySelector("#sortPrice").value;

  let sortedProducts = products.sort((a, b) => a.Price - b.Price);

  console.log(sortedProducts);

  if (direction == "descending") sortedProducts.reverse();
  readProducts(sortedProducts);
}
