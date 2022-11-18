from flask import Flask, jsonify
from flask_cors import CORS
from Handlers import config, database
from Sensors import p_dht
import requests

application = Flask(__name__)
CORS(application)


@application.route('/get_dht_data', methods=['GET'])
def get_dht_data():
    information = p_dht.read_sensor()
    return jsonify(information), information['status']


@application.route('/is_awake', methods=['GET'])
def is_awake():
    information = {
        'is_awake': config.get_property('is_awake')
    }
    return jsonify(information)

@application.route('/get_outside_weather', method=['GET'])
def get_outside_weather():
    url = "https://api.openweathermap.org/data/2.5/forecast?lat=51.9383777&lon=15.5050408&appid=1610df520907691bbe49c15333e337b2"
    response = requests.get(url)
    return jsonify(response.text)

def start_application():
    application.run(host=config.get_property('listener_host'), port=config.get_property('listener_port'))
