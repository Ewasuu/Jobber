<template>
  <article class="container">
    <div class="signin__container">
      <form v-on:submit.prevent="handleSubmit" >
        <div class="signin__items">
          <label :class="validName? '':'error'" for="name">Name:</label>
          <input :class="validName? '':'error-field'" v-on:change="testName" placeholder="example: John Sanchez" id="name" class="login__field" v-model.trim="name"  type="text">
          <p v-show="!validName" class="error" >The name is required and must be only letters</p>
        </div>
        <div class="signin__items">
          <label :class="validEmail? '': 'error'" for="email">Email:</label>
          <input :class="validEmail? '': 'error-field'" v-on:change="testEmail" placeholder="example: example@gmail.com" id="email" class="login__field" v-model.trim="email"  type="email">
          <p class="error" v-show="!validEmail" >The Email is required, please enter a valid email</p>
        </div>
        <div class="signin__items">
          <label for="password">Password:</label>
          <input placeholder="*******" id="password" class="login__field" v-model.trim="password"  type="password">
        </div>
        <div class="signin__items">
          <label :class="areTheSame? '':'error'" for="repeatPassword">Confirm password:</label>
          <input :class="areTheSame? '':'error-field'" placeholder="" id="repeatPassword" class="login__field" v-model.trim="repeatPassword"  type="password">
          <p v-show="!areTheSame" class="error" >Password is required and must be the same</p>
        </div>
        <button class="submit__btn" >Sign In</button>
        <div class="submit__handlers">
          <p v-show="submitSucces" class="submit__ok" > We has send a confirmation email to your email account, please go and confirm your account </p>
          <p v-show="submitSucces === 0" class="submit__wrong" >{{failMsg}}</p>
        </div>
      </form>
    </div>
  </article>
</template>

<script>
import { ref } from '@vue/reactivity'
import store from '../store'
export default {
  name: "Signin",
  setup() {
    const name = ref('')
    const validName = ref(true)
    const email = ref('')
    const validEmail = ref(true)
    const password = ref('')
    const repeatPassword = ref('')
    const areTheSame = ref(true)
    const submitSucces = ref(false)
    const failMsg = ref('')

    const emailTester = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    const nameTester = new RegExp(/^[a-zA-Z]+$/)
    const testEmail = () => {
        if (emailTester.test(email.value)) {
          validEmail.value = true
        }
        else{
          validEmail.value = false
        }
    }
    const testName = () => {
        if (nameTester.test(name.value)) {
          validName.value = true
        }
        else{
          validName.value = false
        }
    }
    const comparePassword = () => {
      if (password.value === repeatPassword.value && password.value !== '') {
        areTheSame.value = true
      }
      else{
        areTheSame.value = false
      }
    }
    const handleSubmit = () => {
      testEmail()
      testName()
      comparePassword()
      if (validName.value && validEmail.value && areTheSame.value ) {
        store.dispatch('loading')
        const body = {
          name: name.value,
          email: email.value,
          password: password.value
        }
        fetch('https://jobberr.herokuapp.com/api/user/new', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(body)
        }).then( res => res.json() )
          .then( res => {
            if (res.success) {
              submitSucces.value = true
              store.dispatch('loading')
            }
            else{
              submitSucces.value = 0
              failMsg.value = res.msg
              store.dispatch('loading')
            }
          })
      }

    }
    
    return{
      name,
      email,
      password,
      repeatPassword,
      validName,
      validEmail,
      areTheSame,
      submitSucces,
      failMsg,
      testName,
      testEmail,
      comparePassword,
      handleSubmit
    }
  }
}
</script>

<style>

</style>