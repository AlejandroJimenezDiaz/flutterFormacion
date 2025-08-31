# Despliegue en App Store

## Introducción

Publicar una aplicación Flutter en el App Store de Apple requiere seguir un proceso específico y cumplir con las directrices de Apple. Esta guía te llevará paso a paso.

## Prerrequisitos

### 1. Cuenta de Apple Developer
- Registrarse en [Apple Developer Program](https://developer.apple.com/programs/)
- Costo anual: $99 USD
- Verificación puede tomar hasta 48 horas

### 2. Herramientas Necesarias
- **Xcode**: Última versión desde Mac App Store
- **macOS**: Requerido para el desarrollo iOS
- **Dispositivo iOS**: Para pruebas (opcional pero recomendado)

## Preparación del Proyecto

### 1. Configuración en Xcode

```bash
cd mi_app_flutter
open ios/Runner.xcworkspace
```

### 2. Configurar Bundle Identifier
En Xcode:
1. Seleccionar el proyecto "Runner"
2. En "General" → "Identity"
3. Cambiar "Bundle Identifier" a algo único (ej: `com.miempresa.miapp`)

### 3. Configurar Versión y Build Number

```dart
// En pubspec.yaml
version: 1.0.0+1
# 1.0.0 es la versión para usuarios
# +1 es el build number (debe incrementarse en cada build)
```

### 4. Configurar App Icons
1. Crear iconos en diferentes tamaños usando [App Icon Generator](https://appicon.co/)
2. Reemplazar iconos en `ios/Runner/Assets.xcassets/AppIcon.appiconset/`

### 5. Configurar Launch Screen
Editar `ios/Runner/Assets.xcassets/LaunchImage.imageset/`

## Certificados y Perfiles

### 1. Crear App ID
En [Apple Developer Console](https://developer.apple.com/account/):
1. Ir a "Identifiers"
2. Crear nuevo App ID
3. Configurar servicios necesarios (Push Notifications, In-App Purchase, etc.)

### 2. Certificados de Distribución
```bash
# Crear certificado de distribución
# En Keychain Access → Certificate Assistant → Request from Certificate Authority
```

### 3. Provisioning Profile
1. Crear "App Store" provisioning profile
2. Descargar e instalar

## Configuración de la App

### 1. Info.plist
Editar `ios/Runner/Info.plist`:

```xml
<key>CFBundleDisplayName</key>
<string>Mi App</string>
<key>CFBundleName</key>
<string>miapp</string>
<key>NSCameraUsageDescription</key>
<string>Esta app necesita acceso a la cámara para tomar fotos</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Esta app necesita acceso a la ubicación</string>
```

### 2. Permisos Necesarios
Agregar descripciones para permisos que use tu app:
- `NSCameraUsageDescription`
- `NSMicrophoneUsageDescription`
- `NSLocationWhenInUseUsageDescription`
- `NSPhotoLibraryUsageDescription`

## Build de Release

### 1. Limpiar Proyecto
```bash
flutter clean
flutter pub get
cd ios
pod install
```

### 2. Build para Release
```bash
flutter build ios --release
```

### 3. Archive en Xcode
1. Abrir proyecto en Xcode
2. Seleccionar "Generic iOS Device" o dispositivo real
3. Product → Archive
4. Esperar a que termine el proceso

## Subir a App Store Connect

### 1. Crear App en App Store Connect
En [App Store Connect](https://appstoreconnect.apple.com/):
1. Ir a "My Apps"
2. Crear nueva app
3. Llenar información básica

### 2. Subir Build
En Xcode Organizer:
1. Seleccionar el archive creado
2. "Distribute App"
3. "App Store Connect"
4. Seguir el asistente

### 3. Configurar Metadatos

#### Información de la App
- **Nombre**: Nombre que aparecerá en la App Store
- **Subtítulo**: Descripción corta (30 caracteres)
- **Descripción**: Descripción detallada de la app
- **Palabras clave**: Para SEO en la App Store
- **URL de soporte**: Página de soporte técnico
- **URL de marketing**: Página promocional (opcional)

#### Capturas de Pantalla
Requeridas para diferentes tamaños:
- iPhone 6.7": 1290x2796 px
- iPhone 6.5": 1242x2688 px  
- iPhone 5.5": 1242x2208 px
- iPad Pro (3rd gen) 12.9": 2048x2732 px
- iPad Pro (2nd gen) 12.9": 2048x2732 px

#### Información de Versión
- **Novedades de esta versión**: Changelog para usuarios
- **Clasificación por edades**: Cuestionario sobre contenido
- **Información de derechos de autor**: © 2024 Mi Empresa

## Revisión y Aprobación

### 1. Enviar para Revisión
1. Completar toda la información requerida
2. Seleccionar el build subido
3. "Submit for Review"

### 2. Proceso de Revisión
- **Tiempo**: 24-48 horas típicamente
- **Estados posibles**:
  - "Waiting for Review"
  - "In Review"
  - "Approved"
  - "Rejected"

### 3. Si es Rechazada
- Leer cuidadosamente los motivos
- Corregir los problemas
- Volver a enviar

## Directrices de Apple

### Contenido Prohibido
- Contenido ofensivo o discriminatorio
- Información personal sin consentimiento
- Spam o contenido engañoso
- Violación de derechos de autor

### Funcionalidad Requerida
- La app debe funcionar completamente
- No crashes o bugs mayores
- Interfaz intuitiva y funcional
- Cumplir con el propósito descrito

### Metadatos Precisos
- Descripción debe coincidir con funcionalidad
- Screenshots representativos
- Clasificación por edades correcta

## Actualizaciones

### 1. Nueva Versión
```bash
# Incrementar versión en pubspec.yaml
version: 1.1.0+2

# Build nueva versión
flutter build ios --release
```

### 2. Subir Actualización
1. Archive nueva versión en Xcode
2. Subir a App Store Connect
3. Crear nueva versión en App Store Connect
4. Configurar información de actualización
5. Enviar para revisión

## Herramientas Útiles

### 1. Fastlane
Automatizar el proceso de despliegue:

```bash
gem install fastlane
cd ios
fastlane init
```

### 2. Screenshots Automáticos
```bash
fastlane snapshot
```

### 3. Metadata Automático
```bash
fastlane deliver
```

## Troubleshooting

### Errores Comunes

#### 1. "Invalid Binary"
- Verificar que todas las arquitecturas estén incluidas
- Revisar que no haya librerías de desarrollo

#### 2. "Missing Compliance"
- Completar información de encriptación en App Store Connect
- La mayoría de apps pueden responder "No" a uso de encriptación

#### 3. "Invalid Provisioning Profile"
- Regenerar provisioning profile
- Asegurar que coincida con Bundle ID

## Monitoreo Post-Launch

### 1. App Store Connect
- Ventas y tendencias
- Crash reports
- Reseñas de usuarios

### 2. Analytics
Integrar herramientas como:
- Firebase Analytics
- Apple App Analytics
- Crashlytics

## Mejores Prácticas

1. **Probar exhaustivamente** antes de enviar
2. **Seguir Human Interface Guidelines** de Apple
3. **Optimizar para diferentes tamaños** de pantalla
4. **Manejar estados de red** correctamente
5. **Implementar feedback** visual apropiado
6. **Considerar accesibilidad** desde el diseño

## Recursos Adicionales

- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [Flutter iOS Deployment](https://docs.flutter.dev/deployment/ios)