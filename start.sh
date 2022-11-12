#!/bin/bash

python ~/Mirror/gitChanges.py
python ~/Mirror/Sensors/buttons.py &
python ~/Mirror/Sensors/motion.py &
python ~/Mirror/main.py &
chromium --kiosk ~/Mirror/smartMirror/index.html
date +"System up: %d.%m.%Y %H:%M" >> ~/Mirror/Logs/up_logs.txt