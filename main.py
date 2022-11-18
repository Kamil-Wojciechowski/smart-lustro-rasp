import sys
from Handlers import listener, database
from Sensors import p_dht


if len(sys.argv) > 1:
    option = sys.argv[1]
    if option == '--dump-sensors':
        database.initialize_database()
        database.remove_expired_records()
        information = p_dht.read_sensor()
        while information['status'] != 200:
            information = p_dht.read_dht_sensor()
        database.insert_weather_record(information['temperature_sensor'], information['humidity_sensor'])

else:
    listener.start_application()