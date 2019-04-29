import serial
from picamera import PiCamera
from time import sleep
import datetime
import psycopg2

connection = psycopg2.connect(
    user="gyiklnogoftxaw",
    password="4ed2c78146de60f01e360a7dd390b3dbdee012f09d7e45cdd42dbd531ba46afe",
    host="ec2-107-20-183-142.compute-1.amazonaws.com",
    port="5432",
    database="d9jgpghedbvma3")

cursor = connection.cursor()
postgres_insert_query = """ INSERT INTO user_info (user_ID, date_of_sensor, soil_moisture, photo_resistivity, temperature, humidity) VALUES (%s,%s,%s,%s,%s,%s)"""


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
    if(arduino.in_waiting >0):
        line = arduino.readline().decode("utf-8")[:-2].split(',')
        print(line)
        
        record_to_insert = (36, now, line[0], line[1], line[2], line[3])
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        camera.capture('/home/pi/pics/' + now.strftime("%y-%m-%d-%H:%M:%S") + '.jpg')
    sleep(301)

