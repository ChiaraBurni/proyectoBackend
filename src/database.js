const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://chiaraburni:CoderCoder@cluster0.eqs12vk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected database"))
  .catch((error) => console.error("Error Establishing a Database Connection", error))