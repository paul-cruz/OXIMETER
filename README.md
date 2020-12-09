# OXIMETER
A continuación se muestran las indicaciones para poder iniciar el proyecto del **Pulsioxímetro de Mexbalia**, las indicaciones están descritas para ejecutarse en un ambiente de Linux, debido a que los comandos están desarrollados y probados para este, el proyecto se puede ejecutar en otros ambientes, pero la forma de implementarlo varia en algunos puntos. Este proyecto cuenta con tres grandes partes, las cuales se irán comentando una por una.

### Pre-requisitos 📋
Para poder llevar a cabo la implementación y despliegue del proyecto se debera contar con lo siguiente:
* [Cuenta activa y configurada en Google Cloud Platform](https://console.cloud.google.com/) - La plataforma de nube dónde se aloja y consume servicios el proyecto.
* [node v12.14.1+](https://nodejs.org/) - JavaScript runtime
* [npm 6.14.6+](https://www.npmjs.com/package/install) - Sistema de gestión de paquetes para Node.js
* [IDE de Arduino Instalado](https://www.arduino.cc/en/software) - IDE para programar el Arduino Nano 33 IoT
* [Kit del pulsioxímetro Mexbalia](https://mexbalia.com/oximeter/) - Kit con todo lo necesario para armar tu dispositivo

## Comenzando 🚀

_A continuación se muestra el orden en el que se debe ejecutar cada paso para poder lograr la correcta implementación del proyecto, las instrucciones para cada paso se encuentran dentor de la respectiva carpeta_

* [Cloud Environment](https://github.com/paul-cruz/OXIMETER/tree/master/cloud-settings) - Archivos de configuración para iniciar servicios en GCP y Firebase
* [Device Settings](https://github.com/paul-cruz/OXIMETER/tree/master/ino-project) - Diagrama esquemático y código para configurar el dispositivo
* [Front-End](https://github.com/paul-cruz/OXIMETER/tree/master/oximeter-web) - Aplicación Web desarrollada en ReactJS

## Tutoriales 📖
_Para que puedas ver como se hace la implementación del proyecto en Mexbalia se prepararon una serie de tutoriales los cuales puedes visualizar en el siguiente enlace:_
* [Pulsioxímetro](https://www.youtube.com/playlist?list=PL0AO2J9xYbcuKrlOZTk8ZvWl4suMi1Ozz) - Lista de reproducción con los tutoriales

## Licencia 📄

Este proyecto está bajo la Licencia (GNU General Public License v3.0) - mira el archivo [LICENSE](LICENSE) para detalles
