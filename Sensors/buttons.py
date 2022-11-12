import RPi.GPIO as GPIO
import time
import os
from Handlers import config

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(16, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

is_bright = True
is_power = config.get_property('is_power')

while True:
    if GPIO.input(16) == GPIO.HIGH:
        brightness = 0.5 if is_bright else 1
        os.system(f'xrandr --output HDMI-1 --brightness {brightness}')
        is_bright = not is_bright
        time.sleep(1)

    if GPIO.input(18) == GPIO.HIGH:
        power = 'off' if is_power else 'on'
        os.system(f'xset -display :0.0 dpms force {power}')
        is_power = not is_power
        config.set_property('power_mode', is_power)
        time.sleep(1)
