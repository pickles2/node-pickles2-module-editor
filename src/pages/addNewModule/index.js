/**
 * pages/addNewModule/index.js
 */
module.exports = function(px2me, $canvasContent, options, callback){
	callback = callback||function(){};
	var $ = require('jquery');
	var utils79 = require('utils79');
	var Promise = require('es6-promise').Promise;

	new Promise(function(rlv){rlv();})
		.then(function(){ return new Promise(function(rlv, rjt){
			console.log('loading addNewModule page...');
			px2me.progress( function(){
				rlv();
			} );
		}); })
		.then(function(){ return new Promise(function(rlv, rjt){
			// 編集画面を描画
			// console.log(options);
			px2me.getCategoryCode( options.categoryId, function(categoryCode){
				// console.log(categoryCode);

				if( !categoryCode.editable ){
					alert('このモジュールは編集許可されていないパスにあります。');
					rjt();
					return;
				}

				var html = px2me.bindEjs(
					px2me.getTemplates('addNewModule'),
					{
						'categoryId': options.categoryId,
						'categoryCode': categoryCode
					}
				);
				$canvasContent.html('').append(html);

				$canvasContent.find('[name=moduleId]').val( '' );
				$canvasContent.find('[name=moduleName]').val( '' );
				rlv();
			} );

		}); })
		.then(function(){ return new Promise(function(rlv, rjt){
			// イベントをセット
			$canvasContent.find('button.pickles2-module-editor__save').on('click', function(e){
				var data = {};
				data.moduleId = $canvasContent.find('[name=moduleId]').val();
				data.moduleName = $canvasContent.find('[name=moduleName]').val();

				px2me.addNewModule(options.categoryId, data, function(result){
					px2me.closeModal(function(){
						px2me.loadPage('list', {}, function(){});
					});
				})
			});
			rlv();
		}); })
		.then(function(){ return new Promise(function(rlv, rjt){
			px2me.closeProgress(function(){
				rlv();
			});
		}); })
		.then(function(){ return new Promise(function(rlv, rjt){
			callback();
			rlv();
		}); })
		.catch(function(){
			px2me.closeProgress(function(){
				px2me.closeModal(function(){
					px2me.loadPage('list', {}, function(){
						callback();
					});
				});
			});
		})
	;

}