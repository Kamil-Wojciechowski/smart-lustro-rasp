import RPi.GPIO as GPIO
import time
import os
import json
import config_handler

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(16,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(18,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)

night_mode = False
power_mode = config_handler.get_property('power_mode')

while True:
    if GPIO.input(16) == GPIO.HIGH:
        print("Button 1 was pushed")
        if not(night_mode):
            os.system("xrandr --output HDMI-1 --brightness 0.5")
        else:
            os.system("xrandr --output HDMI-1 --brightness 1")
        night_mode = not(night_mode)
        
        time.sleep(1)
    if GPIO.input(18) == GPIO.HIGH:
        print("Butto n 2 was pushed")
        if power_mode:
            os.system("xset -display :0.0 dpms force off")
        else:
            os.system("xset -display :0.0 dpms force on")
        power_mode = not(power_mode)
        config_handler.set_property('power_mode', power_mode)
        time.sleep(1)