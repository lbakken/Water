import serial
from picamera import PiCamera
from time import sleep
import datetime
#import psycogp2

#connection = psycopg2.connect(user="sysadmin", password="pynative@#29", host="127.0.0.1", port="5432", database="postgres_db")


camera = PiCamera()

arduino = serial.Serial('/dev/ttyUSB0', 9600)

should_water = True

def water_plant():
    arduino.write(b'w')

sleep(5)

day = datetime.date.today()
water_today = False
while 1:
	now = datetime.datetime.now()
	today = datetime.date.today()
	if (day < today):
		day = today
		water_today = True
	if (water_today and now.time() >= datetime.time(9,0,0) and now.time() <= datetime.time(10, 0, 0)):
		water_today = False
		water_plant()
	if should_water:
		water_plant()
	if(arduino.in_waiting >0):
		line = arduino.readline()
		print(line)
		#camera.capture('/home/pi/pics/' + now.strftime("%y-%m-%d-%H:%M:%S") + '.jpg')
	sleep(3)

   # cursor = connection.cursor()
   # postgres_insert_query = """ INSERT INTO mobile (ID, MODEL, PRICE) VALUES (%s,%s,%s)"""
   # record_to_insert = ()
   # cursor.execute(postgres_insert_query, record_to_insert)
   # connection.commit()

