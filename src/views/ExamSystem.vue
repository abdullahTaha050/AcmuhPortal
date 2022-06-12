<template>
  <div>
    <h2 class="text-center font-weight-bold pt-5">Sınav Sistemi'ne yönlendirileceksiniz.</h2>
    <Sidebar/>
    <div class="container py-5 px-5 justify-content-center d-flex">
      <a href="http://sacmfsinav.tk/" rel="noreferrer" class="btn btn-primary">Sınav Sistemi'ne Gitmek İçin Tıklayın.</a>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar/Sidebar.vue'

export default {
  components: {
    Sidebar,
  }
}
</script>
