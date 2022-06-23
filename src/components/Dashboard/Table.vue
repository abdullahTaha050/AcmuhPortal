<template>
    <div>
           <table class="table table-hover">
             <thead>
             <tr>
               <th scope="col">Başlık</th>
               <th scope="col">İçerik</th>
               <th scope="col">Bölüm</th>
               <th scope="col">İşlemler</th>
             </tr>
             </thead>
             <tbody>
             <tr v-for="item in this.data" :key="item.id">
               <td colspan="1">{{item.title}}</td>
               <td colspan="1" class="long-notice-content-hidden" v-html="item.content"></td>
               <td colspan="1">{{item.departmentName}}</td>
               <td>
                 <router-link :to="'notification/'+item.id" tag="a" class="btn btn-primary">Düzenle</router-link>
                 <a @click="deleteNotification(item.id)" class="btn btn-danger">Sil</a>
               </td>
             </tr>
             </tbody>
           </table>
    </div>
</template>
<script>
export default {
  // eslint-disable-next-line
  name: 'Table',
  props: {
    // eslint-disable-next-line
    data: { type: Array, required: false, default:[] },
  },
  // eslint-disable-next-line
  data(){
    return {
      isLoading: true,
      // eslint-disable-next-line
      data: []
    }
  },
  created() { // eslint-disable-next-line
    this.data = this.props.data;
  },
  methods:{
    async getNotifications(){
      let endPoint = 'Notice/getdepartment';

      await this.$axios.get(this.$apiUrl + endPoint,
          {headers: { // eslint-disable-next-line
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            if (response.data.data.length > 0){ 
              // eslint-disable-next-line
              this.data = response.data.data;
            }
          })
          .catch(e => console.log(e))
    },
    async deleteNotification(id){
      let text = "Duyuruyu Silmek İstediğinize Emin Misiniz?";
      if (confirm(text)) {

        let endPoint = 'Notice/delete';
        await this.$axios.delete(this.$apiUrl + endPoint,
            {headers: { // eslint-disable-next-line
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+ this.$store.getters.getToken
          }, data: {"id": id}
          },
        ).then(response => {
          // eslint-disable-next-line
              this.data = [];
              setTimeout(() => {
                this.$toast("Duyuru başarıyla silindi.", {
                  timeout: 3000,
                  toastClassName: "bg-success"
                });
              }, "1000")
              this.$router.push('/notification');
              this.getNotifications();
            })
            .catch(e => {
              setTimeout(() => {
                this.$toast("Bir hata oluştu\n" +
                    e, {
                  timeout: 3000,
                  toastClassName: "bg-danger"
                });
              }, "1000")
            })
      }
    },
  }
}
</script>