<template>
  <div class="d-flex justify-content-center pt-5">
    <Sidebar/>
    <div class="container">
      <h1 class="font-weight-bold text-center">Yardım Sayfası</h1>
          <embed
              :src="this.$apiFileUrl + 'staticfiles/help_docs.pdf'"
              type="application/pdf"
            width="100%"
            height="800px"
            frameborder="0" >
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar/Sidebar.vue'

export default {
  // eslint-disable-next-line
  name: 'Help',
  components: {
    Sidebar,
  },

  data(){
    return {
      cafeterias: [],
    }
  },
  async created() {
    await this.getCafeteriaData();
  },
  methods: {
    async getCafeteriaData(){
      let endPoint = 'Cafeteria/getrecently';
      await this.$axios.get(this.$apiUrl + endPoint,
          {headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            let datas = response.data.data;
            for(var item in datas){
              this.cafeterias.push(datas)
            }
          })
          .catch(e => {
            this.$toast("Yemekhane bilgileri getirilirken hata oluştu\n" +
                e, {
              timeout: 3000,
              toastClassName: "bg-danger"
            });
          })
    }
  },
}
</script>
