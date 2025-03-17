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
    <TheFooter />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import TheFooter from '@/components/TheFooter.vue';

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
        Navbar: Navbar,
        TheFooter: TheFooter
    }
}
</script>

<style>
@import '../src/assets/styles.css';
</style>
