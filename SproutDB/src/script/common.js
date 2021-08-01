const modal = {
  backdrop(){
    var instance = document.getElementById('modal');
    if(instance.getAttribute('status')=='ERR'){
      console.log('Err');
      //return
    }
    instance.setAttribute('status', 'NONE')
  },
  alert(message, header='Alert', html=''){
    console.log('alert');
    var instance = document.getElementById('modal');
    instance.setAttribute('status', 'OK');
    document.getElementById('header').innerHTML = header;
    document.getElementById('message').innerHTML = message;
    document.getElementById('html').innerHTML = html;

  },
  error(message, header='ERROR'){
    var instance = document.getElementById('modal');
    instance.setAttribute('status', 'ERR');
    document.getElementById('header').innerHTML = header;

    document.getElementById('message').innerHTML = message;
  },
}


const Queue = {
  cache:[],
  update(tokens){
    console.log('Updating Queue: ' + tokens.length + ' items');
    this.cache = this.cache.concat(tokens);
    this.count();
    console.log(`Queue Updated: ${this.cache.length}`);
  },
  count(){
    var count  = this.cache.length;
    counter = document.getElementsByClassName('count');
    console.log(count);
    for (var i = 0; i < counter.length; i++) {
      counter[i].innerHTML = count
    }
  },
  getItem(){
    const token = this.cache.shift();
    this.count();
    return token;
  }
}

const http = {
  async GET(link){
    var res = await fetch(link, { method:'GET' })
    var data = await res.json();
    console.log('GET Response');
    console.log(data);
    return data
  },
  async POST(link, params={}){
    console.log('POST: '+ link);
    var res = await
    fetch(link,{
      method:'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    var data = await res.json();
    console.log('POST Response');
    console.log(data);
    return data
  }
}










const debug = {
  log(text){
    document.getElementById('debug').innerHTML = text
  },
  clear(){
    this.log('')
  }
}

const tab=target=>{
  document.getElementById('anchor').setAttribute('active', target)
}


// Initialize Index File
const load_index=()=>{
  http.GET('/api/read/').then(idx=>{
    console.log('Struct Init!');

    var struct = document.getElementById('courses-struct')
    var editor = document.getElementById('editor-course')

    struct.innerHTML = '';
    editor.innerHTML = '<option value="">-- Select Course --</option>';


    Object.keys(idx.data).map(d=>{
      struct.innerHTML += `<li onclick="Struct.course=this" class="course-struct" value="${d}"><b>${idx.data[d].name}</b><p>${idx.data[d].description}</p></li>`
      editor.innerHTML += `<option value="${d}">${idx.data[d].name}</option>`;
    })
  })
}


window.onload=()=>{
  tab('edit');
  Queue.count();
  load_index();


}
