<template>
  <div class="row">
    <div class="col-md-3 my-2">
      <div class="card bg-success">
        <div class="card-body">
          <h5 class="card-title text-white"> <i class="fas fa-users"></i> Kayıtlı Kullanıcı Sayısı</h5>
          <h4 class="card-text text-white">{{usercount}}</h4>
        </div>
      </div>
    </div>

    <div class="col-md-3 my-2">
      <div class="card bg-secondary">
        <div class="card-body">
          <h5 class="card-title text-white"> <i class="fas fa-calendar"></i> Bilgisayar Öğrenci Sayısı</h5>
          <h4 class="card-text text-white">{{departcount}}</h4>
        </div>
      </div>
    </div>

       <div class="col-md-3 my-2">
      <div class="card bg-primary">
        <div class="card-body">
          <h5 class="card-title text-white"> <i class="fas fa-calendar"></i> Makine Öğrenci Sayısı</h5>
          <h4 class="card-text text-white">{{depart}}</h4>
        </div>
      </div>
    </div>

    <div class="col-md-3 my-2">
      <div class="card bg-warning">
        <div class="card-body">
          <h5 class="card-title text-white"> <i class="fas fa-calendar"></i> Kayıtlı Etkinlik Sayısı</h5>
          <h4 class="card-text text-white">{{activitiescount}}</h4>
        </div>
      </div>
    </div>

    <div class="col-md-3 my-2">
      <div class="card bg-info">
        <div class="card-body">
          <h5 class="card-title text-white"> <i class="fa-solid fa-image"></i> Kayıtlı Duyuru Sayısı</h5>
          <h4 class="card-text text-white">{{notificationscount}}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  name: 'Cards',
  props:{
    // eslint-disable-next-line
    data: { type: Array, required: false, default:[] },
  },
  data(){
    return{
      usercount:0,
      activitiescount:0,
      notificationscount:0,
      departcount:0,
      depart:0
    }
  },
  created(){
    this.userCount();
    this.getActivities();
    this.getNotifications();
    this.getUser();
    this.getUserr();
  },
  methods:{
    userCount(){
      this.usercount = this.data.length
    },
    async getActivities(){
      let endPoint = 'Activity/getactiviteswithdepartmentnames';

      await this.$axios.get(this.$apiUrl + endPoint,
          {headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            if (response.data.data.length > 0){
              this.activitiescount = response.data.data.length;
            }
          })
          .catch(e => console.log(e))
    },
    async getNotifications(){
      let endPoint = 'Notice/getdepartment';

      await this.$axios.get(this.$apiUrl + endPoint,
          {headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            if (response.data.data.length > 0){
              this.notificationscount = response.data.data.length;
            }
          })
          .catch(e => console.log(e))
    },
    async getUser(){
      let endPoint = 'User/getbydepartmentid?id=2';

      await this.$axios.get(this.$apiUrl + endPoint,
          {headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            if (response.data.data.length > 0){
               let a = response.data.data.length;
               this.departcount = a;
               console.log(a)
            }
            
          })
          .catch(e => console.log(e))
    },
    async getUserr(){
      let endPoint = 'User/getbydepartmentid?id=1';

      await this.$axios.get(this.$apiUrl + endPoint,
          {headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            if (response.data.data.length > 0){
               let b = response.data.data.length;
               this.depart = b;
               console.log(a)
            }
            
          })
          .catch(e => console.log(e))
    }
  }
};
</script>

<style scoped>

</style>