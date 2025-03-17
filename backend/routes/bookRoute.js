import express from "express";

/*
Bu satır, "../controllers/bookController.js" dosyasında dışa aktarılan (export edilen) tüm öğeleri tek bir nesne altında toplar. 
Yani:
Dosyada named export olarak dışa aktarılan her şey, bookController nesnesinin bir özelliği haline gelir.
*/
import * as bookController from "../controllers/bookController.js";

// Express'in router'ını oluşturuyoruz. Router, gelen isteğin URL'sini ve HTTP metodunu kontrol eder ve uygun controller fonksiyonunu çalıştırır.
const router = express.Router();

/*
  Önemli Not:
  Bu router bir "alt yönlendirici" olarak kullanılır. Yani, bu dosyadaki "/" ifadesi, ana uygulamadaki belirlediğimiz üst URL ile birleşir.
  
  Örneğin, eğer bu router'ı ana uygulamada şu şekilde kullanırsak:
  app.use("/api/v1/books", bookRoutes);
  
  O zaman:
  - router.get("/") aslında "/api/v1/books" adresine gelen GET isteğini temsil eder.
  - router.post("/") aslında "/api/v1/books" adresine gelen POST isteğini temsil eder.
*/

// Eğer "/api/v1/books" URL'sine GET isteği gelirse, bookController.getAllBooks fonksiyonu çalışır.
router.get("/", bookController.getAllBooks);

// Eğer "/api/v1/books" URL'sine POST isteği gelirse, bookController.createBook fonksiyonu çalışır.
router.post("/", bookController.createBook);

export default router;
