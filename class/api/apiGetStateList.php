<?php 
class apiGetStateList extends Controller_Api
{
	protected function get($aArgs)
	{
		require_once('builder/builderInterface.php');
		usbuilder()->init($this, $aArgs);
		
		$stateData = common()->modelContents()->getStateList();
		return $stateData;
	}
}