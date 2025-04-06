
<h1 align="center"> BookVerseApp - Kitap İnceleme Ve Değerlendirme Uygulaması</h1>

Bu proje, **MEVN (MongoDB, Express.js, Vue.js, Node.js) stack** mimarisi ile geliştirilmiş **ölçeklenebilir bir kitap inceleme ve değerlendirme uygulamasıdır**. Kullanıcıların kitapları incelemesine, puan vermesine ve kitaplarla ilgili içerikleri keşfetmesine olanak tanır.

---

## 🚀 Proje Amacı

Bu proje, modern bir **Vue 3 tabanlı kullanıcı arayüzü** ve güçlü bir **API mimarisi** ile **hızlı, akıcı ve yüksek performanslı** bir deneyim sunmaktır.

📌 **Proje hâlâ geliştirilmektedir.** Yeni özellikler eklenmeye devam ediyor ve sistemin daha stabil hale gelmesi için iyileştirmeler yapılıyor.

🔹 **Arin Yazılım MEVN Serisini takip ederek geliştirme sürecimi ilerletiyorum.**  

---

## 📌 **Proje Ekran Görüntüleri**

### Anasayfa
![99](https://github.com/user-attachments/assets/9e7a59ba-6cb1-4492-9590-c3b8494cb925)

### Kitaplar
![1](https://github.com/user-attachments/assets/b637fad2-6a69-453a-a150-8c6bba7220ed)

---

<h2>📂 Proje Yapısı</h2>

<pre>
📦 BookVerseApp
│
├── 📂 backend/                       
│   ├── 📂 config/
│   │   └── 🛠 db.js                   
│   ├── 📂 controllers/
│   │   ├── 🧠 authController.js      
│   │   └── 🧠 bookController.js      
│   ├── 📂 models/
│   │   ├── 🧬 Book.js               
│   │   └── 🧬 User.js               
│   ├── 📂 routes/
│   │   ├── 🚏 authRoute.js           
│   │   └── 🚏 bookRoute.js           
│   ├── 📂 utils/
│   │   └── 🛠 index.js               
│   ├── 📄 .env                       
│   ├── 📄 .gitignore                 
│   ├── 📄 package.json                
│   ├── 📄 package-lock.json         
│   └── 📄 server.js                
│
├── 📂 frontend/                
│   ├── 📂 .vscode/               
│   ├── 📂 src/                       
│   │   ├── 📂 assets/
│   │   │   ├── 📁 images/            
│   │   │   └── 🎨 styles.css      
│   │   ├── 📂 components/
│   │   │   ├── 📂 widgets/           
│   │   │   │   ├── 🎠 CarouselWidget.vue   
│   │   │   │   └── 🔢 PaginationWidget.vue   
│   │   │   ├── 📄 BookDetailView.vue     
│   │   │   ├── 📄 BookItem.vue              
│   │   │   ├── 📄 BookList.vue              
│   │   │   ├── 📄 Navbar.vue              
│   │   │   ├── 📄 SectionHeader.vue        
│   │   │   └── 📄 TheFooter.vue         
│   │   ├── 📂 router/
│   │   │   └── 🧭 index.js          
│   │   ├── 📂 stores/
│   │   │   └── 🗂 bookStore.js       
│   │   ├── 📂 views/
│   │   │   ├── 🏠 HomeView.vue     
│   │   │   ├── 📚 BooksView.vue      
│   │   │   ├── 📨 ContactView.vue    
│   │   │   ├── 🔐 LoginView.vue     
│   │   │   └── 📝 RegisterView.vue   
│   │   ├── 🎨 App.vue               
│   │   └── 🚀 main.js               
│   ├── 📄 .gitignore               
│   ├── 📄 index.html              
│   ├── 📄 package.json            
│   └── 📄 package-lock.json      
</pre>
