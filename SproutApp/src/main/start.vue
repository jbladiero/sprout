<template lang="html">
  <ion-page>
    <ion-content>
      <div id="container">
        <img src="/assets/boot.png" alt="">
      </div>
    </ion-content>
  </ion-page>

</template>

<script>

import { IonPage, IonContent } from '@ionic/vue';



export default {
  components:{
    IonPage, IonContent
  },
  mounted(){
    setTimeout(()=>{
      this.$store.dispatch('init').then(ready=>{
        if(ready){
          this.$router.push({name:'me'})
        }
      })
    }, 1000)
  }
}
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container img{
  width: 40%;
  max-width: 256px;
}
</style>
