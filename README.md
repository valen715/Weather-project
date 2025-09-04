# 🌦️ WeatherApp

Aplicación de clima desarrollada en **Angular 20**, con soporte de internacionalización (i18n) y empaquetada con **Docker** para despliegue sencillo.

---

## 🚀 Instalación del proyecto

1. Clonar el repositorio:
```bash
git clone https://github.com/valen715/weather-project.git
cd weather-project
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
ng serve
```
Abrir en el navegador 👉 `http://localhost:4200/`

---

## 📦 Librerías utilizadas

El proyecto usa las siguientes librerías principales:

```bash
npm install @angular/animations @angular/common @angular/compiler @angular/core @angular/forms @angular/platform-browser @angular/router
npm install bootstrap
npm install rxjs tslib zone.js
```

Para desarrollo:
```bash
npm install -D @angular/cli @angular/build @angular/compiler-cli @angular/localize typescript jasmine-core karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter
```

---

## 🔑 Uso de la API (Visual Crossing)

1. Regístrate gratis en 👉 [Visual Crossing](https://www.visualcrossing.com/sign-up/).
2. Genera una **API_KEY** en tu cuenta.
3. Copia y pega la API_KEY en la interfaz de la aplicación (campo de texto con el ícono 🔑).
4. ⚠️ **Importante**: la cuenta gratuita tiene un **LIMITE DE CONSULTAS DIARIAS**.

---

## 🐳 Configuración con Docker

1. Construir la imagen:
```bash
docker build -t weather-dashboard .
```

2. Ejecutar el contenedor:
```bash
docker run -d -p 8080:80 weather-dashboard
```

3. Abrir en el navegador 👉 `http://localhost:8080/`

---

## 🖼️ Capturas de pantalla

Ejemplo:

- Página principal con búsqueda de ciudades en PC
  
  - Modo Claro
    
<img width="1910" height="500" alt="image" src="https://github.com/user-attachments/assets/51058c87-c86f-4383-ace3-e66b9aec8aed" />

  - Modo Oscuro
    
<img width="1913" height="500" alt="image" src="https://github.com/user-attachments/assets/a9ffcc1e-c2c0-4089-a474-d95fe4957313" />

---

- Página principal con búsqueda de ciudades en Movil
  
  - Modo Claro
    
<img width="454" height="700" alt="image" src="https://github.com/user-attachments/assets/5e124897-a95e-4314-aa07-9eb9ae367631" />

  - Modo Oscuro
    
<img width="452" height="700" alt="image" src="https://github.com/user-attachments/assets/46680c2e-2119-40c0-b4c7-19800b3b1b1e" />

---

- Vista de pronóstico de 24 horas en PC
  
  - Modo Claro
    
<img width="1912" height="500" alt="image" src="https://github.com/user-attachments/assets/fc85bb45-f733-43a6-8f93-71eb429d39c9" />

  - Modo Oscuro
    
<img width="1915" height="500" alt="image" src="https://github.com/user-attachments/assets/4133015c-fdca-4904-b991-0c12538d2260" />

---

- Vista de pronóstico de 24 horas en Movil
  
  - Modo Claro
    
<img width="454" height="700" alt="image" src="https://github.com/user-attachments/assets/e1b7a0ab-d877-4923-a5bf-ac92d2f2696d" />

  - Modo Oscuro
    
<img width="460" height="700" alt="image" src="https://github.com/user-attachments/assets/4c6233ba-aba6-409f-b59e-3ab41b61386d" />

---

## ⚡ Resumen

- Angular 20 + Bootstrap 5  
- Internacionalización (i18n) lista para español e inglés  
- Integración con API externa (**Visual Crossing**)  
- Despliegue rápido con **Docker**  

