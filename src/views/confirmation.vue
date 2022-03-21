<template>
  <div v-show="!ready"  class="confirmation" :class="succes ? 'succes' : 'error__background' ">
      <p class="confirmation__msg" >{{msg}}</p>
      <router-link class="confirmation__link" to="/login" >Log in now!</router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
    name: 'Confirmation',
    setup() {
        const msg = ref('')
        const ready = ref(false)
        const succes = ref(false)
        const token = useRoute().params.token

        const main = () => {
            fetch('https://jobberr.herokuapp.com/api/', {
                method: 'PUT',
                headers: {
                    'x-token': token,
                    'Content-Type':'application/json'
                }
            }).then( res => res.json() )
              .then( res => {
                if (res.succes) {

                    ready.value = true
                    succes.value = true
                    msg.value = res.msg
                    
                }
                else {
                    ready.value = true
                    succes.value = false
                    msg.value = res.msg
                }
            })
        }

        main()

        return{
            msg,
            succes,
            ready
        }
    }
}
</script>

<style>

</style>