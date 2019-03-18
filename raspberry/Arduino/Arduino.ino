const int mois = 1;
const int phot = 2;

const int pump = 1;
const int temp = 2;

int mois_v = 0;
int phot_v = 0;
int temp_v = 0;
int humi_v = 0;

void setup() {
    Serial.begin(9600);
}

void loop(){
    if (Serial.available() > 0) {
        char serIn = Serial.read();
        if (serIn == 'A') {
            Serial.println(..readings..);
        } 
        else if (serIn == 'W') {
            Serial.println("SUCCESS");
        }
    }
    delay(5000);
}