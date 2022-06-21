<template>
  <div>
    <Sidebar />
    <div class="py-5 mx-notice">
      <div class="container">
        <h2 class="text-center mb-3 joan font-weight-bold">{{ post.title }}</h2>
        <p class="joan notice-detail-font-size" v-html="post.content"></p>
        <div class="row justify-content-center">
          <div class="col-md-12 mb-5">
            <img
              class="image"
              :src="this.$apiUrl + 'activity/image?filename=' + this.imagePath"
              alt="Card image cap"
            />
          </div>
        </div>
        <embed
          v-if="pdfPath"
          :src="this.$apiFileUrl + 'staticfiles/' + this.pdfPath"
          type="application/pdf"
          width="100%"
          height="800px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar/Sidebar.vue";
export default {
  name: "ActivityDetail",

  components: {
    Sidebar,
  },

  data() {
    return {
      post: {
        id: 0,
        title: "",
        content: "",
        departmentId: "",
      },
      departments: [],
      imagePath: "",
      pdfPath: '',
    };
  },
  async created() {
    await this.getActivityData();
  },
  methods: {
    async getActivityData() {
      let endPoint = "Activity/getbyid?id=" + this.$route.params.id;
      await this.$axios
        .get(this.$apiUrl + endPoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.getters.getToken,
          },
        })
        .then((response) => {
          this.post.id = this.$route.params.id;
          this.post.title = response.data.data.title;
          this.post.content = response.data.data.content;
          this.post.departmentId = response.data.data.departmentId;
          this.imagePath = response.data.data.imagePath;
          this.pdfPath = response.data.data.pdfPath;
          if (this.imagePath !== "") {
            let imageEndPoint = "Activity/image?filename=" + this.imagePath;

            this.$axios
              .get(this.$apiUrl + imageEndPoint, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + this.$store.getters.getToken,
                },
              })
              .then((response) => {
                this.currentImage = response.data;
              })
              .catch("fotoğraf bulunamadı");
          }
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style scoped>
.text {
  text-align: center;
}

.image {
  width: 100%;
  height: 500px;
  text-align: center;
  object-fit: contain;
}
.accordion {
  margin: auto;
  width: 600px;
}
.accordion input {
  display: none;
}
.box {
  position: relative;
  background: white;
  height: 60px;
  transition: all 0.15s ease-in-out;
}
.box::before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  box-shadow: 0 -1px 0 #e5e5e5, 0 0 2px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.24);
}
.box-title {
  width: calc(100% - 40px);
  height: 64px;
  line-height: 64px;
  padding: 0 20px;
  display: inline-block;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.box-content {
  width: calc(100% - 40px);
  padding: 30px 20px;
  font-size: 11pt;
  color: rgba(0, 0, 0, 0.54);
  display: none;
}
.box-close {
  position: absolute;
  height: 64px;
  width: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
  display: none;
}
input:checked + .box {
  height: auto;
  margin: 16px 0;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16), 0 6px 12px rgba(0, 0, 0, 0.32);
}
input:checked + .box .box-title {
  border-bottom: 1px solid rgba(0, 0, 0, 0.18);
}
input:checked + .box .box-content,
input:checked + .box .box-close {
  display: inline-block;
}
.arrows section .box-title {
  padding-left: 44px;
  width: calc(100% - 64px);
}
.arrows section .box-title:before {
  position: absolute;
  display: block;
  content: "\203a";
  font-size: 18pt;
  left: 20px;
  top: -2px;
  transition: transform 0.15s ease-in-out;
  color: rgba(0, 0, 0, 0.54);
}
input:checked + section.box .box-title:before {
  transform: rotate(90deg);
}
.shadow {
  -webkit-box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.35);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>