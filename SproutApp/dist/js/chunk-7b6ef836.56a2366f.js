(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7b6ef836"],{"58a9":function(t,e,n){"use strict";var c=n("7a23"),o=Object(c["g"])("Preview"),r={class:"ion-padding"},a={style:{color:"green"}},i={class:"ion-padding"},s=Object(c["h"])("h5",null,"Explanation:",-1);function u(t,e,n,u,b,l){var j=Object(c["x"])("ion-title"),h=Object(c["x"])("ion-toolbar"),d=Object(c["x"])("ion-header"),O=Object(c["x"])("ion-content"),f=Object(c["x"])("ion-footer");return Object(c["q"])(),Object(c["e"])(c["a"],null,[Object(c["h"])(d,{class:"ion-no-border"},{default:Object(c["D"])((function(){return[Object(c["h"])(h,null,{default:Object(c["D"])((function(){return[Object(c["h"])(j,null,{default:Object(c["D"])((function(){return[o]})),_:1}),Object(c["h"])("div",{slot:"end",onClick:e[1]||(e[1]=function(){return t.dismiss&&t.dismiss.apply(t,arguments)}),class:"ion-padding"}," close ")]})),_:1})]})),_:1}),Object(c["h"])(O,{class:"ion-padding"},{default:Object(c["D"])((function(){return[Object(c["h"])("div",r,[Object(c["h"])("h5",null,Object(c["z"])(t.question),1)]),Object(c["h"])("ul",null,[Object(c["h"])("li",a,Object(c["z"])(t.answer),1),(Object(c["q"])(!0),Object(c["e"])(c["a"],null,Object(c["w"])(t.choices,(function(t,e){return Object(c["q"])(),Object(c["e"])("li",{key:e},Object(c["z"])(t),1)})),128))]),Object(c["h"])("div",i,[s,Object(c["h"])("p",null,Object(c["z"])(t.explanation),1)])]})),_:1}),Object(c["h"])(f,{class:"ion-padding ion-text-center ion-no-border"},{default:Object(c["D"])((function(){return[Object(c["h"])("sub",null,Object(c["z"])(t.hash),1)]})),_:1})],64)}var b=n("d867"),l=Object(c["i"])({name:"Modal",props:{token:{type:Object,default:function(){return{hash:0,question:"Question",answer:"Answer",choices:[],explanation:""}}}},computed:{hash:function(){return this.token.hash},question:function(){return this.token.question},answer:function(){return this.token.answer},choices:function(){return this.token.choices},explanation:function(){return""==this.token.explanation?"No Explanation":this.token.explanation}},methods:{dismiss:function(){b["G"].dismiss()}},components:{IonContent:b["h"],IonHeader:b["m"],IonTitle:b["B"],IonToolbar:b["D"]}});l.render=u;e["a"]=l},d381:function(t,e,n){"use strict";n.r(e);n("b0c0"),n("a4d3"),n("e01a");var c=n("7a23"),o={class:"header-art"},r={class:"ion-padding browse-header"},a=Object(c["h"])("br",null,null,-1),i=Object(c["g"])("Take MCQ"),s=Object(c["g"])("Read All");function u(t,e,n,u,b,l){var j=Object(c["x"])("ion-back-button"),h=Object(c["x"])("ion-buttons"),d=Object(c["x"])("ion-toolbar"),O=Object(c["x"])("ion-header"),f=Object(c["x"])("ion-button"),p=Object(c["x"])("ion-label"),m=Object(c["x"])("ion-item"),g=Object(c["x"])("ion-list"),k=Object(c["x"])("ion-content"),x=Object(c["x"])("ion-page");return Object(c["q"])(),Object(c["e"])(x,null,{default:Object(c["D"])((function(){return[Object(c["h"])(O,{class:"ion-no-border"},{default:Object(c["D"])((function(){return[Object(c["h"])(d,null,{default:Object(c["D"])((function(){return[Object(c["h"])(h,{slot:"start"},{default:Object(c["D"])((function(){return[Object(c["h"])(j,{icon:u.chevronBack},null,8,["icon"])]})),_:1})]})),_:1})]})),_:1}),Object(c["h"])(k,null,{default:Object(c["D"])((function(){return[Object(c["h"])("div",o,[Object(c["h"])("img",{src:l.banner,onerror:"this.src='/fallback/tile.png'"},null,8,["src"]),Object(c["h"])("h4",r,Object(c["z"])(b.name),1),Object(c["h"])("span",null,Object(c["z"])(b.description),1),a,Object(c["h"])(f,{class:"header-button",onClick:l.start},{default:Object(c["D"])((function(){return[i]})),_:1},8,["onClick"]),Object(c["h"])(f,{class:"header-button",onClick:l.read},{default:Object(c["D"])((function(){return[s]})),_:1},8,["onClick"])]),Object(c["h"])(g,null,{default:Object(c["D"])((function(){return[(Object(c["q"])(!0),Object(c["e"])(c["a"],null,Object(c["w"])(b.data,(function(t,e){return Object(c["q"])(),Object(c["e"])(m,{key:e,onClick:function(t){return l.open(e)}},{default:Object(c["D"])((function(){return[Object(c["h"])(p,{class:"item-subject"},{default:Object(c["D"])((function(){return[Object(c["h"])("b",null,Object(c["z"])(t.question),1),Object(c["h"])("span",null,Object(c["z"])(t.answer),1)]})),_:2},1024)]})),_:2},1032,["onClick"])})),128))]})),_:1}),Object(c["h"])(p,{class:"ion-padding"})]})),_:1})]})),_:1})}var b=n("1da1"),l=(n("96cf"),n("99af"),n("d867")),j=n("ff79"),h=n("58a9"),d={setup:function(){return{chevronBack:j["f"]}},components:{IonPage:l["t"],IonContent:l["h"],IonButtons:l["d"],IonHeader:l["m"],IonToolbar:l["D"],IonButton:l["c"],IonBackButton:l["b"],IonList:l["r"],IonItem:l["p"],IonLabel:l["q"]},data:function(){return{name:"Subject",description:"Subject description",data:[]}},mounted:function(){var t=this;console.log("Subject"),""!=this.category&&""!=this.subject?this.$store.dispatch("getSubject",{category:this.category,subject:this.subject}).then((function(e){t.name=e.name,t.description=e.description,t.data=e.data})):this.$router.push({name:"browse"})},computed:{course:function(){return this.$store.state.course},category:function(){return this.$route.params.category||""},subject:function(){return this.$route.params.subject||""},items:function(){return"".concat(this.data.length," Items")},banner:function(){return"/db/".concat(this.course,"/").concat(this.category,"/").concat(this.subject,"/default.png")}},methods:{open:function(t){var e=this;return Object(b["a"])(regeneratorRuntime.mark((function n(){var c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log(t),n.next=3,l["G"].create({component:h["a"],componentProps:{token:e.data[t]},backdropDismiss:!0,swipeToClose:!0});case 3:return c=n.sent,n.abrupt("return",c.present());case 5:case"end":return n.stop()}}),n)})))()},start:function(){var t=this.$store.state.data.data[this.category].name;window.MCQ.reset(),this.$store.dispatch("getTokens",[{category:t,subject:this.name,path:"/db/".concat(this.course,"/").concat(this.category,"/").concat(this.subject,"/index.json")}])},read:function(){this.$router.push({name:"read",params:{category:this.category,subject:this.subject}})}}};d.render=u;e["default"]=d}}]);
//# sourceMappingURL=chunk-7b6ef836.56a2366f.js.map