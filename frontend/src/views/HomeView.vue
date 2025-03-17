<template>
    <section>
        <div class="container">
            HomeView Page
        </div>
    </section>

    <!-- <img :src="imageSrc" :alt="imageAlt"> -->
    <!-- <img v-bind:src="imageSrc" v-bind:alt="imageAlt"> -->

    <!-- 
    v-bind ile html attribute ile data propertysini bağlamış yani bind etmiş olduk. Yalnızca Html etiketlerine ait attributelarımızı mı biz bu şekilde bağlayabiliyoruz? Hayır! Bind işlemini component prop değerleri için de uygulayabiliriz. 
    Ayrıca v-bind ile " " içerisine js expression yazabiliriz. (<RouterLink v-bind:to="url"></RouterLink>)
    -->
</template>

<script>
export default {
    name: "HomeView",
    data() {
        return {
            // imageSrc: " ",
            // imageAlt: "example",
            // url: "/books"
        }
    }
}
</script>

<style lang="scss" scoped></style>