<template>
  <div class="pagination__container">
          <router-link :to="{ name: 'Searcher', params: { search: search, page: '1' }}">1</router-link>
          <router-link :to="{ name: 'Searcher', params: { search: search, page: '2' }}">2</router-link>
          <router-link :to="{ name: 'Searcher', params: { search: search, page: '3' }}">3</router-link>
          <router-link :to="{ name: 'Searcher', params: { search: search, page: '4' }}">4</router-link>
          <router-link :to="{ name: 'Searcher', params: { search: search, page: '5' }}">5</router-link>
          <router-link :to="{ name: 'Searcher', params: { search: search, page: '6' }}">6</router-link>
          <router-link :to="{ name: 'Searcher', params: { search: search, page: '7' }}">7</router-link>
          <router-link :to="{ name: 'Searcher', params: { search: search, page: '8' }}">8</router-link>
          <router-link :to="{ name: 'Searcher', params: { search: search, page: '9' }}">9</router-link>
          <router-link :to="{ name: 'Searcher', params: { search: search, page: '10' }}">10</router-link>
        </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    search: String
  }
}
</script>
