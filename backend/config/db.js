import mongoose from "mongoose";
import dotenv from "dotenv";

/*
- dotenv.config(), .env dosyasını yükleyerek içindeki değişkenleri process.env nesnesine ekler.
- process.env, Node.js'in global nesnelerinden biridir ve Express.js dahil tüm Node.js projelerinde kullanılabilir. Aslında Express.js projesi de bir Node.js projesidir. Neden mi? Çünkü Express.js, Node.js üzerinde çalışan bir web framework'üdür.
- dotenv modülünün config() fonksiyonu, .env dosyasını okur, içindeki değişkenleri ayrıştırır ve process.env nesnesine ekler. Böylece uygulama içinde, environment değişkenlere process.env.VARIABLE_NAME şeklinde erişilebilir.
*/ 
dotenv.config();

const connectDB = async () => {
  try {
    // await kullanılan satırda fonksiyon duruyor gibi görünse de, aslında asenkron çalışmaya devam ediyor.
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo DB connection has been established!");
  } catch (error) {
    console.log("Mongo DB connection has failed.", error.message);
    throw error;
  }
};

export default connectDB;
