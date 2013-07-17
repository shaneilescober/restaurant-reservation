<form name = "opentable_settings_form" class = "opentable_settings_form">
		<table id = "opentable_table">
			<input type = "hidden" name = "seq" value = "<?php echo $seq; ?>" />
			<input type="hidden" name="return_url" value="<?php echo $sUrl; ?>" />
			<input type = "hidden" name = "abbr_state" value = "" />
			<tr>
				<td class = "label">Default Location: </td>
				<td><input type = "text" name = "default_loc" readonly = "" value = "" onclick = "adminPageReserveIndex.choose_location_popup()" class = "opentable_input_text" fw-filter="isFill" /></td>
			</tr>
			<tr>
				<td class = "label">Display View: </td>
				<td>
					<select name = "display_view" class = "opentable_input_select">
						<option value = "3">3</option>
						<option value = "5">5</option>
						<option value = "10">10</option>
					</select>
				</td>
			</tr>
			<tr>
				<td class = "label">Sort By: </td>
				<td>
					<select name = "arrangement" class = "opentable_input_select">
						<option value = "name">Restaurant Name</option>
						<option value = "region">State</option>
						<option value = "locality">City</option>
						<option value = "rating">Rating</option>
					</select>
				</td>
			</tr>
			<tr>
				<td><a id="save-global" class="btn_apply" title="Save changes" href="#" onclick = "adminPageReserveIndex.save()">Save</a></td>
				<td>
					<a class="add_link" style="cursor:pointer;" title="Reset to default" onclick = "adminPageReserveIndex.reset()">Reset to Default</a>
					<?php 
					if ($bExtensionView === 1){
						echo '<a href="/admin/sub/?module=ExtensionPageManage&code=' . ucfirst(APP_ID) . '&etype=MODULE" class="add_link" title="Return to Restaurant Reservation">Return to Restaurant Reservation</a>
						<a href="/admin/sub/?module=ExtensionPageMyextensions" class="add_link" title="Return to My Extensions">Return to My Extensions</a>';
					}?>
				</td>
			</tr>
		</table>
	</form>
	
	<div id='sdk_chooselocation_popup_contents' style='display:none'>
		<div class="admin_popup_contents">
			<div id = "loc_list">
			</div>
			<a id="selected_loc_ok" class="btn_apply" title="Save changes" href="#" onclick = "adminPageReserveIndex.final_location()">OK</a>
			<a id="selected_loc_cancel" class="btn_apply" title="Save changes" href="#" onclick = "adminPageReserveIndex.close_popup()">Cancel</a>
			
		</div>
	</div>