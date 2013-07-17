<?php 
class apiGetDefaultSettings extends Controller_Api
{
	protected function get($aArgs)
	{
		require_once('builder/builderInterface.php');
		usbuilder()->init($this, $aArgs);
		
		$seq = $aArgs['seq'];
		$data = common()->modelContents()->getDefaultSettings($seq);
		return $data;
	}
}