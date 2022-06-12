<template>
    <div class="">
        <div class="container">
        <div class="row p-4 mt-0 mt-md-5">
            <div class="col-md-5 d-flex flex-column">
                <img src="/img/login_logo.png" alt="logo" class="img-login-logo">
                <img src="/img/login_photo.png" alt="logo" class="img-fluid mt-5">
            </div>
            <div class="col-md-7 mt-5 mt-sm-0 login-form">
                <h3><b>Ahmet Cengiz Mühendislik Fakültesi Portalı</b></h3>
                <p>Hesabınız ile giriş yapın.</p>
                <form @submit.prevent="onSubmit">
                    <div class="form-group position-relative my-3 pt-3 mt-md-5">
                        <label for="userName" class="pb-2">Okul Numarası</label>
                        <input 
                            id="userName"
                            v-model="user.username" 
                            type="text"
                            :disabled="logginning"
                            class="form-control"
                            @blur="$v.user.username.$touch()">
                        <small v-if="!$v.user.username.required" class="form-text text-danger">Bu alan zorunludur.</small>
                    </div>
                    <div class="form-group position-relative pt-3 mt-md-4">
                        <label for="password" class="pb-2">T.C. Kimlik No</label>
                        <input 
                        id="password" 
                        v-model="user.password" 
                        type="password"
                        :disabled="logginning"
                        class="form-control"
                         @blur="$v.user.password.$touch()">
                        <small v-if="!$v.user.password.required" class="form-text text-danger">Bu alan zorunludur.</small>
                    </div>
                    <div class="form-group mt-3">
                      <button v-if="logginning" class="btn bg-light-blue mb-2" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Giriş Yapılıyor...
                      </button>
                        <button v-else type="submit" class="btn bg-light-blue mb-2" :disabled="$v.$invalid">
                            {{ isUser ? 'Giriş Yap' : 'Kayıt Ol' }}
                        </button>

                        <!-- <a href="#" @click.prevent="isUser=!isUser" class="text-secondary">
                            {{ isUser ? 'Üye değilim' : 'Üyeliğim var'}}
                        </a> -->
                        <p v-if='!this.loginFailedMessage == "" ' class="form-text text-danger">{{loginFailedMessage}}</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import {required, numeric, maxLength, minLength} from "vuelidate/lib/validators"
    export default {
    // eslint-disable-next-line
    name: 'Auth',
        data() {
            return {
                user: {
                    username: null,
                    password: null
                },
                isUser: true,
                loginFailedMessage: "",
              logginning: false
            }
        },
        validations: {
            user: {
                username: {
                    required,
                    
                    maxLength: maxLength(11),
                    minLength: minLength(10)
                },
                password: {
                    required,
                    
                    // maxLength: maxLength(11),
                    minLength: minLength(6)
                }
            }
        },
        methods: {
             onSubmit() {
               this.logginning = true;
                this.$store.dispatch("login", {...this.user, isUser: this.isUser})
                .then(response => {
                  let isAdmin = this.$store.getters.getIsAdmin;
                      if (isAdmin){
                        this.$router.push("/")
                      }
                      else {
                        this.$router.push("/user/notification")
                      }
                    })
               .catch(e => {
                 this.logginning = false;
                 this.$toast("Giriş Yapılamadı.\n" + e, {
                   timeout: 5000,
                   toastClassName: "bg-danger"
                 });
               })
            }
        },
        created(){
            this.loginFailedMessage = this.$store.getters.getLoginFailedMessage;
        }
    }
</script>
