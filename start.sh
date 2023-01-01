#!/bin/bash

python ~/Mirror/git_changes.py
python ~/Mirror/sensors/buttons.py &
python ~/Mirror/sensors/motion.py &
python ~/Mirror/main.py &
chromium-browser --kiosk ~/Mirror/smartMirror/index.html
date +"System up: %d.%m.%Y %H:%M" >> ~/Mirror/logs.txt

unclutter -idle 1 &