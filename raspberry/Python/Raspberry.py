import serial;
from picamera import PiCamera
from time import sleep
import datetime
import psycogp2

connection = psycopg2.connect(user="sysadmin", password="pynative@#29", host="127.0.0.1", port="5432", database="postgres_db")


camera = PiCamera()

arduino = serial.Serial('com1', 9600)

should_water = True

def water_plant():
	arduino.write('w')

def take_pic(now):
	camera.capture('/home/pi/pics/' + now + '.jpg')

while 1:
	if(ser.in_waiting >0):
		line = ser.readline()
		print(line)

   # cursor = connection.cursor()
   # postgres_insert_query = """ INSERT INTO mobile (ID, MODEL, PRICE) VALUES (%s,%s,%s)"""
   # record_to_insert = ()
   # cursor.execute(postgres_insert_query, record_to_insert)
   # connection.commit()

		now = datetime.datetime.now()
		# camera.capture('/home/pi/pics/' + now + '.jpg')

	if should_water:
		water_plant()

	sleep(3000)