<template>
  <v-card elevation="2" class="p-2">
    <v-data-table
        :headers="headers"
        :items="data"
        :items-per-page="5"
        class="elevation-1"></v-data-table>
  </v-card>
</template>
<script>
export default {
  props: {
    // eslint-disable-next-line
    data: { type: Array, required: false, default:[] },
  },
  data(){
    return {
      isLoading: true,
      headers: [
        { text: 'Ad', align: 'start', value: 'firstName'},
        { text: 'Soyad', value: 'lastName' },
        { text: 'Bölüm', value: 'departmentName' },
        { text: 'Okul Numarası', value: 'schoolNumber' }
      ],
    }
  },
}
</script>