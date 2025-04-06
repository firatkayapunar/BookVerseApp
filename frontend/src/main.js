import { createApp } from "vue";
import router from "./router/index.js";

import { createPinia } from "pinia";
import { useBookStore } from "./stores/bookStore.js";

import App from "./App.vue";

/*
FontAwesome’un ana kütüphanesini import ediyoruz.
Bu kütüphane başlangıçta BOŞTUR! (Hiçbir ikon içermez.)
Bu kütüphane bir "hafıza" (depo) gibidir, içine ikonları ekleriz.
Eğer bu satır olmazsa, Vue hangi ikonları kullanacağını bilemez!
*/
import { library } from "@fortawesome/fontawesome-svg-core";

/*
Sadece ihtiyacımız olan ikonları import ediyoruz.
Tüm ikonları import etmek yerine, sadece kullanacağımız ikonları ekleyerek performansı artırıyoruz.
*/
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

/* 
Seçtiğimiz ikonları FontAwesome’un library (hafızasına) ekliyoruz.
FontAwesome doğrudan ikonları kullanmamıza izin vermez, önce kütüphaneye eklememiz gerekir.
Eğer bu satır olmazsa, Vue içinde ikonları kullanamayız!
*/
library.add(faArrowLeft, faThumbsUp);

/*
FontAwesome’un Vue için özel component’ini import ediyoruz.
Bu component sayesinde Vue içinde <font-awesome-icon> etiketiyle ikonları gösterebiliriz.
Eğer bu component Vue uygulamasına tanıtılmazsa, ikonlar Vue içinde kullanılamaz.
*/
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const pinia = createPinia();

const bookStore = useBookStore(pinia);

bookStore.fetchBooks().then(() => {
  /*
  Vue uygulamasının root instance'ını (kök uygulama örneğini) oluşturuyoruz.
  createApp(), Vue 3'te uygulamayı başlatmak için kullanılan fonksiyondur. Buradaki "uygulamayı başlatmak" ifadesi, Vue framework’ünü aktive etmek, root component’i (genellikle App.vue) temel alarak component yapısını oluşturmak ve Vue’nun reactivity, lifecycle gibi çekirdek sistemlerini devreye sokmak anlamına gelir.
  Parametre olarak genellikle root component olan App.vue verilir.
  Bu instance üzerinden plugin'ler (örneğin Pinia, Vue Router) entegre edilir,
  global component'ler tanımlanır ve en sonunda DOM'a mount edilir.
  */
  const app = createApp(App);

  /*
    1. Pinia nedir? Vue 3'te neden kullanıyoruz?

    Pinia, Vue 3 için geliştirilmiş resmi bir state management (durum yönetimi) kütüphanesidir.
    "State", component'ler arasında ortak kullanılan veriler anlamına gelir. Örneğin: kullanıcı bilgisi, kitap listesi, sepet, tema tercihi gibi veriler.
    
    ****************

    2. createPinia() Ne İşe Yarar?

    const pinia = createPinia();
    Bu satır, bir Pinia instance'ı oluşturur.
    Bu instance, uygulamadaki tüm store'ların merkezi olarak yönetildiği yerdir.
    Bir nevi, "veri deposu merkezi" gibidir. Ama henüz Vue uygulaması bu yapıyı tanımaz.

    Örnek benzetme:
    Pinia bir alışveriş merkezidir. İçinde kitapçı, giyim mağazası gibi farklı store’lar vardır.
    Ama hepsinin girişi aynı ana kapıdandır: pinia.

    ****************

    3. useBookStore(pinia) – Store’a Vue başlamadan önce erişme

    const bookStore = useBookStore(pinia);
    Bu satır, store fonksiyonunu manuel olarak çağırır. Çünkü uygulama henüz app.use(pinia) satırına gelmedi — Vue, Pinia’yı henüz tanımıyor.
    Bu yüzden pinia instance’ı elle verilmek zorunda.
    Bu satır genellikle uygulama başlamadan önce store’dan veri çekmek için kullanılır.

    ****************

    4. bookStore.fetchBooks() – Veri alma ve Vue başlamadan önce hazırlık yapma

    bookStore.fetchBooks().then(() => {
        Vue başlatılır
    });
    Bu satır, store'dan kitapları alır ve Vue uygulaması başlamadan önce verileri hazırlar.
    Böylece sayfa açıldığında kullanıcı veriyi görür, boş ekranla karşılaşmaz.

    ****************

    3. app.use(pinia) ne işe yarar?
    Bu satır, Vue uygulamasına şunu der:
    "Ben artık merkezi bir state sistemi (Pinia) kullanacağım."
    Böylece Vue, tüm component’ler içinde store’lara erişilebileceğini bilir.
    Bu satır olmazsa: Vue uygulaması Pinia'yı tanımaz, store'lara erişemeyiz ve useBookStore() gibi fonksiyonlar arka planda bu instance’ı (pinia) bulamadığı için hata verir.
  */
  app.use(pinia);

  /*
    app.use(router)
    Bu satır, Vue Router’ı Vue uygulamasına entegre eder.
    Böylece Vue, routing sistemini tanır ve sayfa geçişlerini kontrol edebilir hale gelir.
    Kısacası: Vue ve Vue Router arasında bir haberleşme kurulur.

    <router-link> etiketi, sayfalar arasında geçiş yapmayı sağlar. 
    Örneğin:
    <router-link to="/books"> → URL değiştirilir ama sayfa yeniden yüklenmez (SPA mantığı).

    <router-view> etiketi ise "aktif olan route'a karşılık gelen component burada gösterilsin" anlamına gelir.
    Yani Vue Router, hangi component’in görünmesi gerektiğine karar verir ve bu component’i <router-view> içerisine otomatik olarak yerleştirir.

    Bu yapı sayesinde:
    - Sayfa geçişleri hızlı ve kesintisiz olur.
    - Vue component’leri URL’ye göre dinamik olarak yönetilir.
    - Vue ve Vue Router arasında tam bir entegrasyon sağlanır.
  */
  app.use(router);

  /* 
    Vue uygulamasına font-awesome-icon adında global bir component tanımlıyoruz.
    Bu sayede herhangi bir Vue component’i içinde <font-awesome-icon> etiketiyle ikonları doğrudan kullanabiliriz. Bu satır olmazsa, Vue bu component’i tanıyamaz ve render ederken hata verir.
    Ayrıca global olarak tanımlanan component’ler, tüm uygulama boyunca tekrar import edilmeden kullanılabilir.
  */
  app.component("font-awesome-icon", FontAwesomeIcon);

  app.mount("#app");
});
