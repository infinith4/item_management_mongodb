"use strict";
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 4003);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

var server = http.createServer(app);

var mongoose = require('mongoose');

//localhostのitem_managementのデータベースに接続。
var db = mongoose.connect('mongodb://infinith4:aaaaa@kahana.mongohq.com:10037/app27635386');
//var db = mongoose.connect('mongodb://localhost/item_management');
//スキーマを宣言。
var ItemSchema = new mongoose.Schema({
	text:{type:String},
        numeric:{type:Number}
	
});
//スキーマからモデルを生成。
var Item = db.model('item',ItemSchema);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection',function(socket){
	Item.find(function(err,items){
		if(err){console.log(err);}
		//接続したユーザにデータを送る。
		socket.emit('create',items);
	});
	//createイベントを受信した時、データベースにItemを追加する。
	//itemDataは{text:String,numeric:Number}の型
	socket.on('create',function(itemData){
		//モデルからインスタンス作成
		var item = new Item(itemData);
		//データベースに保存。
		item.save(function(err){
			if(err){ return; }
			socket.broadcast.json.emit('create',[item]);
			socket.emit('create',[item]);
		});
	});
	//update-textイベントを受信した時、Memoのtextをアップデートする。
	socket.on('update-text',function(data){
		Item.findOne({_id:data._id},function(err,item){
			if(err || item === null){return;}
			item.text = data.text;
                        item.numeric = data.numeric;
			item.save();
			socket.broadcast.json.emit('update-text',data);
		});
	});
	//removeイベントを受信した時、データベースから削除する。
	socket.on('remove',function(data){
		Item.findOne({_id:data._id},function(err,item){
			if(err || item === null){return;}
			item.remove();
			socket.broadcast.json.emit('remove',data);
		});
	});
});
