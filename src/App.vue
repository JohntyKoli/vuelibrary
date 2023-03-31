<template>
  <div>

  
  <Navbar></Navbar>

  <router-view />
</div>
</template>


<script>
import Navbar from './views/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>