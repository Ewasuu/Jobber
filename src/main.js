import { createApp } from 'vue'
import App from './App.vue'
import googleAuth from 'vue3-google-oauth2'
import router from './router'
import store from './store'

const app = createApp(App)

const gauthClientId = '998006317783-agbkeqp71umt62f6u9ifsj3jiomhltnd.apps.googleusercontent.com'

app.use( googleAuth, { clientId: gauthClientId, scope: 'profile', prompt: 'consent', fetch_basic_profile: true })
app.use( router )
app.use( store )

app.mount('#app')
