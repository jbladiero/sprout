<template lang="html">
  <ion-page>
    <!-- Back button with custom text and icon -->
    <ion-header class="ion-no-border">
      <ion-toolbar >
        <ion-buttons slot="start" >
          <ion-back-button
              :icon="chevronBack"
              >
          </ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>


      <div class="ion-padding">

        <img src="" alt="">

        <h2>CALSO</h2>
        <p>
          CALSO stands for <b>"Creativity and Learning Systems Organization"</b>. It is a mockup company that I made. Back when I was younger, I knew for myself that I wanted to change the world. At that time I didn't know what action to take or what move to make. Until this pandemic came, a lot of ups and downs happened. The board exams being postponed and a lot of graduates hanging out there. Review businesses start to appear everywhere and I just can't stand how they hoard information for the sake of money! CALSO is my way of sharing information for the betterment of our society.

        </p>
        <p>
          Disclaimer: I do not own the test banks nor do I take any credit from them. The term sharing is used because I'm basically handing it over to others for the sake of compassion. I don't intend to infringe copyright
        </p>
      </div>



      <ion-label class="ion-padding">
        God Bless...
      </ion-label>


    </ion-content>
  </ion-page>
</template>

<script>


import {
  IonPage, IonContent,
  IonButtons, IonHeader, IonToolbar,
  IonBackButton,
  IonLabel,

} from '@ionic/vue';

import { chevronBack } from 'ionicons/icons';
import Preview from '@/_browse/preview.vue'


export default {
  name:'whoami',
  setup(){
    return{
      chevronBack
    }
  },
  components:{
    IonPage, IonContent,
    IonButtons, IonHeader, IonToolbar,
    IonBackButton, IonLabel
  },







}
</script>


<style media="screen" scoped>
    p{
      text-align: justify;
    }
</style>
