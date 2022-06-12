<template>
    <div style="overflow-y:scroll; height: 300px">
           <table class="table table-hover">
             <thead>
             <tr>
               <th scope="col">İsim</th>
               <th scope="col">Soyad</th>
               <th scope="col">Bölüm</th>
               <th scope="col">Okul Numrası</th>
             </tr>
             </thead>
             <tbody>
             <tr v-for="item in data" :key="item.id">
               <td colspan="1">{{item.firstName}}</td>
               <td colspan="1">{{item.lastName}}</td>
               <td colspan="1">{{item.departmentName}}</td>
               <td colspan="1">{{item.schoolNumber}}</td>
             </tr>
             </tbody>
           </table>
    </div>
</template>
<script>
export default {
  props: {
    // eslint-disable-next-line
    data: { type: Array, required: false, default:[] },
  },
  data(){
    return {
      isLoading: true
    }
  },
}
</script>