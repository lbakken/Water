import time
import serial
import requests

ser = serial.Serial('/dev/ttyUSB0', 9600)
ser.flushInput()

def normalize(t, i):
	# decompose into individual data points
	data = i.split(',')
	# post data to the database
	return data

while(True):
	# send
	ser.write(b'A')

	# recieve
	while(ser.in_waiting <= 0):
		time.sleep(5)
		continue
	info = ser.readline()
	print(info)
	normalize(time.ctime(), info)
