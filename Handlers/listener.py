from flask import Flask, jsonify
from flask_cors import CORS
from Handlers import config, database
from Sensors import p_dht

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


def start_application():
    application.run(host=config.get_property('listener_host'), port=config.get_property('listener_port'))
