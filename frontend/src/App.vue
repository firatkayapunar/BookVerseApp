<!-- Aşağıdaki gibi bölümlerden oluşan vue dosyaları Single File Component olarak isimlendiriliyor. -->
<template>

    <!-- <nav-bar /> -->
    <!-- <Navbar></Navbar> -->
    <!-- <nav-bar></nav-bar> -->
    <Navbar />

    <!-- 
    Reactivity örneği 
     
    <p>
        {{ message }}
    </p>

    <button @click="count++">
        Count
    </button>

    <p>{{ count }}</p>

    <p v-if="isVisible">
        Hello.
    </p>
    -->

    <!-- **************************************** -->

    <!-- <RouterView />'in görevi, mevcut route'a (URL'ye) bağlı olarak ilgili bileşeni ekrana yerleştirmektir. -->
    <!-- Global olarak vue uygulamasına import edilmiştir. Ondan dolayı burada import etmedik. Global olarak erişebiliyoruz. -->
    <RouterView />

</template>

<script>
import NavBar from '@/components/Navbar.vue';

// OPTIONS API
// Vue'de Options API, bileşenin yapılandırmasını bir nesne olarak tanımlar.
// Bu yapı, bileşenin içindeki farklı bölümleri ayrı seçenekler (options) olarak tanımladığı için "Options API" olarak adlandırılır.
// Vue'de createApp(App) çağrıldığında Vue, bileşeni (App) analiz eder ve Options API'ye göre belirli anahtarları (name, components, data, methods vb.) arar. Bu anahtarlar Vue tarafından "özel tanımlı" (reserved keywords) olarak kabul edilir.

export default {
    name: "App",
    data() {
        // Reactivity (Olaylar gerçekleştikten sonra tepki verme)
        // Elimizdeki veriye göre kullanıcı arayüzünün değişmesi, kullanıcı arayüzüne göre elimizdeki verinin değişmesi anlamına geliyor.
        return {
            // message: "Hello",
            // count: 0,
            // isVisible: true
        }
    },
    components: {
        Navbar: NavBar
    }
}
</script>

<style>
/* CSS içerisinde bir başka CSS dosyasını içe aktarmak için @import kullanılır. */
@import 'bootstrap/dist/css/bootstrap.min.css';
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');

html,
body {
    font-family: 'Mulish', sans-serif;
}

a {
    text-decoration: none;
}
</style>
