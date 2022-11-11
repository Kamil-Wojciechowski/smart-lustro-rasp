import time
import os

#import config_handler

import board
import adafruit_dht

# sensors = [
#     {
#         'name': 'temperature_sensor',
#         'read_function': 'read_temperature()'
#     },
#     {
#         'name': 'humidity_sensor',
#         'read_function': 'read_humidity()'
#     }
# ]


def read_dht_sensor():
    try:
        dht_device = adafruit_dht.DHT11(board.D26)
        information = {
            'temperature_sensor': dht_device.temperature,
            'humidity_sensor': dht_device.humidity
        }
        return information
    except:
        information = {
            'error': 400
        }
        return information
    finally:
        os.system('killall libgpiod_pulsein')


# def read_temperature():
#     # return dhtDevice.temperature;
#     return 1
#
#
# def read_humidity():
#     # return dhtDevice.humidity;
#     return 2
#
#
# def read_average_sensor_value(sensor):
#     summary = 0
#     read_seconds = config_handler.get_property('seconds_to_read_sensor')
#
#     for i in range(read_seconds):
#         summary += eval(sensor['read_function'])
#         time.sleep(1)
#
#     return summary / read_seconds
