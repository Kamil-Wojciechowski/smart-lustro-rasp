from flask import Flask, jsonify
from flask_cors import CORS

import config_handler
import sensor_handler

application = Flask(__name__)
CORS(application)


# @application.route('/get_sensors_data', methods=['GET'])
# def function():
#     information = {}
#     for sensor in sensor_handler.sensors:
#         information[sensor['name']] = sensor_handler.read_average_sensor_value(sensor)
#     return jsonify(information)

@application.route('/get_dht_data', methods=['GET'])
def get_dht_data():
    return jsonify(sensor_handler.read_dht_sensor())

@application.route('/is_night_mode', methods=['GET'])
def is_night_mode():
    information = {
        'is_night_mode': config_handler.get_property('night_mode')    
    }
    return jsonify(information)

def start_application():
    application.run(port=config_handler.get_property('listener_port'))
