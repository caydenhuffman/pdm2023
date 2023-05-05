//https://youtu.be/aUJZpv90FhI
#include <Arduino_JSON.h>
const int numReadings = 10;
int xReadings[numReadings];
int readXIndex = 0;
int xTotal = 0;
int xAverage = 0;
int yReadings[numReadings];
int readYIndex = 0;
int yTotal = 0;
int yAverage = 0;
const int SW_pin = 2; 
const int X_pin = A0; 
const int Y_pin = A1;
const int redPin = 9;
const int greenPin = 10;
const int bluePin = 11;
const int ledPin = 8;
int ledState = HIGH;
int XValue = 0;
int YValue = 0;
int XOut = 0;
int YOut = 0;
unsigned long previousMillis = 0;
const long interval = 20;
JSONVar serialOutput;
void setup() {
  Serial.begin(9600);
  pinMode(SW_pin, INPUT);
  digitalWrite(SW_pin, HIGH);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  for (int thisXReading = 0; thisXReading < numReadings; thisXReading++) {
    xReadings[thisXReading] = 0;
  }
  for (int thisYReading = 0; thisYReading < numReadings; thisYReading++) {
    yReadings[thisYReading] = 0;
  }
}
void loop() {
  unsigned long currentMillis = millis();
  XOut = map(xAverage, 0, 1023, 0, 255);
  YOut = map(yAverage, 0, 1023, 0, 255);
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    xTotal = xTotal - xReadings[readXIndex];
    xReadings[readXIndex] = analogRead(X_pin);
    xTotal = xTotal + xReadings[readXIndex];
    readXIndex = readXIndex + 1;
    if (readXIndex >= numReadings) {
      readXIndex = 0;
    }
    xAverage = xTotal / numReadings;
    yTotal = yTotal - yReadings[readYIndex];
    yReadings[readYIndex] = analogRead(Y_pin);
    yTotal = yTotal + yReadings[readYIndex];
    readYIndex = readYIndex + 1;
    if (readYIndex >= numReadings) {
      readYIndex = 0;
    }
    yAverage = yTotal / numReadings;
    serialOutput["Switch"] = digitalRead(SW_pin);
    serialOutput["Xaxis"] = XOut;
    serialOutput["Yaxis"] = YOut;
    Serial.println(serialOutput);
  } 
  while (Serial.available() > 0) {
    int red = Serial.parseInt();
    int green = Serial.parseInt();
    int blue = Serial.parseInt();
    int joySwitch = Serial.parseInt();
    if (Serial.read() == '\n') {
      red = constrain(red, 0, 255);
      green = constrain(green, 0, 255);
      blue = constrain(blue, 0, 255);
      ledState = joySwitch;
      analogWrite(redPin, red);
      analogWrite(greenPin, green);
      analogWrite(bluePin, blue);
      digitalWrite(ledPin, ledState);
    }
  }
}