<template>
    <header class="main__header" >
        <nav class="main__nav container">
            <router-link class="logo" to="/" >obber</router-link>
            <div>
                <button v-on:click='openMenu' class="nav__btn" ></button>
                <router-link v-if="!isLog" class="nav__link" to="/login">Log In</router-link>
                <router-link v-if="!isLog" class="nav__link" to="/signin">Sign In</router-link>
                <router-link class="nav__link" to="/">Home</router-link>
                <router-link v-if="isLog" class="nav__link" to="/myjobs">My Jobs</router-link>
                <router-link class="nav__link" to="/about">About</router-link>
                <button v-if="isLog && google" v-on:click='handleClickSignOut' class="nav__link-logout">Log out</button>
                <button v-if="isLog && !google" v-on:click='handleClickSignOutNormal' class="nav__link-logout">Log out</button>
            </div>
            <mobileMenu :openMenu='openMenu' v-show="mobileMenuOpen" />
        </nav>
    </header>
</template>

<script>
import mobileMenu from '@/components/Mobile_menu.vue'
import { inject } from '@vue/runtime-core'
import store from '../store'
export default {
  name: 'mainHeader',
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
  components: {
    mobileMenu
  },
  setup () {
    const mobileMenuOpen = inject('mobileMenuOpen')
    const handleClickSignOutNormal = () => {
      store.dispatch('removeAllData')
      window.localStorage.clear()  
    }
    return {
      mobileMenuOpen,
      handleClickSignOutNormal
    }
  }
}
</script>
