var json = [ tmas, satcom, radiowave, optic, noise, modulation, microwave, digicom, broadcast, antenna, acoustic]

var data = {
  tmas:{name:"Transmission Media and Antenna Systems", description:"",type:"subject",  data:tmas},
  satcom:{name:"Satellite Communications", description:"", type:"subject", data:satcom},
  radio:{name:"Radio Wave Propagation", description:"", type:"subject", data:radiowave},
  optic:{name:"Optics", description:"", data:optic},
  noise:{name:"Noise", description:"", data:noise},
  modulation:{name:"Modulation", description:"", type:"subject", data:modulation},
  microwave:{name:"Microwave", description:"", type:"subject", data:microwave},
  digicom:{name:"Digital Communications", description:"", type:"subject", data:digicom},
  broadcast:{name:"Broadcasting", description:"", type:"subject", data:broadcast},
  antenna:{name:"Antennas", description:"", type:"subject", data:antenna},
  acoustic:{name:"Acoustics", description:"", type:"subject", data:acoustic},
}

var HASH = Date.now();
var count= 0;

tokenize = (token)=>{
  return {
    hash:++HASH,
    question:token.question,
    answer:token.answer,
    choices:token.choices,
    explanation:"",
    image:"none"
  }
}


convert=(json)=>{
  temp = (JSON.parse(json));
  temp = temp.map(token=>{
    return tokenize(token);
  })
  count+=temp.length
  return temp
}


window.onload = ()=>{
  main = document.getElementById('main')
  Object.keys(data).map(d=>{
    data[d].data = convert(data[d].data)

    main.innerHTML += `<h3>${d}<h3>
    <textarea>${JSON.stringify(data[d])}</textarea>
    <br><br>
    `
  })
  main.innerHTML+='<h1>'+count+'</h1>'

}
