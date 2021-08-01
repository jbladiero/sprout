console.log('Parser Init!');
const parser = {
  // Regex
  expression:{
    num:{
      none:'',
      dot:/^\d+\./,
      par: /^\d+\)/ ,
      mixed:/^\d+\.+\)/
    },
    choice:{
      dot: /^[a-zA-Z]+./,
      par: /^[a-zA-Z]+\)/,
      mixed:/^[a-zA-Z]+.\)/,
    }
  },
  //Parse
  do(){
    // get questions
    var questions = document.getElementById('parse-questions').value;
    var answers = document.getElementById('parse-answers').value;

    console.log(questions);
    console.log(answers);


    // cut string to separate questions by separating \n\n
    questions = questions.split('\n\n')
    .map(v=>{ return v.trim() })
    .filter(v=>{ return (v==''? false : true) })
    console.log({questions});

    // Create arrays of token containing questions and choices by spliting \n

    questions = questions.map(chunk=>{
      // Clean strings by removing extra \n map
      return chunk.split('\n')
      .map(v=>{ return v.trim() })
      .filter(v=>{ return (v==''? false : true) })

    })


    console.log({questions});
    //check for consistency
    for (var i = 0; i < questions.length; i++) {
      if(  questions[i].length < 5 || 6 < questions[i].length ){
        var question = ""
        questions[i].map(v=>{
          question+=`<br>${v}`;
        })
        modal.error(`Inconsistent Format!<br> Check Question #<b style="color:red;">${i+1}</b>: ${question}`, 'Parse Error')
        return
      }
    }

    //get question settings
    num_regex = this.expression.num[document.getElementById('parse-numbering').value]
    choice_regex = this.expression.choice[document.getElementById('parse-choices').value]


    // Remove numbers and letters
    questions = questions.map(chunk=>{
      return chunk.map((v,i)=>{
        return v.replace((i==0? num_regex : choice_regex), '').trim();
      })
    });
    // At this point, the questions are ready!
    console.log({questions});


    // Answers Code
    if(document.getElementById('parse-mode').value=='Single'){
      console.log('Question only: Time to exit');
      this.basic(questions);
      console.log('Done Parsing Strings');

      modal.alert('Proceed to Editor to upload','Parse Complete!')
      document.getElementById('parse-questions').value = '';
      document.getElementById('parse-answers').value = '';
      return
    }

    answers = answers.split('\n')
    .map(v=>{ return v.trim() })
    .filter(v=>{ return (v==''? false : true) })
    console.log({answers});

    //Validate Question and Answers
    if(questions.length!==answers.length){
      modal.error(`Questions and Answers does not equal in length`, 'Answer Key Error');
      return
    }

    //get answer settings
    ans_regex = this.expression.num[document.getElementById('parse-ans-num').value]


    // Remove numbers and letters
    answers = answers.map(ans=>{
      return ans.replace(ans_regex,'').trim();
    });

    console.log(answers);


    // match answers
    switch (document.getElementById('parse-ans-mode').value) {
      case 'exact':
      console.log('Answers in Exact mode');
      this.exactSensitive(questions, answers)
        break;
      case 'letter':
        console.log('Answers in Letter mode');
        this.letters(questions, answers)
        break;
      default:
      //letter
    }

    console.log('Done Parsing Strings');

    modal.alert('Proceed to Editor to upload','Parse Complete!')
    document.getElementById('parse-questions').value = '';
    document.getElementById('parse-answers').value = '';
  },

  letters(questions, answers){
    //validate
    const choices = 'ABCDE';
    var queue = questions.map((chunk,i)=>{
      data =  {
        question:chunk.shift(),
        choices:chunk,
        answer:{
          key:answers[i].toUpperCase(),
          value:chunk[choices.indexOf(answers[i])],
        }
      }
      return data
    })
    Queue.update(queue);
    console.log('Queue Updated with Lettered Answer');
    console.log(queue);
  },

  basic(questions){
    var queue = questions.map((chunk,i)=>{
      data =  {
        question:chunk.shift(),
        choices:chunk,
        answer:{
          key:'',
          value:''
        }
      }
      return data
    })
    Queue.update(queue);
  },

  exactSensitive(questions, answers){
    const choices = 'ABCDE';
    var queue = questions.map((chunk,i)=>{
      data = {
        question:chunk.shift(),
        choices:chunk,
        answer:{
          key: choices[chunk.indexOf(answers[i])] || '',
          value:answers[i],
        }
      }
      return data
    });
    Queue.update(queue);
    console.log(queue);
  },





  debug( data ,line, message){
    data.split('\n').map((l,i)=>{
      if(l==line){
        debug.log(`Error at line ${i}: ${message}` )
      }
    })


  }






}




var Creator = {

	init: function(mode=''){
		if(mode=='_'){
			major = GUI.getValue('addSubjectMajor');
			subject = GUI.getValue('addSubjectName');
			if(major=='' || subject==''){ GUI.alert('Invalid Input.'); return;}
			Subjects[major].push(subject);
			GUI.alert('Done!'); GUI.terminate('AddSubject');
		}
		Major = Object.keys(Subjects);
		options = '<option value="">--Select Subject--</option>';
		for(i=0; i<Major.length; i++){
			options+='<optgroup label="'+Major[i]+'">';
			for(s=0;s<Subjects[Major[i]].length;s++){
				dir = Major[i] +'/'+Subjects[Major[i]][s];
				options += '<option value="'+dir+'">'+Subjects[Major[i]][s]+'</option>';
			}
			options+='</optgroup>'
		};
		GUI.setContents('selector', [options,options,options]);
	},

	target:'none',
	minimize: function(){
		this.target='none';
		GUI.terminate('popEditor');
	},

	submit: function(mode=''){
		content = GUI.getValues(mode+'content');
		detail = GUI.getValues(mode+'detail');
		// Find Answer
		if(mode=='_'){
			Ans = GUI.getRadio('_choice');
		   if(Ans==0){
				GUI.alert('Please Select Answer from Choices'); return;}
		   cache = content[Ans];
			content[Ans] = content[1];
			content[1] = cache;
		    };
		// Validate
		token = { type:'mcq',};
		if(content[0]=='' && content[1]==''){
			GUI.alert('Incomplete Content'); return;}
		if(detail[0]==''){ GUI.alert('Select Subject'); return;}
		for(i=2;i<content.length;i++)
			if(content[i]=='') token['type']='id';
		//Prepare
		[major, subject] = detail[0].split('/');
		link = detail[3].split('\n');
		console.log('Link' + link);
		if(detail[3]!=''){
			for(i=0;i<link.length;i++)if (link[i]== ''|| link[i]==' '){
				link.splice(i, 1); i--;}}
		// Integrate
		token['question']=content[0];
		token['answer']=content[1];
		if(token.type=='mcq'){ token['choices']=content.splice(2,3);}
		token['major']=major;
		token['subject']=subject;
		token['topic']=detail[1];
		token['explanation']=detail[2];
		token['links']=link;
		token['id']=Date.now();
		token['image']=GUI.getValue(mode+'imageCache');
		GUI.setValue(mode+'imageCache', '');
		GUI.setValues(mode+'content',['','','','','']);
		GUI.setValues(mode+'detail',[detail[0],detail[1],'','','']);
		console.log(JSON.stringify(token));
		if(this.target=='none') {Bank.push(token);}
		else { Bank[Number(this.target)]=token; this.target='none'; System.bank(); }
		if(mode=='_'){this.bix();};
	},

	parse: function(){
		this.Cache=[];
		item = GUI.getValues('bix');
		GUI.setValue('popSelect',item[0]);
		Buffer = item[1].split('\n');
		for( i = 0; i < Buffer.length; i++){
			if ( Buffer[i] == '' || Buffer[i] == ' ' || Buffer[i]=='\t')
				{Buffer.splice(i, 1); i--;}};

		// Clean Question
		for(i=0; i<Buffer.length; i++){
			dot = Buffer[i].indexOf('.');
			if(dot <4){  Buffer[i] = Buffer[i].substr(dot+1).trim();}
			curve = Buffer[i].indexOf(')');
			if(curve <3){  Buffer[i] = Buffer[i].substr(curve+1).trim();}
		};

		console.log(Buffer.length/5);
		if(Buffer.length%5){ console.log('BufferLen: '+ Buffer.length);
		this.parseDebug();
		return;}
		console.log(Buffer);
		len = (Buffer.length/5);
		for(i=0;i<len;i++){
			temp = Buffer.splice(0,5)
			this.Cache.push(temp);
		};
		// answers

		if(item[2]!='' || item[2]!=' ' || item[2]!='\t'){
			answerKey=item[2].split('\n');
			for( var i = 0; i < answerKey.length; i++){
				if ( answerKey[i] == '' || answerKey[i] == ' ' || answerKey[i]=='\t')
					{answerKey.splice(i, 1); i--;}};
			//clean Answers
			for(i=0; i<answerKey.length; i++){
				dot = answerKey[i].indexOf('.');
				if(dot <4){  answerKey[i] = answerKey[i].substr(dot+1).trim();}
			};
			if(answerKey.length==this.Cache.length){GUI.alert('Answer Key is recognized.');
				for(i=0;i<answerKey.length;i++){ this.Answer.push(answerKey[i]);}
			}
			else{ GUI.alert('Answer key not available.');
				console.log(answerKey.length+':')
			};
		}
			console.log(this.Cache.length);
		this.toDo = this.Cache.length;
		this.bix();

		},
	parseDebug:function(){
		item = GUI.getValues('bix');
		err=[];
		Buffer = item[1].split('\n');
		for(i=0; i<Buffer.length; i++){
			dot = Buffer[i].indexOf('.');
			if(dot <5){}
			else { err.push(i); } };
		if(err.length!=0){GUI.alert('Parse Error. Check line(s) '+String(err)+'.' ); return;};

		// Remove whitespaces
		for( i = 0; i < Buffer.length; i++){
			if ( Buffer[i] == '' || Buffer[i] == ' ' || Buffer[i]=='\t')
				{Buffer.splice(i, 1); i--;}};

		expected = 'a.'
		for(i=0; i<Buffer.length; i++){
			if(i%5==0) continue;
			if(Buffer[i].toLowerCase().startsWith(expected)) {
				switch(expected){
					case 'a.': expected = 'b.'; break;
					case 'b.': expected = 'c.'; break;
					case 'c.': expected = 'd.'; break;
					case 'd.': expected = 'a.'; break;}
				}
				else{
					number = Math.floor(i/5)+1;
					GUI.alert('Missing ' + expected + ' in item ' + number); return;}
			}


		GUI.alert('Parse Error');
	},

	updateBixProgress: function(){
		offset = Number(GUI.getValue('bixOffset'));
		progress = Number(this.toDo) - Number(this.Cache.length) + offset;
		max = Number(this.toDo) + offset;
		console.log(toDo);
		GUI.setContent('progress', String(progress));
		GUI.setContent('toDo', String(max));
	},
	bix: function(){
		if(this.Cache.length==0){ GUI.alert('Done!'); this.toDo=0; GUI.terminate('popEditor'); return;}


		form =this.Cache[0];
		this.Cache.splice(0,1);
		if(this.Answer.length!=0){
			answer = String(this.Answer[0]).trim();
			this.Answer.splice(0,1);
			if(form.indexOf(answer)>0){
				index = form.indexOf(answer)-1;
			GUI.setRadio('_choice', index );
			}
			else{
			GUI.alert('Answer not matched: '+ form.indexOf(answer) + '<br>Answer: ' + answer);
			}
		};
		GUI.setValues('_content',form);
		GUI.activate('popEditor');
		this.updateBixProgress();
		},
	toDo:0,
	Cache:[],
	Answer:[],

// load
	load: function(index){
		if(Bank.length<=index) {GUI.alert('Non Existent'); return;}
		cache = Bank[index];
		contents = [cache.question, cache.answer, cache.choices[0], cache.choices[1], cache.choices[2] ];
		details = [cache.major+'/'+cache.subject, cache.topic, cache.explanation, String(cache.links).replace(',','\n')];
		GUI.setValue('_imageCache', cache.image);
		GUI.setRadio('_choice',0);
		GUI.setValues('_detail', details);
		GUI.setValues('_content',contents);

		GUI.activate('popEditor');
		this.target=Number(index);
	},
	generate: function(){
		GUI.activate('saveView');
		code='';
		if(System.preferences.json){ code='var subjectName = \'TARGET\';'; }
		else{ code='Engine.import(\'TARGET\')';}
		cache=[];
		for(i=0;i<Bank.length;i++){
			if(System.preferences.incomplete==1){ cache.push(Bank[i]); continue; }
			else if(Bank[i].topic=='' || Bank[i].explanation=='' || Bank[i].links=='') {  }
			else { cache.push(Bank[i]);}
		}
		cache = JSON.stringify(cache).replace(/'/g, "\'");
		code = code.replace('TARGET', cache);
		GUI.setValue('rawCode', code);
	},
	discard: function(){
		if(this.target!='none'){
			Bank.splice(this.target,1);
			GUI.terminate('popEditor');
			this.target='none';
			System.bank();
		}
	},
	// Upload and downloads
	uploads:[],
	upload: function(){
		file = document.getElementById('uploadFile').files[0];
		filename = document.getElementById('uploadFile').value;
			console.log('UPLOADING...    ' + filename);
				if(this.uploads.includes(filename)){
					GUI.alert('File Already Exists');
					return;
				}
				else{
				this.uploads.push(filename);
				}

				extension = document.getElementById('uploadFile').value.split('.').pop();
				if (extension != 'jbl'){ GUI.alert('Unsupported File Type. Error ID: JBL-U'); return;}
				if (file) {var reader = new FileReader();
				reader.onload = function (evt) {
					try {
						var obj = JSON.parse(evt.target.result);
						if (obj.file_type == 'JBL' && obj.content.length>0){
							console.log('Importing ' + obj.content.length + ' items.');
							for(i=0; obj.content.length;i++){
								Bank.push(obj.content.pop());
							}
								System.bank();
								GUI.alert('Upload Complete.');
								GUI.terminate('uploadView');
							  }
						else {GUI.alert('Unsupported File Type');}}
					catch(error) {
						GUI.alert('Unsupported File Type. The file you may be trying to run is corrupted. Error ID: JBL-C');
						console.error(error);}};
		 				reader.onerror = function (evt) { console.error("An error ocurred reading the file",evt); };
						reader.readAsText(file, "UTF-8");}

	},
	image: function(mode=''){
		mode = String(mode);
		var image = GUI.get(mode+'image').files[0];
		var reader = new FileReader();
		reader.onload = function(){
			 GUI.setValue(mode+'imageCache', reader.result);
			 GUI.get(mode+'imagePreview').src= reader.result;

		 };
		reader.readAsDataURL(image);
	},
	imagePreview: function(mode=''){
		GUI.get(mode+'imagePreview').src=GUI.getValue(mode+'imageCache');
	},

	download: function(){
		if(Bank.length<=1){GUI.alert('Bank is Empty'); return;}
		filename = GUI.getValue('fileName');
		if(filename=='' || filename==null){ GUI.alert('Set File Name'); return; }
		filename+= '_' + Date.now() + '.jbl';
		code = {file_type:'JBL',};
		code['content'] = Bank;
		cache = JSON.stringify(code).replace(/'/g, "\'");

		var a = document.createElement('a');
					var blob = new Blob([cache], {'type':'jbl'});
					a.href = window.URL.createObjectURL(blob);
					a.download = filename;
					a.click();
	}
};
