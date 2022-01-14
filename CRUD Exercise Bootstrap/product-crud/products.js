let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [
      {
        Title: "Harry Potter and The Sorcerer's Stone",
        Author: "J.K. Rowling",
        Genre: "Fantasy Fiction",
        Price: "210",
        img: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474154022i/3._UY735_SS735_.jpg",
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
      <div class="card mb-3">
        <img src="${product.img}" class="card-img-top" alt="${product.Title}">
        <div class="card-body">
          <h5 class="card-title">${product.Title}</h5>
          <p class="card-text">${product.Price}</p>
          <p class="card-text">${product.Genre}</p>
          <button type="button" class="btn btn-success" onclick="addToCart(${position})" >
            Add to cart
          </button>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProduct${position}" >
            Edit
          </button>
          <button type="button" class="btn btn-danger" onclick="deleteProduct(${position})" >
            Delete
          </button>
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
                          <option value="All">All</option>
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
        </div>
      </div>
    `;
  });
}

readProducts(products);

// CREATE
function createProduct() {
  let title = document.querySelector("#addTitle").value;
  let genre = document.querySelector("#addGenre").value;
  let price = document.querySelector("#addPrice").value;
  let img = document.querySelector("#addImg").value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products.push({
      title,
      genre,
      price,
      img,
    });
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// UPDATE
function updateProduct(position) {
  let title = document.querySelector(`#editTitle${position}`).value;
  let genre = document.querySelector(`#editGenre${position}`).value;
  let price = document.querySelector(`#editPrice${position}`).value;
  let img = document.querySelector(`#editImg${position}`).value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products[position] = {
      title,
      genre,
      price,
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
  cart.push({ ...products[position] });
  localStorage.setItem("cart", JSON.stringify(cart));
}

// SORT BY GENRE
function sortGenre() {}

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
function sortPrice() {}
