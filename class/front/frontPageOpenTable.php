<?php 
class frontPageOpenTable extends Controller_Front
{
	protected function run($aArgs)
	{
		require_once('builder/builderInterface.php');
		usbuilder()->init($this, $aArgs);
		
		$aOption['seq'] = $this->getSequence();
		$_SESSION['seq'] = $aOption['seq'];
		
		$def_settings = common()->modelContents()->getFrontDefaultSettings($aOption['seq']);
		
		/*----------------------------------------HTML STRINGS-------------------------------------------------*/
		$views = "<input type = \"hidden\" name = \"view\" value = ".$def_settings['display_view']." />";
		$order = "<input type = \"hidden\" name = \"order\" value = ".$def_settings['arrangement']." />";
		$def_abbr = "<input type = \"hidden\" name = \"abbr\" value = ".$def_settings['default_abbr']." />";
		
		$search_tabs = '<ul class="restaurantres_tabs">
							<li class="by_location current"><a href="#">By Location</a></li>
							<li class ="by_name"><a href="#">By Restaurant Name</a></li>
						</ul>';
		$order_tabs = '<ul class="restaurantres_tabs">
							<li class ="by_rating"><a href="#" class ="rating">Rating</a></li>
							<li class = "by_alphabatical"><a href="#" class ="alphabetically">Alphabetically</a></li>
						</ul>';
		
		$reservation_details = '<ul class="restaurantres_settings">
									<li>
										<label>
											<strong class="date icon_sprite"></strong>
										</label>
										<input type="text" name = "res_date" class="date_3" style="width:125px; margin-left:5px" />
									</li>
									<li>
										<label><strong class="number icon_sprite"></strong></label>
										<select name = "res_time" style = "width:125px;"></select>
									</li>
									<li>
										<label>
											<strong class="time icon_sprite"></strong>
										</label>
										<input type ="text" name ="res_people" value ="" style="width:125px; margin-left:5px;" value="" />
									</li>
									<li>
										<a href="#" name = "get_reservation">
											<strong class="btn_reservation">
												<em>Get Reservation</em>
											</strong>
										</a>
									</li>
								</ul>';
		
		$result_list = '<div class = "instruction" style = "margin:5px 0px 5px 10px; display:none">Click on a restaurant below to start reserving.</div>
						<ul class="restaurantres_list"></ul>
						<div class = "pagination" style = "display:none">
							<center>
								<a href = "#" class = "prev"><img src = "/_sdk/img/opentable/prev.gif">&nbsp;PREV</a>
								&nbsp;&nbsp;&nbsp;
								<a href = "#" class = "next">NEXT&nbsp;<img src = "/_sdk/img/opentable/next.gif"></a>
							</center>
						</div>';
		/*--------------------------------------------END-----------------------------------------------------*/
		
		/*------------------------------ASSINGMENT OF VALUES TO VARIABLES-------------------------------------*/
		$this->assign('def_loc', $def_settings['default_location']);
		$this->assign('def_abbr', $def_abbr);
		$this->assign('views', $views);
		$this->assign('order', $order);
		$this->assign('loc_list', 'loc_list');
		$this->assign('loc_list_btn', 'loc_list_btn');
		$this->assign('default_location', 'default_location');
		$this->assign('count_results', 'count_results');
		$this->assign('modalbox', 'modalbox');
		$this->assign('resform', 'resform');
		$this->assign('reservation_details', $reservation_details);
		$this->assign('searchtabs', $search_tabs);
		$this->assign('ordertabs', $order_tabs);
		$this->assign('result_list', $result_list);
		/*--------------------------------------------END-----------------------------------------------------*/
		
		/*--------------------------------------------CSS/JS IMPORT-------------------------------------------*/
		$this->importCss('frontOpentable');
		$this->importCss('datepicker');
		$this->importJS('datepicker'); 
		$this->importJS('infobox');
		$this->importJS('frontOpentable');
		/*--------------------------------------------END-----------------------------------------------------*/
	}
	
	public function frontjs()
	{
		
	}
}