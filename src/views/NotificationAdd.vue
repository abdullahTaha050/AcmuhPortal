<template>
  <div class="container">
    <div class="d-flex justify-content-center pt-5 ">
      <Sidebar/>
      <div class="row">
        <div class="col-md-8 text">
          <form @submit.prevent="onSubmit()" enctype="multipart/form-data">
            <b-card-group deck class="mt-6 deneme ">
              <h2 class="text-center p-2">İçerik</h2>
              <VueEditor v-model="post.content" />
              <div class="form-group">
                <label class="form-label" for="title">Başlık</label>
                <input id="title" v-model="post.title" type="text" class="form-control">
              </div>
              <div class="form-group mt-5">
                <label class="form-label">Bölüm</label>
                <select class="form-select" v-model="post.departmentId">
                  <option selected disabled>Lütfen Bölüm Seçin</option>
                  <option v-for="item in departments[0]" :value="item.id" :key="item.id">{{item.departmentName}}</option>
                </select>
              </div>
              <div class="d-flex align-items-center">
                <div class="form-group">
                  <label class="form-label" for="photo">Foto</label>
                  <input id="photo" type="file" @change="uploadFile" ref="file" class="form-control">
                </div>
                <div class="form-group">
                  <label class="form-label" for="pdf">PDF Dosya</label>
                  <input id="pdf" type="file" @change="uploadPdf" ref="pdfFile" class="form-control">
                </div>
              </div>
              <button type="submit" class="btn btn-info mt-5">Kaydet</button>
            </b-card-group>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '../components/Sidebar/Sidebar.vue'
import { VueEditor } from "vue2-editor";
export default {
  name: "NotificationAdd",
  components: {
    Sidebar,
    VueEditor,
  },

  data(){
    return {
      post : {
        title : "",
        content : "",
        departmentId : "",
        userId: 0
      },
      departments: [],
      imagePath : "",
      pdfPath : "",
    }
  },
  async created() {
    await this.getDepartmentData();
    this.setUserId();
  },
  methods : {
    uploadFile(event) {
      this.imagePath = event.target.files[0];
    },
    uploadPdf(event) {
      this.pdfPath = event.target.files[0];
    },
    setUserId(){
      let id = this.$store.getters.getUser[0].id;
      // this.post.userId = this.$store.getters.getUser[0].id;
      this.post.userId = id;
      console.log(id)
    },
    async getDepartmentData(){
      let endPoint = 'Department/getall';
      await this.$axios.get(this.$apiUrl + endPoint,
          {headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            let datas = response.data.data;
            for(var item in datas){
              this.departments.push(datas)
            }
          })
          .catch(e => {
              this.$toast("Bölümler getirilirken hata oluştu\n" +
                  e, {
                timeout: 3000,
                toastClassName: "bg-danger"
              });
          })
    },
    async onSubmit(){
      const formData = new FormData();
      if (this.imagePath !== ""){
        formData.append('file', this.imagePath, this.imagePath.name);
      }
      if (this.pdfPath !== ""){
        formData.append('pdfFile', this.pdfPath, this.pdfPath.name);
      }
      for ( var key in this.post ) {
        formData.append(key, this.post[key]);
      }
      let endPoint = 'Notice/add';
      await this.$axios.post(this.$apiUrl + endPoint , formData,
          {headers: {
              "Content-Type": "multipart/form-data",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            console.log(response)
            setTimeout(() => {
              this.$toast("Duyuru başarıyla eklendi.", {
                timeout: 3000,
                toastClassName: "bg-success"
              });
            }, "1000")
            this.$router.push('/notification')
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
    },
  }
}
</script>

<style scoped lang="css">
      @import "~vue2-editor/dist/vue2-editor.css";
      @import '~quill/dist/quill.core.css';
      @import '~quill/dist/quill.bubble.css';
      @import '~quill/dist/quill.snow.css';


  .deneme{
    -webkit-box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.35);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 40px;
  }
  .text{
    margin: auto;
  }
</style>