<template>
    <section class="full-section-height">
        <div class="container">
            <form v-on:submit="submitForm($event)">
                <div class="row justify-content-center">
                    <div class="col-md-6 col-8 mb-3">
                        <label for="username" class="form-label">Username</label>
                        <!-- 
                        Two-Way Data Binding sağlamak için Vue'nun sunduğu iki farklı yöntemi kullanabiliriz.

                        Geleneksel yöntem:
                        <input type="text" class="form-control" id="username" name="username" :value="formData.username" v-on:input="updateUserName($event)" required> 
                        Bu yöntemde, `:value` ile input'un değerini bağlıyoruz ve her `input` event'inde `updateUserName` metodunu çağırarak `formData.username` değerini manuel olarak güncelliyoruz.

                        Vue’nun sunduğu `v-model` direktifi:
                        <input type="text" class="form-control" id="username" name="username" v-model="formData.username" required>
                        `v-model` kullanarak Two-Way Data Binding işlemini daha basit hale getiriyoruz.
                        Bu sayede input alanına girilen değer otomatik olarak `formData.username` değişkenine aktarılıyor.
                        Ekstra event bağlamaya gerek kalmadan veri senkronizasyonu sağlanıyor. 
                        -->

                        <!-- 
                        `lazy` modifier (değiştirici) kullanarak Vue'nun Two-Way Data Binding davranışını optimize ediyoruz.
                        Normalde `v-model`, her tuşa basıldığında (`input` event'i) veriyi anında günceller ve render
                        işlemi gerçekleşir.
                        Ancak, `.lazy` modifier kullanıldığında, veri sadece input alanından `focus çıktığında`
                        (`change` event'i tetiklendiğinde) güncellenir.

                        Performansı artırır, gereksiz render işlemlerini önler.
                        Büyük formlarda gereksiz hesaplamaları engelleyerek kullanıcı deneyimini iyileştirir. 
                        -->

                        <!-- 
                        `.trim` modifier, kullanıcının giriş yaptığı metnin başındaki ve sonundaki gereksiz boşlukları otomatik olarak siler.
                        -->
                        <input type="text" class="form-control" id="username" name="username"
                            v-model.lazy.trim="formData.username" required>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-6 col-8 mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" name="email" v-model.trim="formData.email"
                            required>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-6 col-8 mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" name="password"
                            v-model.trim="formData.password" required>
                    </div>
                </div>

                <!-- <div class="row justify-content-center">
                    <div class="col-md-6 col-8 mb-3">
                        <h5>Gender</h5>
                        <div class="form-check">
                          
                            ***
                            Vue burada `change` event'ini dinleyerek v-model ile değeri güncelliyor.
                            Radio butonlarda name özelliği aynı olduğunda, aynı gruba ait olduğu anlamına gelir. Bu sayede birden fazla radio butondan sadece biri seçilebilir.
                            ***
                            
                            <input class="form-check-input" type="radio" name="gender" value='male' id="male"
                                v-model="formData.gender">
                            <label class="form-check-label" for="male">
                                Male
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="gender" value='female' id="female"
                                v-model="formData.gender">
                            <label class="form-check-label" for="female">
                                Female
                            </label>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-6 col-8 mb-3">
                        <label for="age" class="form-label">Age:</label>
                        <input type="number" class="form-control" id="age" v-model="formData.age" required>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-md-6 col-8 mb-3">
                        <h5>Which Programming Language(s) you know?</h5>

                        *** 
                        Vue'da `v-model` bir checkbox'a bağlı olduğunda, eğer değer bir dizi (`Array`) ise,
                        seçili checkbox'ların değerleri otomatik olarak bu diziye eklenir veya çıkarılır.

                        Kullanıcı bir checkbox işaretlediğinde, değeri `formData.languages` dizisine eklenir.
                        Checkbox işaretini kaldırdığında, o değer diziden çıkarılır.
                        *** 

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="java" id="java"
                                v-model="formData.languages">
                            <label class="form-check-label" for="java">
                                Java
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="c#" id="c#"
                                v-model="formData.languages">
                            <label class="form-check-label" for="c#">
                                C#
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="python" id="python"
                                v-model="formData.languages">
                            <label class="form-check-label" for="python">
                                Python
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="rust" id="rust"
                                v-model="formData.languages">
                            <label class="form-check-label" for="rust">
                                Rust
                            </label>
                        </div>
                    </div>
                </div> -->

                <div class="row justify-content-center">
                    <div class="col-md-6 col-8 mb-3">
                        <button type="submit" class="btn btn-primary w-100">Register</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    name: "RegisterView",
    data() {
        return {
            formData: {
                username: '',
                email: '',
                password: ''
                // gender: '',
                // age: null,
                // languages: []
            }
        }
    },
    methods: {
        // `updateUserName` metodu, bir event listener gibi çalışarak input değerini manuel olarak günceller.
        // Two-Way Data Binding sağlamak için kullanılır ancak Vue’nun `v-model` direktifi ile daha kolay bir şekilde yapılabilir.
        // updateUserName(event) {
        // Kullanıcının girdiği değeri `formData.username` değişkenine atar.
        // this.formData.username = event.target.value;
        // }
        submitForm(event) {
            // Formun varsayılan submit işlemi, tarayıcı tarafından sayfanın yenilenmesine neden olur.
            // Bunu engellemek için `event.preventDefault()` kullanıyoruz.

            event.preventDefault();

            // Alternatif Yöntem: Vue'nun `.prevent` Modifier'ı
            // `@submit.prevent="submitForm" (v-on:submit.prevent)` ifadesi, Vue'nun `.prevent` modifier'ını kullanarak `event.preventDefault()` çağrısını otomatik olarak yapar.
            // Böylece, formun varsayılan yenileme davranışını engellemek için ekstra kod yazmaya gerek kalmaz.
        }
    }
}
</script>
<style scoped></style>
