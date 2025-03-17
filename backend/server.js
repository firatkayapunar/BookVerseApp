// CommonJS
// const express = require("express");

import express from "express";
import bookRoute from "./routes/bookRoute.js";
import connectDB from "./config/db.js";

const app = express();
const port = 3000;

/*
İstek Gönderildiğinde:
- Express, gelen isteğin türüne bakar.
- Eğer JSON formatında bir veri geliyorsa (Content-Type: application/json), express.json() devreye girer.
- express.json() middleware’i, gelen JSON verisini bir JavaScript nesnesine çevirir ve req.body içine yerleştirir.

Eğer app.use(express.json()); kullanılmazsa:
- Express JSON verisini okuyamaz.
- req.body boş (undefined) olur.
*/
app.use(express.json());

/*
app.use("/api/v1/books", bookRoute), Express uygulamasına alt route'ları bağlamak için kullanılır. 
Bu kod şu anlama gelir:

1. Ana Yolun (Base URL) Belirlenmesi
/api/v1/books → Bu, uygulamadaki kitaplarla ilgili işlemleri yönetecek ana URL'dir.
Yani, bu router'ı kullanarak kitaplarla ilgili isteklere yönlendirme yapılır.

2. Router'ın Kullanılması
bookRoute burada bir router dosyasıdır (örneğin routes/bookRoute.js).
İçinde kitaplarla ilgili farklı işlemleri yöneten GET, POST gibi route’lar vardır.
Express, /api/v1/books adresine gelen istekleri bookRoute içindeki yönlendirmelere aktarır.
*/
app.use("/api/v1/books", bookRoute);

try {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is listening port:${port}`);
  });
} catch (error) {
  // Node.js, "process.exit(1);" gördüğünde şu adımları sırasıyla uygular:
  // - Node.js, programın çalışmasını hemen keser.
  // - Geri kalan hiçbir kod çalıştırılmaz.
  process.exit(1);
}
