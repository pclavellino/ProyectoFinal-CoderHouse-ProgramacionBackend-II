const socket = io();
const productList = document.getElementById("productList");
const addForm = document.getElementById("addProductsForm");
const deleteForm = document.getElementById("deleteProductsForm");

// Agregar Productos 

addForm.addEventListener("submit", async (e) => {

    e.preventDefault()
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;

    await fetch("/realtimeproducts", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({ title, description, code, price, stock, category})        
    } 
    )

addForm.reset()
})

// Borrar Productos

deleteForm.addEventListener("submit", async (e) => {

    e.preventDefault()
    const id = document.getElementById("idToDelete").value;

    await fetch("/realtimeproducts", {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({ id })        
    } 
    )

deleteForm.reset()
})

// Recibir Productos

socket.on("products", (data) => {
    productList.innerHTML = "";
    data.forEach((product) => {
        if(product.status === true) {
            const card = document.createElement("div");
            card.innerHTML = `
                <div class="card">
                    <h2 class="subtitle">${product.title}</h2>
                    <p class="id">ID: ${product._id}</p>
                    <p class="description">Description: ${product.description}</p>
                    <p class="price">Precio: $ ${product.price}</p>
                    <p class="stock">Stock: ${product.stock}</p>
                </div>
            `;
            productList.appendChild(card)
        }
    })
})