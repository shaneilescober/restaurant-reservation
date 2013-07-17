var fLoc = '';

var adminPageReserveIndex = {
		
	choose_location_popup: function(){
		var sUrl = usbuilder.getUrl('apiGetStateList');
		var sHtml = '';
		$.ajax({
			dataType: 'json',
			type: 'GET',
			url: sUrl,
			success: function(info){
				$.each(info.Data,function(key,val){
					sHtml += "<div class = 'stateListWrapper'>";
						sHtml += "<div class = 'radio_button'>";
							sHtml += "<input type = 'radio' value = '" + val.state +"' name = 'sel_location' id = '" + val.abbr_state + "' onclick = 'adminPageReserveIndex.getCities()'/>";
						sHtml += "</div>";
						var str_state = val.state.replace(/ /gi, "_");
						sHtml += "<div class = 'state_name' id = '" + str_state +"'><br/>";
							sHtml += val.state;
						sHtml += "</div>";
					sHtml += "</div>";
				});
				sHtml += "<div style = 'clear:both'></div>";
				$('#loc_list').empty().append(sHtml);
			}
		});
		sdk_popup.load('sdk_chooselocation_popup').skin('admin').layer({
			'title' : 'Choose a State to Start',
			'width' : 450,
			'classname': 'ly_set ly_editor'
		});
	},
	
	getCities: function(){
		var state = $('input:radio[name=sel_location]:checked').val();
		var abbr_state = $('input:radio[name=sel_location]:checked').attr("id");
		var sUrl = usbuilder.getUrl('apiGetCities');
		var aCity = new Array();
		var sHtml = '';
		var str_state = state.replace(/ /gi, "_");
		$(".city_list").hide();
		$("[name=abbr_state]").val(abbr_state);

		$('#' + str_state).empty().append("<br/>" + str_state + "<br/><br/>" + '<img src = "/_sdk/img/opentable/ajax-loader.gif" />');
		$.ajax({
			dataType: 'json',
			type: 'GET',
			url: sUrl,
			data: "state=" + abbr_state,
			success: function(info){
				if(info.Data == null){
					sHtml += "<div style = 'color:#FF0000;font-style:italic; font: 11px verdana,arial,sans-serif;text-align:center;margin-top:30px'>Sorry for the inconvenience. Seems like something went wrong with the server.</div>";
					$('#loc_list').empty().append(sHtml);
				}else{
					$.each(info.Data.response.data,function(key,val){
						if($.inArray(val.locality, aCity) == -1){
							aCity.push(val.locality);
							sHtml += "<ul class = 'city_list'>";
								sHtml += '<li style = "height:10px;"><input style = "width:30px;" name = "sel_city" type = "radio" value = "'+ val.locality +'" />' + val.locality + '</li>';
							sHtml += "</ul>";
						}
					});
					$('#' + str_state).empty().append("<br/>" + str_state + sHtml);
					fLoc = state;
				}
				
			}
		});
		
		
	},
	
	final_location: function(){
		if(fLoc == ""){
			var sUrl = usbuilder.getUrl('apiGetDefaultSettings');
			var seq = $('[name=seq]').val();
			$.ajax({
				dataType: 'json',
				type: 'GET',
				url: sUrl,
				data: "seq=" + seq,
				success: function(info){
					$('[name=default_loc]').val(info.Data.default_location);
					$('[name=abbr_state]').val(info.Data.default_abbr);
					$('[name=display_view]').val(info.Data.display_view);
					$('[name=arrangement]').val(info.Data.arrangement);
				}
			});
		}else{
			fLoc += ", " + $('input:radio[name=sel_city]:checked').val();
			$('[name=default_loc]').val(fLoc);
		}
		sdk_popup.close('sdk_chooselocation_popup');
	},
	
	save: function(){
		if(oValidator.formName.getMessage('opentable_settings_form')){
			$('[name=opentable_settings_form]').submit();
		}else{
			oValidator.generalPurpose.getMessage(false,"Please choose a location");
		}
	},
	
	reset:function(){
		$('[name=default_loc]').val("California, Los Angeles");
		$('[name=abbr_state]').val("CA");
		$('[name=display_view]').val("5").attr("selected", true);
		$('[name=arrangement]').val("Restaurant name").attr("selected", true);
	},
	
	close_popup: function(){
		sdk_popup.close('sdk_chooselocation_popup');
	}
		
}

$(document).ready(function(){
	var sUrl = usbuilder.getUrl('apiGetDefaultSettings');
	var seq = $('[name=seq]').val();
	
	$.ajax({
		dataType: 'json',
		type: 'GET',
		url: sUrl,
		data: "seq=" + seq,
		success: function(info){
			$('[name=default_loc]').val(info.Data.default_location);
			$('[name=abbr_state]').val(info.Data.default_abbr);
			$('[name=display_view]').val(info.Data.display_view);
			$('[name=arrangement]').val(info.Data.arrangement);
		}
	});
});