  <template>
    <article class="job__container" v-for="job in jobs" v-bind:key='job.id' >
      <div class="job__header containerItem">
        <h4 class="job__title">{{job.title}}</h4>
      </div>
      <div class="job__body containerItem">
        <p class="job__description"> {{job.description}} </p>
        <p class="job__action" >Read more <a class="job__go" target="blank" v-bind:href="job.redirect_url">Here</a></p>
      </div>
      <div class='job__footer containerItem'>
        <p class="job__span">{{job.salary_min}}€ - {{job.salary_max}}€ per year</p>
        <p class="job__provider" >Posted by <span class="job__span" >{{job.company.display_name}}</span> </p>
        <p class="job__somedata" >Located on <span class="job__span job__location">{{job.location.area[0]}}, {{job.location.display_name}}</span></p>
        <p class="job__somedata" >Posted on <span class="job__span">{{job.created}}</span></p>
        <p class="job__somedata" >Tag: <span class="job__span">{{job.category.label}}</span></p>
        <button v-on:click='favHandler($event , job)' class="fav__btn"><i :class="favourites.some( el => el.id === job.id) ? 'fas fa-heart':'far fa-heart' "></i></button>
      </div>
  </article>
</template>

<script>
import { inject } from '@vue/runtime-core'
import favHandler from '../helpers/favHandler'
import store from '../store'
export default {
  name: 'jobComponent',
  methods: {
    favHandler
  },
  computed: {
    favourites(){
      return store.getters.getUserData.favourites
    }
  },
  setup () {

    const jobs = inject('job')
    return {
      jobs
    }
  }
}
</script>
