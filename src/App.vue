<template>
  <mainHeader :openMenu='handleMobileMenuOpen' />
  <div v-on:click="handleClick" class="goback" >
    <button><i class="fas fa-arrow-left"></i></button>
  </div>
  <router-view v-show="!loading" ></router-view>
  <spinner v-show="loading"/>
  
</template>

<script>

import mainHeader from '@/components/Header.vue'
import spinner from './components/Spinner.vue'
import { ref, provide } from 'vue'
import store from './store'
import { useRouter } from 'vue-router'
export default {
  name: 'app',
  components: {
    mainHeader,
    spinner
  },
  computed: {
    loading(){
      return store.getters.getUserData.loading
    }
  },
  setup () {

    const mobileMenuOpen = ref(false)
    const openState = provide('mobileMenuOpen', mobileMenuOpen)
    const route = useRouter()
    const handleMobileMenuOpen = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }
    const handleClick = () => {
      route.go(-1)
    }

    const main = () => {
      const token = window.localStorage.getItem('tk')
      if (token) {
        store.dispatch('loading')
        fetch('https://jobberr.herokuapp.com/api/login/keep', {
          method: 'POST',
          headers: {
            'x-token': token,
            'Content-Type':'application/json'
          }
        }).then(res => res.json())
          .then(res => {
            if (res.success) {
              store.dispatch('loading')
              window.localStorage.setItem('tk', res.token)
              store.dispatch('addAllData', res.authenticatedUser)
            }
            else{
              store.dispatch('loading')
              console.log(res)
              window.localStorage.clear()
            }
          })
      }
    }
    main()
    return {
      mobileMenuOpen,
      openState,
      handleMobileMenuOpen,
      handleClick
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  *::before,
  *::after,
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
  }
  :root{
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    /* colors */
    --brand-main-color: hsl(11, 100%, 50%);
    --brand-soft-color: hsl(11, 100%, 63%);
    --main-font-color: hsl(0, 0%, 0%);
    --secondary-font-color: hsl(0, 0%, 30%);
    --mobile-menu-background: hsl(0, 0%, 0%);
    --mobile-menu-link: hsl(0, 0%, 100%);
    --body-color: hsl(0, 0%, 98%);
    --item-bg-color: hsl(0, 0%, 100%);
    --shadow-color: hsla(0, 0%, 19%, 0.864);
    --error: hsl(0, 100%, 50%);
    --succes: hsl(120, 75%, 49%);

    /* z-index */
    --z-index-modal: 1000;
  }
  /* Layout */
  .container{
    padding: 1rem 2rem;
  }
  .containerItem{
    padding: 0 1rem;
  }
  img{
    width: 100%;
    height: 100%;
  }
  body{
    background-color: var(--body-color);
  }
  a{
    text-decoration: none;
  }
  label{
    cursor: pointer;
  }

  .goback {
    background-color: var(--item-bg-color);
    position: absolute;
    top: 4rem;
    left: 1rem;
    padding: .3rem 1rem;
    border: 1px solid var(--brand-main-color);
}
  .goback button{
    display: block;
    background-color: transparent;
    font-size: 1rem;
    margin: auto;
    border: none;
  }
  /* mainHeader component */
  .main__header{
    background-color: var(--item-bg-color);
    border: 1px solid transparent;
    border-bottom-color: var(--brand-main-color);
  }
  .main__nav{
    display: flex;
    justify-content: space-between;
  }
  .logo{
    position: relative;
    font-size: 1.3rem;
    margin-left: 10px;
    color: var(--main-font-color);
  }
  .logo::before {
    content: 'J';
    position: absolute;
    color: var(--brand-main-color);
    font-size: 2rem;
        left: -1rem;
    top: -0.1rem;
  }
  .nav__btn{
    font-family: FontAwesome;
    color: var(--main-font-color);
    background-color: transparent;
    font-size: 1.3rem;
    border: none;
  }
  .close__btn{
    font-family: FontAwesome;
    position: absolute;
    top: 1rem;
    right: 2rem;
    color: white;
    background-color: transparent;
    font-size: 1.5rem;
    border: none;
    animation: menuIn 1s ease;
  }
  .mobile__link{
    color: var(--mobile-menu-link);
    font-size: 1.8rem;
  }
  .mobile__link-logout{
    background-color: transparent;
    border-color: transparent;
    border-top-color: var(--mobile-menu-link);
    padding: 1rem;
    font-size: 1.5rem;
    color: var(--mobile-menu-link);
  }
  .nav__link{
    display: none;
    color: var(--main-font-color);
    font-size: 1.3rem;
  }
  .nav__link-logout{
    display: none;
  }
  .mobile__menu{
    position: absolute;
    z-index: var(--z-index-modal);
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    background-color: var(--mobile-menu-background);
    height: 100vh;
    width: 100vw;
    animation: menuIn 1s ease;
  }
  .mobile__menu .router-link-active{
    width: 100%;
    border: 2px solid transparent;
    border-bottom-color: var(--body-color);
  }
  /* Login */
  .signin__container,
  .login__container{
    margin: 4rem auto;
    display: flex;
    flex-direction: column;
    align-items: center
  }

  .login__container .linkdiv a{
    color: var(--brand-main-color);
    display: block;
    margin: 3rem auto;
  }

  .big__logo{
    position: relative;
    font-size: 3rem;
    margin-left: 10px;
    margin-bottom: 2rem;
  }
  .big__logo::before {
    content: 'J';
    position: absolute;
    color: var(--brand-main-color);
    font-size: 5.5rem;
    left: -3rem;
    top: -1rem;
  }
  .google{
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0.8rem 1rem;
    margin-bottom: 1rem;
    width: 100%;
    border-radius: 2rem;
    box-shadow: 0 0 5px #858989;
  }

  .google a{
    color: var(--main-font-color);
    font-size: 1.3rem;
    font-weight: 100;
  }
  .google img{
    width: 2rem;
    margin-right: 1rem;
  }
  .normal__login{
    width: 100%;
  }
  .normal__login form{
    display: flex;
    flex-direction: column;
  }

  .login__field{
    height: 3rem;
    margin: 1rem 0;
    padding: 0 1rem;
    border-radius: 2rem;
    border-color: var(--main-font-color);
    color: var(--main-font-color);
  }

  .normal__login form button{
    cursor: pointer;
    padding: .6rem 3rem;
    font-size: 1.5rem;
    background: var(--brand-soft-color);
    border: 1px solid rgb(255, 68, 0);
    color: var(--item-bg-color);
    border-radius: 2rem;
  }
  /* Singin component */
  .signin__container form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
  .signin__items{
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
  }
  .signin__items label{
    margin-left: 1rem;
  }
  .submit__btn{
      cursor: pointer;
      padding: .6rem 3rem;
      font-size: 1.5rem;
      background: var(--brand-soft-color);
      border: 1px solid rgb(255, 68, 0);
      color: var(--item-bg-color);
      border-radius: 2rem;
  }
  /* Home component */
  .search__form{
    position: relative;
    margin: 2rem auto;
  }
  .search__label{
    font-family: FontAwesome;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0.5rem;
    margin: auto;
    font-size: 1.3rem;
    width: 1.25rem;
    height: 1.5625rem;
  }
  .search__input {
    display: block;
    padding: 0.3rem 1.1rem;
    margin: 0 auto;
    border-radius: 20px;
    border: 1px solid var(--brand-main-color);
    width: 19rem;
    height: 48px;
    font-size: 1.3rem;
  }
  .user__welcome {
    margin: 3rem auto;
  }
  .user__welcome p{
    text-align: center;
    margin-bottom: 1rem;
  }
  .user__welcome p:nth-child(1){
    font-size: 1.2rem;
    font-weight: 600;
  }
  .user__welcome p:nth-child(2){
    font-size: 1.1rem;
  }
  .home__pictures{
    display: grid;
    place-content: center;
    grid-template-columns: repeat(2, 7.5rem);
    grid-template-rows: repeat(2, 10rem);
    gap: 1rem;
  }
  .picture__container {
      padding: 1rem .5rem;
      background-color: var(--item-bg-color);
      border-radius: 10px;
      border: 1px solid var(--brand-main-color);
      overflow: hidden;
  }
  .img__separator{
    width: 5rem;
    height: 6rem;
    margin: auto;
  }
  .home__gallery-description{
    text-align: center;
    color: var(--secondary-font-color);
    font-size: .75rem;
    margin-top: .5rem;
  }
  /* Confirmation link */
  .confirmation{
    margin: 5rem auto;
    padding: 2rem;
    width: 20rem;
    height: 10rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .confirmation a{
    text-align: center;
    color: var(--item-bg-color);
    font-weight: 600;
    letter-spacing: 3px;
    font-style: italic;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .error__background{
    background-color: var(--error);
  }

  .succes{
    background-color: var(--succes)
  }
  /* Job sections */
  .job__section{
    margin-top: 3rem;
  }
  .job__container{
    background-color: var(--item-bg-color);
    margin: 1rem auto;
    border-radius: 20px;
    border: 1px solid var(--brand-main-color);
    color: var(--secondary-font-color);
  }
  .job__header{
    text-align: center;
    font-size: 1.3rem;
    color: var(--main-font-color);
    border: 1px solid transparent;
    border-bottom-color: var(--brand-main-color);
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  .job__body{
    position: relative;
    height: 9.5rem;
    overflow: hidden;
  }
  .job__body::before{
    content: '';
    z-index: 10;
    position: absolute;
    background-image: linear-gradient(to top, #ffffff 5%, transparent);
    width: 100%;
    height: 100%;
  }
  .job__action {
    position: absolute;
    z-index: 15;
    bottom: 4px;
    right: 0;
    left: 0;
    margin: auto;
    text-align: center;
    font-size: .9rem;
  }
  .job__go{
    color: var(--brand-main-color);
  }
  .job__footer{
    position: relative;
    font-size: .8rem;
    border: 1px solid transparent;
    border-top-color: var(--brand-main-color);
    padding-top: 1rem;
    padding-bottom: 2.5rem;

    display: flex;
    flex-direction: column;
  }
  .job__footer p{
    margin: .2rem 0;
  }
  .job__span{
    color: var(--main-font-color);
  }
  .fav__btn{
    font-family: FontAwesome;
    color: var(--main-font-color);
    background-color: transparent;
    border: none;
    position: absolute;
    bottom: .5rem;
    right: 2rem;
    font-size: 1.3rem;
  }
  .modal__fav{
    background-color: var(--mobile-menu-background);
    padding: .7rem 2rem;
    width: 15rem;
    border-radius: 20px;
    position: fixed;
    bottom: 3rem;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 100;
    animation: modalFavIn .6s linear;
  }
  .isUp{
    animation: modalFavOut .6s linear;
  }
  .fav__sentece{
    color: var(--mobile-menu-link);
    text-align: center;
    font-size: 1.3rem;
  }
  .pagination__container{
    display: flex;
    justify-content: space-around;
    margin: 2rem 0;
  }
  .pagination__container a{
    font-size: 1.1rem;
    color: var(--main-font-color);
  }
  .pagination__container .router-link-exact-active{
    color: var(--brand-main-color);
  }
  .error__handler{
    text-align: center;
    margin: 8rem auto;
  }
  .error__handler h2{
    font-size: 2rem;
    margin: 1rem auto;
  }

  .qzar{
    margin-top: 1rem;
    margin-left: 1rem;
  }

  .error{
    color: var(--error);
  }
  .error-field{
    border-color: var(--error);
    color: var(--error);
  }
  .no__favs{
    margin: 10rem auto
  }
  .no__favs p{
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
  }
  .data{
    margin: 2rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .about__item{
    width: 5rem;
    height: 5rem;
  }
  .about__img-container{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 3rem auto;
    gap: 3rem;
  }
  .about__item {
    display: flex;
    justify-content: center;
  }
  .about__p{
    line-height: 1.8rem;
  }
  .about__p a{
    color: var(--brand-main-color);
  }
  .about__small{
    display: block;
    text-align: center;
    margin-top: 1rem;
  }
  .about__item > a > img{
    width: auto;
  }
  .my__links-container{
    display: flex;
    justify-content: space-between;
    margin-top: 4rem;
    width: 5rem;
  }
  .about__my-links{
    font-family: FontAwesome;
    font-size: 1.5rem;
    font-style: normal;
    color: var(--main-font-color);
    transition-duration: .6s;
  }
  .about__my-links:hover{
    color: var(--brand-main-color);
  }
  /* Spinner */
  .spinner{
    border: 10px solid transparent;
    border-left-color: var(--brand-main-color);
    border-right-color: var(--brand-main-color);
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 100%;
    animation: spinner 1s infinite linear;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  /* animations */
  @keyframes spinner {
    from{
      transform: rotate(0);
    }
    to{
      transform: rotate(360deg);
    }
  }
  @keyframes menuIn {
    from{
      transform: translateX(-1000px);
    }
    to{
      transform: translateX(0);
    }
  }
  @keyframes modalFavIn {
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }
  @keyframes modalFavOut {
    from{
      opacity: 1;
    }
    to{
      opacity: 0;
    }
  }

  /* Responsive */
  @media screen and (min-width: 300px) {
    .search__input{
      width: 16rem;
    }
    
  }
  @media screen and (min-width: 375px) {
    :root{
      font-size: 17px;
    }
  }
  @media screen and (min-width: 425px) {
    :root{
      font-size: 19px;
    }
  }
  @media screen and (min-width: 768px) {
    :root{
      font-size: 33px;
    }
    .search__input {
      display: block;
      padding: 0.3rem 1.1rem;
      margin: 0 auto;
      border-radius: 20px;
      border: 1px solid var(--brand-main-color);
      width: 19rem;
      height: 75px;
      font-size: 1.3rem;
    }
  }
  @media screen and (min-width: 1000px) {
    :root{
      font-size: 16px;
    }
    .close__btn{
      display: none;
    }
    .nav__btn{
      display: none;
    }
    .main__nav div{
      flex-grow: .2;
      display: flex;
      justify-content: space-around;
    }
    .nav__link{
      display: inline-block;
      margin: .5rem 0;
    }
    .main__nav > div > .router-link-active{
      color: var(--brand-main-color);
    }

    .search__input {
      display: block;
      padding: 0.3rem 1.1rem;
      margin: 0 auto;
      border-radius: 20px;
      border: 1px solid var(--brand-main-color);
      width: 100%;
      height: 75px;
      font-size: 1.3rem;
    }
    .home__pictures {
      margin-top: 7rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .picture__container {
      padding: 1rem 0.5rem;
      width: 10rem;
      height: 10rem;
    }
    .search__label{
      right: 1.5rem;
    }

    .signin__container, .login__container {
      margin: 4rem auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 30rem;
    }
    .nav__link-logout{
      display: block;
      font-size: 1.2rem;
      padding: .5rem 1rem;
      color: var(--item-bg-color);
      border-color: var(--brand-main-color);
      background-color: var(--brand-soft-color);
      width: 8rem;
      border-radius: 10px;
    }
    .user__welcome p:nth-child(1) {
      font-size: 1.8rem;
      font-weight: 600;
    }
    .user__welcome p:nth-child(2) {
      font-size: 1.5rem;
    }
    .job__container {
      background-color: var(--item-bg-color);
      margin: 1rem auto;
      border-radius: 20px;
      border: 1px solid var(--brand-main-color);
      color: var(--secondary-font-color);
      width: 50rem;
    }
  }
  @media screen and (min-width: 1100px) {
    :root{
      font-size: 18px;
    }
  }
  @media screen and (min-width: 1200px) {
    :root{
      font-size: 20px;
    }
  }
  @media screen and (min-width: 1300px) {
    :root{
      font-size: 23px;
    }
  }
</style>
