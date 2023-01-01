
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
    $.get( 'https://www.googleapis.com/calendar/v3/calendars/7e0430f461871d8173cb80291310e587890af8a5db6c240c2d4addd0f66d7bd6@group.calendar.google.com/events?maxResult=5&timeMin='+time , function (data){
        $("#events").html(" ");
        $.each(data['items'], function(index, value) {
            let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
            if(value.start.date){
                let d1 = new Date(value.start.date);
                $("#events").append(d1.toLocaleDateString('pl-PL', options)+" (cały dzień) -- <b>"+value.summary+"<b><br>");
            }
            else if (value.start.dateTime){
                let d1 = new Date(value.start.dateTime);
                let d2 = new Date(value.end.dateTime);
                $("#events").append(d1.toLocaleDateString('pl-PL', options)+" "+d1.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })+" - "+d2.toLocaleTimeString('pl-PL',  { hour: '2-digit', minute: '2-digit' })+" -- <b>"+value.summary+"<b><br>");
            }
        });  
        })
    .fail(function() {
        $("#events").html("BRAK WYDARZEŃ");
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
            $('#temp').html("Temperatura: "+data.temperature_sensor+' °C');
            $('#humi').html("Wilgotność: "+data.humidity_sensor+' %'); 
            
        }
    })
}

function getForecast(){
    
        $.get( "https://api.openweathermap.org/data/2.5/forecast?lat=51.9383777&lang=pl&lon=15.5050408&appid=1610df520907691bbe49c15333e337b2", function (data){
            if(data.cod == "200"){
                let todTemp = (parseFloat((data.list[0].main.temp))-273.15).toFixed(0);
                let tomTemp = (parseFloat((data.list[3].main.temp))-273.15).toFixed(0);
                let todHumi = data.list[0].main.humidity;
                let tomHumi = data.list[3].main.humidity;
                let todIco = data.list[0].weather[0].icon;
                let tomIco = data.list[3].weather[0].icon;
                let todDesc = data.list[0].weather[0].description;
                let tomDesc = data.list[3].weather[0].description;
                let tod = "<img src='http://openweathermap.org/img/wn/"+todIco+"@2x.png'><br>"+todTemp+" °C, "+todHumi+" %";
                let tom = "<img src='http://openweathermap.org/img/wn/"+tomIco+"@2x.png'><br>"+tomTemp+" °C, "+tomHumi+" %";
                $("#today").html(tod);
                $("#tomorrow").html(tom);
            }
            else{
                $("#today").html("Dzisiaj: --");
                $("#tomorrow").html("Jutro: --");
            }
        })
    
}

function getDateTime(){
    setInterval(function(){
    const event = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var today = event.toLocaleDateString('pl-PL', options);
        var now = new Date().toLocaleTimeString('pl-PL');
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
                    $('.forecast').css("flex-direction","row");
                    $('.forecast').css("justify-content","flex-end");
                    getDht();
                    getForecast();
                }
            })
        },1000)
}

function mouse(){
    $('body').css("cursor","url(./cursor.png)")
}