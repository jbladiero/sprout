<template lang="html">
  <ion-page>
    <!-- Back button with custom text and icon -->
    <ion-header class="ion-no-border">
      <ion-toolbar >
        <ion-title>App Developer</ion-title>
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


        <h2>John Brell G. Ladiero</h2>
        <img src="/assets/jbl.jpg" alt="">
        <p>
          Hello, I am an Electronics Engineering graduate. I love programming so much that I code when I'm bored, excited, and even lonely. Sometimes I do electronics to kill time, not a typical hobby but it's more enjoyable when it gets complicated. Long story short, I love engineering and designing.
        </p>

        <p>
          Shout out to all my friends out there, I couldn't make it without y'all. I may not be blessed to be the best but at least I have my friends, They're the best at what they do! I can't list you all here but I'll probably make a section for all of you, Let me take the spotlight for a while. Hahahaha.
        </p>
      </div>





      <ion-item>
        <ion-icon slot="start" :icon="logoFacebook" />
        <ion-label class="ion-padding">
          John Brell G. Ladiero
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-icon slot="start" :icon="logoTwitter" />
        <ion-label class="ion-padding">
          @jbladiero
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-icon slot="start" :icon="logoGithub" />
        <ion-label class="ion-padding">
          jblgwapo
        </ion-label>
      </ion-item>


    </ion-content>
  </ion-page>
</template>

<script>


import {
  IonPage, IonContent, IonTitle,
  IonButtons, IonHeader, IonToolbar,
  IonBackButton,
  IonLabel,IonItem, IonIcon

} from '@ionic/vue';

import { chevronBack, logoFacebook, logoGithub, logoTwitter } from 'ionicons/icons';
import Preview from '@/_browse/preview.vue'


export default {
  name:'whoami',
  setup(){
    return{
      chevronBack,logoFacebook, logoGithub, logoTwitter
    }
  },
  components:{
    IonPage, IonContent,IonTitle,
    IonButtons, IonHeader, IonToolbar,
    IonBackButton, IonLabel,IonItem, IonIcon
  },







}
</script>

<style media="screen" scoped>
  p{
    text-align: justify;
  }

  img{
    border-radius: 17px;
    box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06);
  max-width: 256px;
  margin: auto;
  display: block;
  }
</style>
