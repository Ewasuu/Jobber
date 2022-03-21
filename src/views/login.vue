<template>
  <section class="container">
    <div class="login__container" >
      <h1 class="big__logo" >obber</h1>
      <div v-on:click="handleClickSignIn" class="google">
        <img src="https://avatars2.githubusercontent.com/u/1342004?v=3&s=400" alt="google" />
        <a href="#">sign up with Google</a>
      </div>
      <div class="normal__login">
        <form v-on:submit.prevent='signInNormal' >
          <input class="login__field" v-model.trim="email" required type="text" name="email" placeholder="example: example@gmail.com">
          <input class="login__field" v-model.trim="password" required type="password" name="password" placeholder="Password">
          <button v-on:click='signInNormal' >Log In</button>
        </form>
        <p class="error qzar" v-show="!handleSubmitError" > {{errorMsg}} </p>
        <p class="error qzar" v-show="!allOk" > {{errorGoogleMsg}} </p>
      </div>
        <div class="linkdiv">
          <router-link to="/signin">Dont have an account? create one for free</router-link>
        </div>
    </div>
  </section>
</template>

<script>
import router from '@/router/index.js'
import store from '../store'

import { inject, ref } from "vue";
export default {
  name: "Login",

  data(){
    return {
      user: '',
      errorGoogleMsg: '',
      allOk: true
    }
  },
  methods: {
    async handleClickSignIn(){
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        this.user = googleUser.getBasicProfile()
        const body = { id_token: googleUser.getAuthResponse().id_token }
        store.dispatch('loading')
        fetch('https://jobberr.herokuapp.com/api/login/google', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(body)
        }).then(res => res.json())
          .then(res => {
            if (res.success) {
              store.dispatch('loading')
              window.localStorage.setItem('tk', res.token)
              store.dispatch('addAllData', res.user)
              router.push('/')
            }
            else{
              store.dispatch('loading')
              this.allOk = false
              this.errorGoogleMsg = res.msg
              return null
            }
          })
    }
  },

  setup(){
    const Vue3GoogleOauth = inject('Vue3GoogleOauth')
    const email = ref('')
    const password = ref('')
    const handleSubmitError = ref(true)
    const errorMsg = ref('')
    const signInNormal = () => {
      if (password.value !== '' && email.value !== '') {
        const body = { password: password.value, email: email.value }
        store.dispatch('loading')
        fetch('https://jobberr.herokuapp.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(body)
        }).then(res => res.json())
          .then(res => {
            if (res.success) {
              store.dispatch('loading')
              window.localStorage.setItem('tk', res.token)
              store.dispatch('addAllData', res.user)
              router.push('/')
            }
            else{
              store.dispatch('loading')
              handleSubmitError.value = false
              errorMsg.value = res.msg || res.errors[0].msg
            }
          })
      }
    }
    return{
      Vue3GoogleOauth,
      signInNormal,
      email,
      password,
      handleSubmitError,
      errorMsg
    }
  }

}
</script>
