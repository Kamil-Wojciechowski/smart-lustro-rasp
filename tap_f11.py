from pykeyboard import PyKeyboard
import time
import time_handler

k = PyKeyboard()
k.tap_key(k.function_keys[11])

with open('/home/admin/Mirror/log.txt', 'w') as file:
    file.write(str(time_handler.get_current_millis()))
