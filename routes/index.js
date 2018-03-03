const express = require('express');
const router = express.Router();


var Diary = require('../models/diary.model');
var moment = require('moment');	//날짜포맷
/* GET home page. */
router.get('/', function(req, res, next) {
	let diary = new Diary();
	diary.getDiaryAllList((err,rows)=>{
		if(err) console.log('ERROR:'+err);
		else{
			res.render('index',{diaries:rows, moment:moment});		
		}
	});  
});

router.get(['/edit', '/edit/:id'], function(req, res, next) {
	let id = req.params.id;
	if(id){
		let diary = new Diary();
		diary.getDiaryById(id, (err,rows)=>{
			if(err) console.log('ERROR:'+err);
			else{
				res.render('edit',{diary:rows[0], moment:moment});		
			}
		});
	}
	else{
		res.render('edit',{diary:{}});
	}
  	
});

router.post(['/edit', '/edit/:id'], function(req, res, next) {
	let id = req.params.id;
	let title = req.body.title;
	let content = req.body.content;  
	let objDiary = {'id':id, 'title':title, 'content':content};

	let diary = new Diary();
	 diary.setDiary(objDiary, (err,rows)=>{
		if(err) console.log('ERROR:'+err);
		else{
			res.redirect('/');		
		}
	});	
});


module.exports = router;
