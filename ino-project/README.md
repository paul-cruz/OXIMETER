# Configuración de los dispositivos de Arduino

_La parte de electrónica del proyecto está desarrollada para la placa Arduino Nano 33 IoT y se acopla con el módulo de [sensor oxímetro MAX30102](https://uelectronics.com/producto/max30102-sensor-pulso-concentracion-oxigeno/), a continuación se muestran las indicaciones para configurar los dispositivos_

## Productos y tecnologías 🛠️

* [Arduino Nano 33 IoT](https://store.arduino.cc/usa/nano-33-iot) - Placa de desarrollo
* [Sensor oxímetro MAX30102](https://uelectronics.com/producto/max30102-sensor-pulso-concentracion-oxigeno/) - Sensor de pulso y oximetría
* [Fritzing](https://fritzing.org/download/) - Programa para diagramar las conexiones

### Pre-requisitos 📋

_Para esta sección se deben tener los siguientes requisitos:_
* [Fritzing instalado](https://console.cloud.google.com/) - La plataforma de nube dónde se aloja y consume servicios el proyecto
* [IDE de Arduino Instalado](https://www.arduino.cc/en/software) - IDE para programar el Arduino Nano 33 IoT
* [Kit del pulsioxímetro Mexbalia](https://mexbalia.com/oximeter/) - Kit con todo lo necesario para armar tu dispositivo

## Comenzando 🚀

_Para iniciar debes tener el kit proporcionado por Mexbalia y montar el dispositivo, acorde al [esquema de montaje](https://github.com/paul-cruz/OXIMETER/blob/master/ino-project/oximeter_diagram.fzz)_

_Ya teniendo el dispositivo montado se procederá a la programación del dispositivo, siguiendo los siguientes pasos:_

1. Abrir el [proyecto de Arduino](https://github.com/paul-cruz/OXIMETER/tree/master/ino-project/oximeter), ya sea abriendo el archivo [oximeter.ino](https://github.com/paul-cruz/OXIMETER/blob/master/ino-project/oximeter/oximeter.ino) o desde el IDE.
2. Ya en el IDE se debe ir a **Programa** -> **Incluir librería** -> **Administrar bibliotecas** e instalar las siguientes librerías:

* [WiFiNINA by Arduino](https://www.arduino.cc/en/Reference/WiFiNINA)
* [SparkFun_MAX3010x_Sensor_Library](https://github.com/sparkfun/SparkFun_MAX3010x_Sensor_Library)
* [Google Cloud IoT Core JWT by Vladimir Korukov](https://www.arduino.cc/reference/en/libraries/google-cloud-iot-core-jwt/)
* [U8g2](https://www.arduino.cc/reference/en/libraries/u8g2/)

2. Una vez instaladas las librerias se debe configurar el archivo [secrets.h](https://github.com/paul-cruz/OXIMETER/blob/master/ino-project/oximeter/secrets.h) llenando lo siguiente:.
```
#define SECRET_SSID "WIFI_SSID" - Aquí se debe escribir el nombre de la red a la que se desea conectar
#define SECRET_PASS "WIFI_PASSWORD" - Aquí se debe escribir la contraseña de la red a la que se desea conectar

const char* project_id = "your-project-id"; - Aquí se debe escribir el project_id el cual se configuró en la plataforma de nube, para entenderlo ver -configuraciones de la nube-
const char* location = "your-project-location"; - Se debe configurar la región que también se configuro en la plataforma de nube (GCP)
const char* registry_id = "your-cloud-iot-registry-id"; - Se debe sustituir con el nombre del registro de Cloud IoT Core
const char* device_id = "your-cloud-iot-device-id"; - Se debe ingresar el device_id el cual se obtiene en la pagina de la consola de GCP en el producto de Cloud IoT Core

const char* private_key_str =
    "private_key_str-first-line" - Se debe ingresar la primera linea de valores hexadecimales que se extraen del archivo "nombre-dispositivo"_extracted.txt conseguido mediante el ejecutable -create_device.sh-
    "private_key_str-second-line" - Se debe ingresar la segunda linea de valores hexadecimales que se extraen del archivo "nombre-dispositivo"_extracted.txt conseguido mediante el ejecutable -create_device.sh-
    "private_key_str-third-line"; - Se debe ingresar la tercer linea de valores hexadecimales que se extraen del archivo "nombre-dispositivo"_extracted.txt conseguido mediante el ejecutable -create_device.sh-
```
_[-configuraciones de la nube-](https://github.com/paul-cruz/OXIMETER/tree/master/cloud-settings/README.md)_

_[-create_device.sh-](https://github.com/paul-cruz/OXIMETER/blob/master/cloud-settings/create_device.sh)_

3. Finalmente en el IDE de Arduino se debe dar en **Subir** paara programar el dispositivo con el sketch.
