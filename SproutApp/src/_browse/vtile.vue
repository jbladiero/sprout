<template lang="html">

  <ion-card class="vtile" @click="go">
    <img :src="src(code)" onerror="console.log('ERR');this.src='/fallback/tile.png'">
    <b>{{name}}</b><br>
    <span>{{description}}</span>
  </ion-card>
</template>
<script>

import { IonCard } from '@ionic/vue'


export default {
  name:'vtile',
  props:{
    name:String,
    description:String,
    code:String
  },
  methods:{
    go(){
      console.log('category:' + `${this.$store.state.course}-${this.code}`);
      //this.$router.push('/app/me')
      this.$router.push({name:'category', params:{ category:this.code }});
    },
    src(code){
      console.log(`/db/${this.course}/${code}/default.png`);
      return `/db/${this.course}/${code}/default.png`;
    }
  },
  computed:{
    course(){
      return this.$store.state.course
    }
  },
  components:{ IonCard }
}
</script>
