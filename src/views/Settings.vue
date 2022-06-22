<template>
    <div class="container">
        <div class="pt-5">
            <Sidebar/>
                <div class="row">
                  <div class="col-md-6">
                    <b-card class="shadow-sm">
                      <h5 class="pb-3">Excel Dosyasından Kullanıcı Ekle</h5>
                      <form @submit.prevent="onSubmit" enctype="multipart/form-data">
                        <div>
                          <input id="excel1" type="file" @change="uploadExcel" ref="excelFile" class="form-control">
                        </div>
                        <div class="pt-3 text-end">
                          <button id="add-excell" class="btn btn-primary" type="submit">
                            <b-spinner v-if="excelLoader" small></b-spinner>  Kaydet
                          </button>
                        </div>
                      </form>
                    </b-card>
                  </div>
                  <div class="col-md-6">
                    <b-card class="shadow-sm">
                      <h5 class="pb-3">Yeni Bölüm Ekle</h5>
                      <b-card-text>
                        <div>
                          <label class="form-label">Mevcut Bölümler</label>
                          <select class="form-select">
                            <option  v-for="item in departments" :value="item.id" :key="item.id">{{item.departmentName}}</option>
                          </select>
                        </div>
                      </b-card-text>
                      <b-card-text>
                        <form @submit.prevent="addNewDepartment">
                          <label class="form-label">Yeni Bölüm</label>
                          <input type="text" class="form-control" v-model="newDepartmentName"/>
                          <small class="text-danger">Lütfen bölüm adını başında ve sonunda boşluk olmayacak şekilde, ilk harfi büyük olarak girin.</small>
                          <div class="text-end">
                            <button id="new-department" class="btn btn-primary" type="submit">
                              <b-spinner v-if="newDepartmentLoader" small></b-spinner>  Ekle
                            </button>
                          </div>
                        </form>
                      </b-card-text>
                    </b-card>
                  </div>
                    <div class="col-md-6">
                      <b-card class="shadow-sm">
                        <h5 class="pb-3">Eklenen Kullanıcılara Yetki Vermek İçin Ekle</h5>
                        <form @submit.prevent="onSubmitTwo" enctype="multipart/form-data">
                          <div>
                            <input id="excel" type="file" @change="uploadExcelTwo" ref="excelFile2" class="form-control">
                          </div>
                          <div class="pt-3 text-end">
                            <button id="add-excel" class="btn btn-primary" type="submit">
                              <b-spinner v-if="excelLoader" small></b-spinner>  Kaydet
                            </button>
                          </div>
                        </form>
                      </b-card>
                    </div>
                  </div>
        </div>
    </div>
</template>


<script>
import Sidebar from '../components/Sidebar/Sidebar.vue'
export default {
    // eslint-disable-next-line
    name: "Settings",
    components: {
    Sidebar
  },
  data(){
      return{
        excelFile:"",
        excelFileTwo:"",
        departments: null,
        newDepartmentName: "",
        newDepartmentLoader: false,
        excelLoader: false,
        excelLoaderTwo: false
      }
  },
  created() {
      this.getDepartmentData()
  },
  methods: {
      uploadExcel(event) {
      this.excelFile = event.target.files[0];
    },
      uploadExcelTwo(event){
      this.excelFileTwo = event.target.files[0];
      },
    enableLoader(id){
      let btn = document.getElementById(id);
      btn.disabled = true;
      if (id.includes("department")){
        this.newDepartmentLoader= true;
      }
      this.excelLoader= true
    },
    disableLoader(id){
      let btn = document.getElementById(id);
      btn.disabled = false;
      if (id.includes("department")){
        this.newDepartmentLoader= false;
      }
      this.excelLoader= false;
    },
    async getDepartmentData(){
      let endPoint = 'Department/getall';
      await this.$axios.get(this.$apiUrl + endPoint,
          {headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            this.disableLoader("add-excel");
            if (response.data.data.length > 0){
              this.departments = response.data.data;
              console.log(this.departments)
            }
          })
          .catch(e => {
            this.disableLoader("add-excel");
            this.$toast("Bölümler getirilirken hata oluştu\n" +
                e, {
              timeout: 3000,
              toastClassName: "bg-danger"
            });
          })
    },

    async addNewDepartment(){
      this.enableLoader("new-department");
      let endPoint = 'Department/add';
      await this.$axios.post(this.$apiUrl + endPoint,{"departmentName": this.newDepartmentName} ,
          {headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            this.disableLoader("new-department")
            this.$toast("Yeni bölüm başarıyla oluşturuldu.\n", {
              timeout: 3000,
              toastClassName: "bg-success"
            });
          })
          .catch(e => {
            this.disableLoader("new-department")
            this.$toast("Yeni bölüm eklenirken hata oluştu\n" +
                e, {
              timeout: 3000,
              toastClassName: "bg-danger"
            });
          })
    },
    async onSubmit(){
      const formData = new FormData();
      formData.append('excelFile', this.excelFile, this.excelFile.name);
      let endPoint = 'User/AddExcelToDb';
      await this.$axios.post(this.$apiUrl+ endPoint , formData,
          {headers: {
              "Content-Type": "multipart/form-data",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            console.log(response)
            setTimeout(() => {
              this.$toast("Kullanıcılar eklendi.", {
                timeout: 3000,
                toastClassName: "bg-success"
              });
            }, "1000")
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
    async onSubmitTwo(){
      const formData = new FormData();
      if (this.excelFileTwo !== ""){
        formData.append('excelFile', this.excelFileTwo, this.excelFileTwo.name);
      }
      let endPoint = 'UserOperationClaim/AddClaimExcel';
      await this.$axios.post(this.$apiUrl+ endPoint , formData,
          {headers: {
              "Content-Type": "multipart/form-data",
              "Authorization" : "Bearer "+ this.$store.getters.getToken
            }})
          .then(response => {
            console.log(response)
            setTimeout(() => {
              this.$toast("Kullanıcılar eklendi.", {
                timeout: 3000,
                toastClassName: "bg-success"
              });
            }, "1000")
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
  }
}
</script>