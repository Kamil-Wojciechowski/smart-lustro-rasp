import os
import board
import adafruit_dht


def read_sensor():
    information = {
        'status': 200
    }
    try:
        dht_device = adafruit_dht.DHT11(board.D26)
        information['temperature_sensor'] = dht_device.temperature
        information['humidity_sensor'] = dht_device.humidity
    except:
        information['status'] = 400
    finally:
        os.system('killall libgpiod_pulsein')
        return information
