# Configuración de la aplicación web

_Para la aplicación web se tiene un proyecto de ReactJS, el cual es simple de iniciar, solo se deben configurar ciertos parametros y estará listo_

## Productos y tecnologías 🛠️

* [ReactJS](https://es.reactjs.org/) - Biblioteca de JavaScript para construir interfaces de usuario
* [Firebase, Auth](https://firebase.google.com/docs/auth?hl=es-419) - Servicio de autenticación de usuarios
* [Firebase, Firestore](https://firebase.google.com/docs/firestore) - Sistema de persistencia a base de documentos
* [Google App Engine](https://cloud.google.com/appengine) - Hosting para aplicación web
* [node v12.14.1+](https://nodejs.org/) - JavaScript runtime
* [npm 6.14.6+](https://www.npmjs.com/package/install) - Sistema de gestión de paquetes para Node.js

### Pre-requisitos 📋

_Para esta sección se deben tener los siguientes requisitos:_
* [Proyecto de Firebase iniciado](https://console.firebase.google.com/) - La plataforma de nube dónde se aloja y consume servicios el proyecto
* [node v12.14.1+](https://nodejs.org/) - JavaScript runtime
* [npm 6.14.6+](https://www.npmjs.com/package/install) - Sistema de gestión de paquetes para Node.js

## Comenzando 🚀

_Para iniciar se deben acceder al nivel del archivo [package.json](https://github.com/paul-cruz/OXIMETER/blob/master/oximeter-web/package.json) donde se llevarán acabo los siguientes pasos:_

_Para crear un nuevo proyecto en GCP:_

1. Instalar las dependencias del proyecto, ejecutando:
```
$ npm install
```
2. Ir a la [consola de Firebase](https://console.firebase.google.com/)
3. En la página de inicio se debe **Web** para iniciar el registro de nuestra app.
4. Ya en la ventana se debe ingresar el nombre de nuestra aplicación y dar en **Registrar aplicación**.
5. Una vez obtenido el SDK de firebase se crear un archivo llamado firebaseConfig.js en src/resources/ y escribir lo siguiente con los valores de tu SDK en el JSON de firebase.initializeApp.
```
import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "your-api-key",
    authDomain: "[APP_NAME].firebaseapp.com",
    databaseURL: "https://[APP_NAME].firebaseio.com",
    projectId: "[PROJECT_ID]",
    storageBucket: "[APP_NAME].appspot.com",
    messagingSenderId: "",
    appId: ""
});

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const microsoftAuthProvider = new firebase.auth.OAuthProvider('microsoft.com');

export {app, googleAuthProvider, facebookAuthProvider, microsoftAuthProvider}; 
```
6. Ahora da click en **Ir a la consola**.
7. Después crea dos archivos, llamados .env.development y .env.production, los cuales tendrán las variables de entorno necesarias para las conexiones.
.env.development
```
REACT_APP_URL=http://localhost:3000/
```
.env.production
```
REACT_APP_URL=https://[PROJECT_ID].uc.r.appspot.com/
```

**Ahora se procederá a configurar el servicio de autentificación:**

1. Ve a la página de la [Consola de Firebase](https://console.firebase.google.com/).
2. Haz click en el menú en **Develop** -> **Authentication** > **Sign-in method**
3. Habilita el proveedor de **Email/Password** y el de **Google**.
4. Ahora baja a la sección de **Authorized domains** y da click en **Add domain**.
5. Agrega el dominio de tu aplicación App Engine, debe tener la siguiente forma: [PROJECT_ID].uc.r.appspot.com

## Inicio de la aplicación 🔧

_Este proyecto fue iniciado con [Create React App](https://github.com/facebook/create-react-app)._
_El proyecto tiene disponibles varios scripts, pero el que se recomieda para probar la aplicación es **npm run start:dev** y para crear la carpeta build de despliegue **npm run build:prod**_

### Scripts Disponibles

En el directorio de este proyecto, puedes ejecutar:

### `npm start`

Corre la aplicación en modo de desarollo.<br />
Abre [http://localhost:3000](http://localhost:3000) para ver en el navegador.

La página se refrescará .<br />
Además podrás ver los errores de en la consola.

### `npm test`

Lanzar test de ejecución de manera interactiva.<br />
Ver la sección de [running tests](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

### `npm run build`

Construye la aplicación para el entorno de producción con la carpeta `build`.<br />
Se agrupa correctamente React en el modo de producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación se minimiza y los nombres de los archivos incluyen los hash.<br />
Tu aplicación está lista para el despliegue!

Mira la sección de [despliegue](https://github.com/paul-cruz/OXIMETER/tree/master/cloud-settings/README.md) para más información.

### `npm run start:dev`

Corre la aplicación en modo de desarollo con las variables de entorno para desarrollo.<br />
Abre [http://localhost:3000](http://localhost:3000) para ver en el navegador.

La página se refrescará .<br />
Además podrás ver los errores de en la consola.

### `npm run start:prod`

Corre la aplicación en modo de desarollo con las variables de entorno para producción.<br />
Abre [http://oximeter.mexbalia.mx](http://oximeter.mexbalia.mx) para ver en el navegador.

### `npm run build:prod`

Construye la aplicación para el entorno de producción con la carpeta `build`con las variables de entorno para producción.<br />
Se agrupa correctamente React en el modo de producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación se minimiza y los nombres de los archivos incluyen los hash.<br />
Tu aplicación está lista para el despliegue!

## Despliegue 📦
_Para obtener la carpeta **build** se debe acceder al nivel del archivo package.json y ahí correr el comando **npm run build:prod** el cual creará la carpea con todo el ambiente optimizado para producción_

1. Una vez obtenida la carpeta build de la aplicación web se debe copiar al mismo nivel del archivo [app.yaml](https://github.com/paul-cruz/OXIMETER/blob/master/cloud-settings/app/app.yaml)
2. Después con la shell se debe ir a donde está el archivo app.yaml
3. En la shell se debe ejecutar:
```
$ gcloud app deploy
```
4. Ve a la [Consola de GCP](https://console.cloud.google.com/)
5. En el menú da click en **App Engine**
6. Verifíca que el despliegue se encuentre en la consola.
7. Verifica el funcionamiento de la aplicación accediendo al link que aparece en la consola, tiene una forma como la siguiente: "[PROJECT_ID].uc.r.appspot.com".
