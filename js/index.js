
$(document).ready(function(){

  
  navigator.geolocation.getCurrentPosition(showPosition);
  //get the city name and country
  function showPosition(position) {
        var veryHot ="https://res.cloudinary.com/dhjypclhx/image/upload/v1501011304/veryHot_ujbz8a.jpg"; 
        var veryCold = "https://res.cloudinary.com/dhjypclhx/image/upload/v1501011399/veryCold_pf4pru.jpg";
        var cold = "https://res.cloudinary.com/dhjypclhx/image/upload/v1501011543/cold_jiojpv.jpg";
        var hot= "https://res.cloudinary.com/dhjypclhx/image/upload/v1501011800/hot_flxkb2.jpg";
        var warm="https://res.cloudinary.com/dhjypclhx/image/upload/v1501011794/warm_sspqfx.jpg";
        var cool= "https://res.cloudinary.com/dhjypclhx/image/upload/v1501011805/cool_wto0u1.jpg";
        var backgrounds = [veryHot, hot, warm, cool, cold,veryCold];
        var lat = position.coords.latitude       
        var long = position.coords.longitude;    
        var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + '%2C' + long + '&language=en';    
        var location = "Latitude: " + lat + "</br>Longitude: " + long; 
        var url = "https://api.wunderground.com/api/f65a7ca860caff70/conditions/q/" + lat + "," + long + ".json";
     
        $.getJSON(GEOCODING).done(function(location) {
            $("#city").html("<h3>" + location.results[0].address_components[2].long_name + ", " +  location.results[0].address_components[5].long_name + "</h3>");      
       });  

       $.getJSON(url, function(data){

            var tempf = data.current_observation.temp_f;
            
            $("#temperature").html(tempf + " F");
            $("#weather").html(data.current_observation.weather);
            var iconURL= data.current_observation.icon_url;
             $(".icon").attr("src", iconURL);    
            console.log(iconURL);
            var heatFactor;
            if(tempf > 90){
               heatFactor = 0;
            }else if(tempf > 80){
               heatFactor = 1; 
            }else if(tempf > 65){
               heatFactor = 2;
            }else if(tempf > 45){
               heatFactor = 3; 
            }else if(tempf > 20){ 
               heatFactor = 4;
            }else{
               heatFactor = 5;
            }
         
         var image = backgrounds[heatFactor];    
         $(".back").attr("src", image); 
       });

      $(".btn").on("click",function(){ 
          if($(".btn").text() ==="Switch to Celcius"){
            $(".btn").html("Switch to Farenheit");
            $.getJSON(url, function(data){
              $("#temperature").html(data.current_observation.temp_c + " C");
            }); 
          } else {
            $(".btn").html("Switch to Celcius");
             $.getJSON(url, function(data){
              $("#temperature").html(data.current_observation.temp_f + " F");
            });
          }    
      });   
   }
});