import ProductManager from "../services/productsManager.js";
import  __dirname  from "../utils.js";
const products = new ProductManager(__dirname+'/data/products.json')

const socketProducts = (socketServer) => {
    socketServer.on("connection",async(socket)=>{
        console.log("client connected con ID:",socket.id)
        const listadeproductos=await products.getProducts()

        socketServer.emit("enviodeproducts",listadeproductos)

        socket.on("addProduct",async(obj)=>{
            await products.addProduct(obj)
            const listadeproductos=await products.getProducts()
            socketServer.emit("enviodeproducts",listadeproductos)
            })
        
    })
};

export default socketProducts;