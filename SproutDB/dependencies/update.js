const fs = require('fs');
const path = require('path');
const uid = require('uid');

const update= {
  /*-------------Private---------------*/
  path: global._db,

  requirements:['hash','question','image','answer','choices','explanation'],

  /*-------------PUBLIC---------------*/
  details(target, name, description){
    console.log('Updating Details: ' + target +'...');
    const dir = path.join(this.path, target, 'index.json');
    const parent = path.join(dir,'..', '..','index.json');
    console.log(dir);

    console.log(parent);
    if(!fs.existsSync(dir)){
      console.log('File Error');
      return { status:'ERR', message:'File Error: Course Does Not Exist'}
    }
    data = fs.readFileSync(dir)
    try {
      data = JSON.parse(data)
    } catch (e) {
      console.log('JSON Error');
      return { status:'ERR', message:'JSON Error: Course File is Corrupted'}
    }
    data.name = name;
    data.description = description;
    fs.writeFileSync(dir, JSON.stringify(data))
    return {
       status:'OK',  ...data
    }
  },

  course(code, name, description){
    const dir = path.join(this.path, code, 'index.json');
    const parent = path.join(this.path, 'index.json');

    if(!fs.existsSync(dir)){
      console.log('File Error');
      return { status:'ERR', message:'File Error: Course Does Not Exist'}
    }
    if(!fs.existsSync(parent)){
      console.log('File Error');
      return { status:'ERR', message:'File Error: Index Does Not Exist'}
    }

    try {
      data = JSON.parse(fs.readFileSync(dir))
      data.name = name;
      data.description = description;
      fs.writeFileSync(dir, JSON.stringify(data))
    } catch (e) {
      console.log('JSON Error');
      console.log(e);
      return { status:'ERR', message:'JSON Error: Cannot write to course'}
    }

    try {
      file = JSON.parse(fs.readFileSync(parent))
      file.data[code].name = name;
      file.data[code].description = description;
      fs.writeFileSync(parent, JSON.stringify(file))
    } catch (e) {
      console.log('JSON Error');
      console.log(e);
      return { status:'ERR', message:'JSON Error: Cannot write to index'}
    }
    return { status:"OK", message:"Update Complete" }
  },

  category(course, code, name, description){
    const dir = path.join(this.path, course, code, 'index.json');
    const parent = path.join(this.path, course, 'index.json');

    if(!fs.existsSync(dir)){
      console.log('File Error');
      return { status:'ERR', message:'File Error: Course Does Not Exist'}
    }
    if(!fs.existsSync(parent)){
      console.log('File Error');
      return { status:'ERR', message:'File Error: Index Does Not Exist'}
    }

    try {
      data = JSON.parse(fs.readFileSync(dir))
      data.name = name;
      data.description = description;
      fs.writeFileSync(dir, JSON.stringify(data))
    } catch (e) {
      console.log('JSON Error');
      console.log(e);
      return { status:'ERR', message:'JSON Error: Cannot write to course'}
    }

    try {
      file = JSON.parse(fs.readFileSync(parent))
      file.data[code].name = name;
      file.data[code].description = description;
      fs.writeFileSync(parent, JSON.stringify(file))
    } catch (e) {
      console.log('JSON Error');
      console.log(e);
      return { status:'ERR', message:'JSON Error: Cannot write to index'}
    }
    return { status:"OK", message:"Update Complete" }

  },
  subject(course, category, code, name, description){
    const dir = path.join(this.path, course, category, code, 'index.json');
    const parent = path.join(this.path, course, category, 'index.json');

    if(!fs.existsSync(dir)){
      console.log('File Error');
      return { status:'ERR', message:'File Error: Course Does Not Exist'}
    }
    if(!fs.existsSync(parent)){
      console.log('File Error');
      return { status:'ERR', message:'File Error: Index Does Not Exist'}
    }

    try {
      data = JSON.parse(fs.readFileSync(dir))
      data.name = name;
      data.description = description;
      fs.writeFileSync(dir, JSON.stringify(data))
    } catch (e) {
      console.log('JSON Error');
      console.log(e);
      return { status:'ERR', message:'JSON Error: Cannot write to course'}
    }

    try {
      file = JSON.parse(fs.readFileSync(parent))
      file.data[code].name = name;
      file.data[code].description = description;
      fs.writeFileSync(parent, JSON.stringify(file))
    } catch (e) {
      console.log('JSON Error');
      console.log(e);
      return { status:'ERR', message:'JSON Error: Cannot write to index'}
    }
    return { status:"OK", message:"Update Complete" }


  },



  // append subject data
  append(course, category, subject, token, image){
    console.log('New Token');
    //validate token
    this.requirements.forEach(req=>{
      if(!token.hasOwnProperty(req)){
        console.log('Missing: ' + req);
        return {status:'ERR', message:'Missing: ' + req }
      }
    })
    // validate paths
    const courseDir = path.join(this.path, course);
    if(!fs.existsSync(courseDir)){
      console.log('Course not found!');
      return {status:'ERR', message:'Path Error: Course' }
    }

    const categoryDir = path.join(courseDir, category);
    if(!fs.existsSync(categoryDir)){
      console.log('Category not found!');
      return {status:'ERR', message:'Path Error: Category' }
    }

    const subjectDir = path.join(categoryDir, subject);
    if(!fs.existsSync(subjectDir)){
      console.log('Subject not found!');
      return {status:'ERR', message:'Path Error: Subject' }
    }

    //open paths
    try {
      course = JSON.parse(fs.readFileSync(path.join(courseDir,'index.json')))
    } catch (e) {
      console.log('JSON Error (course): ' + e);
      return {status:'ERR', message:'JSON Error: Course' }
    }
    try {
      category = JSON.parse(fs.readFileSync(path.join(categoryDir,'index.json')))
    } catch (e) {
      console.log('JSON Error (category): ' + e);
      return {status:'ERR', message:'JSON Error: Category' }
    }
    try {
      subject = JSON.parse(fs.readFileSync(path.join(subjectDir,'index.json')))
    } catch (e) {
      console.log('JSON Error (subject): ' + e);
      return {status:'ERR', message:'JSON Error: Subject' }
    }

    if(token.image!=="none"){
      var base64Data = image.replace(/^data:image\/png;base64,/, "");
      fs.writeFileSync(path.join(subjectDir,`${token.hash}.${token.image}`), base64Data, 'base64')
    }

    //Update subject
    subject.data.push(token)
    category.count++;
    course.count++;

    // Write
    fs.writeFileSync(path.join(subjectDir,'index.json'),JSON.stringify(subject))
    fs.writeFileSync(path.join(categoryDir,'index.json'),JSON.stringify(category))
    fs.writeFileSync(path.join(courseDir,'index.json'),JSON.stringify(course))


    return { status:'OK' }
  },



  index(){
    const dir = this.path
    let data = {};
    let count = 0;

    const files = fs.readdirSync(dir)
    files.forEach((item, i) => {
      file = path.join(dir,item);
      if(fs.lstatSync(file).isDirectory()){
        console.log(item);
        if(fs.existsSync(path.join(file, 'index.json'))){
          try {
            chunk = JSON.parse(fs.readFileSync(path.join(file, 'index.json')))
            console.log(chunk);
            data[item] = {name:chunk.name, description:chunk.description, count:chunk.count }
            count+= chunk.count;
          } catch (e) {
            console.log('Index Updater: Failed at ' + file);
          }
        }
      }
    });

    // update index file
      try {
        let index = JSON.parse(fs.readFileSync(path.join(dir,'index.json')))
        index.data = data;
        console.log(index.data);
        fs.writeFileSync( path.join(dir,'index.json'), JSON.stringify(index))
        console.log('Index File Updated: ' + path.join(dir,'index.json'));
      } catch (e) {
        fs.writeFileSync(
          path.join(dir,'index.json'),
          JSON.stringify(
            {
              version:0,
              data:data,
              description:"",
              count:count,
              themes:['default']
            }
        )
      )
      }



  }





}


module.exports = update
