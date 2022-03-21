import store from "../store"
import router from "../router"

const favHandler = ($event , job) => {
    if ( store.getters.getUserData.log ) {
      if ($event.target.classList.contains('far')) {
        const favourite = { 
            id: job.id,
            title: job.title,
            description: job.description,
            salary_min: job.salary_min,
            salary_max: job.salary_max,
            display_name: job.company.display_name,
            area: job.location.area[0],
            location: job.location.display_name,
            created: job.created,
            label: job.category.label
        }

        const BODY = { 
          favourite 
        }
        $event.target.classList.replace('far', 'fas')
        const token = window.localStorage.getItem('tk')
        fetch('https://jobberr.herokuapp.com/api/favourites/add', {
          method: 'PUT',
          headers: {
            'x-token': token,
            'Content-Type':'application/json'
          },
          body: JSON.stringify(BODY)
        }).then(res => res.json())
          .then( res => {
              if (res.success) {
                store.dispatch('addAllData', res.user)
                store.dispatch('Added')
              }
              else {
                console.log(res)
                $event.target.classList.replace('fas', 'far')
              }
          })
          .catch(res => {
            if (!res.succes) {
              $event.target.classList.replace('fas', 'far')
            }
          })  
      } else {
            const favourite = {
                id: job.id
            }
            const BODY = { 
              favourite 
            }
            $event.target.classList.replace('fas', 'far')
            const token = window.localStorage.getItem('tk')
            fetch('https://jobberr.herokuapp.com/api/favourites/remove', {
                method: 'DELETE',
                headers: {
                    'x-token': token,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(BODY)
            }).then(res => res.json())
              .then(res => {
                if (res.success) {
                    store.dispatch('addAllData', res.user)
                    store.dispatch('Removed')
                  }
                  else {
                    $event.target.classList.replace('far', 'fas')
                  }
              })
              .catch(res => {
                if (!res.success) {
                  $event.target.classList.replace('far', 'fas')
                }
              })
     }
  }
  else {
    router.push('/login')
  }
}

 export default favHandler