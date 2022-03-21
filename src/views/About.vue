<template>
<div class="container" >
  <div class="data" >
    <p class="about__p" >Jobber is an web app to found new jobs. Is created wit the api from <a href="https://developer.adzuna.com/" target="blank" >https://developer.adzuna.com/</a>
    and my own api to save the data.</p>
    <p class="about__p" >This web app was crated with vue.js and node.js</p>
    <div class="about__img-container" >
      <div class="about__item" >
        <a href="https://vuejs.org/" target="_blank" >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png" alt="vue.js">
          <small class="about__small" >Vue.js</small>
        </a>
      </div>
      <div class="about__item" >
        <a href="https://nodejs.org/" target="_blank" >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/800px-Node.js_logo.svg.png" alt="Node.js">
          <small class="about__small" >Node.js</small>
        </a>
      </div>
    </div>
    <div class="my__links-container" >
      <a class="about__my-links" href="https://github.com/Ewasuu" target="_blank" ><i class="fa-brands fa-github"></i></a>
      <a class="about__my-links" href="https://www.linkedin.com/in/edward-colmenarez-b1670720a/" target="_blank" ><i class="fa-brands fa-linkedin"></i></a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'About'
}
</script>
