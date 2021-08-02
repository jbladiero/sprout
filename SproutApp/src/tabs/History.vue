<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>History</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">History</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="ion-padding" v-if="history.length==0">
        <br><center>No Items</center>
      </div>
      <div>
        <ion-card v-for="(token, t) in history" :key="t" class="ion-padding">
          <p>{{token.question}}</p>
          <ul>
            <li v-for="(choice, c) in token.choices" :key="c" :remarks="choice.remarks">{{choice.value}}</li>

          </ul>

        </ion-card>
      </div>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard } from '@ionic/vue';

export default  {
  name: 'Tab3',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  computed:{
    history(){
      return this.$store.state.history
    }
  },

}
</script>


<style media="screen" scoped>


    [remarks=correct]{
      color: var(--green);
    }
    [remarks=wrong]{
      color: var(--red);
    }
</style>
