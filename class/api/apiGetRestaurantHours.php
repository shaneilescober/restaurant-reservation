<?php 
class apiGetRestaurantHours extends Controller_Api
{
	protected function get($aArgs)
	{
		require_once('builder/builderInterface.php');
		usbuilder()->init($this, $aArgs);
		
		$address = str_replace(" ", "+", $aArgs['address']);
		
		/*curl*/
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,'http://api.v3.factual.com/t/restaurants-us?KEY=HcMpVBwpn5gFNR0mJ31sCGjWsaha7aEIeD4DvQyK&include_count=t&limit=1&offset=0&filters={%22$and%22:[{%22address%22:{%22$search%22:%22'.$address.'%22}}]}&sort=hours:asc');
		curl_setopt($ch, CURLOPT_FAILONERROR,1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_TIMEOUT, 15);
		$retValue = curl_exec($ch);
		curl_close($ch);
		
		$ab = json_decode($retValue);
		return $ab;
	}
}