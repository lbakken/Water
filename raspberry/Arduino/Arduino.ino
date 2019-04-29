#include <DHT.h>

int soil_r, phot_r;
float temp_r, humm_r;
const int soil_p = A0, phot_p = A3, t__h_r = 5, rela_o = 10;

unsigned long prev = 0, curr;
const long interval = 300000;

DHT dht(t__h_r, DHT22);

void setup() {
  pinMode(t__h_r, INPUT);
  pinMode(rela_o, OUTPUT);
  digitalWrite(rela_o, HIGH);
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  curr = millis();
  if (curr - prev >= interval) {
    handle_serial();
    
    prev = curr;

    soil_r = analogRead(soil_p);
    phot_r = analogRead(phot_p);

    temp_r = dht.readTemperature();
    humm_r = dht.readHumidity();
    
    Serial.print(soil_r);
    Serial.print(",");
    Serial.print(phot_r);
    Serial.print(",");
    Serial.print(temp_r);
    Serial.print(",");
    Serial.print(humm_r);
    Serial.println();
  }
}

void handle_serial() {
  while (Serial.available() > 0) {
   char command = Serial.read();
   
   if (command == 'w') {
      digitalWrite(rela_o, LOW);
      delay(2000);
      digitalWrite(rela_o, HIGH);

      Serial.println("S");
    }
  }
}
