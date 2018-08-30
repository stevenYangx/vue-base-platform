<template>
  <section class="app-main">
    <!--<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>-->
    <breadcrumb></breadcrumb>
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from './breadcrumb/index'
  import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  name: 'AppMain',
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods:{
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>
