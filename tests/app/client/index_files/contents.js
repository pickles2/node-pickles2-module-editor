(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
	"origin": "http://127.0.0.1:8080",
	"px2server":{
		"origin": "http://127.0.0.1:8081"
	}
}

},{}],2:[function(require,module,exports){
$(window).on('load', function(){
	var conf = require('../../../../config/default.json');
	// console.log(conf);
	var $canvas = $('#canvas');

	/**
	* window.resized イベントハンドラ
	*/
	var windowResized = function(callback){
		callback = callback || function(){};
		$canvas.height( $(window).height() - 50 );
		callback();
		return;
	}

	var pickles2ModuleEditor = new Pickles2ModuleEditor();
	windowResized(function(){
		pickles2ModuleEditor.init(
			{
				'elmCanvas': $canvas.get(0),
				'lang': 'ja',
				'gpiBridge': function(input, callback){
					// GPI(General Purpose Interface) Bridge
					// broccoliは、バックグラウンドで様々なデータ通信を行います。
					// GPIは、これらのデータ通信を行うための汎用的なAPIです。
					$.ajax({
						"url": "/apis/px2me",
						"type": 'post',
						'data': {'data':JSON.stringify(input)},
						"success": function(data){
							// console.log(data);
							callback(data);
						}
					});
					return;
				},
				'complete': function(){
					alert('完了しました。');
				},
				'onClickContentsLink': function( uri, data ){
					alert('編集: ' +  uri);
				},
				'onMessage': function( message ){
					console.info('message: '+message);
				}
			},
			function(){

				$(window).resize(function(){
					// このメソッドは、canvasの再描画を行います。
					// ウィンドウサイズが変更された際に、UIを再描画するよう命令しています。
					windowResized(function(){
						pickles2ModuleEditor.redraw();
					});
				});

				console.info('standby!!');
			}
		);

	});


});

},{"../../../../config/default.json":1}]},{},[2])