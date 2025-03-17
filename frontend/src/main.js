import { createApp } from "vue";
import router from "./router/index.js";
import App from "./App.vue";

// FontAwesome’un ana kütüphanesini içe aktarıyoruz.
// Bu kütüphane başlangıçta BOŞTUR! (Hiçbir ikon içermez.)
// Bu kütüphane bir "hafıza" (depo) gibidir, içine ikonları ekleriz.
// Eğer bu satır olmazsa, Vue hangi ikonları kullanacağını bilemez!
import { library } from "@fortawesome/fontawesome-svg-core";

// Sadece ihtiyacımız olan ikonları içe aktarıyoruz.
// Tüm ikonları çağırmak yerine, sadece kullanacağımız ikonları ekleyerek performansı artırıyoruz.
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

// Seçtiğimiz ikonları FontAwesome’un library (hafızasına) ekliyoruz.
// FontAwesome doğrudan ikonları kullanmamıza izin vermez, önce kütüphaneye eklememiz gerekir.
// Eğer bu satır olmazsa, Vue içinde ikonları kullanamayız!
library.add(faArrowLeft, faThumbsUp);

// FontAwesome’un Vue için özel bileşenini ekliyoruz.
// Bu bileşen sayesinde Vue içinde <font-awesome-icon> etiketiyle ikonları gösterebiliriz.
// Eğer bu bileşeni tanıtmazsak, Vue içinde ikonları kullanamayız!
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

// Vue içinde font-awesome-icon adında yeni bir bileşen oluşturuyoruz.
// Bu sayede Vue içinde <font-awesome-icon> etiketiyle ikonları gösterebiliriz.
// Eğer bu satır olmazsa, Vue ikon bileşenini tanımaz ve hata verir!
// Eğer bir bileşeni global olarak tanımlarsak, onu Vue içinde herhangi bir bileşende tekrar import etmemize gerek kalmaz.
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.mount("#app");
