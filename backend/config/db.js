/*
dotenv modülünün config() fonksiyonu, .env dosyasını okur, içindeki değişkenleri ayrıştırır ve
process.env nesnesine ekler. Böylece uygulama içinde environment değişkenlere process.env.VARIABLE_NAME şeklinde erişilebilir. 
process.env, Node.js'in global nesnelerinden biridir ve Express.js dahil tüm Node.js projelerinde kullanılabilir. Aslında Express.js projesi de bir Node.js projesidir. Neden mi? Çünkü Express.js, Node.js üzerinde çalışan bir web framework'üdür.
*/

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
  try {
    // await kullanılan satırda fonksiyon duruyor gibi görünse de, aslında arka planda event loop sayesinde asenkron çalışmaya devam eder. Yani buradaki await, sadece bu satırın tamamlanmasını beklerken diğer işlemleri engellemez.
    await mongoose.connect(process.env.MONGODB_URI);

    // Bağlantı başarılı olduğunda konsola bilgi verilir.
    console.log("Mongo DB connection has been established!");
  } catch (error) {
    // Bağlantı başarısız olursa hata yakalanır ve mesaj yazdırılır.
    console.log("Mongo DB connection has failed.", error.message);

    // Hata üst katmana fırlatılır. (örneğin bu fonksiyonu çağıran başka bir yer varsa oraya bildirilir.)
    throw error;
  }
};

// connectDB fonksiyonu, başka dosyalarda da kullanılabilmesi için dışa aktarılır.
export default connectDB;

