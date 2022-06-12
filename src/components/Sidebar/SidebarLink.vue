<template>
  <router-link :to="to" class="link p-2 " :class="{ active: isActive, 'justify-content-center': collapsed }">
    <i class="icon" :class="icon" />
    <transition name="fade">
      <span v-if="!collapsed">
        <slot />
      </span>
    </transition>
  </router-link>
</template>

<script>

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
    collapsed: { type: Boolean, required: true },
    activePage: { type: String, required: true }
  },
  data(){
    return {
      isActive: false
    }
  },
  created(){
    this.setActive();
  },

  methods:{
    setActive(){
        if (to === activePage) {
        return this.isActive = true;
      }
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.link {
  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;

  margin: 0.1em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  color: white;
  text-decoration: none;
}

.link:hover {
  transition: background-color 0.5s;
  background-color: var(--sidebar-item-hover);
}

.router-link-exact-active {
  background-color: var(--sidebar-item-active);
}

.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}
</style>