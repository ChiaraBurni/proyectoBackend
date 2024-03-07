const socketClient = io()

socketClient.on("enviodeproducts", (obj) => {
    updateProductList(obj)
})


function updateProductList(productList) {

    const productsDiv = document.getElementById('list-products')

    let productosHTML = "";

    productList.forEach((product) => {
        productosHTML += `
        <div class="card">
        <div>
            <div>
                <p>Code: {{this.code}}</p>
            </div>
            <div>
                <h3>{{this.title}}</h3>
                <ul>
                    <li> ID: {{this.id}}</li>
                    <li> Description: {{this.description}}</li>
                    <li> Price: $ {{this.price}}</li>
                    <li>Category: {{this.category}}</li>
                    <li> Status: {{this.status}}</li>
                    <li>Stock: {{this.stock}}</li>
                </ul>
            <div>
                <img src="{{this.thumbnails.[0].url}}" alt="{{this.title}}" class="card-img">
            </div>
            </div>
        </div>
    </div>
`;
    });

    productsDiv.innerHTML = productosHTML;
}


let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let stock = form.elements.stock.value;
    let thumbnails = thumbnailInput.split(',').map(url => ({ url: url.trim() }));
    let price = form.elements.price.value;
    let code = form.elements.code.value;
    let status = form.elements.status.checked;

    socketClient.emit("addProduct", {
        title,
        description,
        stock,
        thumbnails,
        price,
        code,
        status,
    });

    form.reset();
});