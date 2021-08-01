const Struct = {
  active:{
    course:"",
    category:"",
    subject:"",
  },
  data:{
    courses:[],
    categories:[],
    subjects:[],
  },

  set course(om){
    //om = object model

    // Unselect Everything
    var courses = document.querySelectorAll('.course-struct');
    console.log(courses);
    courses.forEach((item, i) => {
      item.setAttribute('selected', 'false')
    });

    const val = om.getAttribute('value');
    om.setAttribute('selected', 'true');


    console.log(val);
    http.GET(`/api/read/course/${val}`).then(res=>{

      if(res.status=="ERR"){
        modal.error(res.message, 'Error')
      }

      document.getElementById('struct-type').innerHTML = res.type;
      document.getElementById('struct-code').innerHTML = val;
      document.getElementById('struct-name').value = res.name;
      document.getElementById('struct-description').value = res.description;

      categories = document.getElementById('categories-struct')
      categories.innerHTML="";
      Object.keys(res.data).map(c=>{
        categories.innerHTML+=`<li class="categories-struct" onclick="Struct.category=this" value="${c}"><b>${res.data[c].name}</b><p>${res.data[c].description}</p></li>`;
      })

      if(Object.keys(res.data).length==0){
        categories.innerHTML="<li disabled='true'>No Data</li>";
      }

    })

    //activate js
    this.active.course = val;
    this.active.category = "";
    this.active.subject = "";

    // reset html
    document.getElementById('subjects-struct').innerHTML="";
    this.data.subjects = []
  },

  set category(om){
    // Unselect Everything
    console.log('Category Selected');
    var categories = document.querySelectorAll('.categories-struct');
    console.log(categories);
    categories.forEach((item, i) => {
      item.setAttribute('selected', 'false')
    });

    const val = om.getAttribute('value');
    om.setAttribute('selected', 'true');

    console.log(val);
    http.GET(`/api/read/category/${this.active.course}-${val}`).then(res=>{

      if(res.status=="ERR"){
        modal.error(res.message, 'Error')
      }

      document.getElementById('struct-type').innerHTML = res.type;
      document.getElementById('struct-code').innerHTML = val;
      document.getElementById('struct-name').value = res.name;
      document.getElementById('struct-description').value = res.description;

      subjects = document.getElementById('subjects-struct')
      subjects.innerHTML="";
      Object.keys(res.data).map(s=>{
        subjects.innerHTML+=`<li class="subject-struct" onclick="Struct.subject=this" value="${s}"><b>${res.data[s].name}</b><p>${res.data[s].description}</p></li>`;
      })

      if(Object.keys(res.data).length==0){
        subjects.innerHTML="<li disabled='true'>No Data</li>";
      }
    })

    //activate js
    this.active.category = val;
    this.active.subject = "";

    // Form

  },

  set subject(om){

    var subjects = document.querySelectorAll('.subject-struct');
    console.log(subjects);
    subjects.forEach((item, i) => {
      item.setAttribute('selected', 'false')
    });


    const val = om.getAttribute('value');
    om.setAttribute('selected', 'true');


    http.GET(`/api/read/subject/${this.active.course}-${this.active.category}-${val}`).then(res=>{

      if(res.status=="ERR"){
        modal.error(res.message, 'Error')
      }

      document.getElementById('struct-type').innerHTML = res.type;
      document.getElementById('struct-code').innerHTML = val;
      document.getElementById('struct-name').value = res.name;
      document.getElementById('struct-description').value = res.description;

    })



    this.active.subject = val;


  },



  create:{
    course(){
      const code = document.getElementById('create-code').value;
      const name = document.getElementById('create-name').value;
      const description = document.getElementById('create-description').value;

        http.POST('/api/create/course/', {
          code:code,
          name:name,
          description:description,
        }).then(res=>{
            if(res.status=="ERR"){
              modal.error(res.message, 'Error')
            }
            else {
              modal.alert(res.message, 'Done')
              load_index();
            }
        })

    },
    category(){
      const code = document.getElementById('create-code').value;
      const name = document.getElementById('create-name').value;
      const description = document.getElementById('create-description').value;

      http.POST('/api/create/category/', {
        course: Struct.active.course,
        code:code,
        name:name,
        description:description,
      }).then(res=>{
          if(res.status=="ERR"){
            modal.error(res.message, 'Error')
          }
          else {
            modal.alert(res.message, 'Done')
            Struct.course = document.querySelector(`li[value=${Struct.active.course}]`)
          }
      })
    },
    subject(){
      const code = document.getElementById('create-code').value;
      const name = document.getElementById('create-name').value;
      const description = document.getElementById('create-description').value;

      http.POST('/api/create/subject/', {
        course: Struct.active.course,
        category:Struct.active.category,
        code:code,
        name:name,
        description:description,
      }).then(res=>{
          if(res.status=="ERR"){
            modal.error(res.message, 'Error')
          }
          else {
            modal.alert(res.message, 'Done')
            Struct.category = document.querySelector(`li[value=${Struct.active.category}]`)
          }
      })
    }
  },

  createCourse(){
    modal.alert(
      'Course',
      'Create Course',
      `code:
        <input id="create-code" placeholder="code">
       name:
        <input id="create-name" placeholder="name">
       description:
        <input id="create-description" placeholder="description">
        <button onclick="Struct.create.course()">Create</button>`
    )
  },
  createCategory(){
    // Validate course
    if(this.active.course==''){
      modal.alert('Please Select Course First', 'Nothing Selected')
      return
    }
    modal.alert(
      `Create Subject for ${this.active.course}`,
      'Create Category',
      `code:
        <input id="create-code" placeholder="code">
       name:
        <input id="create-name" placeholder="name">
       description:
        <input id="create-description" placeholder="description">
        <button onclick="Struct.create.category()">Create</button>`
    )
  },
  createSubject(){
    // Validate course and category
    if(this.active.course==''){
      modal.alert('Please Select Course First', 'Undefined Selection')
      return
    }
    if(this.active.course==''){
      modal.alert('Please Select Category First', 'Undefined Selection')
      return
    }

    modal.alert(
      `Create Subject for ${this.active.course}/${this.active.category}`,
      'Create Subject',
      `code:
        <input id="create-code" placeholder="code">
       name:
        <input id="create-name" placeholder="name">
       description:
        <input id="create-description" placeholder="description">
        <button onclick="Struct.create.subject()">Create</button>`
    )
  },

  update(){




    //VALIDATE
    var type = document.getElementById('struct-type').innerHTML;
    var name = document.getElementById('struct-name').value;
    var description = document.getElementById('struct-description').value;

    if(type==""){
      modal.error(
        'Please Select A File',
        'Selection Error'
      )
    }


    if(name=="" || description==""){
      modal.error(
        'Name and Description cannot be Empty',
        'Incomplete Details'
      )
    }

    http.POST(`/api/update/details`, {
      type:type,
      name:name,
      description:description,
      course:this.active.course,
      category:this.active.category,
      subject:this.active.subject,
    }).then(res=>{
      if(res.status=="OK"){
        modal.alert('File has been updated', 'Done!')
      }
      else {
        modal.error(res.message)

      }
    })




  }

}
