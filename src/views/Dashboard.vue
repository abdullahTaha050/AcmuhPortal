<template>
  <div class="d-flex justify-content-center">
    <Sidebar/>
      <div class="container pt-md-5 mobile">
        <div>
          <Cards v-if="users" :data="users"/>
        </div>
        <div class="pt-md-5">
          <UserTable v-if="users" :data="users"/>
          <BaseLoading v-else/>
        </div>
        <v-card elevation="2" class="p-3 mt-5">
          <h4>Kullanıcı Sayfaları</h4>
          <router-link :to="'/user/notification'" tag="a" class="btn btn-success mt-5" style="margin-right: 1rem">Duyuru Sayfası</router-link>
          <router-link :to="'/user/activity'" tag="a" class="btn btn-warning mt-5" >Etkinlik Sayfası</router-link>
        </v-card>
      </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar/Sidebar.vue'
import Cards from '../components/Dashboard/Cards.vue'
import UserTable from '../components/Dashboard/UserTable.vue'

export default {
  // eslint-disable-next-line
  name: 'Dashboard',
  components: {
    Sidebar,
    Cards,
    UserTable
  },
  data(){
    return{
      users: null
    }
  },
  created(){
      this.getUser();
  },
  methods:{
    async getUser(){
      let endPoint = 'User/getuserswithdepartmentname';

      await this.$axios.get(this.$apiUrl + endPoint,
          {headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            if (response.data.data.length > 0){
              this.users = response.data.data;
            }
          })
          .catch(e => console.log(e))
    }
  }
}
</script>


