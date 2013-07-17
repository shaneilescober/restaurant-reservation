<?php 
class adminExecReserveIndex extends Controller_AdminExec
{
	protected function run($aArgs)
	{
		require_once('builder/builderInterface.php');
		usbuilder()->init($this, $aArgs);
		
		$check = common()->modelContents()->checkdb_settings($aArgs['seq']);
		
		$aData['seq'] = $aArgs['seq'];
		$aData['abbr_state'] = $aArgs['abbr_state'];
		$aData['default_loc'] = $aArgs['default_loc'];
		$aData['display_view'] = $aArgs['display_view'];
		$aData['arrangement'] = $aArgs['arrangement'];
		
		if($check == "0"){
			$saveData = common()->modelContents()->insertSettings($aData);
		}else{
			$saveData = common()->modelContents()->updateSettings($aData);
		}
		
		if($saveData === true)
		{
			usbuilder()->message($sMessage, $sType = 'success');
			usbuilder()->message('Saved succesfully');
		}else{
			usbuilder()->message('Oops. Something went wrong.', 'warning');
		}
		
		usbuilder()->jsMove($aArgs['return_url']);
		//usbuilder()->vd($saveData);
	}
}