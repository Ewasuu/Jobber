const _API = {
  API: 'https://api.adzuna.com/v1/api/jobs/gb/search/1?',
  ID: 'app_id=48ef5d75',
  APIKEY: '&app_key=c16f91a9383f76f7e01b9ea757d5ff6a',
  RESULTS: '&results_per_page=',
  WHAT: '&what='
}
const getJobs = async ({ loading, jobs, search, page, perPaage = 10 }) => {

  loading.value = true
  jobs.value = []
  jobs.value = await fetch(`${_API.API}${_API.ID}${_API.APIKEY}${_API.RESULTS}${perPaage * parseInt(page.value) || perPaage * parseInt(page)}${_API.WHAT}${search}`)
    .then(res => res.json())
    .then(res => {
      const { results } = res
      return results
    }).catch(res => {
      loading.value = false
      console.error(res)
    })
    const s = perPaage * parseInt(page.value) || perPaage * parseInt(page)
  if (s !== 10 && jobs.value) {
    jobs.value = jobs.value.slice(((parseInt(page.value) - 1) * perPaage) || ((parseInt(page) - 1) * perPaage) , (parseInt(page.value) * perPaage) || (parseInt(page) * perPaage) )

    loading.value = false
  }
  loading.value = false
}
export { _API, getJobs }