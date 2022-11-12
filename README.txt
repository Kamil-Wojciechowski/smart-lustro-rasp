1. Dodac crony:
	1.1. crontab -e
	1.2. 0 * * * * python ~/Mirror/main.py --dump-sensors

2. Utworzyc plik 'autostart' w folderze ~/.config/lxsession/LXDE-pi, wpisac do niego:
@lxpanel --profile LXDE-pi
@pacmanfm --desktop --profile LXDE-pi
@sh ~/Mirror/start.sh