import { createRouter, createWebHistory } from "vue-router";

import BooksView from "@/views/BooksView.vue";
import BookDetailView from "@/components/BookDetailView.vue";
import ContactView from "@/views/ContactView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

/*
<router-view> nedir, ne işe yarar?
- <router-view>, Vue Router’ın aktif route’a göre hangi component’in gösterileceğine karar verdiği ve Vue’nun bu component’i ekranda render etmek için kullandığı özel bir Vue component’idir.
- Aktif route’a karşılık gelen component yalnızca bu alanın içinde render edilir.
- Sayfa yapısının geri kalanı sabit kalır, sadece bu bölge dinamik olarak güncellenir.

<router-link> neden kullanılır?
- <router-link>, Vue Router ile entegre çalışan bir yönlendirme (navigation) component’idir.
- Kullanıcıların sayfa geçişlerini sayfa reload olmadan gerçekleştirmesini sağlar.
- <a href="..."> yerine kullanılır çünkü:
  - SPA davranışı korunur.
  - Sayfa yeniden yüklenmez.
  - Aktif route’a göre özel CSS class (örn. "active-link") otomatik eklenebilir.

Peki kullanıcı elle URL yazarsa ne olur?
- Aynı mantık korunur. Örneğin kullanıcı tarayıcıya "/books" yazarsa:
  - Tarayıcı URL'yi değiştirir.
  - Vue Router bu değişikliği algılar.
  - "/books" path’ine karşılık gelen component (örneğin BooksView) belirlenir.
  - Vue, bu component’i <router-view> içine render eder.
  - Sayfa reload olmadan içerik güncellenmiş olur.

SPA (Single Page Application) nasıl işler?
- Sayfa yalnızca ilk kez yüklendiğinde sunucudan gelir.
- Kullanıcı farklı sayfalara geçtikçe, Vue Router devreye girer ve yalnızca ilgili component’i <router-view> içine render eder.
- Sayfa yeniden yüklenmez, bu da hızlı ve akıcı bir deneyim sağlar.
*/

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
