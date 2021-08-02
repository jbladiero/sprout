<template lang="html">
  <ion-card class="tile" @click="preview">
    <img src="@/theme/fallback/tile.png">
    <b>{{name}}</b><br>
    <span>{{description}}</span>
  </ion-card>
</template>

<script>

import { IonCard } from '@ionic/vue'


export default {
  name:'history',
  props:{
    token:Object
  },
  methods:{
    preview(){
      console.log('Preview:' + `${this.source}`);
      //this.$router.push('/app/me')
      this.$router.push(`/app/browse/${this.source}`);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
