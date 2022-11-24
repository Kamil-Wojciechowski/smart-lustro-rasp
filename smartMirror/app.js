
let endpoint = 'http://localhost:5002';

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
            let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
            if(value.start.date){
                let d1 = new Date(value.start.date);
                $("#events").append(d1.toLocaleDateString('en-GB', options)+" (all day) -- <b>"+value.summary+"<b><br>");
            }
            else if (value.start.dateTime){
                let d1 = new Date(value.start.dateTime);
                let d2 = new Date(value.end.dateTime);
                $("#events").append(d1.toLocaleDateString('en-GB', options)+" "+d1.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })+" - "+d2.toLocaleTimeString('en-GB',  { hour: '2-digit', minute: '2-digit' })+" -- <b>"+value.summary+"<b><br>");
            }
        });  
        })
    .fail(function() {
        $("#events").html("NO EVENTS YET");
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



function getDht(){
    $.get( endpoint+'/get_dht_data', function (data){
        if(data.temperature_sensor){
            $('#temp').html("Temperature: "+data.temperature_sensor+' °C');
            $('#humi').html("Humidity: "+data.humidity_sensor+' %'); 
            
        }
    })
}

function getForecast(){
    
        $.get( endpoint+'/get_outside_weather', function (data){
            if(data.cod == "200"){
                let todTemp = toString(parseFloat(data.list[0].main.temp).val()-273.15);
                let tomTemp = toString(parseFloat(data.list[3].main.temp).val()-273.15);
                let todHumi = data.list[0].main.humidity;
                let tomHumi = data.list[3].main.humidity;
                let todDesc = data.list[0].weather[0].main;
                let tomDesc = data.list[3].weather[0].main;
                let tod = todDesc+ ", "+todTemp+" °C, "+todHumi+" %";
                let tom = tomDesc+ ", "+tomTemp+" °C, "+tomHumi+" %";
                $("#today").html("Today's weather: "+tod);
                $("#tomorrow").html("Tomorrow's weather: "+tom);
            }
            else{
                $("#today").html("Today's weather: --");
                $("#tomorrow").html("Tomorrow's weather: --");
            }
        })
    
}

function getDateTime(){
    setInterval(function(){
    const event = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var today = event.toLocaleDateString('en-GB', options);
        var now = new Date().toLocaleTimeString('en-GB');
        $("#date").html(today);
        $("#time").html(now);
    },1000)
}

function changeMode(){    
    getDht();
    getForecast();
    setInterval(function(){
        
        $.get( endpoint+'/is_awake', function (data){
            if(data.is_awake){
                $('.main').css("text-align","center");
                $('.left').css("width","100%");
                $('.right').css("width","0%");
                $('.data').css("display","none");
                $('.calendar').css("display","none");
                $('.forecast').css("display","none");
            }
            else{
                $('.main').css("text-align","left");
                    $('.data').css("display","block");
                    $('.left').css("width","50%");
                    $('.right').css("width","50%");
                    $('.calendar').css("display","block");
                    $('.forecast').css("display","block");
                setInterval(function(){
                    getDht();
                    getForecast();
                },1000)
            }
        })
    },300000)
}