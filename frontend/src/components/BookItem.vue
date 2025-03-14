<template>
    <!-- 
    position-relative
    Kartı relative konumlandırır.
    Bunun sebebi, içindeki öğelerden position-absolute kullanılan öğelerin konumunu belirlemek içindir. 
    -->
    <div class="card border-0 shadow position-relative">
        <!-- 
        card-img-top
        Kartın üstüne resim ekler. 
        -->
        <img src="../../template/images/b1.jpg" class="card-img-top">
        <!-- 
        card-body
        Kart içeriğini kapsayan div’dir.
        -->
        <div class="card-body">
            <div class="auth-box">
                <!--
                py-1
                Dikey boşluk (padding-y) ekler (üst ve alt padding = 1 birim).

                px-3
                Yatay boşluk (padding-x) ekler (sağ ve sol padding = 3 birim).
                
                rounded-pill
                Kenarları oval (yuvarlak) hale getirir. 
                -->
                <span style="background-color: #063547;" class="py-1 px-3 text-white rounded-pill">
                    {{ book.author }}
                </span>
            </div>
            <!-- 
            fw-semibold
            Yazı kalınlığını (font-weight) yarı kalın (semibold) yapar.
            -->
            <h5 class="card-title mt-3 fw-semibold"> {{ book.name }}</h5>
            <p class="card-text">
                {{ truncatedText }}
            </p>
            <!-- 
            d-flex (Flexbox Kullanımı)
            Bu sınıf, öğeyi Flexbox konteyneri haline getirir. (display:flex)
            Öğeleri yatay veya dikey olarak hizalamanı sağlar.

            justify-content-between (Öğeleri En Uçlara Yay)
            Bu sınıf, Flexbox ile öğeleri yatay eksende hizalar.
            İçindeki öğeleri iki uca iter.

            align-items-center
            Eğer farklı yüksekliklere sahip öğeler varsa, onları dikey olarak da aynı hizada tutmamız gerekir.
            İşte burada align-items-center devreye giriyor. Eğer içinde bulunan öğelerin biri büyük, biri küçükse, align-items-center kullanmazsan, biri yukarıda, diğeri aşağıda durabilir. 
            -->
            <div class="d-flex justify-content-between align-items-center">
                <!-- 
                card-link
                Bootstrap’in link tasarımını uygular. 
                -->
                <a href="#" class="card-link">Read More</a>
                <!--
                badge
                Bootstrap’in küçük etiket (badge) tasarımını uygular.
                -->
                <p style="background-color: #063547;" class="py-1 px-2 text-white badge mb-0">
                    {{ book.uploadDate }}
                </p>
            </div>
        </div>
        <!-- 
        position-absolute
        Normalde HTML öğeleri akış içinde sıralanır (yani bir div diğerinin altına gelir). 
        position-absolute kullanıldığında, bu öğe artık akıştan çıkar ve bir üst kapsayıcıya göre bağımsız olarak konumlanır. 
        Önemli Not:
        Bir öğe position-absolute ile konumlandırılmışsa, üst kapsayıcısının position: relative; olması gerekir.

        top:0
        Bu sınıf, öğeyi üst kenara yapıştırır.
        Yani, öğenin üst kenarı, kapsayıcının üst kenarı ile hizalanır.

        start-100 (Sol Başlangıç Noktasını %100'e Kaydır):
        start kelimesi, left anlamına gelir.
        100 değeri, öğeyi kapsayıcının sol kenarından %100 uzağa iter.
        Yani, öğe artık tamamen kapsayıcının dışına taşmış olur.

        translate-middle (Tam Ortaya Getir):
        Normalde start-100 öğeyi kartın dışına çıkarır, ama tam konum istenildiği gibi olmaz.
        translate-middle, öğeyi hem yatay hem de dikey olarak %50 geri kaydırır ve tam ortalar.
        -->

        <!--
        Vue, computed property'leri (hesaplanmış özellikleri) otomatik olarak takip eder.
        Eğer computed property içinde kullanılan bir değişken (book.rating gibi) değişirse, Vue bu fonksiyonu otomatik
        olarak yeniden çalıştırır.
        Bunu manuel olarak çağırmamıza gerek yoktur, Vue kendisi günceller.

        Ayrıca, Vue template içinde data, computed ve methods gibi özellikleri otomatik bağlar.
        Bu sayede, this. yazmadan doğrudan değişkenleri veya fonksiyonları kullanabiliriz.
        Örneğin, ratingBadgeClass adlı bir computed property'yi doğrudan template içinde çağırabiliriz.
        -->
        <span :class="ratingBadgeClass"
            class="position-absolute top-0 start-100 translate-middle p-2 text-light rounded-circle border border-2 border-light">
            {{ book.rating }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'BookItem',
    props: {
        book: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        ratingBadgeClass() {
            if (this.book.rating > 7) {
                return 'bg-success'
            }
            else if (this.book.rating > 4) {
                return 'bg-warning'
            }
            else {
                return 'bg-danger'
            }
        },
        truncatedText() {
            if (this.book.description.length > 80) {
                return this.book.description.slice(0, 80) + '...';
            }

            return this.book.description;
        }
    }
}
</script>

<style scoped>
.auth-box {
    margin-top: -30px;
}

.card-text {
    min-height: 100px;
}
</style>