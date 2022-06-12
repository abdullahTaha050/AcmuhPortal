<template>
  <div>
    <h2 class="text-center font-weight-bold pt-5">ETKİNLİKLER</h2>
    <Sidebar/>
    <div class="container py-5">
      <div class="text-end">
        <b-dropdown variant="primary" :text="this.isActiveDepartment ? 'Bölüm Duyuruları' : 'Genel Duyurular'">
          <b-dropdown-item @click="getActivitiesOfDepartment()">Bölüm Duyuruları</b-dropdown-item>
          <b-dropdown-item @click="getPublicActivities()">Genel Duyurular</b-dropdown-item>
        </b-dropdown>
      </div>
      <ActivityCard v-if="activities" :data="activities"/>
      <BaseLoading v-else />
    </div>

  </div>
</template>

<script>
import Sidebar from '../components/Sidebar/Sidebar.vue'
import ActivityCard from "../components/Notice/ActivityCard.vue"
import BaseLoading from "../components/Global/BaseLoading";

export default {
  name: 'ActivityUser',

  components: {
    BaseLoading,
    ActivityCard,
    Sidebar,
  },

  data(){
    return {
      activities: null,
      userDepartment: 0,
      isActiveDepartment: false
    }
  },

  async created(){
    this.setUserDepartment();
    await this.getPublicActivities();
  },
  methods: {
    setUserDepartment(){
      this.userDepartment = this.$store.getters.getUser[0].departmentId;
    },
    async getActivitiesOfDepartment(){
      this.activities = null;
      this.isActiveDepartment = true;
      let endPoint = 'Activity/getbydepartmentid?id='+ this.userDepartment;

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
          .catch(e => {
            this.$toast("Etkinlikler getirilirken bir hata oluştu.\n" +
                e, {
              timeout: 3000,
              toastClassName: "bg-danger"
            });
          })
    },
    async getPublicActivities(){
      if (this.isActiveDepartment){
        this.isActiveDepartment = false;
        this.activities = null;
      }
      let endPoint = 'Activity/getbydepartmentid?id=4';

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