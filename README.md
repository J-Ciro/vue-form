# Vue Interview - Formulario de Registro Multi-Pasos

Un formulario de registro de usuario en tres pasos, desarrollado con **Vue.js** y **TailwindCSS**

## Descripción del Proyecto

Este proyecto implementa un formulario de registro de tres pasos con validación en tiempo real, una línea de tiempo para indicar el progreso y carga dinámica de datos para el campo de selección de países. El formulario asegura que todos los campos sean obligatorios, valida las entradas del usuario y proporciona retroalimentación visual (✔️ para válido, ❌ para inválido). Al finalizar, registra los datos en la consola y muestra un modal de éxito.

## Características

### Paso 1: Información Personal

- **País**: Selección desplegable con lista de países obtenida de una API externa.
- **Género**: Campo de selección para el género del usuario.
- **Primer Nombre**: Entrada de texto para el primer nombre.
- **Segundo Nombre**: Entrada de texto para el segundo nombre.
- **Fecha de Nacimiento**: Selector de fecha (YYYY-MM-DD) con validación para asegurar que el usuario tenga al menos 18 años.
- **Tipo de Documento**: Selección desplegable con opciones: _Cédula de ciudadanía_, _Pasaporte_, _Cédula de extranjería_.
- **Número de Documento**: Entrada numérica, mínimo 5 dígitos.
- **Foto del Documento (Frente y Reverso)**: Campos para cargar archivos JPG.

### Paso 2: Información de Contacto

- **Correo Electrónico**: Entrada con validación de formato de correo electrónico.
- **Contraseña**: Campo para ingresar la contraseña.
- **Confirmación de Contraseña**: Validación para asegurar que coincida con la contraseña.
- **Número de Teléfono**: Entrada numérica para el teléfono fijo.
- **Número de Celular**: Entrada numérica para el celular.

### Paso 3: Información de Dirección

- **Dirección de Residencia**: Entrada de texto para la dirección.
- **Código Postal**: Entrada de texto para el código postal.

### Funcionalidades Adicionales

- **Navegación**: Permite avanzar y retroceder entre pasos, con validación para asegurar que todos los campos del paso actual sean correctos.
- **Línea de Tiempo**: Indicador visual que muestra el paso actual.
- **Validación en Tiempo Real**: Cada campo se valida al ingresarse, mostrando un ✔️ para entradas válidas o ❌ para inválidas.
- **Envío del Formulario**: En el paso 3, al enviar, se imprimen los valores de los campos en la consola y se muestra un modal confirmando el envío exitoso.

## Requisitos

- **Vue.js**: Construido con Vue 3 para componentes reactivos y gestión de estado.
- **TailwindCSS**: Utilizado para el diseño y la responsividad.

## Instalación

Para configurar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:

   ```sh
   git clone https://github.com/J-Ciro/vue-form.git
   ```

2. Navega al directorio del proyecto:

   ```sh
   cd vue-form
   ```

3. Instala las dependencias:
   ```sh
   npm install
   ```

## Ejecución del Proyecto

### Entorno de Desarrollo

Para iniciar el servidor de desarrollo:

```sh
npm run dev
```

Abre `http://localhost:5173` (o el puerto indicado en la consola) para ver la aplicación.

### Compilación para Producción

Para compilar el proyecto para producción:

```sh
npm run build
```

### Vista Previa de Producción

Para previsualizar la compilación de producción localmente:

```sh
npm run preview
```
