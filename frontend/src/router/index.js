import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import BooksView from "@/views/BooksView.vue";
import BookDetailView from "@/components/BookDetailView.vue";
import ContactView from "@/views/ContactView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

// SPA (Single Page Application)
// Sanki tek bir sayfa üzerinde işlem yapıyormuşuz gibi bir yapı bize sunar.

// Neden RouterView SPA İçin Yeterli?
// Sayfa yenilenmeden bileşenleri değiştirir.
// Tarayıcı adres çubuğundan (/books, /about gibi) yönlendirme yapıldığında Vue Router bunu algılar ve ilgili bileşeni render eder.
// Gerçek sayfa yüklemesi (full refresh) olmaz, Vue sadece RouterView içeriğini değiştirir.

// RouterView, şu şekilde çalışır:
// Vue Router, URL’ye karşılık gelen bileşeni belirler.
// Vue’ya bu bileşeni yüklemesini söyler.
// Vue, RouterView içinde bu bileşeni oluşturur ve DOM’a ekler.

//  O Zaman RouterLink Ne İşe Yarıyor?
//  Kullanıcıların sayfa değiştirmesini kolaylaştırır.
//  Sayfalar arası yönlendirmeleri href yerine Vue Router ile yapar.
//  Klasik <a href=""> yerine kullanılır, çünkü sayfa yenilenmez!

// Özet
// Eğer kullanıcı elle adres çubuğundan /books yazarsa bile RouterView ile bileşen değişir, SPA çalışır.
// Ama bir buton veya link olmazsa, kullanıcı başka bir sayfaya gitmek için her seferinde adres çubuğunu değiştirmek zorunda kalır.

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/books",
    name: "books",
    component: BooksView,
  },
  {
    path: "/books/:id",
    name: "book-detail",
    component: BookDetailView,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: "active-link",
});

export default router;
