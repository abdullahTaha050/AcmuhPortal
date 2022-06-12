<template>
  <div class="sidebar" :class="{'align-items-center': collapsed}" :style="{ width: sidebarWidth + 'px' }">
    <div class="p-1">
      <img v-if="!collapsed" alt="erbakan_logo" src="/img/login_logo.png" class="img-sidebar-logo" />
      <img v-else alt="erbakan_logo" src="/img/login_logo.png" class="img-sidebar-collapsed-logo" />
       
    </div>

    <div class="pt-5" v-if="isAdmin">
      <SidebarLink to="/" icon="fas fa-home" activePage="/" :collapsed="collapsed">Ana Sayfa</SidebarLink>
      <SidebarLink to="/notification" icon="fa-solid fa-image" activePage="/notification" :collapsed="collapsed">Duyuru</SidebarLink>
      <SidebarLink to="/activities" icon="fas fa-calendar" activePage="/activities" :collapsed="collapsed">Etkinlikler </SidebarLink>
      <SidebarLink to="/dining" icon="fas fa-utensils" activePage="/dining" :collapsed="collapsed">Yemek Bilgileri</SidebarLink>
      <SidebarLink to="/exam-system" icon="fas fa-users" activePage="/exam-system" :collapsed="collapsed">Sınav Sistemi</SidebarLink>
      <SidebarLink to="/student-communities" icon="fas fa-comments" activePage="/student-communities" :collapsed="collapsed">Öğrenci Toplukları</SidebarLink>
      <SidebarLink to="/settings" icon="fas fa-gear" activePage="/settings" :collapsed="collapsed">Ayarlar</SidebarLink>
    </div>

    <div class="pt-5" v-else>
      <SidebarLink to="/user/notification" icon="fas fa-home" activePage="/user/notification" :collapsed="collapsed">Ana Sayfa</SidebarLink>
      <SidebarLink to="/user/activity" icon="fas fa-image" activePage="/user/activity" :collapsed="collapsed">Etkinlikler </SidebarLink>
      <SidebarLink to="/exam-system" icon="fas fa-users" activePage="/exam-system" :collapsed="collapsed">Sınav Sistemi</SidebarLink>
      <SidebarLink to="/student-communities" icon="fas fa-comments" activePage="/student-communities" :collapsed="collapsed">Öğrenci Toplukları</SidebarLink>

    </div>

    <a @click="logout">
      <i class="fas fa-right-from-bracket pt-2"></i>
      </a>
    <span class="collapse-icon" :class="{ 'rotate-180': collapsed }" @click="toggleSidebar()">
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<script>
import SidebarLink from '../Sidebar/SidebarLink.vue'

export default {
  // eslint-disable-next-line
  name: 'Sidebar',
  components: { SidebarLink },
  data() {
    return { 
        collapsed: false,
        sidebarWidth: 180,
        userClaims:null,
        isAdmin: false
    }
  },
  async created(){
      // this.collapsed = this.$store.getters.getCollapsed;
      // this.collapsed = true;
      await this.setSidebarWidth();
      await this.getClaims();
  },
  methods: {
      logout(){
        this.$store.dispatch('logout');
      },
      async getClaims(){
        let isAdmin = await this.$store.getters.getIsAdmin;
        if (isAdmin){
          return this.isAdmin = true;
        }
      },
      setSidebarWidth(){
        this.collapsed = true;
        let width = this.$store.getters.getSidebarWidth  
        if (this.collapsed) {
            return this.sidebarWidth = 90;
        }
        return this.sidebarWidth = width;
      },
      toggleSidebar(){
        this.collapsed = !this.collapsed;
        this.setSidebarWidth();
      }
  } 
}
</script>

<style>
:root {
  --sidebar-bg-color: #11457c;
  --sidebar-item-hover: #0590b1;
  --sidebar-item-active: #0590b1;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
