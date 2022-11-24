import __init__
from gpiozero import MotionSensor
import time
from handlers import config

pir = MotionSensor(16)
seconds_to_keep_awake = config.get_property('seconds_to_keep_awake')

while True:
    pir.wait_for_motion()
    print('Moved')
    config.set_property('is_awake', False)
    pir.wait_for_no_motion()
    print('Move ended')
    time.sleep(seconds_to_keep_awake)
    config.set_property('is_awake', True)
    print('Time')