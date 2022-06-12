<template>
  <div>
    <h2 class="text-center font-weight-bold pt-5">DUYURULAR</h2>
    <Sidebar/>
    <div class="container py-5 px-5">
      <Table v-if="notifications" :data="notifications"/>
      <BaseLoading v-else/>
      <div>
      <router-link :to="'/notification/new/add'" tag="a" class="btn btn-primary mt-5">Duyuru Ekle</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import Sidebar from '../components/Sidebar/Sidebar.vue'
import Table from "../components/Dashboard/Table";
import BaseLoading from "../components/Global/BaseLoading";
import NoticeCard from "../components/Notice/NoticeCard.vue"

export default {
              // eslint-disable-next-line
  name: 'Notification',

  components: {
    BaseLoading,
    Table,
    Sidebar,
  },

  data(){
    return {
      notifications: null
    }
  },

  created(){
      this.getNotifications();
  },
  methods: {
    async getNotifications(){
      let endPoint = 'Notice/getdepartment';

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