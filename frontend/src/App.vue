<!-- 
Bu dosya bir Vue Single File Component'tir.
Vue'de her component `.vue` uzantısıyla yazılır ve üç temel bölümden oluşur:
<template>, <script>, <style>
-->

<!-- 
<template> bloğu, component'in kullanıcı arayüzünü (UI) tanımlar. Yani bu bölüm, sayfada görünmesini istediğimiz HTML benzeri yapıları içerir.
-->
<template>
    <!--
    Navbar component'i burada sayfanın üst kısmına yerleştirilmiştir.
    Vue'de bir component, HTML etiketi gibi kullanılabilir.

    Aşağıdaki tüm kullanımlar geçerlidir, camelCase veya kebab-case fark etmez:
    <Navbar />, <Navbar></Navbar>, <nav-bar />, <nav-bar></nav-bar>

    Navbar /> en sade ve modern kullanım şeklidir.
    -->
    <Navbar />

    <!-- 
    <RouterView /> component'i, vue-router kütüphanesi tarafından sağlanır.
    Görevi, aktif route'a (URL'ye) bağlı olarak doğru component'i Vue vasıtasıyla ekranda göstermektir.
      
    Örneğin kullanıcı `/about` adresine giderse, <RouterView /> içinde `About.vue` component’i gösterilir.

    Not:
    - <RouterView /> global olarak Vue uygulamasına tanıtıldığı için import etmeye gerek yoktur. Vue Router projeye eklendiğinde otomatik olarak erişilebilir hale gelir.
    -->
    <RouterView />

    <!-- Sayfanın alt kısmında gösterilecek olan Footer component -->
    <TheFooter />

    <!--
    Vue'nun reactivity sistemi, veri (state) değiştiğinde otomatik olarak DOM'u günceller.
    Yani kullanıcı bir butona bastığında veya veri değiştiğinde, Vue ilgili yeri otomatik olarak tekrar render eder.
  
    Örneğin:
    <p>{{ message }}</p>
    <button @click="count++">Count</button>
    <p>{{ count }}</p>
    <p v-if="isVisible">Hello.</p>
  
    Açıklamalar:
    – {{ message }} ifadesi, Vue'deki veriyi DOM üzerinde göstermek için kullanılan Mustache (bıyık) syntax örneğidir.
    – @click ifadesi, bir event listener tanımlar. v-on:click ifadesinin kısaltmasıdır.
    – v-if ifadesi, koşula bağlı olarak bir DOM öğesinin oluşturulmasını sağlar. Şart sağlanmazsa öğe hiç eklenmez.
    -->
</template>

<!-- 
<script> bloğu, component'in mantıksal tarafını tanımlar.

Burada:

- Diğer component'ler import edilir.

- Reactive veriler tanımlanır. (data)

- Event fonksiyonları tanımlanır. (methods)

- Hesaplanan özellikler tanımlanır. (computed) 
!!! Computed, reactive verilere bağlı olarak otomatik güncellenen özelliklerdir. Değerleri önbelleğe alınır ve yalnızca bağımlı oldukları veriler değiştiğinde yeniden hesaplanırlar.

- Component lifecycle hooks fonksiyonları tanımlanabilir. 
-->

<script>
/* 
Vue'de component kullanmak için önce onu import etmemiz gerekir.
@ işareti genellikle src klasörünü temsil eden bir alias’tır ve bu alias vite.config.js dosyasında tanımlanır.*/
import Navbar from '@/components/Navbar.vue'
import TheFooter from '@/components/TheFooter.vue'

/* 
Vue'de component oluşturmanın iki ana yöntemi vardır:

1. Options API
Bu örnekte olduğu gibi, component'ler object (nesne) tabanlı bir yapı ile tanımlanır. Ayrıca Options API'de Vue belirli anahtar kelimeleri (reserved keywords) otomatik olarak tanır:
- name, data, components, methods, computed, watch, mounted vs.

2. Composition API
Vue 3 ile birlikte gelen setup() fonksiyonu kullanılarak tanımlanır.
*/

export default {
    // Component'in adı. Bu, Vue DevTools’ta görünür.
    name: "App",
    // data() fonksiyonu, component’in başlangıç state’ini (verilerini) tanımlar ve bir JavaScript nesnesi döner. Vue, bu nesneyi alır ve Proxy ile sararak reactive hale getirir.
    data() {
        return {
            /*
                Aşağıdaki örnek değişkenler, reactivity sistemine dahildir.
    
                message: "Hello",      => Basit bir string (metin) verisi
                count: 0,              => Sayı (number) verisi - kullanıcı etkileşimiyle değişir
                isVisible: true        => Boolean veri - DOM üzerinde göster/gizle kontrolü için
            */
        }
    },
    // Bu component içinde kullanılacak component'leri burada tanımlarız. Tanımlanan component'ler <template> kısmında kullanılabilir hale gelir.
    components: {
        Navbar,
        TheFooter
    }
    // Gerekirse burada methods, computed, watch, lifecycle hooks gibi diğer Options API özellikleri de tanımlanabilir.
}
</script>

<style>
/* 
<style> bloğu, component'e ait style veya global styles tanımlar.
Eğer "scoped" eklersek, style sadece bu component'e uygulanır.

Aşağıda global style dosyamızı import ettik. Bu style tüm uygulamaya etki eder.
*/
@import '../src/assets/styles.css';
</style>
