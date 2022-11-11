function getToken() {
    $.post( 'https://oauth2.googleapis.com/token?refresh_token=1//0cZrLLmHO7t7LCgYIARAAGAwSNwF-L9Ir5Y365xaxizuPS0LvhmNXE-RjStxIkyUOvkxTzSQHC8EUjndcosb3RaZ38NzQFKYBUho&client_secret=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&grant_type=refresh_token&client_id=482942803506-52vdcl73jpmf0kkfms39cojstst6ut7u.apps.googleusercontent.com', function (data) {
        window.localStorage.setItem('accessToken', data.access_token);
    });
}

function getEvents(time){
    $.ajaxSetup({
        headers:{
           'Authorization': "Bearer "+window.localStorage.getItem('accessToken'),
        }
     });
    $.get( 'https://www.googleapis.com/calendar/v3/calendars/wojciechowska.danuta595@gmail.com/events?maxResult=5&timeMin='+time , function (data){
        $("#events").html(" ");
        $.each(data['items'], function(index, value) {
            $("#events").append(value.start.date+" - "+value.end.date+" : "+value.summary+"<br>");
        });  
        })
    .fail(function() {
        window.localStorage.setItem('identify', 0);
    });
}

function eventsLoop(){
    getToken();
    var dt = new Date().toISOString();
    getEvents(dt);
    
    setInterval(function(){
        if(window.localStorage.getItem('identify') == 0){
            getToken();
            var dt = new Date().toISOString();
            getEvents(dt);
        }else{
            var dt = new Date().toISOString();
            getEvents(dt);
        };
    }, 60000);
}

function timeSet(){
    setInterval(function(){
        const event = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        var today = event.toLocaleDateString('en-GB', options);
        
        var now = new Date().toLocaleTimeString('en-GB');

        $("#date").html(today);
        $("#time").html(now);
    }, 1000);
}

function getData(){
    $.get( 'http://localhost:5002/get_dht_data', function (data){
            console.log(data);
            $('#temp').html("Temperature: "+data.temperature_sensor+' °C');
            $('#humi').html("Humidity: "+data.humidity_sensor+' %'); 
        })
    setInterval(function(){
        $.get( 'http://localhost:5002/get_dht_data', function (data){
            console.log(data);
            if(data.temperature_sensor){
                $('#temp').html("Temperature: "+data.temperature_sensor+' °C');
                $('#humi').html("Humidity: "+data.humidity_sensor+' %'); 
                
            }
        })
    }, 10000);
}

function changeMode(){
    setInterval(function(){
        $.get( 'http://localhost:5002/is_night_mode', function (data){
            console.log(data.is_night_mode); 
            if(data.is_night_mode==true){
                $('.main').css("text-align","center");
                $('.data').css("display","none");
                $('.calendar').css("display","none");
            }
            else{
                $('.main').css("text-align","left");
                $('.data').css("display","block");
                $('.calendar').css("display","block");
            }
        })
    },1000)
}
