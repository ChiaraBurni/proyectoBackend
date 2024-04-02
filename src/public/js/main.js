const socket = io()
const formNewProduct = document.getElementById("formNewProduct")
const formDeleteProduct = document.getElementById("formDeleteProduct")

formNewProduct.addEventListener("submit", (e) => {
  e.preventDefault()

  let title = document.getElementById("title").value
  let description = document.getElementById("description").value
  let price = parseInt(document.getElementById("price").value)
  let thumbnail = document.getElementById("thumbnail").value
  let code = document.getElementById("code").value
  let stock = document.getElementById("stock").value
  let category = document.getElementById("category").value

  const newProduct = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  }

  socket.emit("newProduct", newProduct)

  formNewProduct.reset()

})

formDeleteProduct.addEventListener("submit", (e) => {
  e.preventDefault()
  let id = document.getElementById("id").value
  socket.emit("deleteProduct", id)
  formDeleteProduct.reset()
})

socket.on("products", (data) => {
  const realTimeProducts = document.getElementById("realTimeProducts")
  realTimeProducts.innerHTML = ""
  data.forEach(prod => { 
    let card = document.createElement("div")

    card.className = "card"

    const images = prod.thumbnail && prod.thumbnail.length > 0
    ? prod.thumbnail.map(imgSrc => `<img src="${imgSrc}" alt="${prod.title}">`).join('')
    : '<img src="https://st4.depositphotos.com/14953852/24651/v/450/depositphotos_246517344-stock-illustration-image-available-icon-vector-flat.jpg" alt="No image">'

    card.innerHTML = `
      <div class="images" >
        ${images}
      </div>
      <h3>${prod.title}</h3>
      <p>Category: ${prod.category} </p>
      <p>Price: $${prod.price}</p>
      <p>Description: ${prod.description} </p>
    `
    realTimeProducts.appendChild(card)
  })
})

socket.on("error", (data) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: `${data}`
  });
})

socket.on("success", (data) => {
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: `${data.message}`,
  })
})