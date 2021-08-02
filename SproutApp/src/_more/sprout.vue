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


      <div class="ion-padding" id="text">
        <img src="/assets/boot.png" alt="" id="image-info">

        <p style="text-align:justify;">
          Sprout is the latest iteration of my MCQ software. It started off as JBL's ARC (Automatic Review Companion) which I used as a regular reviewer to pass my exam without exhausting too much time and effort. Then it proved useful in the long run which made me upgrade some of its features as necessities follow. I made a portable edition, website, PWA, etc... It evolved from JBL's ARC to Engineering Playgrounds until it became a bonafide mobile app as my programming gets better.
          <br><br>
Graphics are inspired by my love of music and arts. It is quite similar to a music browser as well as its artwork from my personal taste. Back when this project had started, I really want to make this online but for financial reasons, I couldn't and I decided I wouldn't pour a large amount of money into this app. I kept finding solutions that would work until I thought of this app thingy, And so the coding begins.
<br><br>
The Idea of sprout is to be the vessel of self-learning. Because learning is daunting, learning is boring, until it's not. I choose sprout because a few months ago, a dear friend of mine was talking about a great app called "forest". The idea is to plant trees as a reward for being productive. Sprout, on the other hand, is about yourself growing as you review. We are all part of a forest, "growing" as we tap into this stream of collective thoughts, hence the name sprout. So let me know if it does help you and what more can it help by suggesting new features.
        </p>
      </div>



      <ion-label class="ion-padding">
        - JB Ladiero
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

<style media="screen" scoped="">
  #text{
    position: relative;
  }
  #image-info{
    background-color: white;
    display: block;
    margin: auto;
    width: 40%;
    max-width: 256px;
    border-radius: 30px;
    box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06);
  }
</style>
