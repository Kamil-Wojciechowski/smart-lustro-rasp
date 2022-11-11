#!/bin/bash

python ~/Mirror/gitChanges.py
python ~/Mirror/buttons.py &
python ~/Mirror/motion.py &
python ~/Mirror/start_listener.py &
open ~/Mirror/smartMirror/index.html
sleep 60
python ~/Mirror/tap_f11.py &
