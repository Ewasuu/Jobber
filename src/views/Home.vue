<template>
  <section class="home container">
    <form v-on:submit.prevent='handleSubmit' class="search__form" >
      <label v-on:click="handleSubmit" class="search__label" for="search__input"></label>
      <input v-model.trim="searchQuery" required placeholder="Search a Job..." class="search__input" id="search__input" type="text">
    </form>
    <div v-if="isLog" class="user__welcome" >
      <p>Hi {{name}}, are you ready for improve your carerr?</p>
      <p>Start searching for new oportunitties!</p>
    </div>
    <div class="home__pictures">
      <div class="picture__container">
        <div class="img__separator">
          <img src="../assets/barsgraphics.svg" alt="bar graphics">
        </div>
        <p class="home__gallery-description" >Improve your skills</p>
      </div>
      <div class="picture__container">
        <div class="img__separator">
          <img src="../assets/graphic.svg" alt="cake graphics">
        </div>
        <p class="home__gallery-description" >Most probably to get hired</p>
      </div>
      <div class="picture__container">
        <div class="img__separator">
          <img src="../assets/clock.svg" alt="clock">
        </div>
        <p class="home__gallery-description" >Work on differents world times</p>
      </div>
      <div class="picture__container">
        <div class="img__separator">
          <img src="../assets/goodpay.svg" alt="wallet">
        </div>
        <p class="home__gallery-description" >Better pay</p>
      </div>
    </div>
  </section>
</template>

<script>
import router from '@/router/index.js'
import store from '../store'
import { ref } from 'vue'
export default {
  name: 'Home',
  computed: {
    name(){
      return store.getters.getUserData.name
    },
    isLog(){
      return store.getters.getUserData.log
    }
  },
  setup () {
    const searchQuery = ref('')
    const handleSubmit = () => {
      if (searchQuery.value !== '') {
        router.push(`/search/${searchQuery.value.replace(/[^A-Za-z]/g, '+')}`)
      }
    }
    return {
      handleSubmit,
      searchQuery
    }
  }
}
</script>
