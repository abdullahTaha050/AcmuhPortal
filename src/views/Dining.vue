<template>
  <div class="d-flex justify-content-center pt-5">
    <Sidebar/>
    <div class="container">
      <h1 class="font-weight-bold text-center">Yemekhane Sistemi</h1>
<!--          <iframe-->
<!--            src="../assets/pdf/Facial_Feature_Selection_for_Gender_Reco.pdf"-->
<!--            width="100%"-->
<!--            height="100"-->
<!--            frameborder="0" >-->
<!--           </iframe>-->
      <b-card class="shadow-sm">

        <div v-for="item in cafeterias[0]" :key="item.id">{{item.title}}

        <embed v-if="item.pdfFile != null"
            :src="this.$apiFileUrl+'staticfiles/'+item.pdfPath"
            type="application/pdf"
            width="550"
            height="440"
        />
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar/Sidebar.vue'

export default {
  // eslint-disable-next-line
  name: 'Dining',
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
