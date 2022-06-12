<template>
  <div>
    <h2 class="text-center font-weight-bold pt-5">Etkinlikler</h2>
    <Sidebar/>
    <div class="container py-5 px-5">
      <ActivityTable v-if="activities" :data="activities"/>
      <BaseLoading v-else/>
      <div>
      <router-link :to="'/activity/new/add'" tag="a" class="btn btn-primary mt-5">Etkinlik Ekle</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import Sidebar from '../components/Sidebar/Sidebar.vue'
import ActivityTable from "../components/Dashboard/ActivityTable";
import BaseLoading from "../components/Global/BaseLoading";


export default {
  // eslint-disable-next-line
  name: 'Activity',

  components: {
    BaseLoading,
    ActivityTable,
    Sidebar,
  },

  data(){
    return {
      activities: null
    }
  },

  created(){
      this.getActivities();
  },
  methods: {
    async getActivities(){
      let endPoint = 'Activity/getactiviteswithdepartmentnames';

      await this.$axios.get(this.$apiUrl + endPoint,
          {headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            if (response.data.data.length > 0){
              this.activities = response.data.data;
            }
          })
          .catch(e => console.log(e))
    }
  }
}
</script>

<style lang="css">

</style>
