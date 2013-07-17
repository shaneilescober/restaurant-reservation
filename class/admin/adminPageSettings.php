<?php 
class adminPageSettings extends Controller_Admin
{
	protected function run($aArgs)
	{
		require_once('builder/builderInterface.php');
		usbuilder()->init($this, $aArgs);
		
		usbuilder()->validator(array('form' => 'opentable_settings_form'));
		$this->assign('seq', $aArgs['seq']);
		$this->assign("sUrl", common()->getFullUrl());
		$this->assign("bExtensionView", ($aArgs['etype'] ? 1 : 0));
		
		$this->importCSS('adminOpentable');
		$this->importCSS('datepicker');
		$this->importJS('adminOpentable');
		$this->importJS('datepicker');
		
		$sFormScript = usbuilder()->getFormAction('opentable_settings_form', 'adminExecReserveIndex');
		$this->writeJs($sFormScript);
		
		$this->view(__CLASS__);
	}
}