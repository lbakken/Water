import serial
from time import sleep as slp

ser = serial.Serial('/dev/serial0', baudrate=9600, parity=serial.PARITY_NONE,
	stopbits=serial.STOPBITS_ONE, bytesize=serial.EIGHTBITS, timeout=0)

