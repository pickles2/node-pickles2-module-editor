/**
 * Pickles2ModuleEditor
 */
(function(){
	var __dirname = (function() {
		if (document.currentScript) {
			return document.currentScript.src;
		} else {
			var scripts = document.getElementsByTagName('script'),
			script = scripts[scripts.length-1];
			if (script.src) {
				return script.src;
			}
		}
	})().replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');

	// bootstrap をロード
	document.write('<link rel="stylesheet" href="'+__dirname+'/libs/bootstrap/dist/css/bootstrap.css" />');
	document.write('<script src="'+__dirname+'/libs/bootstrap/dist/js/bootstrap.js"></script>');

	// broccoli-html-editor をロード
	document.write('<link rel="stylesheet" href="'+__dirname+'/libs/broccoli-html-editor/client/dist/broccoli.css" />');
	document.write('<script src="'+__dirname+'/libs/broccoli-html-editor/client/dist/broccoli.js"></script>');

	window.Pickles2ModuleEditor = function(){
		var $ = require('jquery');
		var Promise = require('es6-promise').Promise;
		var $canvas;
		var _this = this;
		this.__dirname = __dirname;
		this.options = {};

		var px2meConf,
			templates;

		/**
		* initialize
		*/
		this.init = function(options, callback){
			console.info('initialize pickles2-module-editor...');

			callback = callback || function(){};
			var _this = this;
			// console.log(options);
			this.options = options;
			this.options.gpiBridge = this.options.gpiBridge || function(){ alert('gpiBridge required.'); };
			this.options.complete = this.options.complete || function(){ alert('finished.'); };
			this.options.onMessage = this.options.onMessage || function(message){ alert('onMessage: '+message); };
			this.options.preview = this.options.preview || {};

			$canvas = $(options.elmCanvas);
			$canvas.addClass('pickles2-module-editor');

			new Promise(function(rlv){rlv();})
				.then(function(){ return new Promise(function(rlv, rjt){
					_this.getConfig( function(conf){
						px2meConf = conf;
						rlv();
					} );
				}); })
				.then(function(){ return new Promise(function(rlv, rjt){
					_this.getTemplates( function(tpls){
						// console.log(tpls);
						templates = tpls;
						rlv();
					} );
				}); })
				.then(function(){ return new Promise(function(rlv, rjt){
					_this.getPackageList( function(packageList){
						// console.log(packageList);

						var html = _this.bindEjs(
							templates['list'],
							{'packageList': packageList}
						);
						$canvas.html('').append(html);
						rlv();
					} );
				}); })
				.then(function(){ return new Promise(function(rlv, rjt){
					callback();
					rlv();
				}); })
			;

		} // init()

		/**
		* canvas要素を取得する
		*/
		this.getElmCanvas = function(){
			return $canvas;
		}

		/**
		* ユーザーへのメッセージを表示する
		*/
		this.message = function(message, callback){
			callback  = callback||function(){};
			// console.info(message);
			this.options.onMessage(message);
			callback();
			return this;
		}

		/**
		 * Pickles 2 Module Editor のコンフィグ情報を取得する
		 */
		this.getConfig = function(callback){
			callback = callback || function(){};
			this.gpiBridge(
				{
					'api':'getConfig'
				},
				function(conf){
					callback(conf);
				}
			);
			return;
		}

		/**
		 * テンプレートを取得する
		 */
		this.getTemplates = function(callback){
			callback = callback || function(){};
			this.gpiBridge(
				{
					'api':'getTemplates'
				},
				function(templates){
					callback(templates);
				}
			);
			return;
		}

		/**
		 * ejs テンプレートにデータをバインドする
		 */
		this.bindEjs = function( tpl, data, options ){
			var ejs = require('ejs');
			var rtn = '';
			try {
				var template = ejs.compile(tpl.toString(), options);
				rtn = template(data);
			} catch (e) {
				var errorMessage = 'TemplateEngine "EJS" Rendering ERROR.';
				console.log( errorMessage );
				rtn = errorMessage;
			}

			return rtn;
		}

		/**
		 * broccoli モジュールのパッケージ一覧を取得する
		 */
		this.getPackageList = function(callback){
			callback = callback || function(){};
			this.gpiBridge(
				{
					'api':'getPackageList'
				},
				function(packageList){
					callback(packageList);
				}
			);
			return;
		}

		/**
		* gpiBridgeを呼び出す
		*/
		this.gpiBridge = function(data, callback){
			return this.options.gpiBridge(data, callback);
		}

		/**
		* 再描画
		*/
		this.redraw = function( callback ){
			callback = callback || function(){};
			callback();
			return;
		}

		/**
		* 編集操作を完了する
		*/
		this.finish = function(){
			this.options.complete();
		}
	}
})();
