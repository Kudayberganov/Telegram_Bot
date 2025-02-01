const mongoose = require("mongoose");

// Подключаемся к MongoDB Atlas
mongoose.connect("mongodb+srv://otkir:otkir1507@mycluster.jcpu2.mongodb.net/?retryWrites=true&w=majority&appName=myCluster", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Подключено к MongoDB"))
.catch(err => console.error("❌ Ошибка подключения:", err));

module.exports = mongoose;
