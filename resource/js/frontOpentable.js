//--------------------GLOBAL VARIABLES-----------------------------------------------//
var limit = parseInt($("[name=view]").val());
var fLoc = $(".default_location").text();
var gState = $("[name=abbr]").val();
var global_keyword = "";
var address_class = "";
var confirm_phone = "";
var confirm_category = "";
var confirm_cuisine = "";
var confirm_rating = "";
var confirm_attire = "";
var global_state = "";
var global_city = "";
var rating_img = "";
var longitude = "";
var latitude = "";
var aLoc = new Array();
var search_tab = 0;
var offset = 0;
var total_records = 0;
//--------------------END-------------------------------------------------------------//

var frontPageOpentable = {
//--------------------DISPLAYS LIST OF RESTAURANTS------------------------------------//
	display: function(info){
		var sHtml = "";
		var sDesc = "";
		$(".restaurantres_list").empty();
		$.each(info.Data.response.data, function(key, val){
			var address_class = val.address.replace(/ /gi, "+");
			var name_class = val.name.replace(/ /gi, "+");
			var locality_class = val.locality;
			var region_class = val.region;
			var postcode_class = val.postcode;
			
			if(val.website == null){
				val.website = "";
			}
			if(val.rating == null){
				val.rating = 0.0;
			}
			if((val.rating >= 0  && val.rating < 0.5) || val.rating == null){
				img_src = "/_sdk/img/opentable/0.jpg";
			}else if(val.rating >= 0.5 && val.rating < 1){
				img_src = "/_sdk/img/opentable/0.5.jpg";
			}else if(val.rating >= 1 && val.rating < 1.5){
				img_src = "/_sdk/img/opentable/1.jpg";
			}else if(val.rating >= 1.5 && val.rating < 2){
				img_src = "/_sdk/img/opentable/1.5.jpg";
			}else if(val.rating >= 2 && val.rating < 2.5){
				img_src = "/_sdk/img/opentable/2.jpg";
			}else if(val.rating >= 2.5 && val.rating < 3){
				img_src = "/_sdk/img/opentable/2.5.jpg";
			}else if(val.rating >= 3 && val.rating < 3.5){
				img_src = "/_sdk/img/opentable/3.jpg";
			}else if(val.rating >= 3.5 && val.rating < 4){
				img_src = "/_sdk/img/opentable/3.5.jpg";
			}else if(val.rating >= 4 && val.rating < 4.5){
				img_src = "/_sdk/img/opentable/4.jpg";
			}else if(val.rating >= 4.5 && val.rating < 5){
				img_src = "/_sdk/img/opentable/4.5.jpg";
			}else{
				img_src = "/_sdk/img/opentable/5.jpg";
			}
			
			sDesc = "";
			//sDesc += "<div style = 'float:left'><img src=\'http://maps.googleapis.com/maps/api/streetview?size=52x56&location="+ address_class +"&fov=900&heading=360&pitch=10&sensor=false\' /></div>";
			sDesc += "<div style = 'float:left;margin-left:10px;width:300px;'>";
				sDesc += "<span style = 'font-size:14px; font-weight:bold'>"+ val.name + "&nbsp;("+ val.region +")" +"</span><br/>";
				sDesc += "<span style = 'font-size:12px'>"+ val.address + ", " + val.region + " " + val.postcode + "</span><br />";
				sDesc += "<span style = 'font-size:12px'>"+ val.tel + "</span><br /><br />";
				sDesc += "<span style = 'font-size:12px'><b>Category: </b>" + val.category + "</span><br />";
				sDesc += "<span style = 'font-size:12px'><b>Cuisine: </b>" + val.cuisine + "</span><br />";
			sDesc += "</div><div style = 'clear:both'></div>";
			
			sHtml = '';
			sHtml += '<li>';
			sHtml += '<div class="restaurantres_iteminfo">';
			sHtml += '<p class="restaurantres_name '+ name_class + ' ' + address_class + ' ' + locality_class + ' ' + region_class + ' ' + postcode_class + ' " style = "cursor:pointer" desc = "' + sDesc + '" >'+ val.name + '</p>';
			sHtml += '<p style = "font-size:11px">'+ val.address + ', ' + val.region + ' ' + val.postcode + '</p>';
			sHtml += '<p style = "font-size:11px">'+ val.tel + '</p>';
			sHtml += '<img src = "'+ img_src +'" /><b style = "font-size:11px">Rating: '+ val.rating +'</b><br /><br />';
			sHtml += '<p><a class ="web_link" href="http://'+ val.website +'" target = "_blank">'+ val.website +'</a></p>';
			sHtml += '</div>';
			sHtml += '</li>';
			
			$(".restaurantres_list").hide();
			$(".restaurantres_list").append(sHtml).fadeIn("slow");
			$(".pagination").css("display", "block");
		});
		$(".restaurantres_name").infobox();
	},
//--------------------END-----------------------------------------------------------//
//--------------------ON READY------------------------------------------------------//
	onready: function(){
		$(".restaurantres_list").empty().append("<center><img src = \"/_sdk/img/opentable/ajax-loader-front.gif\" /></center>");
		var sUrl = usbuilder.getUrl("apiGetRestaurantList");
		var order_by = $("[name=order]").val();
		aLoc = fLoc.split(", ");
		
		//AJAX for getting details of restaurant
		$.ajax({
			dataType: "json",
			type: "GET",
			url: sUrl,
			data: "state=" + gState + "&city=" + aLoc[1] + "&order_by=" + order_by + "&limit=" + limit + "&offset=" + offset,
			success: function(info){
				if(info.Data == null){
					$(".restaurantres_list").empty().append("<div class = \"errormsg\">Sorry for the inconvenience. A server error has been expected.</div>");
					$(".pagination").css("display", "none");
					$(".instruction").css("display", "none");
				}else if(info.Data.response.total_row_count == 0){
					$(".restaurantres_list").empty().append("<div class = \"errormsg\">No results found.</div>");
					$(".pagination").css("display", "none");
					total_records = info.Data.response.total_row_count;
					$(".count_results").text(info.Data.response.total_row_count);
					$(".instruction").hide();
				}else{
					frontPageOpentable.display(info);
					total_records = info.Data.response.total_row_count;
					$(".count_results").text(info.Data.response.total_row_count);
					$(".instruction").css("display", "block");
				}	
			}
		});
	},
//--------------------END-----------------------------------------------------------//
//--------------------LISTS STATES--------------------------------------------------//
	by_location: function(){
		$(".by_location").addClass("current");
		$(".by_name").removeClass("current");
		var sUrl = usbuilder.getUrl("apiGetStateList");
		var sHtml = "";
		$.ajax({
			dataType: "json",
			type: "GET",
			url: sUrl,
			success: function(info){
				$.each(info.Data,function(key,val){
					sHtml += "<div class = \"stateListWrapper\" style = \"font: 11px verdana,arial,sans-serif\">";
						sHtml += "<div class = \"radio_button\">";
							sHtml += "<input type = \"radio\" value = \"" + val.state +"\" name = \"sel_location\" class = \"" + val.abbr_state + "\" />";
						sHtml += "</div>";
						var str_state = val.state.replace(/ /gi, "_");
						sHtml += "<div class = \"state_name\ " + str_state +"\">";
							sHtml += val.state;
						sHtml += "</div>";
					sHtml += "</div>";
				});
				sHtml += "<div style = \"clear:both\"></div>";
				$(".loc_list").empty().append(sHtml);
				$(".loc_list_btn").empty().append("<input type = \"button\" name = \"search_loc_ok\" value = \"OK\" class = \"search_btn\" /><input type = \"button\" name = \"search_loc_cancel\" value = \"Cancel\" class = \"search_btn\" />");
				$(".loc_list").css({
					"height" : "200px",
					"border-width" : "1px 1px 1px 0px",
					"border-style" : "solid",
					"border-color" : "#777"
				});
			}
		});
	},
//--------------------END-----------------------------------------------------------//
//--------------------LISTS CITIES OF THE SELECTED STATE IN DIALOG BOX--------------//
	getCities: function(){
		var state = $("input:radio[name=sel_location]:checked").val();
		gState = $("input:radio[name=sel_location]:checked").attr("class");
		var sUrl = usbuilder.getUrl("apiGetCities");
		var aCity = new Array();
		var sHtml = "";
		var str_state = state.replace(/ /gi, "_");
		$(".city_list").hide();
		$("[name=abbr_state]").val(gState);

		$("." + str_state).empty().append(str_state + "<br/><br/>" + "<img src = \"/_sdk/img/opentable/ajax-loader.gif\" />");
		$.ajax({
			dataType: "json",
			type: "GET",
			url: sUrl,
			data: "state=" + gState,
			success: function(info){
				if(info.Data == null){
					$(".loc_list").empty().append("<div class = \"errormsg\">Sorry for the inconvenience. A server error has been expected.</div>");
				}else{
					$.each(info.Data.response.data,function(key,val){
						if($.inArray(val.locality, aCity) == -1){
							aCity.push(val.locality);
							sHtml += "<ul class = \"city_list\">";
								sHtml += "<li><input name = \"sel_city\" type = \"radio\" value = \""+ val.locality +"\" />" + val.locality + "</li>";
							sHtml += "</ul>";
						}
					});
					$("." + str_state).empty().append(str_state + sHtml);
				}
			}
		});
		fLoc = state;
	},
//--------------------END-----------------------------------------------------------//
//--------------------FINAL LOCATION BEFORE LISTING RESTURANTS----------------------//
	final_loc: function(){
		var sUrl = usbuilder.getUrl("apiGetRestaurantList");
		var order_by = $("[name=order]").val();
		var sel_city = $("input:radio[name=sel_city]").val();
		
		if(sel_city != null){
			fLoc += ", " + sel_city;
			aLoc = fLoc.split(", ");
		}
		if($("input:radio[name=sel_location]").is(":checked") == false || aLoc[1] == "undefined"){
			alert("Please choose a state and city.");
		}else{
			$(".default_location").text(fLoc);
			$.ajax({
				dataType: "json",
				type: "GET",
				url: sUrl,
				data: "state=" + gState + "&city=" + aLoc[1] + "&order_by=" + order_by + "&limit=" + limit + "&offset=" + offset,
				success: function(info){
					if(info.Data == null){
						$(".restaurantres_list").empty().append("<div class = \"errormsg\">Sorry for the inconvenience. A server error has been expected.</div>");
						$(".pagination").css("display", "none");
						$(".instruction").css("display", "none");
					}else if(info.Data.response.total_row_count == 0){
						$(".restaurantres_list").empty().append("<div class = \"errormsg\">No results found.</div>");
						$(".pagination").css("display", "none");
						total_records = info.Data.response.total_row_count;
						$(".count_results").text(info.Data.response.total_row_count);
						$(".instruction").css("display", "none");
					}else{
						frontPageOpentable.display(info);
						total_records = info.Data.response.total_row_count;
						$(".count_results").text(info.Data.response.total_row_count);
						$(".instruction").css("display", "block");
					}	
				}
			});
			frontPageOpentable.close_popup();
		}
	},
//--------------------END-----------------------------------------------------------//
//--------------------OPENS DIALOG BOX FOR SEARCHING BY NAME------------------------//
	by_name: function(){
		$(".by_location").removeClass("current");
		$(".by_name").addClass("current");
		$("[name=search_key]").val("");
		var sHtml = "";
		sHtml += "<div class = \"restaurantres_label\">Restaurant Name:</div>";
		sHtml += "<input type = \"text\" name = \"search_res_name\" class = \"front_input\" value = \"\" />";
		sHtml += "<div class = \"restaurantres_label\">State:</div>";
		sHtml += "<input type = \"text\" name = \"search_state\" class = \"front_input\" value = \"\" />";
		sHtml += "<div class = \"restaurantres_label\">City:</div>";
		sHtml += "<input type = \"text\" name = \"search_city\" class = \"front_input\" value = \"\" />";
		
		$(".loc_list").empty().append(sHtml);
		$(".loc_list_btn").empty().append("<input type = \"button\" name = \"search_name_ok\" value = \"OK\" / class = \"search_btn\"><input type = \"button\" name = \"search_name_cancel\" value = \"Cancel\" class = \"search_btn\"/>");
		$(".loc_list").css({
			"height" : "130px",
			"padding-top" : "5px",
			"border-width" : "1px 1px 1px 0px",
			"border-style" : "solid",
			"border-color" : "#777"
		});
	},
//--------------------END-----------------------------------------------------------//	
//--------------------PAGINATION----------------------------------------------------//
	pagination: function(action){
		if(action == "next" && (offset + limit < total_records)){
			offset = offset  + limit;
		}else if(action == "prev" && (offset - limit >= 0)){
			offset = offset - limit;
		}
		
		if(search_tab == 0){
			frontPageOpentable.onready();
		}else if(search_tab == 1){
			frontPageOpentable.final_loc();
		}else{
			frontPageOpentable.by_name();
		}
	},
//--------------------END-----------------------------------------------------------//	
//--------------------CHECKS IF VALUE ENTERED IS A NUMBER---------------------------//
	isNumber: function() {
		var n = $("[name=reserve_people]").val();
		if(!n.match(/^[0-9]+$/)){
			alert("Please input a number.");
			$("[name=reserve_people]").val("");
		}
	},
//--------------------END-----------------------------------------------------------//
//--------------------ADD SLASHES TO AVOID CONFLICT IN QUERY------------------------//	
	addslashes : function(str) 
    {
        str=str.replace(/\\/g,'\\\\');
        str=str.replace(/\'/g,'\\\'');
        str=str.replace(/\"/g,'\\"');
        str=str.replace(/\0/g,'\\0');
        return str;
    },
//--------------------END-----------------------------------------------------------//
//--------------------CLOSES OPENED DIALOG BOXES------------------------------------//
	close_popup: function(){
		$(".loc_list").slideUp();
		$(".loc_list_btn").empty();
	}
}
//--------------------END-----------------------------------------------------------//
//--------------------UPON CLICKING ON A SPECIFIC RESTAURANT------------------------//
$(document).delegate(".restaurantres_name", "click", function(){
	var aClass = $(this).attr("class");
	address_class = aClass.split(" ");
	var sUrl = usbuilder.getUrl('apiGetRestaurantHours');
	var sHtml = "";
	
	$.ajax({
		dataType: "json",
		type: "GET",
		url: sUrl,
		data: "address=" + address_class[2],
		success: function(info){
			
				var jsontext = info.Data.response.data[0].hours;
				var hours = jQuery.parseJSON(jsontext);
				longitude = info.Data.response.data[0].longitude;
				latitude = info.Data.response.data[0].latitude;
				confirm_phone = info.Data.response.data[0].tel;
				confirm_category = info.Data.response.data[0].category;
				confirm_cuisine = info.Data.response.data[0].cuisine;
				
				if(hours == null){
					$("[name=res_date]").attr("disabled", true);
					$("[name=res_time]").attr("disabled", true);
					$("[name=res_people]").attr("disabled", true);
				}else{
					
					var sHours = hours[1] + "";
					var aHours = new Array();
					var starthr = new Array();
					var endhr = new Array();
					var sHtml = "";
					
					aHours = sHours.split(",");
					starthr = aHours[0].split(":");
					endhr = aHours[1].split(":");
					
					for(var ctr=starthr[0];ctr<=endhr[0];ctr++){
						sHtml += "<option value = \""+ ctr +"\">"+ ctr +":00</option>";
					}
					
					$("[name=res_time]").empty().append(sHtml);
					$("[name=res_date]").removeAttr("disabled");
					$("[name=res_time]").removeAttr("disabled");
					$("[name=res_people]").removeAttr("disabled");
				}
		}
	});
});
//--------------------END-----------------------------------------------------------//
//--------------------GET RESERVATION IS CLICKED------------------------------------//
$("[name=get_reservation]").click(function(){
	if(($("[name=res_date]").val() == "") && ($("[name=res_people]").val() == "")){
		$("[name=res_date]").css({
			"border" : "thin solid #FF0000"
		});
		
		$("[name=res_people]").css({
			"border" : "thin solid #FF0000"
		});
	}else if($("[name=res_people]").val() == ""){
		$("[name=res_people]").css({
			"border" : "thin solid #FF0000"
		});
		$("[name=res_date]").css({
			"border" : "thin solid #777777"
		});
	}else if($("[name=res_date]").val() == ""){
		$("[name=res_date]").css({
			"border" : "thin solid #FF0000"
		});
		$("[name=res_people]").css({
			"border" : "thin solid #777777"
		});
	}else{
		$("[name=res_date]").css({
			"border" : "thin solid #777777"
		});
		$("[name=res_people]").css({
			"border" : "thin solid #777777"
		});
		var sHtml = "";
		var height = ($(window).height() / 2) - ($(".modalbox").height() / 2);
		var width = ($(window).width() / 2) - ($(".modalbox").width() / 2);
		var address = address_class[1] + "+" + address_class[2] + "+" + address_class[3] + "+" + address_class[4] + "+" + address_class[5];
		
		address = address.replace("'", "");
		address_class[1] = address_class[1].replace(/\+/gi, " ");
		address_class[2] = address_class[2].replace(/\+/gi, " ");
		address_class[3] = address_class[3].replace(/\+/gi, " ");
		address_class[4] = address_class[4].replace(/\+/gi, " ");
		address_class[5] = address_class[5].replace(/\+/gi, " ");
		
		sHtml += "<div class = \"mapimg\">";
			sHtml += "<img src='http://maps.googleapis.com/maps/api/staticmap?center="+ address +"&zoom=13&size=500x500&maptype=mobile&markers=color:red|label:A|"+latitude+", "+longitude+"&sensor=false' width=\"500\" height = \"500\" />";
		sHtml += "</div>";
		sHtml += "<div class = \"close_btn\"><img src = \"/_sdk/img/opentable/resclose.png\" /></div>";
		sHtml += "<div class = \"res_summary\" style = \"float:left; font-family: Arial; font-size:12px; color: #777; padding:5px\" >";
			sHtml += "<span style = \"font-weight:bold; font-size:18px\">"+ address_class[1] +"</span><br /><br />";
			sHtml += "<hr style = \"width:100%\"><span style = \"font-weight:bold; font-size:14px; padding: 5px 0px 5px 0px \">Contact Details</span><hr style = \"width:100%\">";
			sHtml += "<span><b>Address :</b> "+ address_class[2] + ", " + address_class[3] + " " + address_class[4] + ", " + address_class[5] +"</span><br />";
			sHtml += "<span><b>Contact # :</b> " + confirm_phone + "</span><br /><br />";
			
			sHtml += "<hr style = \"width:100%\"><span style = \"font-weight:bold; font-size:14px; padding: 5px 0px 5px 0px \">Reservation Details</span><hr style = \"width:100%\">";
			sHtml += "<span><b>Reservation Date :</b> "+ $("[name=res_date]").val() +" </span><br />";
			sHtml += "<span><b>Reservation Time :</b> " + $("[name=res_time]").val() + " </span><br />";
			sHtml += "<span><b>Number of People :</b> " + $("[name=res_people]").val() + " </span><br /><br />";
			
			sHtml += "<hr style = \"width:100%\"><span style = \"font-weight:bold; font-size:14px; padding: 5px 0px 5px 0px\">Other Details</span><hr style = \"width:100%\">";
			sHtml += "<span><b>Food Category :</b> " + confirm_category + " </span><br />";
			sHtml += "<span><b>Food Cuisine :</b> " + confirm_cuisine + " </span><br /><br />";
			
			sHtml += "<strong class=\"btn_reservation confirmres \">";
				sHtml += "<em>Confirm Reservation</em>";
			sHtml += "</strong>&nbsp;";
			
			sHtml += "<strong class=\"btn_reservation cancelres \">";
				sHtml += "<em>Cancel</em>";
			sHtml += "</strong>";
		sHtml += "</div>";
		
		$(".modalbox").css({
			"display" : "block",
			top : height + "px",
			left : width + "px"
		});

		$('body').append('<div class = "mask"></div>');
		$(".modalbox").empty().append(sHtml).fadeIn("slow");
	}
});
//--------------------END-----------------------------------------------------------//
//--------------------CLOSE BUTTON FOR MODAL BOX IS CLICKED-------------------------//
$(document).delegate(".close_btn", "click", function(){
	$(".modalbox").css({
		"display" : "none"
	});
	$(".mask").remove();
});
//--------------------END-----------------------------------------------------------//
//--------------------CONFIRM RESERVATION IS CLICKED IN SUMMARY---------------------//
$(document).delegate(".confirmres", "click", function(){
	var sHtml = "";
	var height = ($(window).height() / 2) - ($(".resform").height() / 2);
	var width = ($(window).width() / 2) - ($(".resform").width() / 2);
	address_class[1] = address_class[1].replace(/\+/gi, " ");
	address_class[2] = address_class[2].replace(/\+/gi, " ");
	address_class[3] = address_class[3].replace(/\+/gi, " ");
	address_class[4] = address_class[4].replace(/\+/gi, " ");
	address_class[5] = address_class[5].replace(/\+/gi, " ");
	
	sHtml += "<span style = \"font-weight:bold; font-size:14px\">Complete your reservation at "+ address_class[1] +"</span><br />";
	sHtml += "<span style = \"font-size:14px\">"+ $("[name=res_date]").val() +" at "+ $("[name=res_time]").val() +":00 for "+ $("[name=res_people]").val() +" persons</span><br /><br />";
	
	sHtml += "<table>";
		sHtml += "<tr>";
			sHtml += "<td class = \"resform_label\"><span class=\"req\">*</span> Diner Name :</td>";
			sHtml += "<td><input type = \"text\" name = \"firstname\" class = \"resform_text\" value = \"First Name\" />&nbsp;<input type = \"text\" name = \"lastname\" class = \"resform_text\" value = \"Last Name\" /></td>";
		sHtml += "</tr>";
		sHtml += "<tr>";
			sHtml += "<td class = \"resform_label\"><span class=\"req\">*</span> Phone :</td>";
			sHtml += "<td>";
				sHtml += "<select class = \"resform_select\">";
					sHtml += "<option value = \"home\">Home</option>";
					sHtml += "<option value = \"mobile\">Mobile</option>";
				sHtml += "</select>&nbsp;";
				sHtml += "<input type = \"text\" name = \"phone\" class = \"resform_text\" value = \"(555)555-555\" />";
			sHtml += "</td>";
		sHtml += "</tr>";
		sHtml += "<tr>";
			sHtml += "<td class = \"resform_label\"><span class=\"req\">*</span> Email :</td>";
			sHtml += "<td><input type = \"text\" name = \"email\" class = \"resform_email\" /></td>";
		sHtml += "</tr>";
		sHtml += "<tr>";
			sHtml += "<td class = \"resform_label\">Special Requests :</td>";
			sHtml += "<td><textarea style = \"width:305px; height:100px \"></textarea></td>";
		sHtml += "</tr>";
		sHtml += "<tr>";
			sHtml += "<td></td>";
			sHtml += "<td>";
				sHtml += "<strong class=\"btn_reservation compres\">";
					sHtml += "<em>Complete Reservation</em>";
				sHtml += "</strong>&nbsp;";
				sHtml += "<strong class=\"btn_reservation cancelres\">";
					sHtml += "<em>Cancel</em>";
				sHtml += "</strong>";
			sHtml += "</td>";
		sHtml += "</tr>";
	sHtml += "</table>";
	
	$(".resform").css({
		"display" : "block",
		top : height + "px",
		left : width + "px"
	});
	$(".modalbox").fadeOut("slow");
	$(".resform").empty().append(sHtml).fadeIn("slow");
	
});
//--------------------END-----------------------------------------------------------//
$(document).delegate(".compres", "click", function(){
	if($("[name=firstname]").val() == "First Name"){
		$("[name=firstname]").css({
			"border" : "thin solid #FF0000"
		});
	}
	else{
		$("[name=firstname]").css({
			"border" : "thin solid #777777"
		});
	}
	
	if($("[name=lastname]").val() == "Last Name"){
		$("[name=lastname]").css({
			"border" : "thin solid #FF0000"
		});
	}
	else{
		$("[name=lastname]").css({
			"border" : "thin solid #777777"
		});
	}
	
	if($("[name=phone]").val() == "(555)555-555"){
		$("[name=phone]").css({
			"border" : "thin solid #FF0000"
		});
	}
	else{
		$("[name=phone]").css({
			"border" : "thin solid #777777"
		});
	}
	
	if($("[name=email]").val() == ""){
		$("[name=email]").css({
			"border" : "thin solid #FF0000"
		});
	}
	else{
		$("[name=email]").css({
			"border" : "thin solid #777777"
		});
	}
	
	if($("[name-firstname]").val() != "First Name" && $("[name=lastname]").val() != "Last Name" && $("[name=phone]").val() != "(555)555-555" && $("[name=email]").val() != ""){
		alert("Reservation has been sent to the restaurant.");
	}
});

$(document).delegate("[name=firstname]", "focus", function(){
	$("[name=firstname]").val("");
}).delegate("[name=firstname]", "blur", function(){
	if($("[name=firstname]").val() == ""){
		$("[name=firstname]").val("First Name");
	}
});

$(document).delegate("[name=lastname]", "focus", function(){
	$("[name=lastname]").val("");
}).delegate("[name=lastname]", "blur", function(){
	if($("[name=lastname]").val() == ""){
		$("[name=lastname]").val("Last Name");
	}
});

$(document).delegate("[name=phone]", "focus", function(){
	$("[name=phone]").val("");
}).delegate("[name=phone]", "blur", function(){
	var n = $("[name=phone]").val();
	if($("[name=phone]").val() == ""){
		$("[name=phone]").val("(555)555-5555");
	}else if(!n.match(/^([\(]{1}[0-9]{3}[\)]{1}[\.| |\-]{0,1}|^[0-9]{3}[\.|\-| ]?)?[0-9]{3}(\.|\-| )?[0-9]{4}$/)){
		$("[name=phone]").val("(555)555-5555");	
		alert("Invalid contact number format");
	}
});
//--------------------CANCEL RESERVATION IS CLICKED---------------------------------//
$(document).delegate(".cancelres", "click", function(){
	$(".modalbox").fadeOut("slow");
	$(".resform").fadeOut("slow");
	$(".mask").remove();
	
	$("[name=res_date]").val("");
	$("[name=res_people]").val("");
});
//--------------------END-----------------------------------------------------------//
//--------------------IF STATE IS CHOSEN IN BY LOCATION SEARCH----------------------//
$(document).delegate("[name=sel_location]", "click", function(){
	frontPageOpentable.getCities();
});
//--------------------END-----------------------------------------------------------//
//--------------------PREVIOUS BUTTON IS CLICKED------------------------------------//
$(document).delegate(".prev", "click", function(){
	var action = "prev";
	frontPageOpentable.pagination(action);
});
//--------------------END-----------------------------------------------------------//
//--------------------NEXT BUTTON IS CLICKED----------------------------------------//
$(document).delegate(".next", "click", function(){
	var action = "next";
	frontPageOpentable.pagination(action);
});
//--------------------END-----------------------------------------------------------//
//--------------------SEARCH BY NAME OK BUTTON IS CLICKED---------------------------//
$(document).delegate("[name=search_name_ok]", "click", function(){
	$(".by_alphabatical").removeClass("current");
	$(".by_rating").removeClass("current");
	search_tab = 2;
	
	var sUrl = usbuilder.getUrl("apiGetSearchedRestaurantList");
	var search_res_name = $("[name=search_res_name]").val();
	var search_state = $("[name=search_state]").val();
	var search_city = $("[name=search_city]").val();
	var order_by = $("[name=order]").val();
	
	if(search_res_name == "" || (search_state == "" && search_city == "")){
		alert("Please input a restuarant and a state/city.");
	}else{
		frontPageOpentable.close_popup();
		$(".restaurantres_list").empty().append("<center><img src = \"/_sdk/img/opentable/ajax-loader-front.gif\" /></center>");
		$.ajax({
			dataType: "json",
			type: "GET",
			url: sUrl,
			data: "restaurant=" + search_res_name + "&city=" + search_city + "&state=" + search_state + "&order_by=" + order_by + "&limit=" + limit + "&offset=" + offset,
			success: function(info){
				if(info.Data == null){
					$(".restaurantres_list").empty().append("<div class = \"errormsg\">Sorry for the inconvenience. A server error has been expected.</div>");
					$(".pagination").css("display", "none");
					$(".instruction").css("display", "none");
				}else if(info.Data.response.total_row_count == 0){
					$(".restaurantres_list").empty().append("<div class = \"errormsg\">No results found.</div>");
					$(".pagination").css("display", "none");
					total_records = info.Data.response.total_row_count;
					$(".count_results").text(info.Data.response.total_row_count);
					$(".instruction").css("display", "none");
				}else{
					frontPageOpentable.display(info);
					total_records = info.Data.response.total_row_count;
					$(".count_results").text(info.Data.response.total_row_count);
					$(".instruction").css("display", "block");
					$("[name=search_res_name]").val("");
					$("[name=search_state]").val("");
					$("[name=search_city]").val("");
				}	
			}
		});
	}
	global_keyword = search_res_name;
	global_state = search_state;
	global_city = search_city;
	
});
//--------------------END-----------------------------------------------------------//
//--------------------SEARCH BY LOCATION OK BUTTON IS CLICKED-----------------------//
$(document).delegate("[name=search_loc_ok]", "click", function(){
	frontPageOpentable.final_loc();
	search_tab = 1;
	$(".by_alphabatical").removeClass("current");
	$(".by_rating").removeClass("current");
});
//--------------------END-----------------------------------------------------------//
//--------------------SEARCH BY LOCATION CANCEL BUTTON IS CLICKED-------------------//
$(document).delegate("[name=search_loc_cancel]", "click", function(){
	frontPageOpentable.close_popup();
	$(".by_alphabatical").removeClass("current");
	$(".by_rating").removeClass("current");
});
//--------------------END-----------------------------------------------------------//
//--------------------SEARCH BY NAME CANCEL BUTTON IS CLICKED-----------------------//
$(document).delegate("[name=search_name_cancel]", "click", function(){
	frontPageOpentable.close_popup();
});
//--------------------END-----------------------------------------------------------//
//--------------------CHECKS IF VALUE IS A NUMBER-----------------------------------//
$("[name=reserve_people]").keyup(function(){
	frontPageOpentable.isNumber();
});
//--------------------END-----------------------------------------------------------//
//--------------------BY LOCATION TAB CLICKED---------------------------------------//
$(".by_location a").click(function(){
	frontPageOpentable.by_location();
});
//--------------------END-----------------------------------------------------------//
//--------------------BY NAME TAB CLICKED-------------------------------------------//
$(".by_name a").click(function(){
	frontPageOpentable.by_name();

	$(".front_input").focusin(function(){
		$(this).css({
			"border" : "1px solid #FFB309"
		});
	});
	$(".front_input").focusout(function(){
		$(this).css({
			"border" : "1px solid #ADADAD"
		});
	});
});
//--------------------END-----------------------------------------------------------//
//--------------------SLIDE DOWN LOCATION LIST--------------------------------------//
$(".by_location").click(function(){
	$(".loc_list").slideDown();
	$(".loc_list").css("overflow","auto");
});
//--------------------END-----------------------------------------------------------//
//--------------------SLIDE DOWN LOCATION LIST--------------------------------------//
$(".by_name").click(function(){
	$(".loc_list").slideDown();
});
//--------------------END-----------------------------------------------------------//
//--------------------RATING TAB CLICKED--------------------------------------------//
$(".rating").click(function(){
	$(".by_rating").addClass("current");
	$(".by_alphabatical").removeClass("current");
	$(".restaurantres_list").empty().append("<center><img src = \"/_sdk/img/opentable/ajax-loader-front.gif\" /></center>");
	if(search_tab == 0 || search_tab == 1){
		var sUrl = usbuilder.getUrl("apiGetRestaurantList");
		var local_def_loc =  $(".default_location").text();
		aLoc = local_def_loc.split(", ");
		
		$.ajax({
				dataType: "json",
				type: "GET",
				url: sUrl,
				data: "state=" + gState + "&city=" + aLoc[1] + "&order_by=rating" + "&limit=" + limit + "&offset=" + offset,
				success: function(info){
					if(info.Data == null){
						$(".restaurantres_list").empty().append("<div class = \"errormsg\">Sorry for the inconvenience. A server error has been expected.</div>");
						$(".pagination").css("display", "none");
						$(".instruction").css("display", "none");
					}else if(info.Data.response.total_row_count == 0){
						$(".restaurantres_list").empty().append("<div class = \"errormsg\">No results found.</div>");
						$(".pagination").css("display", "none");
						total_records = info.Data.response.total_row_count;
						$(".count_results").text(info.Data.response.total_row_count);
						$(".instruction").css("display", "none");
					}else{
						frontPageOpentable.display(info);
						total_records = info.Data.response.total_row_count;
						$(".count_results").text(info.Data.response.total_row_count);
						$(".instruction").css("display", "block");
					}	
				}
		});
	}else if(search_tab == 2){
		var sUrl = usbuilder.getUrl("apiGetSearchedRestaurantList");
		$.ajax({
			dataType: "json",
			type: "GET",
			url: sUrl,
			data: "restaurant=" + global_keyword + "&city=" + global_city + "&state=" + global_state + "&order_by=rating" + "&limit=" + limit + "&offset=" + offset,
			success: function(info){
				if(info.Data == null){
					$(".restaurantres_list").empty().append("<div class = \"errormsg\">Sorry for the inconvenience. A server error has been expected.</div>");
					$(".pagination").css("display", "none");
					$(".instruction").css("display", "none");
				}else if(info.Data.response.total_row_count == 0){
					$(".restaurantres_list").empty().append("<div class = \"errormsg\">No results found.</div>");
					$(".pagination").css("display", "none");
					total_records = info.Data.response.total_row_count;
					$(".count_results").text(info.Data.response.total_row_count);
					$(".instruction").css("display", "none");
				}else{
					frontPageOpentable.display(info);
					total_records = info.Data.response.total_row_count;
					$(".count_results").text(info.Data.response.total_row_count);
					$(".instruction").css("display", "block");
				}	
			}
		});
	}
});
//--------------------END-----------------------------------------------------------//
//--------------------ALPHABETICALLY TAB CLICKED------------------------------------//
$(".alphabetically").click(function(){
	$(".by_alphabatical").addClass("current");
	$(".by_rating").removeClass("current");
	$(".restaurantres_list").empty().append("<center><img src = \"/_sdk/img/opentable/ajax-loader-front.gif\" /></center>");
	if(search_tab == 0 || search_tab == 1){
		var sUrl = usbuilder.getUrl("apiGetRestaurantList");
		var local_def_loc =  $(".default_location").text();
		aLoc = local_def_loc.split(", ");
		$.ajax({
				dataType: "json",
				type: "GET",
				url: sUrl,
				data: "state=" + gState + "&city=" + aLoc[1] + "&order_by=name" + "&limit=" + limit + "&offset=" + offset,
				success: function(info){
					if(info.Data == null){
						$(".restaurantres_list").empty().append("<div class = \"errormsg\">Sorry for the inconvenience. A server error has been expected.</div>");
						$(".pagination").css("display", "none");
						$(".instruction").css("display", "none");
					}else if(info.Data.response.total_row_count == 0){
						$(".restaurantres_list").empty().append("<div class = \"errormsg\">No results found.</div>");
						$(".pagination").css("display", "none");
						total_records = info.Data.response.total_row_count;
						$(".count_results").text(info.Data.response.total_row_count);
						$(".instruction").css("display", "none");
					}else{
						frontPageOpentable.display(info);
						total_records = info.Data.response.total_row_count;
						$(".count_results").text(info.Data.response.total_row_count);
						$(".instruction").css("display", "block");
					}	
					
				}
		});
	}else if(search_tab == 2){
		var sUrl = usbuilder.getUrl("apiGetSearchedRestaurantList");
		$.ajax({
			dataType: "json",
			type: "GET",
			url: sUrl,
			data: "restaurant=" + global_keyword + "&city=" + global_city + "&state=" + global_state + "&order_by=name" + "&limit=" + limit + "&offset=" + offset,
			success: function(info){
				if(info.Data == null){
					$(".restaurantres_list").empty().append("<div class = \"errormsg\">Sorry for the inconvenience. A server error has been expected.</div>");
					$(".pagination").css("display", "none");
					$(".instruction").css("display", "none");
				}else if(info.Data.response.total_row_count == 0){
					$(".restaurantres_list").empty().append("<div class = \"errormsg\">No results found.</div>");
					$(".pagination").css("display", "none");
					total_records = info.Data.response.total_row_count;
					$(".count_results").text(info.Data.response.total_row_count);
					$(".instruction").css("display", "none");
				}else{
					frontPageOpentable.display(info);
					total_records = info.Data.response.total_row_count;
					$(".count_results").text(info.Data.response.total_row_count);
					$(".instruction").css("display", "block");
				}	
			}
		});
	}
});
//--------------------END-----------------------------------------------------------//
//--------------------DOCMENT READY-------------------------------------------------//
$(document).ready(function(){
	var img_src = "/_sdk/img/opentable/0.jpg";
	
	$(".instruction").css("display", "none");
	$(".pagination").css("display", "none");
	$(".modalbox").css("display", "none");
	$(".resform").css("display", "none");
	$("[name=search_res_name]").val("");
	$("[name=search_state]").val("");
	$("[name=search_city]").val("");
	$(".by_alphabatical").removeClass("current");
	$(".by_rating").removeClass("current");
	$("[name=res_date]").attr("disabled", true);
	$("[name=res_time]").attr("disabled", true);
	$("[name=res_people]").attr("disabled", true);
	$("[name=res_date]").val("");
	$("[name=res_time]").val("");
	$("[name=res_people]").val("");
	$("[name=search_key]").focus(function(){
		$("[name=search_key]").css("border", "thin solid #FFB40A");
	});
	
	frontPageOpentable.onready();
	
	$(".date_3").datepicker({
		format : "M D, Y"
	});

	$(".loc_list_btn").css({
		"clear": "both"
	});
	$(".loc_list").css({
		"background": "white",
		"height": "200px",
		"overflow": "auto",
		"display": "none",
		"float": "left",
		"width": "100%",
		"padding-left": "5px"
	});
	
});
//--------------------END-----------------------------------------------------------//