<!-- Carousel (Atlı Karınca) -->

<template>
    <!-- 
    position-relative
    Bu elemanın konumu normal akışta kalır (yani diğer elemanları etkilemeden yerinde durur),
    Ancak içindeki position: absolute olan elemanlar, konumlandırma referansı olarak bu relative elemanı baz alır.
    -->
    <div class="position-relative">
        <Transition name="fade" mode="out-in">
            <!-- 
            :key="selectedItem.imageUrl"

            Bu ifade, Vue'nun Virtual DOM diffing algoritmasını yönlendirmek için kullanılır.
            key değerinin değişmesi, Vue'ya "bu element tamamen değişti" bilgisini verir.
            Bu durumda Vue, ilgili DOM elementini yeniden kullanmak yerine onu DOM'dan kaldırır (unmount) ve yerine yeni
            bir DOM elementi ekler. (mount) Yani uygulamamızda selectedItem.imageUrl her değiştiğinde, Vue bu div’i DOM’dan tamamen kaldırır ve yerine yeni bir div oluşturur. Bu yaklaşım özellikle transition tabanlı animation'lar için faydalıdır çünkü `key` değişikliği sayesinde eski ve yeni elementler arasında gerçek bir DOM değişimi tetiklenir. 
            
            <Transition> component’i tam bu noktada devreye girer:
            - Vue, DOM’dan kaldırılacak olan mevcut elementi <Transition> üzerinden izler ve leave animation class’larını sırasıyla uygular. (örneğin: fade-leave-from, fade-leave-active, fade-leave-to)
            - Ardından yeni bir element DOM’a eklendiğinde yine <Transition> aracılığıyla enter animation class’ları uygulanır. (örneğin: fade-enter-from, fade-enter-active, fade-enter-to)
            - Bu animation class’ları CSS içinde tanımlanır ve elementin enter ve leave süreçlerine görsel transition efektleri eklenmesini sağlar.

            !!! mode="out-in"
            mode="out-in" kullanıldığında, önce mevcut element DOM'dan tamamen kaldırılır (leave animation tamamlanır), ardından yeni element DOM'a eklenir ve enter animation başlatılır.
            Bu sayede animation'lar üst üste binmeden, sıralı (sequential) şekilde çalışır ve çok daha akıcı bir kullanıcı deneyimi sunar.
            -->
            <div :key="selectedItem.imageUrl" class="position-relative">
                <!--
                object-fit: cover
                Görseli, bulunduğu alanın (kutu/çerçeve) tamamını dolduracak şekilde yerleştirir.
                Görselin en-boy oranı korunur, yani yamulma olmaz.
                Boşluk kalmaz, görsel alanın her yerine yayılır.
                Eğer görselin oranı alana uymuyorsa, kenarlarından taşan kısımlar otomatik olarak kırpılır.
                -->
                <img :src="selectedItem.imageUrl" class="w-100" :style="{ height: height, objectFit: 'cover' }">
                <!-- 
                custom-carousel-caption
                Bu stil, div'in arka planını yarı saydam siyah yapıyor. Böylece alttaki görselin üzerine yazılar daha
                okunaklı görünüyor. 

                position-absolute
                Bu sınıf sayesinde div, içinde bulunduğu en yakın position-relative ebeveyn elemana göre konumlandırılır.
                Bu sayede div, sayfanın normal akışından çıkar ve alttaki görselin üzerine yerleşir.

                top-0 start-0 bottom-0 end-0
                Bu 4 sınıf birlikte kullanıldığında div'i ebeveyn elementin dört kenarına (üst, alt, sol, sağ) tam
                yaslar. Yani div, üst div'in tüm alanını kaplıyor.
                
                !!! `justify-content-center` burada gereksiz çünkü zaten alt div `container` sınıfıyla hizalamayı sağlıyor. 
                -->
                <div
                    class="custom-carousel-caption position-absolute top-0 start-0 bottom-0 end-0 d-flex align-items-center text-light p-4 ">
                    <div class="container">
                        <h6 class="fw-bold text-uppercase" style="color:var(--secondary-color)">
                            {{ selectedItem.subtitle }}
                        </h6>
                        <h1 class="display-4">{{ selectedItem.title }}</h1>
                        <p class="lead">{{ selectedItem.description }}</p>
                    </div>
                </div>
            </div>
        </Transition>
        <!-- 
        custom-carousel-controls
        Bu style, mevcut ögeyi -22.5 px aşağıya kaydırır.
        
        position-absolute
        Bu sınıf sayesinde div, içinde bulunduğu en yakın position-relative ebeveyn elemana göre konumlandırılır.
        Bu sayede div, sayfanın normal akışından çıkar ve alttaki görselin üzerine yerleşir.
        
        d-flex
        d-flex, display: flex anlamına gelir.
        Elementin bir flex container (esnek kutu) olmasını sağlar.
        Bu sayede içinde bulunan child elementler (mesela <button>’lar) yan yana, kolay hizalanabilir ve esnek bir yapıya kavuşur.
       
        gap-2 (0.5rem (yani 8px))
        Flex kutusundaki child öğeler arasında boşluk bırakır.
        -->
        <div class="custom-carousel-controls position-absolute d-flex gap-2">
            <!-- 
            carousel-control-prev-icon & carousel-control-next-icon
            Slider için varsayılan ileri-geri simgelerini Bootstrap ikonları olarak ekler.
            -->
            <button v-on:click="prevItem" class="border-0 rounded-circle">
                <span class="carousel-control-prev-icon"> </span>
            </button>
            <button v-on:click="nextItem" class="border-0 rounded-circle">
                <span class="carousel-control-next-icon"> </span>
            </button>
        </div>
    </div>
</template>

<script>

export default {
    name: "CarouselWidget",
    data() {
        return {
            currentItemIndex: 0,
            selectedItem: null
        }
    },
    props: {
        items: {
            type: Array,
            required: true
        },
        height: {
            type: String,
            default: "100%"
        }
    },
    methods: {
        goToItem(offset) {
            const total = this.items.length;
            this.currentItemIndex = (this.currentItemIndex + offset + total) % total;
            this.selectedItem = this.items[this.currentItemIndex];
        },
        prevItem() {
            this.goToItem(-1);
        },
        nextItem() {
            this.goToItem(1);
        }
    },
    created() {
        this.selectedItem = this.items[0];
    }
}
</script>

<style scoped>
.custom-carousel-caption {
    background-color: rgba(0, 0, 0, .7);
}

.custom-carousel-controls {
    bottom: -22.5px;
}

.custom-carousel-controls button {
    background-color: var(--secondary-color);
    width: 50px;
    height: 50px;
    /* 
    transition, style değişikliklerinin yumuşak bir animation ile gerçekleşmesini sağlar.
    Burada özellikle hover anında gerçekleşen değişiklikler (renk değişimi ve büyüme) bu transation sayesinde ani değil, yumuşak olur.

    Parçalayalım:
    - all: Tüm değişen CSS özelliklerine transition uygula.
    - 0.3s: Transation süresi 0.3 saniyedir. (300 milisaniye)
    - ease: Başlangıçta yavaş, ortada hızlı, sonda tekrar yavaş olan bir transation eğrisi kullanılır. (default easing türü)
    */
    transition: all 0.3s ease;
}

.custom-carousel-controls button:hover {
    background-color: var(--primary-color);
    /* 
    transform, bir elementin şeklini, pozisyonunu veya ölçeğini değiştirmeye yarar.
    scale(1.1) ise genişliği ve yüksekliği %10 artırır. Bu sadece görüntüde olur, gerçek boyut değişmez (layout etkilenmez). Bu efekt, kullanıcıya “etkileşime geçtin” hissi verir.
    */
    transform: scale(1.1);
}

/* Transition Animation sınıfları */

.fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: all 1s ease;
}

.fade-enter-to {
    opacity: 1;
}
</style>