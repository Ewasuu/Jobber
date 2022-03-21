<template>
    <div class="mobile__menu container">
        <button v-on:click='openMenu' class="close__btn"></button>
        <router-link v-if="!isLog" v-on:click='openMenu' class="mobile__link" to="/login">Log In</router-link>
        <router-link v-if="!isLog" v-on:click='openMenu' class="mobile__link" to="/signin">Sign In</router-link>
        <router-link v-on:click='openMenu' class="mobile__link" to="/">Home</router-link>
        <router-link v-if="isLog" v-on:click='openMenu' class="mobile__link" to="/myjobs">My Jobs</router-link>
        <router-link v-on:click='openMenu' class="mobile__link" to="/about">About</router-link>
        <button v-if="isLog && google" v-on:click='handleClickSignOut' class="mobile__link-logout">Log out</button>
        <button v-if="isLog && !google" v-on:click='handleClickSignOutNormal' class="mobile__link-logout">Log out</button>

    </div>
</template>

<script>
import store from "../store"
export default {
  name: 'mobileMenu',
  props: {
    openMenu: Function
  },
  methods: {
    async handleClickSignOut() {
        try {
          await this.$gAuth.signOut();
          store.dispatch('removeAllData')
          window.localStorage.clear()  
          this.user = "";
        } catch (error) {
          console.error(error);
        }
    }
  },
  computed: {
    isLog(){
      return store.getters.getUserData.log
    },
    google(){
      return store.getters.getUserData.google
    }
  },
  setup() {
    const handleClickSignOutNormal = () => {
      store.dispatch('removeAllData')
      window.localStorage.clear()  
    }
    return {
      handleClickSignOutNormal
    } 
  }
}
</script>

<style>

</style>
