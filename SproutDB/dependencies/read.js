const fs = require('fs');
const path = require('path');

const read= {
  /*-------------Private---------------*/
  path: global._db,



  /*-------------PUBLIC---------------*/
  index(){
    const dir = path.join(this.path, 'index.json');

    if(!fs.existsSync(dir)){
      console.log('Index File Error');
      return { status:'ERR', message:'Error: Index Does Not Exist' }
    }
    data = fs.readFileSync(dir)
    try {
      data = JSON.parse(data)
      return { status:'OK',  ...data }
    } catch (e) {
      console.log('JSON Error');
      return { status:'ERR', message:'JSON Error: Index File is Corrupted' }
    }
  },

  course(name){
    const dir = path.join(this.path, name, 'index.json');
    if(!fs.existsSync(dir)){
      console.log('Path Error');
      return { status:'ERR', message:'Path Error: Course Does Not Exist' }
    }
    data = fs.readFileSync(dir)
    try {
      data = JSON.parse(data)
      return { status:'OK',  ...data }
    } catch (e) {
      console.log('JSON Error');
      return { status:'ERR', message:'JSON Error: Course File is Corrupted'}
    }
  },

  category(course, name){
    var dir = path.join(this.path, course, name, 'index.json');
    if(!fs.existsSync(dir)){
      console.log('Path Error');
      return { status:'ERR', message:'Path Error: Cannot Read Category.'}
    }

    data = fs.readFileSync(dir)
    try {
      data = JSON.parse(data)
      return { status:'OK',  ...data }
    } catch (e) {
      console.log('JSON Error');
      return { status:'ERR', message:'JSON Error: Category File is Corrupted'}
    }
  },

  subject(course, category, name){
    var dir = path.join(this.path, course, category, name, 'index.json');
    if(!fs.existsSync(dir)){
      console.log('Index Error');
      console.log(dir);
      return { status:'ERR', message:'Index Error: Cannot Read Subject.'}
    }

    data = fs.readFileSync(dir)
    try {
      data = JSON.parse(data)
      return { status:'OK',  ...data }
    } catch (e) {
      console.log('JSON Error');
      return { status:'ERR', message:'JSON Error: Subject File is Corrupted' }
    }
  },
}


module.exports = read
