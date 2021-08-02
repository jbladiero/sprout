<template>
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <ion-title>Preview</ion-title>
      <div slot="end" @click="dismiss" class="ion-padding">
        close
      </div>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">




    <div class="ion-padding">
      <h5>
        {{question}}
      </h5>
    </div>

    <ul>
      <li style="color:green;">{{answer}}</li>
      <li v-for="(choice,c) in choices" :key="c">{{choice}}</li>
    </ul>

    <div class="ion-padding">
      <h5>Explanation:</h5>
      <p>
        {{explanation}}
      </p>
    </div>

  </ion-content>
  <ion-footer class="ion-padding ion-text-center ion-no-border" >
    <sub>{{hash}}</sub>
  </ion-footer>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter } from '@ionic/vue';

import { modalController } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Modal',
  props: {
    token: { type: Object,
      default: function(){
        return{
          hash:0,
          question:'Question',
          answer:'Answer',
          choices:[],
          explanation:''
        }
      }
    },
  },
  computed:{
    hash(){
      return this.token.hash
    },
    question(){
      return this.token.question
    },
    answer(){
      return this.token.answer
    },
    choices(){
      return this.token.choices
    },
    explanation(){
      return (this.token.explanation==''?'No Explanation': this.token.explanation )
    },


  },
  methods:{
    dismiss(){
      modalController.dismiss();
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar }
});
</script>
