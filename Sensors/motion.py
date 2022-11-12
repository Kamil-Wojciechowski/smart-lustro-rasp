from gpiozero import MotionSensor
from Handlers import config
import time

pir = MotionSensor(16)
seconds_to_keep_awake = config.get_property('seconds_to_keep_awake')

while True:
    pir.wait_for_motion()
    print('Moved')
    config_handler.set_property('is_awake', False)
    pir.wait_for_no_motion()
    print('Move ended')
    time.sleep(seconds_to_keep_awake)
    config_handler.set_property('is_awake', True)
    print('Time')