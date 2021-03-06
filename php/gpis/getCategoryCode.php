<?php
/**
 * GPI: getCategoryCode
 */
return function($px2me, $data){

	$broccoli = $px2me->createBroccoli(array());

	// console.log(broccoli);
	$parsedModId = $broccoli->parseModuleId($data['categoryId'].'/dmy');
	if( $parsedModId === false ){
		return false;
	}
	if( !$parsedModId['category'] ){
		return false;
	}
	$realpath = $broccoli->paths_module_template[$parsedModId['package']].'/'.$parsedModId['category'].'/';
	if( !is_dir($realpath) ){
		return false;
	}

	$rtn = array();
	// $rtn['realpath'] = $realpath;
	$rtn['editable'] = $px2me->isEditablePath( $realpath ); // 編集可能なパスかどうか評価

	if( is_file($realpath.'/info.json') ){
		$rtn['infoJson'] = file_get_contents($realpath.'/info.json');
	}

	return $rtn;
};
