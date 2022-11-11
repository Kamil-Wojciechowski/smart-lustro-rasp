import database_handler
import sensor_handler


def run():
    database_handler.initialize_database()
    database_handler.remove_expired_records()
    for sensor in sensor_handler.sensors:
        database_handler.insert_sensor_record(sensor['name'], sensor_handler.read_average_sensor_value(sensor))
