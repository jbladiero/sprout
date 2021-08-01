const fs = require('fs');
const path = require('path');



const create={
  /*-------------Private---------------*/
  path: global._db,



  /*-------------PUBLIC---------------*/
  index(){
    // compile everthing
  },

  course(code, name, description){
    code=code.toLowerCase();
    const template = {
      name:name,
      description:description,
      data:{},
      type:'course',
      count:0,
    }

    if(fs.existsSync(path.join(this.path,code))){
      console.log('Course Already Exist');
      return { status:'ERR', message:'Course Already Exist' }
    }
    fs.mkdirSync(path.join(this.path,code))

    // Parent
    const parent = path.join(this.path,'index.json')
    if(!fs.existsSync(parent)){
      console.log('Index File Missing: Cannot Create Course');
      return { status:'ERR', message:'Index File Missing' }
    }
    try {
      var index = JSON.parse(fs.readFileSync(parent))
      index.data[code] = { name:name, description:description, count:0 }
      fs.writeFileSync(parent, JSON.stringify(index))
    } catch (e) {
      console.log('Parent Error');
      console.log(e);
      return { status:'ERR', message:'Parent Error: Parent File is Corrupted'}
    }
    // End

    fs.writeFileSync(path.join(this.path,code,'index.json'), JSON.stringify(template))
    return { status:'OK', message:'Course Created!' }
  },

  category(course, code, name, description){
    code=code.toLowerCase();
    const template = {
      name:name,
      description:description,
      data:{},
      type:'category',
      count:0,
    }
    if(!fs.existsSync(path.join(this.path,course))){
      return { status:'ERR', message:'Course does not Exist' }
    }

    if(fs.existsSync(path.join(this.path, course, code))){
      console.log('Category Already Exist');
      return { status:'ERR', message:'Category Already Exist' }
    }

    // Parent
    const parent = path.join(this.path,course,'index.json')
    if(!fs.existsSync(parent)){
      console.log('Index File Missing: Cannot Create Course');
      return { status:'ERR', message:'Index File Missing' }
    }
    try {
      var index = JSON.parse(fs.readFileSync(parent))
      index.data[code] = { name:name, description:description, count:0 }
      fs.writeFileSync(parent, JSON.stringify(index))
    } catch (e) {
      console.log('Parent Error');
      console.log(e);
      return { status:'ERR', message:'Parent Error: Parent File is Corrupted'}
    }
    // End



    fs.mkdirSync(path.join(this.path,course,code))
    fs.writeFileSync(path.join(this.path,course,code,'index.json'), JSON.stringify(template))
    return { status:'OK', message:'Category Created!' }
  },

  subject(course, category, code, name, description){
    code=code.toLowerCase();
    const template = {
      name:name,
      description:description,
      type:'subject',
      data:[],
    }
    if(!fs.existsSync(path.join(this.path,course))){
      return { status:'ERR', message:'Course does not Exist' }
    }
    if(!fs.existsSync(path.join(this.path,course,category))){
      return { status:'ERR', message:'Category does not Exist' }
    }

    if(fs.existsSync(path.join(this.path, course, category, code))){
      console.log('Subject Already Exist');
      return { status:'ERR', message:'Subject Already Exist' }
    }


    // Parent
    const parent = path.join(this.path,course, category,'index.json')
    if(!fs.existsSync(parent)){
      console.log('Index File Missing: Cannot Create Course');
      return { status:'ERR', message:'Index File Missing' }
    }
    try {
      var index = JSON.parse(fs.readFileSync(parent))
      index.data[code] = { name:name, description:description }
      fs.writeFileSync(parent, JSON.stringify(index))
    } catch (e) {
      console.log('Parent Error');
      console.log(e);
      return { status:'ERR', message:'Parent Error: Parent File is Corrupted'}
    }
    // End


    fs.mkdirSync(path.join(this.path,course,category,code))
    fs.writeFileSync(path.join(this.path,course,category,code,'index.json'), JSON.stringify(template))
    return { status:'OK', message:'Subject Created!' }

  },
}



module.exports = create
