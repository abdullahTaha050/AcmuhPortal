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
      <div class="card bg-primary">
        <div class="card-body">
          <h5 class="card-title text-white"> <i class="fas fa-calendar"></i> Bilgisayar Öğrenci Sayısı</h5>
          <h4 class="card-text text-white">{{activitiescount}}</h4>
        </div>
      </div>
    </div>

    <div class="col-md-3 my-2">
      <div class="card bg-primary">
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
      notificationscount:0
    }
  },
  created(){
    this.userCount();
    this.getActivities();
    this.getNotifications();
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
    }
  }
};
</script>

<style scoped>

</style>