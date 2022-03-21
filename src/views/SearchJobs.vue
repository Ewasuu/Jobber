<template>
    <section class="job__section containerItem">
      <spinner v-show="loading"/>
      <errorHandler v-if="!jobs"/>
      <template v-if="jobs">
        <jobComponent />
        <pagination v-show="(loading !== null  && !loading && jobs)" :search='search'/>
      </template>
      <div v-show="added" class="modal__fav" :class="isUp? 'isUp': ''">
        <p class="fav__sentece" >Added to Fav</p>
      </div>
      <div v-show="removed" :class="isUp? 'isUp': ''" class="modal__fav">
        <p class="fav__sentece" >Removed to Fav</p>
      </div>
    </section>
</template>

<script>
import { onMounted, provide, ref, watch } from 'vue'
import router from '../router'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { getJobs } from '@/helpers/apidata.js'
import spinner from '@/components/Spinner.vue'
import errorHandler from '../views/Error.vue'
import pagination from '@/components/Pagination.vue'
import jobComponent from '@/components/Jobs.vue'
import store from '../store'

export default {
  name: 'Searcher',
  components: {
    spinner,
    errorHandler,
    pagination,
    jobComponent
  },
  computed: {
    isLog(){
      return store.getters.getUserData.log
    },
    isUp(){
      return store.getters.getUserData.isUp
    },
    added(){
      return store.getters.getUserData.added
    },
    removed(){
      return store.getters.getUserData.removed
    }
  },
  setup () {
    const route = useRoute()
    const jobs = ref([])
    const loading = ref(null)
    const pushParam = ref('1')
    const { search } = route.params
    const jobpassed = provide('job', jobs)

    onMounted(() => {
      router.replace(`/search/${search.replace(/[^A-Za-z]/g, '')}/`)
      setTimeout(() => { router.replace(`/search/${search.replace(/[^A-Za-z]/g, '+')}/${pushParam.value}`) }, 300)
    })
    onBeforeRouteUpdate(() => {
      const { page } = route.params
      pushParam.value = page
    })
    watch(
      () => route.params.page,
      () => {
        const { page } = route.params
        if (page) {
          getJobs({ loading: loading, jobs: jobs, search: search, page: page })
        }
      })

    return {
      search,
      jobs,
      loading,
      jobpassed
    }
  }
}
</script>
