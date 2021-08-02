v<template lang="html">
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

        <h2>Thank You</h2>
        <p>
          Thank you for using this app. This is for you, because you have what it takes to pass that exam!
          And when you do, I'll be silently celebrating for being a part of your journey.
        </p>

        <h3>Special Thanks to:</h3>

        <h5>Ala Villalobos</h5>
        <p>
          Nothing beats a great attitude towards a goal that's soon to be realized.
          This guy taught me that no matter what happens, we embrace our future with optimism.
        </p>

        <h5>Angelo De Guzman</h5>
        <p>
          Your silence and patience taught me a lot. .......... And don't laugh when you read this!
        </p>

        <h5>Drezel Villalobos</h5>
        <p>
          Thanks for all the ideas that led me to this. You have that vibe that triggers enthusiasm to everyone you talk to.
        </p>

        <h5>Ethel Rose Olegario</h5>
        <p>
          How can I not thank the one who's always grateful towards others?
        </p>

        <h5>Jap Barrera</h5>
        <p>
          This friend is the one that'll always believe in you no matter the circumstances are.
          He's the Sensei, Pro Athlete, DJ and most importantly the Life Coach
        </p>

        <h5>Jay Banal</h5>
        <p>
          Thanks for all the efforts that made this app happened. You've just plagarized a whole website. HAHAHAHAHA
        </p>

        <h5>Jonalyn Gelacio</h5>
        <p>
          Stay optimistic fellow ARMY! Special mention to BTS as well
        </p>

        <h5>Joshua Azuelo</h5>
        <p>
          My tech buddy, you can't go wrong with this guy. Probably the guy whom I could relate so much.
          He loves almost everything (if not all) about engineering and stuffs.
          He's simple yet complicated. He's complicated yet simplified.
        </p>

        <h5>Michael La Torre</h5>
        <p>
          Probably the first guy I met in college and the first guy I'll meet when I'm in a pinch.
          He's the Cold one, but more Importantly, he will never leave you along the way.
          A tsundere to be more accurate, a friend whose demons are tamed.
        </p>

        <h5>Patrick Raposas</h5>
        <p>
          Jack of all trades! He's one of the top on my "smart persons" list.
        </p>

        <h5>Shayne Rodillas</h5>
        <p>
          Our travel buddy, the initiator and the one who brings joy within our circle of friends.
          You're thoughtful in a lot of ways, it's great to have you around.
        </p>

        <h5>Zach Espiritu</h5>
        <p>
          One of the most wholesome person I knew. He won't hesitate to help simply because he genuinely cares.
        </p>

      </div>

      <ion-label class="ion-padding">
        I'm blessed with great friends
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
  name:'thanks',
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
      margin-bottom: 3em;
    }
</style>
