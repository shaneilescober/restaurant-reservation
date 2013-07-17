<?php 
class modelOpentable extends Model
{
	public function getDefaultSettings($seq)
	{
		$sSql = "SELECT * FROM opentable_settings WHERE seq = {$seq}";
		$data = $this->query($sSql, row);
		return $data;
	}
	
	public function getStateList()
	{
		$sSql = "SELECT * FROM opentable_states";
		$data = $this->query($sSql);
		return $data;
	}
	
	public function getCities($state)
	{
		$sSql = "SELECT DISTINCT city FROM opentable_restaurants WHERE state = '{$state}'";
		$data = $this->query($sSql);
		return $data;
	}
	
	public function checkdb_settings($seq)
	{
		$sSql = "SELECT COUNT(idx) as cId FROM opentable_settings WHERE seq = {$seq}";
		$data = $this->query($sSql, row);
		return $data['cId'];
	}
	
	public function insertSettings($aData)
	{
		$sSql = "INSERT INTO opentable_settings
		(seq, 
		default_location,
		default_abbr,
		display_view,
		arrangement) 
		VALUES 
		({$aData['seq']},
		'{$aData['default_loc']}',
		'{$aData['abbr_state']}',
		{$aData['display_view']},
		'{$aData['arrangement']}')";
		
		$bSaved = $this->query($sSql);
		
		if($bSaved === false){
			return false;
		}else{
			return true;
		}
	}
	
	public function updateSettings($aData)
	{
		$sSql = "UPDATE opentable_settings
		SET 
		default_location = '{$aData['default_loc']}', 
		default_abbr = '{$aData['abbr_state']}',
		display_view = {$aData['display_view']}, 
		arrangement = '{$aData['arrangement']}' 
		WHERE 
		seq = {$aData['seq']}";
		
		$bSaved = $this->query($sSql);
		
		if($bSaved === false){
			return false;
		}else{
			return true;
		}
	}
	
	public function getFrontDefaultSettings($seq)
	{
		$sSql = "SELECT * FROM opentable_settings WHERE seq = {$seq}";
		$data = $this->query($sSql,row);
		return $data;
	}
	
	public function getRestaurantList($aData)
	{
		if($aData['order_by'] == 'ratings'){
			$sSql = "SELECT * FROM opentable_restaurants WHERE state = '{$aData['state']}' AND city = '{$aData['city']}' ORDER BY ratings LIMIT {$aData['limit']} OFFSET {$aData['offset']}";
		}elseif($aData['order_by'] == 'biz_name'){
			$sSql = "SELECT * FROM opentable_restaurants WHERE state = '{$aData['state']}' AND city = '{$aData['city']}' ORDER BY biz_name LIMIT {$aData['limit']} OFFSET {$aData['offset']}";
		}elseif($aData['order_by'] == 'state'){
			$sSql = "SELECT * FROM opentable_restaurants WHERE state = '{$aData['state']}' AND city = '{$aData['city']}' ORDER BY state LIMIT {$aData['limit']} OFFSET {$aData['offset']}";
		}else{
			$sSql = "SELECT * FROM opentable_restaurants WHERE state = '{$aData['state']}' AND city = '{$aData['city']}' ORDER BY city LIMIT {$aData['limit']} OFFSET {$aData['offset']}";
		}
		
		$data = $this->query($sSql);
		return $data;
	}
	
	public function countRestaurant($aData)
	{
		$sSql = "SELECT COUNT(idx) as cId FROM opentable_restaurants WHERE state = '{$aData['state']}' AND city = '{$aData['city']}'";
		$data = $this->query($sSql, row);
		return $data;
	}
	
	public function checkIP($aData)
	{
		$sSql = "SELECT COUNT(idx) as cId FROM opentable_ip_voted WHERE restaurant_id = {$aData['id']} AND ip_add = '{$aData['ip']}'";
		$data = $this->query($sSql,row);
		return $data;
	}
	
	public function insertIP($aData)
	{
		$sSql = "INSERT INTO opentable_ip_voted (restaurant_id, ip_add) VALUES({$aData['id']}, '{$aData['ip']}')";
		$data = $this->query($sSql);
		if($data === false){
			return false;
		}else{
			return true;
		}
	}
	
	public function checkRating($aData)
	{
		$sSql = "SELECT ratings FROM opentable_restaurants WHERE idx = {$aData['id']}";
		$data = $this->query($sSql, row);
		return $data;
	}
	
	public function saveRating($aData)
	{
		$sSql = "UPDATE opentable_restaurants SET ratings = {$aData['fRate']} WHERE idx = {$aData['id']}";
		$data = $this->query($sSql);
		if($data === false){
			return false;
		}else{
			return true;
		}
	}
	
	public function searchRestaurant($aData)
	{
		$sSql = "SELECT DISTINCT biz_name FROM opentable_restaurants WHERE biz_name LIKE '%{$aData['keyword']}%'";
		$data = $this->query($sSql);
		return $data;
	}
	
	public function getSearchedRestaurant($aData)
	{
		if($aData['order_by'] == 'ratings'){
			$sSql = "SELECT * FROM opentable_restaurants WHERE biz_name = '{$aData['restaurant']}' ORDER BY ratings";
		}elseif($aData['order_by'] == 'biz_name'){
			$sSql = "SELECT * FROM opentable_restaurants WHERE biz_name = '{$aData['restaurant']}' ORDER BY biz_name";
		}elseif($aData['order_by'] == 'state'){
			$sSql = "SELECT * FROM opentable_restaurants WHERE biz_name = '{$aData['restaurant']}' ORDER BY state";
		}else{
			$sSql = "SELECT * FROM opentable_restaurants WHERE biz_name = '{$aData['restaurant']}' ORDER BY city";
		}
		
		$data = $this->query($sSql);
		return $data;
	}
}