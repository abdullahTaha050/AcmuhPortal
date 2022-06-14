<template>
  <div>
    <h2 class="text-center font-weight-bold pt-5">DUYURULAR</h2>
    <Sidebar/>
    <div class="container py-5">
      <div class="text-end">
        <b-dropdown variant="primary" :text="this.isActiveDepartment ? 'Bölüm Duyuruları' : 'Genel Duyurular'">
          <b-dropdown-item @click="getNotificationsOfDepartment()">Bölüm Duyuruları</b-dropdown-item>
          <b-dropdown-item @click="getPublicNotifications()">Genel Duyurular</b-dropdown-item>
        </b-dropdown>
      </div>
      <NoticeCard v-if="notifications" :data="notifications"/>
      <BaseLoading v-else />
    </div>

  </div>
</template>

<script>
import Sidebar from '../components/Sidebar/Sidebar.vue'
import NoticeCard from "../components/Notice/NoticeCard.vue"
import BaseLoading from "../components/Global/BaseLoading";

export default {
  name: 'NotificationUser',

  components: {
    BaseLoading,
    NoticeCard,
    Sidebar,
  },

  data(){
    return {
      notifications: null,
      userDepartment: 0,
      isActiveDepartment: false
    }
  },

  async created(){
    this.setUserDepartment();
    await this.getPublicNotifications();
  },
  methods: {
    setUserDepartment(){
      this.userDepartment = this.$store.getters.getUser[0].departmentId;
    },
    async getNotificationsOfDepartment(){
      this.notifications = null;
      this.isActiveDepartment = true;
      let endPoint = 'Notice/getbydepartmentid?id='+ this.userDepartment;

      await this.$axios.get(this.$apiUrl + endPoint,
          {headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            if (response.data.data.length > 0){
              this.notifications = response.data.data;
            }
          })
          .catch(e => {
            this.$toast("Duyurular getirilirken bir hata oluştu.\n" +
                e, {
              timeout: 3000,
              toastClassName: "bg-danger"
            });
          })
    },
    async getPublicNotifications(){
      if (this.isActiveDepartment){
        this.isActiveDepartment = false;
        this.notifications = null;
      }
      let endPoint = 'Notice/getbydepartmentid?id=5';

      await this.$axios.get(this.$apiUrl + endPoint,
          {headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            if (response.data.data.length > 0){
              this.notifications = response.data.data;
            }
          })
          .catch(e => console.log(e))
    }
  }
}
</script>

<style lang="css">

</style>