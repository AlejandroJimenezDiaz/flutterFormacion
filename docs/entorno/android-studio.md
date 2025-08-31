# Android Studio para Flutter

## Introducción

Android Studio es el IDE oficial para el desarrollo de Android y una excelente opción para desarrollar aplicaciones Flutter. Proporciona herramientas integradas, depuración avanzada y una experiencia de desarrollo completa.

## Instalación

### 1. Descargar Android Studio
- Ir a [Android Studio](https://developer.android.com/studio)
- Descargar la versión más reciente
- Disponible para Windows, macOS y Linux

### 2. Instalación en diferentes SO

#### Windows
1. Ejecutar el archivo `.exe` descargado
2. Seguir el asistente de instalación
3. Seleccionar componentes adicionales (Android Virtual Device)

#### macOS
1. Abrir el archivo `.dmg`
2. Arrastrar Android Studio a Aplicaciones
3. Ejecutar desde Launchpad

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install android-studio
```

### 3. Configuración Inicial
1. Abrir Android Studio
2. Configurar Android SDK
3. Instalar Android SDK Platform-Tools
4. Configurar Android Virtual Device (AVD)

## Configuración para Flutter

### 1. Instalar Plugins
En Android Studio:
1. File → Settings (Preferences en Mac)
2. Plugins
3. Marketplace
4. Buscar e instalar:
   - **Flutter** (incluye Dart automáticamente)
   - **Dart** (si no se instala automáticamente)

### 2. Verificar Flutter SDK
1. File → Settings → Languages & Frameworks → Flutter
2. Configurar la ruta del Flutter SDK
3. Aplicar cambios

### 3. Configurar Android SDK

#### SDK Platforms
Instalar las versiones necesarias:
- Android API 34 (Android 14)
- Android API 33 (Android 13)
- Android API 30 (Android 11) - recomendado para compatibilidad

#### SDK Tools
Verificar que estén instalados:
- Android SDK Build-Tools
- Android Emulator
- Android SDK Platform-Tools
- Android SDK Tools

## Crear Proyecto Flutter

### 1. Nuevo Proyecto
1. File → New → New Flutter Project
2. Seleccionar "Flutter Application"
3. Configurar:
   - Project name: `mi_app_flutter`
   - Project location: Ruta del proyecto
   - Description: Descripción del proyecto
   - Package name: `com.miempresa.miapp`

### 2. Estructura del Proyecto
```
mi_app_flutter/
├── android/          # Código específico de Android
├── ios/              # Código específico de iOS
├── lib/              # Código Dart principal
│   └── main.dart     # Punto de entrada
├── test/             # Pruebas unitarias
├── pubspec.yaml      # Dependencias y configuración
└── README.md         # Documentación
```

## Configuración del Emulador

### 1. Crear AVD (Android Virtual Device)
1. Tools → AVD Manager
2. Create Virtual Device
3. Seleccionar hardware (ej: Pixel 4)
4. Seleccionar system image (API 30+)
5. Configurar AVD:
   - Name: `Flutter_Emulator`
   - Startup Orientation: Portrait
   - Graphics: Hardware - GLES 2.0

### 2. Configuraciones Recomendadas
- **RAM**: 2048 MB mínimo
- **Storage**: 2 GB internal storage
- **SD Card**: 512 MB (opcional)
- **Snapshot**: Activar para inicio rápido

## Desarrollo con Android Studio

### 1. Editor de Código

#### Características Principales
- **Syntax highlighting** para Dart
- **Code completion** inteligente  
- **Error detection** en tiempo real
- **Refactoring** automático
- **Code formatting** con Ctrl+Alt+L

#### Atajos Útiles
```
Ctrl+Space      - Code completion
Alt+Enter       - Quick fix
Ctrl+/          - Comentar línea
Ctrl+Shift+/    - Comentar bloque
Ctrl+D          - Duplicar línea
Ctrl+Y          - Eliminar línea
```

### 2. Hot Reload
- **Hot Reload**: Ctrl+\ o botón rayo
- **Hot Restart**: Ctrl+Shift+\ 
- **Full Restart**: Ctrl+F5

### 3. Depuración

#### Breakpoints
1. Hacer clic en la línea donde se quiere el breakpoint
2. Ejecutar en modo debug (Debug button o Shift+F9)
3. La app se pausará en el breakpoint

#### Variables Watch
1. Click derecho en variable
2. "Add to Watches"
3. Ver valores en tiempo real

#### Step Debugging
- **Step Over** (F8): Siguiente línea
- **Step Into** (F7): Entrar en función
- **Step Out** (Shift+F8): Salir de función
- **Resume** (F9): Continuar ejecución

## Herramientas de Android Studio

### 1. Profiler
Tools → Flutter → Open Flutter Inspector
- **Widget Inspector**: Ver jerarquía de widgets
- **Timeline**: Analizar rendimiento
- **Memory**: Monitorear uso de memoria

### 2. Logcat
Ver logs de la aplicación:
1. View → Tool Windows → Logcat
2. Filtrar por package name
3. Niveles de log: Verbose, Debug, Info, Warn, Error

### 3. Device File Explorer
Ver sistema de archivos del emulador/dispositivo:
1. View → Tool Windows → Device File Explorer
2. Navegar por `/data/data/com.miempresa.miapp/`

## Configuración Avanzada

### 1. Code Style
File → Settings → Editor → Code Style → Dart
- Line length: 80 characters
- Indentation: 2 spaces
- Activar "Format on save"

### 2. Live Templates
Crear snippets de código reutilizables:
1. File → Settings → Editor → Live Templates
2. Crear nuevo template para StatefulWidget, StatelessWidget, etc.

### 3. Git Integration
- **VCS** menu para operaciones Git
- **Commit** con Ctrl+K
- **Push** con Ctrl+Shift+K
- **Pull** con Ctrl+T

## Plugins Útiles

### 1. Plugins Esenciales
- **Flutter Intl**: Internacionalización
- **Awesome Flutter Snippets**: Snippets útiles
- **Bloc**: Para manejo de estado
- **Flutter Riverpod Snippets**: Para Riverpod

### 2. Instalación de Plugins
1. File → Settings → Plugins
2. Marketplace
3. Buscar plugin
4. Install
5. Restart IDE

## Optimización de Rendimiento

### 1. Configuración de Android Studio
- **Increase heap size**: Help → Change Memory Settings
- **Disable unused plugins**: File → Settings → Plugins
- **Update regularmente**: Help → Check for Updates

### 2. Gradle Settings
En `android/gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=512m
org.gradle.parallel=true
org.gradle.caching=true
org.gradle.daemon=true
```

## Troubleshooting

### 1. Errores Comunes

#### "Flutter SDK not found"
1. File → Settings → Languages & Frameworks → Flutter
2. Configurar ruta correcta del Flutter SDK
3. Aplicar y reiniciar

#### "Android license status unknown"
```bash
flutter doctor --android-licenses
```

#### Emulador lento
1. Verificar que Hyper-V esté habilitado (Windows)
2. Aumentar RAM del AVD
3. Usar hardware acceleration

#### "Gradle build failed"
```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
```

### 2. Performance Issues
- Cerrar proyectos innecesarios
- Limpiar cache: File → Invalidate Caches and Restart
- Verificar espacio en disco disponible
- Actualizar a la última versión

## Mejores Prácticas

### 1. Organización del Proyecto
```
lib/
├── main.dart
├── models/           # Modelos de datos
├── screens/          # Pantallas de la app
├── widgets/          # Widgets reutilizables
├── services/         # Servicios y APIs
├── utils/            # Utilidades y helpers
└── constants/        # Constantes
```

### 2. Configuración del Editor
- Activar **format on save**
- Usar **linting** (analysis_options.yaml)
- Configurar **import organization**
- Usar **code folding** para mejor legibilidad

### 3. Debugging Efectivo
- Usar **print statements** con moderación
- Preferir **debugPrint** sobre print
- Utilizar **assert** para validaciones
- Aprovechar **Flutter Inspector** para UI issues

## Recursos Adicionales

- [Android Studio User Guide](https://developer.android.com/studio/intro)
- [Flutter Development in Android Studio](https://docs.flutter.dev/development/tools/android-studio)
- [Keyboard Shortcuts Reference](https://developer.android.com/studio/intro/keyboard-shortcuts)
- [Debugging Flutter Apps](https://docs.flutter.dev/testing/debugging)