import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'




// dependencies
import router from '@/dependencies/router';
import store from '@/dependencies/store';
import http from '@/api/http';


//api


import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './design/variables.css';


/* Layout */
import './design/tabs.scss';
import './design/layout.css';
import './design/browse.css';




const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)
  .use(http);


router.isReady().then(() => {
  app.mount('#app');
});


console.log('Hello');


window.MCQ = {
  //private
  bank:[],
  tokens:[],
  token: {
    hash:0,
    question:'',
    answer:'',
    choices:[],
    explanation:'',
    image:''
  },
  //public
  get ready(){
    console.log('Bank Loaded: ' + this.bank.length);
    console.log(this.bank);
    console.log('MCQ Loaded: ' + this.tokens.length);

    return (this.bank.length==0 ? false : true )
  },
  set load(array){
    this.bank = this.bank.concat(array)
  },
  set chunk(array){
    this.tokens = [...this.tokens, ...array]
  },
  newToken(){
    if (this.bank.length==0){
      console.log('No tokens');
      this.token =  {
        hash:0,
        question:'',
        answer:'',
        choices:[],
        explanation:'',
        image:''
      }
      return
    }
    console.log('Random token');
    this.token = this.tokens[Math.floor(Math.random() * this.tokens.length)];
    console.log(this.token);
    return
  },
  reset(){
    this.bank = [];
    this.tokens = [];

  },

}
