from gpiozero import MotionSensor
import config_handler
import time

pir = MotionSensor(16)


while True:
	pir.wait_for_motion()
	print('Moved')
	config_handler.set_property('night_mode', False)
	pir.wait_for_no_motion()
	print('Move ended')
	time.sleep(5)
	config_handler.set_property('night_mode', True)
	print('Time')