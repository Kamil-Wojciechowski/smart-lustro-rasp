import json
import os.path

config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'config.json'))


def get_property(name):
    with open(config_path, 'r') as file:
        config = json.load(file)
        value = ''
        try:
            value = config[name]
        finally:
            return value


def set_property(name, value):
    try:
        with open(config_path, 'r') as file:
            config = json.load(file)
            config[name] = value

        with open(config_path, 'w') as file:
            json.dump(config, file, indent=True)
    except:
        print('Property not set')
