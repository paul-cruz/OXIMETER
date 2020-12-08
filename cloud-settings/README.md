# Configuración de los servicios en la nube

_Este, al ser un proyecto del IoT, utiliza productos de Google Cloud para la gestión de dispositivos, servicio de mensajería en streaming, así como persistencia de los datos y hosting para la aplicación web. Por esto a continuación se explicará qué y cómo levatar los servicios._

## Productos y tecnologías 🛠️

* [Google Cloud IoT Core](https://cloud.google.com/iot-core) - Servicio para conectar, administrar y transferir datos procedentes de dispositivos
* [Google Cloud Pub Sub](https://cloud.google.com/pubsub) - Servicio de mensajería en streaming
* [Firebase, Firestore](https://firebase.google.com/docs/firestore) - Sistema de persistencia a base de documentos
* [Google App Engine](https://cloud.google.com/appengine) - Hosting para aplicación web

### Pre-requisitos 📋

_Para esta sección se deben tener los siguientes requisitos:_
* [Cuenta activa y configurada en Google Cloud Platform](https://console.cloud.google.com/) - La plataforma de nube dónde se aloja y consume servicios el proyecto
* [Google Cloud SDK instalado](https://cloud.google.com/sdk/docs/install) - Interfaz de linea de comandos para administrar servicios de GCP (Se puede usar la 'Cloud Shell' que se habilita en tu sesión de GCP para no instalar el SDK de manera local)

## Comenzando 🚀

_Para iniciar se debe crear un nuevo proyecto de GCP o usar uno ue ya tengas configurado, es importante que este cuente con una facturación activa, ya sea por cobro a tarjeta o créditos_

_Para crear un nuevo proyecto en GCP:_

1. Ve a la página Gestionar recursos de la [Consola GCP](https://console.cloud.google.com/).
2. En el menú desplegable en la parte superior de la página, selecciona la organización en la que desea crear un proyecto.
3. Haz clic en **Crear proyecto**.
4. En la ventana **Nuevo proyecto** que aparece, ingresa un nombre de proyecto y selecciona una cuenta de facturación según corresponda.
5. Si deseas agregar el proyecto a una carpeta, ingresa el nombre de la carpeta en el cuadro **Ubicación**.
6. Cuando termines de ingresar nuevos detalles del proyecto, haz clic en **Crear**.

_A su vez se deberá crear un proyecto en la consola de Firebase, ligandolo al que se acaba de crear en GCP, para poder usar los servicios con el mismo alcance_

_Para crear un nuevo proyecto en Firebase y ligarlo al de GCP:_

1. Ve a la página de la [Consola de Firebase](https://console.firebase.google.com/).
2. Haz click en **Añadir proyecto**.
3. Ahora se debe ingresar el nombre del proyecto, en este caso aparecerá el proyecto creado en GCP para seleccionarlo y **continuar**.
4. Se debe **deshabilitar Goolge Analytics** pues no serán necesarias ara este proyecto y haz click en **continuar**.
5. Y así se debe **finalizar** la creación de proyecto.

_Después se deberá acceder a una shell de Linux con el SDK de Google Cloud configurado, esta puede ser de manera local o usando la shell que se habilita en tu cuenta de GCP._

_Ya sea que eligas la shell de GCP o trabajar con otra, se deberá configurar el projecto en el que se trabajará, esto se logra con el siguiente comando:_

```
$ gcloud config set project [PROJECT_ID]
```

## Inicio de servicios 🔧

_Ya que estamos en la shell con la que administraremos los servicios, debemos instalar la CLI de Firebase._

_Para [instalar](https://firebase.google.com/docs/cli#mac-linux-npm) la CLI de Firebase, utilizaremos la forma más sencilla, mediante el manejador de paquetes npm, entonces, debemos ejecutar:_

```
$ npm install -g firebase-tools
```

_Ya que se tiene instalado todo lo necesario en nuestra shell, procederemos a ejecutar el [init.sh](https://github.com/paul-cruz/OXIMETER/blob/master/cloud-settings/init.sh)_

_Este shell script está configurado con un REGISTRY_ID (es el nombre que se le pondrá al registry de IoT Core), PUBSUB_TOPIC (nombre del tema de Pub Sub a usar), PUBSUB_SUB (nombre de la suscripción de Pub Sub donde se registrarán los dispositivos), CLOUD_REGION (una de las regiones que nos ofrece GCP para levantar servicios), GCLOUD_PROJECT (nombre de tu proyecto, tomado de tu configuración)_
_Puedes cambiar los valores que se tienen por defecto, pero debes verificar que sean validos, tanto los nombres y región donde corran los servicios._

_Si el shell script no cuenta con **permisos de ejecución** agregalos con:_
```
$ chmod +x ./init.sh
```

_Ya que **init.sh** cuenta con los permisos de ejecución lo iniciamos_
```
$ ./init.sh
```
_Al inicar el init.sh, se iniciará por logearte en la CLI de Firebase, así que debes aceptar **(Y)** cuando te pregunte si permites inicar los servicios, despues aparecerá una dirección url, la cual deberás de acceder en tu navegador preferido, una vez ahí ingresa tus credenciales para inicar en la cuenta donde tienes tu proyecto de Firebase, te mostrará una clave que deberás copiar y pegarla en la shell que está corriendo el shell script._
_Una vez logeado en el servicio de firebase se podrá usar la CLI y el shell script procedera a crear un tema y una suscripción en pub sub y un contenedor de registros en Cloud IoT Core_

### Creación de dispositivos 🔧

_Para la creación de dispositivos hay otro shell script para automatizar el proceso, lo único que se necesita es un nombre de dispositivo valido para Cloud IoT Core, en este sh lo primero que hace es crear un directorio 'keys' en el cual se guardarán las claves de cifrado para los dispositivo, así dentro de este directorio se crea otro con el nombre del dispositivo y dentro se crean y guardan las claves públicas y privadas, además de un certificado CA._
_Después se crea el dispositivo en IoT Core, con el nombre y registro configurado, además de las claves generadas. Finalmente se extrae la clave del dispositivo y se escribirá en el archivo "nombre-dispositivo"_extracted.txt, las mismas que necesitarás para el archivo de configuración [secrets.h](https://github.com/paul-cruz/OXIMETER/blob/master/ino-project/oximeter/secrets.h) en Arduino_

_Si el shell script no cuenta con **permisos de ejecución** agregalos con:_
```
$ chmod +x ./create_device.sh
```

_Ya que **create_device.sh** cuenta con los permisos de ejecución lo iniciamos_
```
$ ./create_device.sh
```

### Creación de persistencia y functions en Firebase 🔧

_Para lograr las funcionalidades de la aplicación web y la correcta escritura de los dispositivos se deben configurar los servicios de functions y de firestore, para esto los pasos se describen a continuación:_

**Firestore** ⚙️

1. Ve a la página de la [Consola de Firebase](https://console.firebase.google.com/).
2. Haz click en la tarjeta de tu proyecto.
3. En el menú del lado izquierdo se debe dar click en **Develop** -> **Cloud Firestore**.
4. Haz click en **Create database**.
5. Después de esto se debe seleccionar el **modo de prueba** en las reglas de seguridad.
6. Finalmente selecciona la misma región que estamos usando para los demás servicios **us-central** si no la cambiaste en el sh y haz click en **habilitar**.

_Hasta este punto se debería haber habilitado correctamente firestore y ahora se debe proceder a crear las colecciones necesarias_

**Devices collection** 📦
_Para el punto 3 en adelante es necesario que valla a la [Consola de GCP](https://console.cloud.google.com/) y en el menú lateral de click en IoT Core y después acceda al regitry con el nombre configurado, en este caso **oximeter_registry**, una vez dentro de este se debe acceder a **Devices** del lado izqueirdo, donde deberás entrar a tu dispositivo y tener esa información a la mano_

1. En la pantalla del servicio de firestore se debe dar click en **Start collection**.
2. Ingresar en **collection id** "devices" y dar click en **next**.
4. Estando en las especificaciones del dispositivo que creaste debes copiar el **Numeric ID**.
3. Donde te solicita el **document id** debes pegar el **Numeric ID** copiado.
4. Ahora debes crear los siguientes campos:
	a) Field: **bpm**, Type: **String**, Value: **""**
	b) Field: **spo2**, Type: **String**, Value: **""**
	c) Field: **timestamp**, Type: **Timestamp**, Value: **Selecciona la fecha de ese momento**
	d) Field: **userID**, Type: **String**, Value: **""**
5. Haz click en **Save**

**Users collection** 📦
_Para crear esta colección si ya se hizo la anterior es más fácil y sólo serán los puntos que se enlistan a continuación:_

1. Se debe dar click en **Start collection**.
2. Ingresar en **collection id** "users" y dar click en **next**.
3. Donde te solicita el **document id** debes darle click en **Auto-ID**.
5. Haz click en **Save**
6. Después elimina el documetno con el id generado automaticamente, dando click en los tres puntos del tercer panel en users y **eliminar documento**.
7. Haz click en **Start delete**.

**Functions** ⚙️
_Para iniciar el proyecto se utillizan dos funciones, **updateUser** la cual verifica si un pulsioxímetro está asociado a otro usuario, si es así lo desasocia y **writeDeviceLecutres** la cual escribe en firebase los datos que se toman de cada lectura de un pulsioxímetro, para inicarlas se debe hacer lo siguiente:_

1. Acceder a la **shell** donde se tiene configurado el **SDK de GCP (gcloud)** y la **CLI de firebase**.
2. **Ir al directorio** de [functions](https://github.com/paul-cruz/OXIMETER/tree/master/cloud-settings/functions).
3. **Instalar** los paquetes necesarios, los cuales están definidos en el **package.json**.
```
$ npm install
```
4. **Desplegar** las funciones.
```
$ firebase deploy --project [PROJECT_ID]
```
5. Ve a la página de la [Consola de Firebase](https://console.firebase.google.com/).
6. Acceder a **Deploy** -> **Functions** y verificar que estén las dos funciones desplegadas.

## Despliegue 📦
_Para el despliegue en App Engine se tiene un archivo de descripción en la carpeta de [app](https://github.com/paul-cruz/OXIMETER/tree/master/cloud-settings/app) llamado app.yaml el cual sirve para exponer la aplicación de react despues de haber sido construida._
_Para obtener la carpeta **build** vea las instrucciones en el [README](https://github.com/paul-cruz/OXIMETER/blob/master/oximeter-web/README.md) de la aplicación web._

1. Una vez obtenida la carpeta build de la aplicación web se debe copiar al mismo nivel del archivo app.yaml
2. Después con la shell se debe ir a donde está el archivo app.yaml
3. En la shell se debe ejecutar:
```
$ gcloud app deploy
```
4. Ve a la [Consola de GCP](https://console.cloud.google.com/)
5. En el menú da click en **App Engine**
6. Verifíca que el despliegue se encuentre en la consola.
7. Verifica el funcionamiento de la aplicación accediendo al link que aparece en la consola, tiene una forma como la siguiente: "[PROJECT_ID].uc.r.appspot.com".
