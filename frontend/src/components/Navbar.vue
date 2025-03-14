<template>
    <!-- 
    Medium ekrana kadar bu navbar'ın yatayda kalmasını istiyorum. 
    -->
    <nav class="navbar navbar-expand-md custom-nav">
        <div class="container">
            <!-- 
            {{ brandName }} ifadesi, Vue.js'in Mustache (bıyık) sözdizimini kullanır.
            Bu sözdizimi, template içinde veri bağlamayı (data binding) sağlar ve brandName değişkeninin değerini
            gösterir.

            Vue.js içinde Mustache sözdizimi sadece metin içeriği için kullanılır.
            İçinde basit JavaScript ifadeleri kullanılabilir, örneğin: {{ brandName.toUpperCase() }}.
            Ancak, fonksiyon çağırma, if-else gibi koşullar veya döngüler desteklenmez.
            
            Not: HTML  attribute'ları (örneğin, class, src, href) içinde Mustache kullanılamaz. Bunun yerine v-bind
            direktifi (:href="link") kullanılmalıdır. 
            -->
            <RouterLink class="navbar-brand" v-bind:to="{ name: 'home' }">{{ brandName }}</RouterLink>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <!-- 
                    { name: 'home' } yazıldığı için, Vue Router'da ismi "home" olan rotaya yönlendirme yapar. 
                    -->
                    <RouterLink class="nav-link" v-bind:to="{ name: 'home' }">Home</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" v-bind:to="{ name: 'books' }">Books</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" v-bind:to="{ name: 'contact' }">Contact Us</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" v-bind:to="{ name: 'login' }">Login</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" v-bind:to="{ name: 'register' }">Register</RouterLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {
            brandName: "BookVerse"
        }
    }
}
</script>

<style scoped>
.custom-nav {
    background-color: #063547;
    padding: 15px 0;
}

.navbar-brand {
    padding: 0;
    margin: 0;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
}

.nav-link {
    padding: 10px 15px !important;
    color: #fff;
    text-align: center;
}

.nav-link:hover {
    color: #44b89d;
}

/* index.js içerisinde router nesnemizin linkActiveClass property değerine active-link verdik. */
.active-link {
    color: #44b89d !important;
}
</style>