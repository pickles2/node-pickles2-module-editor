/**
 * pages/editPackage/index.js
 */
module.exports = function(px2me, $canvasContent, options, callback){
	callback = callback||function(){};
	var $ = require('jquery');
	var utils79 = require('utils79');
	var Promise = require('es6-promise').Promise;

	new Promise(function(rlv){rlv();})
		.then(function(){ return new Promise(function(rlv, rjt){
			console.log('loading editPackage page...');
			px2me.progress( function(){
				rlv();
			} );
		}); })
		.then(function(){ return new Promise(function(rlv, rjt){
			// 編集画面を描画
			// console.log(options);
			px2me.getPackageCode( options.packageId, function(packageCode){
				// console.log(packageCode);

				if( !packageCode.editable ){
					alert('このモジュールは編集許可されていないパスにあります。');
					rjt();
					return;
				}

				var html = px2me.bindEjs(
					px2me.getTemplates('editPackage'),
					{
						'packageId': options.packageId,
						'packageCode': packageCode
					}
				);
				$canvasContent.html('').append(html);

				$canvasContent.find('[name=infoJson]').val( packageCode.infoJson );
				rlv();
			} );
		}); })
		.then(function(){ return new Promise(function(rlv, rjt){
			// モーダルダイアログを開く
			px2me.modal({
				"title": "パッケージを編集する",
				"body": $canvasContent,
				"buttons": [
					$('<button class="px2-btn px2-btn--primary">')
						.text('OK')
						.click(function(){
							var data = {};
							data.infoJson = $canvasContent.find('[name=infoJson]').val();

							px2me.savePackageCode(options.packageId, data, function(result){
								px2me.loadPage('list', {}, function(){
									px2me.closeModal();
								});
							})

						})
				],
				"buttonsSecondary": [
					$('<button class="px2-btn">')
						.text('キャンセル')
						.click(function(){
							px2me.loadPage('list', {}, function(){
								px2me.closeModal();
							});
						})
				]
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
				px2me.loadPage('list', {}, function(){
					px2me.closeModal(function(){
						callback();
					});
				});
			});
		})
	;

}
