jQuery(function($) {
	"use strict";
	var socket = io.connect('http://'+location.host + '/');
	
	//createイベントを受信した時、html上にメモを作成する。
	socket.on('create',function(itemData){
		itemData.forEach(function(data){
			createItem(data);
		});
	});
	//update-textイベントを受信した時、メモのテキストを更新する。
	socket.on('update-text',function(data){
		$('#'+data._id).find('.text').val(data.text);
		$('#'+data._id).find('.numeric').val(data.numeric);
	        console.log(data.text);
                console.log(data.numeric);
	});
	//removeイベントを受信した時、メモを削除する。
	socket.on('remove',function(data){
		removeMemo(data._id);
	});
	//createボタンが押された時、新規メモを作成するようにcreateイベントを送信する。
	$('#create-button').click(function(){
		var itemData = {
			text:'',
			numeric:''
			
		};
		socket.emit('create',itemData);
	});
	//memoDataを元にメモをhtml上に生成
	//memoDataは{_id:String,text:String,position:{left:Number,top:Number}}の型
	var createItem = function(itemData){
		var id = itemData._id;
		var old = $('#'+id);
		if(old.length !== 0){
			return;
		}
		
		var element =
			$('<div class="item row"/>')
			.attr('id',id)
			.append($('<div class="settings">')
				.append('<a href="#" class="remove-button">☓</a>')
			)
			.append($('<div/>').attr('class','col-md-3')
				.append($('<input type="text" class="text form-control" placeholder="Text input"/>')
					.val(itemData.text)
				)
			).append($('<div/>').attr('class','col-md-4')
                                .append($('<input type="text" class="numeric form-control" placeholder="Numeric input">')
                                        .val(itemData.numeric)
                                )
                );
		element.hide().fadeIn();
		$('#field').append(element);
		
		
		//テキストが変更された場合、update-textイベントを送る。
		var $text = element.find('.text');
	        var $numeric = element.find('.numeric');
		$text.keyup(function(){
			socket.emit('update-text',{_id:id, text:$text.val() });
		});
                $numeric.keyup(function(){
			socket.emit('update-text',{_id:id, numeric:$numeric.val() });
		});
		//☓ボタンを押した場合removeイベントを送る
		element.find('.remove-button').click(function(){
			socket.emit('remove',{_id:id});
			removeItem(id);
			return false;
		});
	};
	var removeItem = function(id){
		$('#'+id).fadeOut('fast').queue(function(){
			$(this).remove();
		});
	};
});
