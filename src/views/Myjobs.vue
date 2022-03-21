<template >
<div class="job__section containerItem">
  
    <template v-if="favourites.length !== 0" >
      <article   class="job__container" v-for="fav in favourites" v-bind:key='fav.id' >
            <div class="job__header containerItem">
              <h4 class="job__title">{{fav.title}}</h4>
            </div>
            <div class="job__body containerItem">
              <p class="job__description"> {{fav.description}} </p>
              <p class="job__action" >Read more <a class="job__go" target="blank" v-bind:href="fav.redirect_url">Here</a></p>
            </div>
            <div class='job__footer containerItem'>
              <p class="job__span">{{fav.salary_min}}€ - {{fav.salary_max}}€ per year</p>
              <p class="job__provider" >Posted by <span class="job__span" >{{fav.display_name}}</span> </p>
              <p class="job__somedata" >Located on <span class="job__span job__location">{{fav.area[0]}}, {{fav.location}}</span></p>
              <p class="job__somedata" >Posted on <span class="job__span">{{fav.created}}</span></p>
              <p class="job__somedata" >Tag: <span class="job__span">{{fav.label}}</span></p>
              <button v-on:click='favHandler($event , fav)' class="fav__btn"><i :class="favourites.some( el => el.id === fav.id) ? 'fas fa-heart':'far fa-heart' "></i></button>
            </div>
      </article>
    </template>
    <template v-else >
      <div class="no__favs" >
        <p>You don't have any job here yet, add some few by clicking the fav button</p>
      </div>
    </template>
</div>

</template>

<script>
import store from '../store'
import favHandler from '../helpers/favHandler'
export default {
  name: 'myJobs',
  methods: {
    favHandler
  },
  computed: {
    favourites(){
      return store.getters.getUserData.favourites
    }
  }
}
</script>
