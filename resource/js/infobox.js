/*
	Author: Kevin Cotongco
	Sample:
	HTML:
		<span class = 'names' desc = "<span style = 'color:red'>Name: Kevin Cotongco<br/br><br/>Age: 21 <br/>Address: Cubao</span>">Kevin Cotongco</span><br/><br/>
	jQuery:
		$(".names").infobox();
*/

(function($){
	$.fn.infobox = function(settings){
		var selector = $(this).selector;
		
		$("body").append("<div class = 'infobox'></div>");
	
		$(this).bind("mouseover mouseout",function(event){
			if(event.type == "mouseover"){
				var box_position = $(this).position();
				
				$(".infobox").css("top",box_position.top - 150);
				$(".infobox").css("left",box_position.left);
				$(".infobox").css("display","block");
			}
			else{
				$(".infobox").css("display","none");
			}
			
			var sHtml = $(this).attr("desc");
			$(".infobox").empty().append(sHtml);
		});
	}
})(jQuery);