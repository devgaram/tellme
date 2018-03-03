class Diary{
	constructor(){
		let conn = require('../models/pool');
		this.conn = conn;
	}

	connection(){
		this.conn.connect((err)=>{
			if(err){
    			console.error('error connecting'+err.stack);
    			this.conn.end();
    			return;
  			}
  			
		});
	}
	disconnection(){
		this.conn.end();
	}	

	getDiaryAllList(callback){
		//this.connection();
		
		let sql = 'SELECT id, title, contents, regdate, modifieddate FROM tb_diary ORDER BY regdate DESC';
		this.conn.query(sql, (err, rows, fields)=>{
			//this.disconnection();
			return callback(err, rows);				
		});	
			
	}
	getDiaryById(id, callback){
		//this.connection();
		
		let sql = 'SELECT id, title, contents, regdate, modifieddate FROM tb_diary where id=?';
		let params = [id];
		this.conn.query(sql, params, (err, rows, fields)=>{
			//this.disconnection();
			return callback(err, rows);		
		});
		
	}
	setDiary(diary,callback){
		//this.connection();
		let sql, params;
		if(diary.id){
			sql = 'UPDATE tb_diary SET title=?, contents=?, modifieddate=now() where id=?';
			params = [diary.title, diary.content, diary.id];			
		}
		else{
			sql = 'INSERT INTO tb_diary(title,contents) values(?,?)';
			params = [diary.title, diary.content];			
		}
		
		this.conn.query(sql, params, (err, rows, fields)=>{
			
			return callback(err, rows);
				//this.disconnection();
				
			
		});
		
	}
}

module.exports = Diary;