<template>
  <div class="container">
    <div class="d-flex justify-content-center pt-5">
      <Sidebar/>
      <div class="row">
        <div class="col-md-8">
          <form @submit.prevent="updateActivity" enctype="multipart/form-data">
            <div class="mt-5">
              <h2 class="text-center p-2">Etkinliği Düzenle</h2>
              <VueEditor v-model="post.content" />
              <div class="form-group">
                <label class="form-label" for="title">Başlık</label>
                <input id="title" v-model="post.title" type="text" class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Bölüm
                  <span class="font-weight-bold" v-if="currentDepartment !== ''">{{"   ("+currentDepartment+")"}}</span>
                </label>
                <select class="form-select" v-model="post.departmentId">
                  <option selected disabled>Lütfen Bölüm Seçin</option>
                  <option v-for="item in departments[0]" :value="item.id" :key="item.id">{{item.departmentName}}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="photo">Foto</label>
                <input id="photo" type="file" @change="uploadFile" ref="file" class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label" for="pdf">Pdf</label>
                <input id="pdf" type="file" @change="uploadPdf" ref="file" class="form-control">
              </div>
              <button type="submit" class="btn btn-info mt-5">Kaydet</button>
            </div>
          </form>
        </div>
        <div class="col-md-4 pt-5">
          <img :src="'https://localhost:44346/api/activity/image?filename='+this.imagePath"
               :alt="'notice-'+this.$route.params.id"
               style="max-width: 100%;" class="img-thumbnail mt-5">
          <div class="box-content">
            <embed
                :src="this.$apiFileUrl+'staticfiles/'+this.pdfPath"
                type="application/pdf"
                width="550"
                height="440"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar/Sidebar.vue'
import { VueEditor } from "vue2-editor";
export default {
  name: "ActivityEdit",
  components: {
    Sidebar,
    VueEditor
  },

  data(){
    return {
      post : {
        id: 0,
        title : "",
        content : "",
        departmentId : "",
      },
      departments: [],
      currentDepartment: "",
      imagePath : "",
      pdfPath : "",
      currentImage: null,
      ifPhotoUploaded: false,
      ifPdfUploaded: false
    }
  },

  async created() {
    await this.getActivityData();
    await this.getDepartmentData();
    await this.getCurrentDepartment();
  },

  methods : {
    uploadFile(event) {
      this.imagePath = event.target.files[0];
      this.ifPhotoUploaded = true;
    },
    uploadPdf(event) {
      this.pdfPath = event.target.files[0];
      this.ifPdfUploaded = true;
    },
    async updateActivity(){
      const formData = new FormData();
      if (this.ifPhotoUploaded){
        formData.append('file', this.imagePath, this.imagePath.name);
      }
      if (this.ifPdfUploaded){
        formData.append('pdfFile', this.pdfPath, this.pdfPath.name);
      }
      for ( var key in this.post ) {
        formData.append(key, this.post[key]);
      }
      let endPoint = 'Activity/update';
      await this.$axios.patch(this.$apiUrl + endPoint , formData,
          {headers: {
              "Content-Type": "multipart/form-data",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            setTimeout(() => {
              this.$toast("Etkinlik başarıyla güncellendi.", {
                timeout: 3000,
                toastClassName: "bg-success"
              });
            }, "1000")
            this.$router.push('/activities')
          })
          .catch(e => {
              this.$toast("Bir hata oluştu\n" +
                  e, {
                timeout: 3000,
                toastClassName: "bg-danger"
              });
          })
    },
    async getActivityData(){
      let endPoint = 'Activity/getbyid?id='+this.$route.params.id;
      await this.$axios.get(this.$apiUrl + endPoint,
          {headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
             this.post.id = this.$route.params.id;
             this.post.title = response.data.data.title;
             this.post.content = response.data.data.content;
             this.post.departmentId = response.data.data.departmentId;
             this.imagePath = response.data.data.imagePath;
             this.pdfPath = response.data.data.pdfPath;
            if (this.imagePath !== ""){
              let imageEndPoint = 'Activity/image?filename='+this.imagePath;

               this.$axios.get(this.$apiUrl + imageEndPoint,
                  {headers: {
                      "Content-Type": "application/json",
                      "Authorization" : "Bearer "+ this.$store.getters.getToken
                    }})
                  .then(response => {
                    this.currentImage = response.data;
                  })
                  .catch("fotoğraf bulunamadı")
            }
          })
          .catch(e => console.log(e))
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
          .catch(e => console.log(e))
    },
    async getCurrentDepartment(){
      let getById = 'department/getbyid?id='+this.post.departmentId;

      await this.$axios.get(this.$apiUrl + getById,
          {headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            this.currentDepartment = response.data.data.departmentName;
          })
          .catch("bölüm bulunamadı")
    }
  }
}
</script>

<style scoped lang="css">
      @import "~vue2-editor/dist/vue2-editor.css";
      @import '~quill/dist/quill.core.css';
      @import '~quill/dist/quill.bubble.css';
      @import '~quill/dist/quill.snow.css';
</style>