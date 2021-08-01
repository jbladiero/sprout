console.log('Editor Init');
const Editor = {
  uploaded:0,
  fromQueue(){
    if(Queue.cache.length==0){
      modal.alert('Queue Is Empty', 'No Data');
      return
    }
    const token = Queue.getItem()
    document.getElementById('form').setAttribute('answer', token.answer.key);



    document.getElementById('question').value = token.question;
    if (token.answer.value!='') {
      document.getElementById('suggested').innerHTML = `Suggested: ${token.answer.value}`
    }

    const choices = document.getElementsByClassName('cin')
    console.log(choices);
    for (var i = 0; i < choices.length; i++) {
      choices[i].value = token.choices[i]
    }

    document.getElementById('cue').value++;
    

  },
  swap(key){
    var buffer = document.getElementById('A').value;
    var target = document.getElementById(key);
    var a = document.getElementById('A')
    a.value = target.value;
    target.value = buffer;

    const form = document.getElementById('form')
    if(key == form.getAttribute('answer')){
      form.setAttribute('answer', 'A');
    }
    else if ('A' == form.getAttribute('answer')) {
      form.setAttribute('answer', key);
    }


  },
 active:{
   course:"",
   category:"",
   subject:"",


 },

  set course(code){

    categories = document.getElementById('editor-category')
    subjects = document.getElementById('editor-subject')

    this.active.course = code
    if(code==""){
      categories.innerHTML=""
      subjects.innerHTML=""
      this.active.category = ""
      this.active.subject = ""
      return
    }


    //fetch data
    http.GET(`/api/read/course/${code}`).then(res=>{

      if(res.status=="ERR"){
        modal.error(res.message, 'Error')
      }

      categories.value="";
      categories.innerHTML='<option value="">-- Select Category --</option>';
      Object.keys(res.data).map(c=>{
        categories.innerHTML+=`<option value="${c}">${res.data[c].name}</option>`;
      })
    })

    // update dom
    document.getElementById('editor-subject').innerHTML = "";


  },

  set category(code){
    subjects = document.getElementById('editor-subject')

    this.active.category = code
    if(code==""){
      subjects.innerHTML=""
      this.active.subject = "";
      return
    }

    http.GET(`/api/read/category/${this.active.course}-${code}`).then(res=>{

      if(res.status=="ERR"){
        modal.error(res.message, 'Error')
      }

      subjects.value="";
      subjects.innerHTML='<option value="">-- Select Subject --</option>';
      Object.keys(res.data).map(s=>{
        subjects.innerHTML+=`<option value="${s}">${res.data[s].name}</option>`
      })
    })
  },

  set subject(key){
    this.active.subject = key
  },


  async submit(){
    //

    // prepare tokens
    //
    //http
    if( this.active.course=="" || this.active.category=="" || this.active.subject==""){
      modal.alert('Please Configure Destination(Subject) Before Uploading', 'No destination')
      return;
    }
    //get values
    var question = document.getElementById('question').value;

    var A = document.getElementById('A').value;
    var B = document.getElementById('B').value;
    var C = document.getElementById('C').value;
    var D = document.getElementById('D').value;
    var E = document.getElementById('E').value;

    var explanation = document.getElementById('explanation').value;
    var image = document.getElementById('image');



    //validate
    var choices = [B,C,D,E].filter(v=>{
      v = v.trim();
      return (v=="" ? false : true)
    })

    if(choices.length<3){
      modal.alert('Incomplete Choices', 'Form Error')
      return
    }


    var img = {
      type:'none',
      data:'none',
    };


    function readFileAsync(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onloadend = () => {
        resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      })
    }


    if(image.files[0]){
      console.log('has image');
      img.type = image.value.split('.').pop().toLowerCase()
      img.data = await readFileAsync(image.files[0])
    }

    console.log(img);


    var req = {
      subject:Editor.active.subject,
      category:Editor.active.category,
      course:Editor.active.course,

      token:{
        hash: Date.now(),
        question:question,
        answer:A,
        choices:choices,
        explanation:explanation,
        image:img.type
      },
      image:img.data
    }





    http.POST('/api/update/token', req).then(res=>{
      if (res.status=='OK'){
        document.getElementById('question').value = ''
        document.getElementById('A').value = ''
        document.getElementById('B').value = ''
        document.getElementById('C').value = ''
        document.getElementById('D').value = ''
        document.getElementById('E').value = ''
        document.getElementById('explanation').value = ''
        this.uploaded++;
        document.getElementById('uploaded').innerHTML = this.uploaded;

        return
      } else{
        modal.error(res.message, 'Upload Error')
        return
      }
    })


  }









}



// Extras


const Image = {
  handle:img => {
    const file = img.files[0]
    console.log(file);
    var data = new FormData();
    data.append("image", file)
    console.log({data});

  }



}


const validate = file =>{
  console.log(file.value);
  console.log(isImage(getExtension(file.value)));
}


const getExtension =filename=>{
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

const isImage = filename=> {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'bmp':
    case 'png':
        //etc
        return true;
    }
    return false;
}
