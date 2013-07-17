/*!
 * 	Datepicker 1.0.0
 *
 * 	Author : Cotongco Kevin I.
 *	Date: March 8, 2012
 */
(function($){
	$.fn.datepicker = function(settings){
		$.extend(defaults = {
			year : 0,
			month : 0,
			format : "YYYY-MM-DD"
		},settings);
		
		var selector = $(this).selector; // SELECTOR
		var calendar_id = "calendar_" + $(selector).attr("class"); // THE ID OF THE DIV WHERE THE CALENDAR IS APPENDED
		var week = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat"); // THE WEEKS
		var month = new Array("January","February","March","April","May","June","July","August","September","October","November","December"); // THE MONTHS
		var isInside = false; // TOGGLE MOUSE EVENT IF INSIDE THE calendar_id
		var max_days = new Array(); // MAX DAYS
		var view = "date";
		var ifBoxSupport = $.support.boxModel; // CHECKS THE BOX SUPPORT
		var firstRun = true; 
		
		var datepicker = {
			initialize : function(){ // INITIALIZE FUNCTION
				var date = new Date();
				var leapyear = 28;
				if(date.getFullYear() % 4 == 0){ // CALCULATION FOR LEAP YEAR
					leapyear = 29;
				}
				max_days = new Array(31,leapyear,31,30,31,30,31,31,30,31,30,31); // INITIALIZE MAXIMUM DAYS
				defaults.year = date.getFullYear(); // GET THE CURRENT YEAR
				defaults.month = date.getMonth(); // GET THE CURRENT MONTH
				
				if(firstRun){
					$("body").append("<input type = 'hidden' id = '" + calendar_id + "_format' value = '" + defaults.format + "'/><div id = '" + calendar_id + "' class = 'datepicker'></div>"); // APPEND THE calendar_id TO THE BODY
					if(!ifBoxSupport){
						var width = $(".datepicker").width() + (parseInt($(".datepicker").css("padding-left")) * 2) + (parseInt($(".datepicker").css("padding-right")) * 2);
						//var height = $(".datepicker").width() + parseInt($(".datepicker").css("padding-top")) + parseInt($(".datepicker").css("padding-bottom"));
					}
					$(".datepicker").css({
						width: width
					});
					firstRun = false;
				}
				datepicker.calendarView(); // GO TO VIEW CALENDAR
				datepicker.position(); // GOT TO POSITION CALENDAR
			},
			calendarView : function(){ // CALENDAR VIEW
				view = "date";
				
				var dateSelected = new Date();
				dateSelected.setFullYear(defaults.year,defaults.month ,1); // SET THE DATE
				
				var day = dateSelected.getDay(); // GET THE FIRST DAY OF THE MONTH
				var ctr = 1;
				
				var sNavigationLeft = "<div id = '" + calendar_id + "_left' class = 'datepicker_navleft'> <a><</a> </div>"; // LEFT NAV
				var sNavigationRight = "<div id = '" +  calendar_id  + "_right' class = 'datepicker_navright'> <a>></a> </div>"; // RIGHT NAV
				var sHtml = "";
				sHtml += "<div class = 'datepicker_title' id = '" + calendar_id +"_title'><span>" + month[defaults.month] + " " + defaults.year + "</span></div>"; // THE TITLE
				sHtml += "<table class = 'datepicker_view' align = 'center'>";
				var loop = 0;
				// SETS THE NUMBER OF ROWS		
				if((day == 5 && max_days[defaults.month] == 31) || day == 6){ 
					loop = 7;
				}
				else{
					loop = 6;
				}
				
				for(var i = 0; i<loop; i++){ // FOR LOOP FOR THE ROWS
					if(i == 0){
						sHtml += "<tr>";
							for(var x = 0; x<7; x++){ // FOR LOOP FOR THE ROW DATA -> WEEK NAMES
								if(week[x] == "Fri"){
									sHtml += "<td style = 'background-color:transparent'>&nbsp;" + week[x] + "&nbsp;</td>";
								}
								else if(week[x] == "Sat"){
									sHtml += "<td style = 'background-color:transparent'>" + week[x] + "&nbsp;</td>";
								}
								else{
									sHtml += "<td style = 'background-color:transparent'>" + week[x] + "</td>";
								}
							}
						sHtml += "</tr>";
					}
					else{
						sHtml += "<tr>";
							for(var x = 0; x<7; x++){ // FOR LOOP FOR THE ROW DATA -> NUMBERS
								if(((i == 1 && x >= day) || i > 1) && ctr <= max_days[defaults.month]){ // COMPUTES WHEN TO START AND WHEN TO END THE DISPLAY OF THE NUMBERS
									sHtml += "<td class = '" + calendar_id + "_numbers'>" + ctr + "</td>";
									ctr++;
								}
								else{
									sHtml += "<td style = 'background-color:transparent'>&nbsp;</td>";
								}
							}
						sHtml += "</tr>";
					}
				}
				sHtml += "</table>";
				$("#" + calendar_id).html(sNavigationLeft + sNavigationRight + sHtml); // APPEND TO THE calendar_id
			},
			monthView : function(){ // MONTH VIEW
				view = "month";
				
				var sHtml = "";
				sHtml += "<tr><td class = 'monthdata " + calendar_id + "_months' value = '0'>Jan</td><td value = '1' class = 'monthdata " + calendar_id + "_months'>Feb</td><td value = '2' class = 'monthdata " + calendar_id + "_months'>Mar</td><td value = '3' class = 'monthdata " + calendar_id + "_months'>Apr</td></tr>";
				sHtml += "<tr><td value = '4' class = 'monthdata " + calendar_id + "_months'>May</td><td value = '5' class = 'monthdata " + calendar_id + "_months'>Jun</td><td value = '6' class = 'monthdata " + calendar_id + "_months'>Jul</td><td value = '7' class = 'monthdata " + calendar_id + "_months'>Aug</td></tr>";
				sHtml += "<tr><td value = '8' class = 'monthdata " + calendar_id + "_months'>Sep</td><td value = '9' class = 'monthdata " + calendar_id + "_months'>Oct</td><td value = '10' class = 'monthdata " + calendar_id + "_months'>Nov</td><td value = '11' class = 'monthdata " + calendar_id + "_months'>Dec</td></tr>";
				
				$(".datepicker_view").html(sHtml);
			},
			yearView : function(){ // YEAR VIEW
				view = "year";
				var sHtml = "";
				years = defaults.year;
				for(var i = 0; i<3; i++){
					sHtml += "<tr>";
						for(var x = 0; x<4; x++){
							sHtml += "<td class = 'yeardata " + calendar_id + "_years'>" + years + "</td>";
							years++;
						}
					sHtml += "</tr>";
				}
				$(".datepicker_view").html(sHtml);
			},
			position : function(){ // POSITION
				var selector_pos = $(selector).position(); // GET THE SELECTOR'S POSITION
			
				$("#" + calendar_id).css({ // SET THE calendar_id's POSITION
					position:"absolute",
					top: (selector_pos.top + 30) + "px",
					left: selector_pos.left + "px"
				});
			}
		}
		
		datepicker.initialize();

		$(document).delegate("#" + calendar_id + "_left","click",function(){ // LEFT NAVIGATION EVENT HANDLER
			if(view == "date"){
				defaults.month--;
				if(defaults.month == -1){
					defaults.month = 11;
					defaults.year--;
				}
				
				datepicker.calendarView();
			}
			else if(view == "month"){
				defaults.year--;
				$("#" + calendar_id + "_title span").html(defaults.year);
			}
			else{
				defaults.year -= 12;
				datepicker.yearView();
			}
		});
		
		$(document).delegate("#" + calendar_id + "_right","click",function(){ // RIGHT NAVIGATION EVENT HANDLER
			if(view == "date"){
				defaults.month++;
				if(defaults.month == 12){
					defaults.month = 0;
					defaults.year++;
				}
				
				datepicker.calendarView();
			}
			else if(view == "month"){
				defaults.year++;
				$("#" + calendar_id + "_title span").html(defaults.year);
			}
			else{
				defaults.year += 12;
				datepicker.yearView();
			}
		});
		
		$(document).delegate("#" + calendar_id + "_title span","click",function(){ // TITLE NAVIGATION
			if(view == "date"){
				$(this).html(defaults.year);
				datepicker.monthView();
			}
			else if(view == "month"){
				$(this).html("Choose Year");
				datepicker.yearView();
			}
		});
		
		$(document).delegate("." + calendar_id + "_numbers","click",function(){ // SETS THE DATE TO THE INPUT TEXT EVENT HANDLER
			var d = $(this).html();
			var m = defaults.month * 1 + 1;
			
			if(m < 10){ m = "0" + m; }
			if(d < 10){ d = "0" + d; }
			
			var format = $("#" + calendar_id + "_format").val();
			
			switch(format){ // FORMAT SWITCH CASE
				case "YYYY-MM-DD" : 
					$(selector).val(defaults.year + "-" + m + "-" + d);
					break;
				case "YYYY/MM/DD":
					$(selector).val(defaults.year + "/" + m + "/" + d);
					break;
				case "M D, Y":
					$(selector).val(month[defaults.month] + " " + d + ", " + defaults.year);
					break;
			}
			
			$("#" + calendar_id).slideUp("fast");
		});
		
		$(document).delegate("." + calendar_id + "_months","click",function(){ // SETS THE DATE TO THE INPUT TEXT EVENT HANDLER
			defaults.month = $(this).attr("value");
			defaults.year = $("#" + calendar_id + "_title").text();
			
			datepicker.calendarView();
		});
		
		$(document).delegate("." + calendar_id + "_years","click",function(){ // SETS THE DATE TO THE INPUT TEXT EVENT HANDLER
			defaults.year = $(this).text();
			$("#" + calendar_id + "_title span").html(defaults.year);
			
			datepicker.monthView();
		});

		$(document).click(function(event){ // SHOW DISPLAY THE CALENDAR
			if(event.target.className != $(selector).attr("class")){ // HIDES THE CALENDAR
				if(!isInside){
					$("#" + calendar_id).slideUp("fast");
				}
			}
			else{ // TOGGLE DISPLAY OF CALENDAR
				datepicker.initialize();
				$("#" + calendar_id).slideToggle("fast");
			}
		});
		
		$("#" + calendar_id).bind("mouseenter mouseleave",function(event){ // SETS THE isInside VARIABLE IF THE MOUSE IS INSIDE THE calendar_id
			if(event.type == "mouseenter"){
				isInside = true;
			}
			else if(event.type == "mouseleave"){
				isInside = false;
			}
		});
		
	};
})( jQuery );