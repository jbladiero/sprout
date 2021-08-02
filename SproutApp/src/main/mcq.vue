<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-back-button
              text=""
              :icon="closeOutline"
              defaultHref='/app/me'
              >
          </ion-back-button>
        </ion-buttons>
        <ion-title>
          {{name}}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="container">


        <div id="main" class="ion-padding">
          <h3>Question:</h3>
          {{question}}
        </div>

        <div id="image" v-if="image!='none'">
          <img :src="source" alt="" >
        </div>

        <div v-if="reveal" class="ion-padding">
          <h3>Explanation:</h3>
          {{explanation}}
        </div>


      </div>



</ion-content>



  <ion-footer class="ion-no-border ion-padding">

    <div id="choices" class="choices">
      <div class="choice ion-padding" v-for="(choice,c) in choices" :key="c" :remarks="choice.remarks" @click="choose(c)">
        {{choice.value}}
      </div>
    </div>


    <nav>
      <div class="button" id="previous" @click="prev">
        <ion-icon :icon="chevronBackOutline" size="small"></ion-icon>
        <span>prev</span>
      </div>
      <div class="hash">{{hash}}</div>
      <div class="button"  id="next" @click="next">
        <span>next</span>
        <ion-icon :icon="chevronForwardOutline" size="small"></ion-icon>
      </div>
    </nav>

</ion-footer>

  </ion-page>
</template>

<script lang="js">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonFooter, IonIcon,
  IonButtons, IonBackButton


} from '@ionic/vue';


import { chevronForwardOutline, chevronBackOutline, closeOutline} from 'ionicons/icons'



export default  {
  setup(){
    return{
      chevronForwardOutline, chevronBackOutline, closeOutline
    }
  },
  name: 'MCQ',

  components: {
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonFooter,
    IonButtons, IonBackButton, IonIcon

   //IonCardContent, IonCardSubtitle, IonCardTitle,
   },
   data(){
     return{
       loaded:0,
       tokens:[],

       // MCQ
       hash:12345,
       question:'',
       answer:'',
       choices:[{value:'choice', remarks:'none'}],
       explanation:'',
       image:'',
       path:'',
       details:{},

       reveal:false,

       // History
       historyIndex:-1,
     }
   },


   methods:{
     loadToken(token){
       this.hash = token.hash
       this.question = token.question
       this.answer = token.answer
       this.choices = token.choices
       this.image = token.image
       this.path = token.path
       this.details = { category:token.category, subject:token.subject}
       this.explanation = (this.explanation=='' ? 'No Explanation' : token.explanation)
       this.reveal = true;
     },
     getToken(){
       console.log('get Token');
      let token = window.MCQ.token
      console.log('Tokenizing');
      console.log(token);

      token = JSON.parse(JSON.stringify(token));

      this.hash = token.hash
      this.question = token.question
      this.answer = token.answer
      this.choices = this.shuffle(token.choices.concat(token.answer)).map(v=>{
        return { value:v, remarks:'ready' }
      })
      this.image = token.image
      this.path = token.path
      this.details = { category:token.category, subject:token.subject}
      this.explanation = (this.explanation=='' ? 'No Explanation' : token.explanation)
      this.reveal = false;
    },
    shuffle(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },
    choose(index){
      if(this.choices[index].remarks!='ready'){
        return
      }

      this.choices = this.choices.map((item, i) => {
        if(item.value==this.answer){ item.remarks='correct' }
        else if (i==index) { item.remarks='wrong' }
        else { item.remarks='none' }
        return item
      });
      this.reveal = true
      // add to History and Statistics
      this.$store.dispatch('setHistory', {
        hash:this.hash,
        question:this.question,
        choices:this.choices,
        image:this.image,
        explanation:this.explanation,
        path:this.path
      })

      this.$store.dispatch('setStatistics',{
        correct:this.answer==this.choices[index].value,
        category:this.details.category,
        subject:this.details.subject
      })

      this.historyIndex=0;
      window.MCQ.newToken()
    },
    next(){
      if(this.historyIndex<0){
        console.log('Answer first');
        return
      }
      this.historyIndex--;
      if(this.historyIndex>=0){
        this.loadToken(this.history[this.historyIndex])
        return
      }
      this.getToken();
    },
    prev(){
      if(this.historyIndex>=this.history.length){
        console.log('No more to preview');
        return;
      }
      console.log('Prev');
      this.historyIndex++
      this.loadToken(this.history[this.historyIndex])
    }
   },

  computed:{
    name(){
      return this.$store.state.name;
    },
    source(){
      return this.path +  `${this.hash}.${this.image}`
    },
    history(){
      return this.$store.state.history
    }
  },
  created(){
    console.log('created');
    this.getToken()
  }
}
</script>



<style media="screen" scoped>


.choices{
  max-height: 60vh;
  overflow: scroll;
}


.choice{
  animation: 0.4s;
  width: 100%;
  background-color: rgba(128,128,128,0.17);
  border-radius: 17px;

  color:var(--ion-color-mcq-contrast);
  margin-bottom: 4px;
  position: relative;
  line-height: 105%;
}

.choice[remarks=ready]:hover{
  background-color: rgba(128,128,128,0.3);
}



nav{
  display: flex;
}

nav .button{
  max-width: 170px;
  width: 100%;
}

nav .button span{
  vertical-align: top;
}

nav #previous{
  text-align: left;
}
nav #next{
    text-align: right;
}
nav .hash{
  align-self: center;
  width: 100%;
  text-align: center;
  vertical-align: center;
  font-size: 69%;
}





.container {
  display: flex;
  flex-direction: column;

}

.container #image{
  max-height: 300px;
  max-width: 400px;
  margin: auto;
}



.container #main{
  height: 100%;
  overflow-y: scroll;
}

.container #choices{
  flex-grow: 1;

  height: auto;
}


#choices{
  padding-bottom: 1em;
}



@keyframes correct {
  from {background-color: var(--green);
    padding-left: 0;
  }
  to {
    padding-left: 10px;
    background-color: white;}
}

[remarks=correct]{
  color: var(--green);
  font-weight: bold;
    border: none;
}

[remarks=wrong]{
  color: var(--red);
  font-weight: bold;
  border: none;
}

ion-footer{
  border-radius: 17px 17px 0px 0px ;
}

</style>
