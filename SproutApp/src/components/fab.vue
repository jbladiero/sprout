<template lang="html">
  <ion-fab vertical="bottom" horizontal="end" slot="fixed" v-show="active">
    <ion-fab-button @click="start" >
      <ion-icon :icon="leaf" size='small'/>
    </ion-fab-button>
  </ion-fab>
</template>

<script>
import { IonFab, IonFabButton, IonIcon } from '@ionic/vue'
import { leaf } from 'ionicons/icons'

export default {
  name:'fab',
  setup(){
    return{
      leaf
    }
  },
  components:{IonFab, IonFabButton, IonIcon},
  methods:{
    start(){
      this.$router.push({name:'mcq'})
    }
  },
  computed:{
    active(){
      return this.$store.state.mcqReady;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
