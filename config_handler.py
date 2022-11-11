import json


def get_property(name):
    with open('/home/admin/Mirror/config.json') as file:
        config = json.load(file)
        return config['config'][name]
    
def set_property(name, value):
    with open('/home/admin/Mirror/config.json') as file:
        config = json.load(file)
        config['config'][name] = value
        
    with open('/home/admin/Mirror/config.json', 'w') as file:
        file.write(json.dumps(config))
