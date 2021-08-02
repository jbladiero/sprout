import { createApp } from 'vue'
import { createStore } from 'vuex'
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import router from '@/dependencies/router'


const startup = {
    async init(store){
      if(store.state.course!=''){
        return store.state.course
      }

      const res = await fetch('/db/index.json')
      const app = await res.json()
      store.state.index = app;
      console.log(JSON.stringify(app));

      let data = await Storage.get({ key: 'user' })
      console.log(data);
      if(data.value==null){
        console.log('No Userdata');
        router.push({name:'setup'});
        store.state.showTabs = false;
        return false
      }

      const userdata = JSON.parse(data.value);
      console.log(userdata);
      console.log('All Good!');
      store.state.name = userdata.name;
      store.state.fullname = userdata.fullname;
      store.state.course = userdata.course;

      data = await Storage.get({ key: 'history' });
      if(data.value==null){ store.state.history = [] }
      else { store.state.history = JSON.parse(data.value) }
      console.log(store.state.history);

      data = await Storage.get({ key: 'recents' });
      if(data.value==null){ store.state.recents = [] }
      else { store.state.recents = JSON.parse(data.value) }
      console.log(store.state.recents);

      data = await Storage.get({ key: 'statistics' });
      if(data.value==null){ store.state.statistics = {} }
      else { store.state.statistics = JSON.parse(data.value) }
      console.log(store.state.statistics);

      store.state.data = await store.dispatch('getCourse');
      return userdata.course
  },


    async setup(store, {name, fullname, course}){
      console.log('Setting Up');

      Storage.set({
        key: 'user',
        value: JSON.stringify({ name:name, fullname:fullname,course:course })
      })

      await store.dispatch('init')
      store.state.showTabs = true;
      router.push({name:'me'})
    },
}

const getData = {
  async getIndex(store){
    console.log('Accessing Index: ');
    const res = await fetch(`/db/index.json`, { method:'GET' })
    const data = await res.json();
    console.log('GET Response');
    store.state.version = data.version;
    return data
  },
  async getCourse(store){
    const course = store.state.course
    if(!store.state.index.data[course]){
      router.push({name:'setup'})
      return
    }
    console.log('Accessing Course: ' + course);
    const res = await fetch(`/db/${course}/index.json`, { method:'GET' })
    const data = await res.json();
    console.log('GET Response');
    return data
  },
  async getCategory(store, category){
    const course = store.state.course
    console.log('Accessing Category: ' + category);
    const res = await fetch(`/db/${course}/${category}/index.json`, { method:'GET' })
    const data = await res.json();
    console.log('GET Category: status OK!');
    return data
  },
  async getSubject(store, {category, subject}){
    const course = store.state.course
    console.log('Accessing Subject: ' + subject);
    const res = await fetch(`/db/${course}/${category}/${subject}/index.json`, { method:'GET' })
    if (!res.ok) {
      return{
        name:'Subject Error',
        description:'Nothing to show here',
        count:0,
        data:[]
      }
    }
    const data = await res.json();
    console.log('GET Subject: status OK!');
    return data
  },
  async getTokens(store, bank){
    window.MCQ.reset();
     for (let i = 0; i < bank.length; i++){
       let res = await fetch(bank[i].path);
       res = await res.json()
       window.MCQ.load = bank[i].path;
       window.MCQ.chunk = res.data.map( item => {
         item.path = bank[i].path.replace('index.json', '');
         item.category = bank[i].category;
         item.subject = bank[i].subject;
         return item
       });
     }
     window.MCQ.newToken();
     router.push({name:'mcq'})
    store.state.mcqReady=true;
  }
}



const setData = {
  async setHistory(store, token){

    token = JSON.parse(JSON.stringify(token));
    store.state.history.unshift(token);

    // Delete old history
    if(store.state.history.length>50){
      store.state.history.pop();
    }
    console.log(store.state.history);

    Storage.set({key:'history', value:JSON.stringify(store.state.history)})

  },
  async setStatistics(store, answer){

    console.log('Stats: ');
    console.log(`correct:${answer.correct}, category:${answer.category}, subject:${answer.subject}`);
    //prepare
    store.state.statistics[answer.category]
    = store.state.statistics[answer.category]
    || { percentage:0, answered:0, correct:0, data:{} }


    store.state.statistics[answer.category].data[answer.subject]
    = store.state.statistics[answer.category].data[answer.subject]
    || { percentage:0, answered:0, correct:0 }


    store.state.statistics[answer.category].answered++;
    store.state.statistics[answer.category].data[answer.subject].answered++;


    if(answer.correct){
      store.state.statistics[answer.category].correct++;
      store.state.statistics[answer.category].data[answer.subject].correct++;
    }

    store.state.statistics[answer.category].percentage = Math.round(100*(store.state.statistics[answer.category].correct/store.state.statistics[answer.category].answered))
    store.state.statistics[answer.category].data[answer.subject].percentage = Math.round(100*(store.state.statistics[answer.category].data[answer.subject].correct/store.state.statistics[answer.category].data[answer.subject].answered))


    Storage.set({key:'statistics', value:JSON.stringify(store.state.statistics)})


  },
  async setRecent(store, recent){
    // name, description, category, code
    store.state.recents = store.state.recents.filter(r=>{
      if(r.code==recent.code && r.category==recent.category){ return false; }
      else { return true; }
    })

    store.state.recents.unshift(recent)
    Storage.set({key:'recents', value:JSON.stringify(store.state.recents)})
  },


}


const reset = {
  async resetHistory(store){
    store.state.history = [];
    Storage.remove({key:'history'})
  },
  async resetRecents(store){
    store.state.recents = [];
    Storage.remove({key:'recents'})
  },
  async resetStatistics(store){
    store.state.statistics = {};
    Storage.remove({key:'statistics'})
  },
  async resetUserdata(store){
    store.dispatch('resetHistory');
    store.dispatch('resetRecents');
    store.dispatch('resetStatistics');
    Storage.remove({key:'user'})
    window.location.reload();
  }


}



const store = {
  state (){
    return {
      //userdata
      name:'',
      course:'',
      recents:[],
      history:[],
      statistics:{},
      //module
      token:null,
      bank:[], /* Question Compiled */

      //index
      index:{},


      //app
      showTabs:true,
      mcqReady:false,
    }
  },



  actions:{
    ...startup,
    ...getData,
    ...setData,
    ...reset
  }
}



// Create a new store instance.
export default createStore(store)
