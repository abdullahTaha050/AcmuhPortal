<template>
<div>
    <div v-for="item in data" :key="item.id">
      <b-card-group deck class="mt-5 deneme">
        <b-card :img-src="'https://localhost:44346/api/activity/image?filename='+item.imagePath" img-alt="Card image" img-left class="mb-3">
          <b-card-text class="text-center font-weight-bold d-flex align-items-center" style="font-size: x-large;">
            <div>{{item.title}} </div>
          </b-card-text>
<!--          <b-card-text v-html="item.content"></b-card-text>-->
          <b-card-text>
            <div>{{item.addedBy}}</div>
          </b-card-text>
          <b-card-text>
            {{fixDataTime(item.created_At)}}
          </b-card-text>
          <b-card-text class="d-flex justify-content-end">
                        <router-link :to="'/user/activity/'+item.id" tag="a" class="btn btn-primary">Detaya Git</router-link>
          </b-card-text>

        </b-card>
      </b-card-group>
    </div>
</div>
</template>

<style>
  .deneme{
    -webkit-box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.35);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
</style>

<script>
import moment from "moment";

export default {
  props: {
    // eslint-disable-next-line
    data: { type: Array, required: false, default:[] },
  },
  data(){
    return {
      isLoading: true,
    }
  },
  methods:{
    fixDataTime(value){
      moment.locale('tr'); 
      return moment(value).format('lll');
    }
  },
  created(){
    this.time= data
  }
}
</script>