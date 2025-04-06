/*
Express.js Nedir?
Express.js, Node.js üzerinde çalışan, sunucu tarafı (backend) uygulamaları geliştirmek için kullanılan hızlı, minimalist ve esnek bir web framework'üdür.

Node.js’in yerleşik "http" modülü üzerine kuruludur:
- HTTP request ve response'larını kolayca yönetir.
- Express.js'in kendisi bir web sunucusu değildir; sunucu görevini Node.js'in "http" modülü üstlenir. Sadece "http" modülü kullanılarak da Node.js ile web uygulamaları geliştirilebilir. Ancak bu yaklaşımda route yönetimi, middleware kullanımı ve veri dönüşümleri manuel olarak yapılmalıdır. Bu nedenle pratik değildir ve genellikle tercih edilmez.

Hızlı ve modüler uygulama geliştirme:
- Basit ve okunabilir bir routing (yönlendirme) mekanizması sunar.
- Middleware entegrasyonu sayesinde request ve response süreçlerini kolayca yönetmenizi sağlar.
- JSON verilerini otomatik olarak parse eder; bu da veri işlemlerini oldukça pratik hâle getirir.

Özet Karşılaştırma:
- Node.js + HTTP modülü => Basit projeler için uygundur, ancak büyük projelerde karmaşıklık yaratabilir.
- Node.js + HTTP modülü + Express.js => Projeleri daha hızlı, modüler, yönetilebilir ve bakımı kolay hâle getirir.
*/

import express from "express";
import bookRoute from "./routes/bookRoute.js";
import authRoute from "./routes/authRoute.js";
import connectDB from "./config/db.js";
import cors from "cors";

/*
Express, Node.js ile web uygulamaları geliştirmek için kullanılan popüler bir framework’tür demiştik.

Aşağıdaki `express()` çağrısı ile bir Express uygulaması oluşturuyoruz. Bu `app` nesnesi, gelen istekleri (örneğin kullanıcı tarayıcıdan bir sayfa istediğinde) dinler, onları işler ve uygun cevabı döner.

Bir benzetme yaparsak:
- Bu `app`, bir restoranın giriş kapısı gibidir. Müşteriler bu kapıdan girer (istek yapar), garsonlar (route/controller) siparişi alır, mutfakta işlem yapılır (veritabanı vs), sonra yemek (cevap) müşteriye gelir.
*/
const app = express();

/*
Port nedir?
Bilgisayarımızda birden fazla uygulama aynı anda internete bağlanabilir (örneğin Spotify, WhatsApp, tarayıcı veya VS Code). Gelen verilerin doğru uygulamaya ulaşması için her uygulamanın kendine özel bir kapısı (port) vardır. Bizim uygulamamız "3000" numaralı porttan hizmet veriyor olacak.

Bu şu anlama geliyor:
- Kullanıcı tarayıcıdan http://localhost:3000 adresine gittiğinde, bilgisayarımızdaki 3000 numaralı porttan gelen istek önce Node.js tarafından karşılanır ve ardından Express.js uygulamamız tarafından işlenerek kullanıcıya gerekli yanıt gönderilir.
*/
const port = 3000;

// Bu kod parçacığı, bir Express.js uygulamasında CORS (Cross-Origin Resource Sharing) yapılandırması yapar. Yani: "Hangi adresler (origin) benim backend'ime istek atabilir?" sorusunun cevabını burada belirtiyoruz.
const corsOptions = {
  // Bu, sadece http://localhost:5173 (Vue) adresinden gelen isteklerin bu backend'e erişmesine izin verildiğini belirtir.
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/books", bookRoute);
app.use("/api/v1/auth", authRoute);

try {
  // connectDB() fonksiyonu, veritabanı bağlantısını kurar. Bağlantı başarılı ise, app.listen() ile sunucu belirtilen portta dinlemeye başlar. Hata durumunda, process.exit(1) çağrılarak uygulama sonlandırılır.
  await connectDB();

  /*
    Express.js uygulamamızda `app.listen(3000, ...)` ifadesini kullandığımızda aşağıdaki adımlar gerçekleşir.
      
      1. TCP Port Açma Talebi
      Node.js, yerleşik http modülü üzerinden işletim sistemine 3000 numaralı portu açma talebinde bulunur.

      2. İşletim Sistemi Onayı
      İşletim sistemi, bu talebi inceler; eğer 3000 numaralı port başka bir uygulama tarafından kullanılmıyorsa, portu açar ve Express.js uygulamamıza tahsis eder.
  
      3. HTTP İsteklerinin Yönlendirilmesi
      Bu noktadan itibaren 3000 numaralı porta gelen tüm HTTP istekleri önce Node.js tarafından karşılanır ve ardından Express.js uygulamamıza aktarılır. Express.js, kendisine tanımlanmış olan route'lar (rotalar) ve middleware'ler aracılığıyla bu istekleri işler, gerekli yanıtları oluşturur ve kullanıcıya gönderir. Böylece Express.js, Node.js üzerinden gelen HTTP trafiğini etkin bir şekilde yönetmiş olur.
  */
  app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
  });
} catch (error) {
  // Node.js, "process.exit(1);" gördüğünde programın çalışmasını hemen keser ve geri kalan hiçbir kod çalıştırılmaz.
  process.exit(1);
}
