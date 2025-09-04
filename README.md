# WeatherApp

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 20.2.2.  
Es un panel simple del clima que consume la **[Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)** para mostrar el clima actual y el pronóstico.

---

## Servidor de desarrollo

Para iniciar un servidor local de desarrollo, ejecuta:

```bash
ng serve
```

Una vez iniciado, abre tu navegador y navega a `http://localhost:4200/`.  
La aplicación se recargará automáticamente cada vez que modifiques los archivos fuente.

---

## Generación de componentes

Angular CLI incluye herramientas poderosas de generación de código. Para crear un nuevo componente, ejecuta:

```bash
ng generate component nombre-componente
```

Para ver la lista completa de esquemas disponibles (como `components`, `directives` o `pipes`), ejecuta:

```bash
ng generate --help
```

---

## Compilación del proyecto

Para compilar el proyecto ejecuta:

```bash
ng build
```

Esto compilará tu proyecto y almacenará los artefactos en el directorio `dist/`.  
Por defecto, la compilación en producción optimiza la aplicación para mayor velocidad y rendimiento.

---

## Pruebas unitarias

Para ejecutar las pruebas unitarias con el [Karma](https://karma-runner.github.io) test runner:

```bash
ng test
```

---

## Pruebas end-to-end

Para ejecutar pruebas end-to-end (e2e):

```bash
ng e2e
```

Angular CLI no incluye por defecto un framework de pruebas e2e, puedes elegir el que prefieras.

---

## Uso de la API (Visual Crossing)

1. Regístrate en [Visual Crossing](https://www.visualcrossing.com/sign-up/).  
2. Copia tu **API_KEY** desde el panel de usuario.  
3. Pega la API_KEY en la interfaz de la aplicación cuando se solicite.  

⚠️ **Importante**: El plan gratuito tiene un **límite diario de consultas**.  
Si aparece el mensaje `"Maximum daily cost exceeded"`, significa que alcanzaste el límite.

---

## Configuración con Docker

Puedes ejecutar la aplicación dentro de un contenedor Docker para producción.

### Construir la imagen:
```bash
docker build -t weather-project .
```

### Ejecutar el contenedor:
```bash
docker run -d -p 8080:80 weather-project
```

Luego abre en el navegador:  
👉 [http://localhost:8080](http://localhost:8080)

---

## Capturas de pantalla

Agrega tus capturas en la carpeta `docs/` y enlázalas aquí.

- Pantalla principal  
  ![Home Screenshot](docs/home.png)

- Modo oscuro  
  ![Dark Mode Screenshot](docs/darkmode.png)

- Error de límite de API  
  ![Error Screenshot](docs/error.png)

---

## Recursos adicionales

- [Angular CLI - Documentación oficial](https://angular.dev/tools/cli)  
- [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)  
- [Docker - Documentación oficial](https://docs.docker.com/)  

---

# Weather-project
