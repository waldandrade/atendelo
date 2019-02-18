<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  props: {
    source: String
  }
}
</script>
