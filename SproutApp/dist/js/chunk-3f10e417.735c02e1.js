(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f10e417"],{"1a11":function(t,e,n){"use strict";n("7d07")},"58a9":function(t,e,n){"use strict";var o=n("7a23"),c=Object(o["g"])("Preview"),i={class:"ion-padding"},l={style:{color:"green"}},a={class:"ion-padding"},u=Object(o["h"])("h5",null,"Explanation:",-1);function r(t,e,n,r,b,s){var h=Object(o["x"])("ion-title"),d=Object(o["x"])("ion-toolbar"),j=Object(o["x"])("ion-header"),O=Object(o["x"])("ion-content"),f=Object(o["x"])("ion-footer");return Object(o["q"])(),Object(o["e"])(o["a"],null,[Object(o["h"])(j,{class:"ion-no-border"},{default:Object(o["D"])((function(){return[Object(o["h"])(d,null,{default:Object(o["D"])((function(){return[Object(o["h"])(h,null,{default:Object(o["D"])((function(){return[c]})),_:1}),Object(o["h"])("div",{slot:"end",onClick:e[1]||(e[1]=function(){return t.dismiss&&t.dismiss.apply(t,arguments)}),class:"ion-padding"}," close ")]})),_:1})]})),_:1}),Object(o["h"])(O,{class:"ion-padding"},{default:Object(o["D"])((function(){return[Object(o["h"])("div",i,[Object(o["h"])("h5",null,Object(o["z"])(t.question),1)]),Object(o["h"])("ul",null,[Object(o["h"])("li",l,Object(o["z"])(t.answer),1),(Object(o["q"])(!0),Object(o["e"])(o["a"],null,Object(o["w"])(t.choices,(function(t,e){return Object(o["q"])(),Object(o["e"])("li",{key:e},Object(o["z"])(t),1)})),128))]),Object(o["h"])("div",a,[u,Object(o["h"])("p",null,Object(o["z"])(t.explanation),1)])]})),_:1}),Object(o["h"])(f,{class:"ion-padding ion-text-center ion-no-border"},{default:Object(o["D"])((function(){return[Object(o["h"])("sub",null,Object(o["z"])(t.hash),1)]})),_:1})],64)}var b=n("d867"),s=Object(o["i"])({name:"Modal",props:{token:{type:Object,default:function(){return{hash:0,question:"Question",answer:"Answer",choices:[],explanation:""}}}},computed:{hash:function(){return this.token.hash},question:function(){return this.token.question},answer:function(){return this.token.answer},choices:function(){return this.token.choices},explanation:function(){return""==this.token.explanation?"No Explanation":this.token.explanation}},methods:{dismiss:function(){b["G"].dismiss()}},components:{IonContent:b["h"],IonHeader:b["m"],IonTitle:b["B"],IonToolbar:b["D"]}});s.render=r;e["a"]=s},"7d07":function(t,e,n){},"9bb7":function(t,e,n){"use strict";n.r(e);var o=n("7a23"),c=Object(o["F"])("data-v-449cbf42");Object(o["t"])("data-v-449cbf42");var i=Object(o["g"])("App Developer"),l=Object(o["h"])("div",{class:"ion-padding"},[Object(o["h"])("h2",null,"John Brell G. Ladiero"),Object(o["h"])("img",{src:"/assets/jbl.jpg",alt:""}),Object(o["h"])("p",null," Hello, I am an Electronics Engineering graduate. I love programming so much that I code when I'm bored, excited, and even lonely. Sometimes I do electronics to kill time, not a typical hobby but it's more enjoyable when it gets complicated. Long story short, I love engineering and designing. "),Object(o["h"])("p",null," Shout out to all my friends out there, I couldn't make it without y'all. I may not be blessed to be the best but at least I have my friends, They're the best at what they do! I can't list you all here but I'll probably make a section for all of you, Let me take the spotlight for a while. Hahahaha. ")],-1),a=Object(o["g"])(" John Brell G. Ladiero "),u=Object(o["g"])(" @jbladiero "),r=Object(o["g"])(" jblgwapo ");Object(o["r"])();var b=c((function(t,e,n,b,s,h){var d=Object(o["x"])("ion-title"),j=Object(o["x"])("ion-back-button"),O=Object(o["x"])("ion-buttons"),f=Object(o["x"])("ion-toolbar"),p=Object(o["x"])("ion-header"),g=Object(o["x"])("ion-icon"),m=Object(o["x"])("ion-label"),I=Object(o["x"])("ion-item"),x=Object(o["x"])("ion-content"),k=Object(o["x"])("ion-page");return Object(o["q"])(),Object(o["e"])(k,null,{default:c((function(){return[Object(o["h"])(p,{class:"ion-no-border"},{default:c((function(){return[Object(o["h"])(f,null,{default:c((function(){return[Object(o["h"])(d,null,{default:c((function(){return[i]})),_:1}),Object(o["h"])(O,{slot:"start"},{default:c((function(){return[Object(o["h"])(j,{icon:b.chevronBack},null,8,["icon"])]})),_:1})]})),_:1})]})),_:1}),Object(o["h"])(x,null,{default:c((function(){return[l,Object(o["h"])(I,null,{default:c((function(){return[Object(o["h"])(g,{slot:"start",icon:b.logoFacebook},null,8,["icon"]),Object(o["h"])(m,{class:"ion-padding"},{default:c((function(){return[a]})),_:1})]})),_:1}),Object(o["h"])(I,null,{default:c((function(){return[Object(o["h"])(g,{slot:"start",icon:b.logoTwitter},null,8,["icon"]),Object(o["h"])(m,{class:"ion-padding"},{default:c((function(){return[u]})),_:1})]})),_:1}),Object(o["h"])(I,null,{default:c((function(){return[Object(o["h"])(g,{slot:"start",icon:b.logoGithub},null,8,["icon"]),Object(o["h"])(m,{class:"ion-padding"},{default:c((function(){return[r]})),_:1})]})),_:1})]})),_:1})]})),_:1})})),s=n("d867"),h=n("ff79"),d=(n("58a9"),{name:"whoami",setup:function(){return{chevronBack:h["f"],logoFacebook:h["p"],logoGithub:h["q"],logoTwitter:h["r"]}},components:{IonPage:s["t"],IonContent:s["h"],IonTitle:s["B"],IonButtons:s["d"],IonHeader:s["m"],IonToolbar:s["D"],IonBackButton:s["b"],IonLabel:s["q"],IonItem:s["p"],IonIcon:s["n"]}});n("1a11");d.render=b,d.__scopeId="data-v-449cbf42";e["default"]=d}}]);
//# sourceMappingURL=chunk-3f10e417.735c02e1.js.map