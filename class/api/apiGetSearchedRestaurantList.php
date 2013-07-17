<?php 
class apiGetSearchedRestaurantList extends Controller_Api
{
	protected function get($aArgs)
	{
		require_once('builder/builderInterface.php');
		usbuilder()->init($this, $aArgs);
		
		/*assign values*/
		$aData['restaurant'] = str_replace(" ", "+", $aArgs['restaurant']);
		$aData['limit'] = $aArgs['limit'];
		$aData['offset'] = $aArgs['offset'];
		$aData['city'] = str_replace(" ", "+", $aArgs['city']);
		$aData['state'] = str_replace(" ", "+", $aArgs['state']);
		$aData['order_by'] = $aArgs['order_by'];
		
		/*curl*/
		$ch = curl_init();
		if($aData['city'] == ""){
			curl_setopt($ch, CURLOPT_URL,'http://api.v3.factual.com/t/restaurants-us?KEY=HcMpVBwpn5gFNR0mJ31sCGjWsaha7aEIeD4DvQyK&include_count=t&limit='.$aData['limit'].'&offset='.$aData['offset'].'&filters={%22$and%22:[{%22$or%22:[{%22name%22:{%22$search%22:%22'.$aData['restaurant'].'%27%22}},{%22category%22:{%22$search%22:%22'.$aData['restaurant'].'%22}}]},{%22region%22:{%22$search%22:%22'.$aData['state'].'%22}}]}&sort='.$aData['order_by'].':asc');
		}elseif($aData['state'] == ""){
			curl_setopt($ch, CURLOPT_URL,'http://api.v3.factual.com/t/restaurants-us?KEY=HcMpVBwpn5gFNR0mJ31sCGjWsaha7aEIeD4DvQyK&include_count=t&limit='.$aData['limit'].'&offset='.$aData['offset'].'&filters={%22$and%22:[{%22$or%22:[{%22name%22:{%22$search%22:%22'.$aData['restaurant'].'%22}},{%22category%22:{%22$search%22:%22'.$aData['restaurant'].'%22}}]},{%22locality%22:{%22$search%22:%22'.$aData['city'].'%22}}]}&sort='.$aData['order_by'].':asc');
		}else{
			curl_setopt($ch, CURLOPT_URL,'http://api.v3.factual.com/t/restaurants-us?KEY=HcMpVBwpn5gFNR0mJ31sCGjWsaha7aEIeD4DvQyK&include_count=t&limit='.$aData['limit'].'&offset='.$aData['offset'].'&filters={%22$and%22:[{%22$or%22:[{%22name%22:{%22$search%22:%22'.$aData['restaurant'].'%22}},{%22category%22:{%22$search%22:%22'.$aData['restaurant'].'%22}}]},{%22locality%22:{%22$search%22:%22'.$aData['city'].'%22}},{%22region%22:{%22$search%22:%22'.$aData['state'].'%22}}]}&sort='.$aData['order_by'].':asc');
		}
		curl_setopt($ch, CURLOPT_FAILONERROR,1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_TIMEOUT, 15);
		$retValue = curl_exec($ch);
		curl_close($ch);
		
		$ab = json_decode($retValue);
		return $ab;
	}
}