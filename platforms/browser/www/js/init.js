       $(document).bind("mobileinit", function(){
          $.mobile.allowCrossDomainPages = true;
       });
       
       var dkmRestAPIURL = null;
       
       
       dkmRestAPIURL = 'http://rest.dkm-service.de/api';
       
       $(document).ready(function() {    
       
       
          
    	  var arrBranchen = [];
     	  var arrStellentypen = [];
     	  var arrBerufsfelder = [];
          
     	 function uid() {
     		  var result='';
     		  for(var i=0; i<32; i++)
     		      result += Math.floor(Math.random()*16).toString(16).toUpperCase();
     		  return result
     		}

     	  
     	 
     	 var userCookie = "richter";
       
       function onDeviceReady() {
        mobileUUID = device.uuid;
        userCookie = device.uuid;
       } 
        
          var favArray = [];
      	  
          function updateFavArray() {
        	  favArray = [];
      	      $.getJSON(dkmRestAPIURL+"/jobs/favorites/get/"+userCookie+"___"+$.now(), function(data){
          	    $.each(data, function (index,value) {
          		    favArray.push(value);
          	    });
        	  });
          }
          
          function validateEmail(email) {
              var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        	  return regex.test(email);
        	  
          }
          
          function registerSearchProfile() {
        	  $.get(dkmRestAPIURL+"/jobs/profile/register/"+createSearchProfileString(), function(data){  
        	  	if(data == "OK") {
        	  		$("#popupSearchProfileDialog").hide();
              	    $("#popupSearchProfileSubmit").show();
        	  	} else {
        	  		$("#searchprofileerrormsg").text(data);
        	  		$("#searchprofileerrormsg").show();
        	  	}
        	  });  
          }
          
          
          
          updateFavArray();  
    	    
          $("#sendfavoriteserrormsg").hide();
    	  $("#favoriteserrormsgdelete").hide();
    	  $("#popupSendFavoritesSubmit").hide();
    	  $("#popupFavoritesSubmitDelete").hide();
    	  $("#popupFavoriteDialog").hide();
    	  $("#searchprofileerrormsg").hide();
    	  $("#popupSearchProfileSubmit").hide();
    	  
          
          $.getJSON(dkmRestAPIURL+"/jobs/berufsfelder/json", function(data){
     		  $.each(data, function (index, value) {
     	      	    arrBerufsfelder.push(value["id"]);
     		  });
     	  });
           
     	  $.getJSON(dkmRestAPIURL+"/jobs/branchen/json", function(data){
     		  $.each(data, function (index, value) {
     	      	    arrBranchen.push(value["id"]);
     		  });
     	  });
     	  
     	  $.getJSON(dkmRestAPIURL+"/jobs/typen/json", function(data){
     		  $.each(data, function (index, value) {
     	      	    arrStellentypen.push(value["id"]);
     		  });
     	  });
    	  
          $.get(dkmRestAPIURL+"/jobs/branchen/options", function(data){
        	  if($("#select-branche").length > 0) {
        		
          		$("#select-branche").selectmenu();
        		$("#select-branche").html("<option>Bitte w&auml;hlen Sie:</option>"+data).selectmenu("refresh");
        	  	$("#select-branche-button").click(function(){
        		  	setTimeout(function(){
        		  		$("#select-branche-dialog").find('.ui-icon').removeClass('ui-icon-delete').addClass('ui-icon-check');
        		  		btnLeft = $("#select-branche-dialog").find('.ui-btn-left');
        		  		btnLeft.attr('data-iconpos','left');
        		  		btnLeft.attr('data-mini','true');
        		  		btnLeft.removeClass('ui-btn-icon-notext').addClass('ui-btn-icon-left');
        		  		btnLeft.find('.ui-btn-text').text("Fertig");      		  	
        		  	},10);
              	});
        	  }
        	  
          });
          
          $.get(dkmRestAPIURL+"/jobs/typen/options", function(data){  
        	  if($("#select-stellentyp").length > 0) {
        		$("#select-stellentyp").html("<option>Bitte w&auml;hlen Sie:</option>"+data).selectmenu("refresh");  
        	  	$("#select-stellentyp-button").click(function(){
        			setTimeout(function(){
        				$("#select-stellentyp-dialog").find('.ui-icon-delete').removeClass('ui-icon-delete').addClass('ui-icon-check');
        		  		btnLeft = $("#select-stellentyp-dialog").find('.ui-btn-left');
        		  		btnLeft.attr('data-iconpos','left');
        		  		btnLeft.attr('data-mini','true');
        		  		btnLeft.removeClass('ui-btn-icon-notext').addClass('ui-btn-icon-left');
        		  		btnLeft.find('.ui-btn-text').text("Fertig");      		  	
        		  	},10);
              	});
        	  }
        
        	  $("#select-stellentyp-listbox > div.ui-header > h1.ui-title").text("Stellen-Typ");
          });
          
          
          $.get(dkmRestAPIURL+"/jobs/berufsfelder/options", function(data){  
        	  $("#select-berufsfeld").html("<option>Bitte w&auml;hlen Sie:</option>"+data).selectmenu("refresh");  
        	  $("#select-berufsfeld-button").click(function(){
        		  setTimeout(function(){
        		    $("#select-berufsfeld-dialog").find('.ui-icon').removeClass('ui-icon-delete').addClass('ui-icon-check');
      		  		btnLeft = $("#select-berufsfeld-dialog").find('.ui-btn-left');
      		  		btnLeft.attr('data-iconpos','left');
      		  		btnLeft.attr('data-mini','true');
      		  		btnLeft.removeClass('ui-btn-icon-notext').addClass('ui-btn-icon-left');
      		  		btnLeft.find('.ui-btn-text').text("Fertig");      		  	
      		  	},10);
              });
          });
          
          $.getJSON(dkmRestAPIURL+"/jobs/latest/5", function(data){
        	$htmlstring = "<ul data-role='listview' data-inset='true' data-divider-theme='a'><li data-role='list-divider' data-theme='a'>TOP 5 Stellen</li>";
      	    // $htmlstring += '<li><a href="#" onClick="window.plugins.childBrowser.showWebPage(\'http://www.dkm-service.de/dkm_cmsadmin/file_output.php?file=job150332.pdf&type=show\');" rel="external"><h3>Koch/K&ouml;chin</h3><p>PLZ: 48165</p><p>bereitgestellt am 17.03.2013</p></a></li>';
        	
      	    $.each(data, function (index, value) {
        		if($.inArray(value["id"],favArray) >= 0) {
       				iconFav = "fav-active";
       				iconFavText = "gemerkt"
        		} else {
        			iconFav = "fav-inactive";
        			iconFavText = "merken"
        		}
        		if(value["jobtype"] == "text") {
           			$htmlstring += '<li><a href="#jobPopup'+value["id"]+'" data-rel="popup" data-transition="pop"><h3>'+value["name"]+'</h3><p>PLZ:'+value["plz"]+'</p><p>'+value["subline"]+'</p></a></li>';
           			$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-scroll="x" data-overlay-theme="a" data-theme="a" class="ui-content" data-position-to="window">';
           			$htmlstring += '</div>';
           		} else if (value["jobtype"] == "bildpdf") {
           			$htmlstring += '<li><a href="#jobPopup'+value["id"]+'" data-rel="popup" data-transition="pop"><h3>'+value["name"]+'</h3><p>PLZ:'+value["plz"]+'</p><p>'+value["subline"]+'</p></a></li>';
           			$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content" data-position-to="window"><a href="#" id="favlinktf'+value["id"]+'" data-role="button" data-theme="a" data-icon="'+iconFav+'" data-iconpos="left" data-mini="true" class="ui-btn-left">'+iconFavText+'</a><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
           			// $htmlstring += '<object id="pdfobject" type="application/pdf" data="'+value["url"]+'">';
           			// $htmlstring += '<iframe src="'+value["url"]+'" seamless frameborder="0" width="400" height="400"></iframe>';
           			// $htmlstring += '<p>Bei dieser Stellenanzeige handelt es sich um ein PDF-Dokument.</p>';
           			// $htmlstring += '<p>Anscheinend verf&uuml;gen Sie nicht &uuml;ber ein Plugin zur Anzeige von PDF-Dokumenten.</p>';
           			$htmlstring += '<p style="text-align: center;">';
           			$htmlstring += '<a data-theme="a" data-inline="true" data-icon="arrow-d" data-role="button" href="'+value["url"]+'">PDF-Download</a>';
        		    $htmlstring += '</p>';
        		    // '</object>';
        		    $htmlstring += '</div>';
           		} else {
           			$htmlstring += '<li><a href="#jobPopup'+value["id"]+'" data-rel="popup" data-transition="pop"><h3>'+value["name"]+'</h3><p>PLZ:'+value["plz"]+'</p><p>'+value["subline"]+'</p></a></li>';
           			$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content" data-position-to="window"><a href="#" id="favlinktf'+value["id"]+'" data-role="button" data-theme="a" data-icon="'+iconFav+'" data-iconpos="left" data-mini="true" class="ui-btn-left">'+iconFavText+'</a><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
           			$htmlstring += '</div>';
           		}
      	    });
        	
      	    $('#top5list').html($htmlstring+"</ul>").trigger("create");
      	    
      	  
 		  
      	  $.each(data, function (index, value) {
   			/* $htmlstring += '<li><a href="'+value["url"]+'" rel="external"><h3>'+value["name"]+'</h3><p>PLZ:'+value["plz"]+'</p><p>'+value["subline"]+'</p></a></li>';
   			$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content"><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
     			$htmlstring += '</div>';
   			if(value["jobtype"] == "text") {
   				$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content"><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
         			$htmlstring += '</div>';
         			setJobDescription(value["id"]);
   			} */
   			
   			if(value["jobtype"] == "text") {
   				$( "#jobPopup"+value["id"] ).on({
   			        popupbeforeposition: function() {
   			          setIFrame(value["id"],"http://www.dkm-service.de/stellenmarkt/index.php?module=showjob&ID="+value["id"]+"&location=mobile","tf");
   			        },
   			        popupafterclose: function() {}
   			    });
   				
         	} else if (value["jobtype"] == "url") {
         			$( "#jobPopup"+value["id"] ).on({
   			        popupbeforeposition: function() {
   			        	setIFrame(value["id"],value["url"],"tf");
   			        },
   			        popupafterclose: function() {}
   			    });
         	} else if (value["jobtype"] == "bildpdf") {
   			  $("#favlinktf"+value["id"]).on("click", function(event) {
       			 if($(this).attr("data-icon") == "fav-active") {
       				 $.get(dkmRestAPIURL+"/jobs/favorite/delete/"+userCookie+"__"+value["id"], function(data){  
       				 });
       				 
       				 updateFavArray();
       				 $(this).attr("data-icon","fav-inactive");
       				 $(this).find('.ui-icon').removeClass('ui-icon-fav-active').addClass('ui-icon-fav-inactive');
       				 $(this).find('.ui-btn-text').text("merken");
       	 		 } else {
       	 			$.get(dkmRestAPIURL+"/jobs/favorite/add/"+userCookie+"__"+value["id"], function(data){  
       	 			});
       	 		    
  				    updateFavArray();
       				$(this).attr("data-icon","fav-active");
       				$(this).find('.ui-icon').removeClass('ui-icon-fav-inactive').addClass('ui-icon-fav-active');
       				$(this).find('.ui-btn-text').text("gemerkt");
       	 		 }
       		  });
        	}
   			
   			
		    });
      	  
          });
          
          $.get(dkmRestAPIURL+"/jobs/number/total", function(data){  
              $("#jobnumber").html(data);  
          });
          
          $.get(dkmRestAPIURL+"/jobs/text/introduction", function(data){  
              $("#introtext").html(data);  
          });
          
          function setIFrame(id,url,pf) {
        	  winwidthpopup = $(window).width()*0.9;
        	  winheightpopup = $(window).height()*0.9;
        	  winwidthiframe = winwidthpopup*0.9;
        	  winheightiframe = winheightpopup*0.9;
        	  
        	  // alert(winheightiframe);
        	  // alert(winwidthiframe);
        	  
        	  
        	  if($.inArray(id,favArray) >= 0) {
        		  favButton = '<a href="#" id="favlink'+pf+id+'" data-role="button" data-theme="a" data-icon="fav-active" data-mini="true" data-iconpos="left" class="ui-btn-left">gemerkt</a>';
        	  } else {
        		  favButton = '<a href="#" id="favlink'+pf+id+'" data-role="button" data-theme="a" data-icon="fav-inactive" data-mini="true" data-iconpos="left" class="ui-btn-left">merken</a>';
        	  }
        	  
        	  $("#jobPopup"+id).html(favButton+'<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a><iframe src="'+url+'" seamless frameborder="0" width="'+winwidthiframe+'" height="'+winheightiframe+'" style="align: center;"></iframe>');
        	  $("#jobPopup"+id).trigger("create");

        	  $("#favlink"+pf+id).on("click", function(event) {
       			 if($(this).attr("data-icon") == "fav-active") {
       				 $.get(dkmRestAPIURL+"/jobs/favorite/delete/"+userCookie+"__"+id, function(data){  
       				 });
       			     
   					 updateFavArray();
       				 $(this).attr("data-icon","fav-inactive");
       				 $(this).find('.ui-icon').removeClass('ui-icon-fav-active').addClass('ui-icon-fav-inactive');
       				 $(this).find('.ui-btn-text').text("merken");
       	 		 } else {
       	 			$.get(dkmRestAPIURL+"/jobs/favorite/add/"+userCookie+"__"+id, function(data){  
       	 			 	
   					});
       	 		    
					updateFavArray();
       				$(this).attr("data-icon","fav-active");
       				$(this).find('.ui-icon').removeClass('ui-icon-fav-inactive').addClass('ui-icon-fav-active');
       				$(this).find('.ui-btn-text').text("gemerkt");
       	 		 }
       		  });

        	  $("#jobPopup"+id).width(winwidthpopup);
    		  $("#jobPopup"+id).height(winheightpopup);
    		  
          }
          
		  function createQueryString() {
        	  var selBranche = arrBranchen;
        	  var selTyp = arrStellentypen;
        	  var selBerufsfeld = arrBerufsfelder;
        	  var auslandFlag = "0";
        	  var plz = "00000";
        	  var fulltextString = "";
			  
			  selBranche = $('#select-branche').val() || arrBranchen;
	          selTyp = $('#select-stellentyp').val() || arrStellentypen;
	          selBerufsfeld = $('#select-berufsfeld').val() || arrBerufsfelder;
	          
	          if(selBranche == arrBranchen && selTyp == arrStellentypen && selBerufsfeld == arrBerufsfelder)
	             return "all";
	          else  
	        	 return "0"+"_"+selBranche.join('_')+"_"+selTyp.join('_')+"_"+selBerufsfeld.join('_')+"__"+plz+"__"+auslandFlag+"__std__"+fulltextString;
          }
		  
          function createSearchProfileString() {
        	  
			  var selBranche = $('#select-branche').val() || arrBranchen;
        	  var selTyp = $('#select-stellentyp').val() || arrStellentypen;
        	  var selBerufsfeld = $('#select-berufsfeld').val() || arrBerufsfelder;
        	  var auslandFlag = "0";
        	  var plz = "00000";
        	  var fulltextString = "";
			  var email = $('#searchprofileemail').val();
        		  
        	  return "0"+"_"+selBranche.join('_')+"_"+selTyp.join('_')+"_"+selBerufsfeld.join('_')+"__"+plz+"__"+auslandFlag+"__"+email+"__"+fulltextString;
          }
		  
		  $("#submitbutton").on( "click", function( event ) {
        	  event.preventDefault();
        	  /* $.post(dkmRestAPIURL+"/jobs/list/"+$(this).serialize(), function(data){
                 alert(data);	
              }); */
        	  updateFavArray();
        	  $.getJSON(dkmRestAPIURL+"/jobs/list/"+createQueryString(), function(data){
      	  		$htmlstring = "<ul data-role='listview'>";
      	  	    $panelstring = "";
      	  		
          		$.each(data, function (index, value) {
             			/* $htmlstring += '<li><a href="'+value["url"]+'" rel="external"><h3>'+value["name"]+'</h3><p>PLZ:'+value["plz"]+'</p><p>'+value["subline"]+'</p></a></li>';
             			$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content"><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
               			$htmlstring += '</div>';
             			if(value["jobtype"] == "text") {
             				$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content"><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
                   			$htmlstring += '</div>';
                   			setJobDescription(value["id"]);
             			} */
             			
                		if($.inArray(value["id"],favArray) >= 0) {
               				iconFav = "fav-active";
               				iconFavText = "gemerkt"
                		} else {
                			iconFav = "fav-inactive";
                			iconFavText = "merken"
                		}

             			
             			if(value["jobtype"] == "text") {
                   			$htmlstring += '<li><a href="#jobPopup'+value["id"]+'" data-rel="popup" data-transition="pop"><h3>'+value["name"]+'</h3><p>PLZ:'+value["plz"]+'</p><p>'+value["subline"]+'</p></a></li>';
                   			$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-scroll="x" data-overlay-theme="a" data-theme="a" class="ui-content" data-position-to="window">';
                   			$htmlstring += '</div>';
                   		} else if (value["jobtype"] == "bildpdf") {
                   			$htmlstring += '<li><a href="#jobPopup'+value["id"]+'" data-rel="popup" data-transition="pop"><h3>'+value["name"]+'</h3><p>PLZ:'+value["plz"]+'</p><p>'+value["subline"]+'</p></a></li>';
                   			$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content" data-position-to="window"><a href="#" id="favlinksr'+value["id"]+'" data-role="button" data-theme="a" data-icon="'+iconFav+'" data-iconpos="left" data-mini="true" class="ui-btn-left">'+iconFavText+'</a><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
                   			// $htmlstring += '<object id="pdfobject" type="application/pdf" data="'+value["url"]+'">';
                   			// $htmlstring += '<iframe src="'+value["url"]+'" seamless frameborder="0" width="400" height="400"></iframe>';
                   			// $htmlstring += '<p>Bei dieser Stellenanzeige handelt es sich um ein PDF-Dokument.</p>';
                   			// $htmlstring += '<p>Anscheinend verf&uuml;gen Sie nicht &uuml;ber ein Plugin zur Anzeige von PDF-Dokumenten.</p>';
                   			$htmlstring += '<p style="text-align: center;">';
                   			$htmlstring += '<a data-theme="a" data-inline="true" data-icon="arrow-d" data-role="button" href="'+value["url"]+'">PDF-Download</a>';
                		    $htmlstring += '</p>';
                		    // </object>';
                		    $htmlstring += '</div>';
                   		} else {
                   			$htmlstring += '<li><a href="#jobPopup'+value["id"]+'" data-rel="popup" data-transition="pop"><h3>'+value["name"]+'</h3><p>PLZ:'+value["plz"]+'</p><p>'+value["subline"]+'</p></a></li>';
                   			$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content" data-position-to="window"><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
                   			$htmlstring += '</div>';
                   		}
             			
          		});
          		
          		$('#searchresultlist').html($htmlstring+"</ul>").trigger("create");
          		
          		$.each(data, function (index, value) {
         			/* $htmlstring += '<li><a href="'+value["url"]+'" rel="external"><h3>'+value["name"]+'</h3><p>PLZ:'+value["plz"]+'</p><p>'+value["subline"]+'</p></a></li>';
         			$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content"><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
           			$htmlstring += '</div>';
         			if(value["jobtype"] == "text") {
         				$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content"><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
               			$htmlstring += '</div>';
               			setJobDescription(value["id"]);
         			} */
         			
         			if(value["jobtype"] == "text") {
         				$( "#jobPopup"+value["id"] ).on({
         			        popupbeforeposition: function() {
         			          setIFrame(value["id"],"http://www.dkm-service.de/stellenmarkt/index.php?module=showjob&ID="+value["id"]+"&location=mobile","sr");
         			        },
         			        popupafterclose: function() {}
         			    });
         				
               		} else if (value["jobtype"] == "url") {
               			$( "#jobPopup"+value["id"] ).on({
         			        popupbeforeposition: function() {
         			        	setIFrame(value["id"],value["url"],"sr");
         			        },
         			        popupafterclose: function() {}
         			    });
               		} else if (value["jobtype"] == "bildpdf") {
         			  $("#favlinksr"+value["id"]).on("click", function(event) {
              			 if($(this).attr("data-icon") == "fav-active") {
              				 $.get(dkmRestAPIURL+"/jobs/favorite/delete/"+userCookie+"__"+value["id"], function(data){  
            				 });
              				 updateFavArray();
          					 $(this).attr("data-icon","fav-inactive");
              				 $(this).find('.ui-icon').removeClass('ui-icon-fav-active').addClass('ui-icon-fav-inactive');
              				 $(this).find('.ui-btn-text').text("merken");
              	 		 } else {
              	 			$.get(dkmRestAPIURL+"/jobs/favorite/add/"+userCookie+"__"+value["id"], function(data){  
              	 			}); 
              	 			updateFavArray();
          					$(this).attr("data-icon","fav-active");
              				$(this).find('.ui-icon').removeClass('ui-icon-fav-inactive').addClass('ui-icon-fav-active');
              				$(this).find('.ui-btn-text').text("gemerkt");
              	 		 }
              		  });
               		}
         			
      		    });
          		
        	  });
      		
              $.mobile.changePage($('#searchresult'),{ transition: "slideup"});
          });
          
          $("#searchprofilesubmit").on("click", function() {
         	 
        	  if(!validateEmail($('#searchprofileemail').val()))
        		  $("#searchprofileerrormsg").show();
        	  else
        	  	registerSearchProfile();
        	  
        	  return false;
        	  
          });
          
          $("a[id*=showfavorites]").on( "click", function( event ) {
        	  event.preventDefault();
        	  /* $.post(dkmRestAPIURL+"/jobs/list/"+$(this).serialize(), function(data){
                 alert(data);	
              }); */
        	  $.getJSON(dkmRestAPIURL+"/jobs/favorites/list/"+userCookie+"___"+$.now(), function(data){
      	  		$htmlstring = "<ul data-role='listview'>";
      	  	    $panelstring = "";
      	  		
          		$.each(data, function (index, value) {
             			/* $htmlstring += '<li><a href="'+value["url"]+'" rel="external"><h3>'+value["name"]+'</h3><p>PLZ:'+value["plz"]+'</p><p>'+value["subline"]+'</p></a></li>';
             			$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content"><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
               			$htmlstring += '</div>';
             			if(value["jobtype"] == "text") {
             				$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content"><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
                   			$htmlstring += '</div>';
                   			setJobDescription(value["id"]);
             			} */
             			
                		if($.inArray(value["id"],favArray) >= 0) {
               				iconFav = "fav-active";
               				iconFavText = "gemerkt"
                		} else {
                			iconFav = "fav-inactive";
                			iconFavText = "merken"
                		}

             			
             			if(value["jobtype"] == "text") {
                   			$htmlstring += '<li><a href="#jobPopup'+value["id"]+'" data-rel="popup" data-transition="pop"><h3>'+value["name"]+'</h3><p>PLZ:'+value["plz"]+'</p><p>'+value["subline"]+'</p></a></li>';
                   			$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-scroll="x" data-overlay-theme="a" data-theme="a" class="ui-content" data-position-to="window">';
                   			$htmlstring += '</div>';
                   		} else if (value["jobtype"] == "bildpdf") {
                   			$htmlstring += '<li><a href="#jobPopup'+value["id"]+'" data-rel="popup" data-transition="pop"><h3>'+value["name"]+'</h3><p>PLZ:'+value["plz"]+'</p><p>'+value["subline"]+'</p></a></li>';
                   			$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content" data-position-to="window"><a href="#" id="favlinkfl'+value["id"]+'" data-role="button" data-theme="a" data-icon="'+iconFav+'" data-iconpos="left" data-mini="true" class="ui-btn-left">'+iconFavText+'</a><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
                   			// $htmlstring += '<object id="pdfobject" type="application/pdf" data="'+value["url"]+'">';
                   			// $htmlstring += '<iframe src="'+value["url"]+'" seamless frameborder="0" width="400" height="400"></iframe>';
                   			// $htmlstring += '<p>Bei dieser Stellenanzeige handelt es sich um ein PDF-Dokument.</p>';
                   			// $htmlstring += '<p>Anscheinend verf&uuml;gen Sie nicht &uuml;ber ein Plugin zur Anzeige von PDF-Dokumenten.</p>';
                   			$htmlstring += '<p style="text-align: center;">';
                   			$htmlstring += '<a data-theme="a" data-inline="true" data-icon="arrow-d" data-role="button" href="'+value["url"]+'">PDF-Download</a>';
                		    $htmlstring += '</p>';
                		    // '</object>';
                		    $htmlstring += '</div>';
                   		} else {
                   			$htmlstring += '<li><a href="#jobPopup'+value["id"]+'" data-rel="popup" data-transition="pop"><h3>'+value["name"]+'</h3><p>PLZ:'+value["plz"]+'</p><p>'+value["subline"]+'</p></a></li>';
                   			$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content" data-position-to="window"><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
                   			$htmlstring += '</div>';
                   		}
             			
          		});
          		
          		$('#searchfavoriteslist').html($htmlstring+"</ul>").trigger("create");
          		
          		$.each(data, function (index, value) {
         			/* $htmlstring += '<li><a href="'+value["url"]+'" rel="external"><h3>'+value["name"]+'</h3><p>PLZ:'+value["plz"]+'</p><p>'+value["subline"]+'</p></a></li>';
         			$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content"><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
           			$htmlstring += '</div>';
         			if(value["jobtype"] == "text") {
         				$htmlstring += '<div data-role="popup" id="jobPopup'+value["id"]+'" data-overlay-theme="a" data-theme="a" class="ui-content"><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
               			$htmlstring += '</div>';
               			setJobDescription(value["id"]);
         			} */
         			
         			if(value["jobtype"] == "text") {
         				$( "#jobPopup"+value["id"] ).on({
         			        popupbeforeposition: function() {
         			          setIFrame(value["id"],"http://www.dkm-service.de/stellenmarkt/index.php?module=showjob&ID="+value["id"]+"&location=mobile","fl");
         			        },
         			        popupafterclose: function() {}
         			    });
         				
               		} else if (value["jobtype"] == "url") {
               			$( "#jobPopup"+value["id"] ).on({
         			        popupbeforeposition: function() {
         			        	setIFrame(value["id"],value["url"],"fl");
         			        },
         			        popupafterclose: function() {}
         			    });
               		} else if (value["jobtype"] == "bildpdf") {
         			  $("#favlinkfl"+value["id"]).on("click", function(event) {
              			 if($(this).attr("data-icon") == "fav-active") {
              				 $.get(dkmRestAPIURL+"/jobs/favorite/delete/"+userCookie+"__"+value["id"], function(data){  
              				 	
           					 });
              				 updateFavArray();
          					 $(this).attr("data-icon","fav-inactive");
              				 $(this).find('.ui-icon').removeClass('ui-icon-fav-active').addClass('ui-icon-fav-inactive');
              				 $(this).find('.ui-btn-text').text("merken");
              	 		 } else {
              	 			$.get(dkmRestAPIURL+"/jobs/favorite/add/"+userCookie+"__"+value["id"], function(data){  
              	 			}); 
              	 			updateFavArray();
          					$(this).attr("data-icon","fav-active");
              				$(this).find('.ui-icon').removeClass('ui-icon-fav-inactive').addClass('ui-icon-fav-active');
              				$(this).find('.ui-btn-text').text("gemerkt");
              	 		 }
              		  });
               		}
         			
      		    });
          		
        	  });
      		
              $.mobile.changePage($('#searchfavorites'),{ transition: "slideup"});
          });
          
          function sendFavorites() {
        	  var email = $("#sendfavoritesemail").val();
        	  $.get(dkmRestAPIURL+"/jobs/favorites/send/"+userCookie+"__"+email, function(data){  
        	  	if(data == "OK") {
        	  		$("#popupSendFavoritesDialog").hide();
              	    $("#popupSendFavoritesSubmit").show();
        	  	} else {
        	  		$("#sendfavoriteserrormsg").text(data);
        	  		$("#sendfavoriteserrormsg").show();
        	  	}
        	  });  
          }
          
          function deleteFavorites() {
        	  $.get(dkmRestAPIURL+"/jobs/favorites/delete/"+userCookie, function(data){  
        	  	if(data == "OK") {
        	  		$("#popupFavoritesDialogDelete").hide();
              	    $("#popupFavoritesSubmitDelete").show();
        	  	}
        	  });  
          }
          
          $("#sendfavoritessubmit").on("click", function() {
         	 
        	  if(!validateEmail($('#sendfavoritesemail').val()))
        		  $("#sendfavoriteserrormsg").show();
        	  else
        	  	sendFavorites();
        	  
        	  return false;
        	  
          });
          
          $("#favoritessubmitdelete").on("click", function() {
         	 
        	  deleteFavorites();
        	  
        	  return false;
        	  
          });
          
          $("#openwindowgap").on("click", function(event) {
        	  window.open('http://www.dkm-service.de/dkm_cmsadmin/file_output.php?file=job150332.pdf&type=show');
          })
          
          document.addEventListener("deviceready", onDeviceReady, false);
       

       });  
       
       // JavaScript Document
