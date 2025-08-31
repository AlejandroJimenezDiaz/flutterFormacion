---
sidebar_position: 1
---

# 🤖 Despliegue en Google Play Store

> **Objetivo**: Publicar tu aplicación Flutter en Google Play Store siguiendo las mejores prácticas

Esta guía te llevará paso a paso desde preparar tu aplicación hasta publicarla exitosamente en Google Play Store.

## 🎯 **Checklist Pre-Publicación**

### ✅ **Requisitos técnicos:**
- 📱 App compilando sin errores en modo release
- 🎨 Icono de app en múltiples resoluciones  
- 📄 Screenshots para diferentes tamaños de pantalla
- 📝 Descripción de app y metadata
- 🔐 Keystore para firma de APK
- 🧪 Testing exhaustivo en dispositivos reales

## 🔧 **Preparación del Proyecto**

### 🎨 **Configurar App Icon**

import CodeSnippet from '@site/src/components/CodeSnippet';

<CodeSnippet 
  code="# Instalar flutter_launcher_icons
flutter pub add dev:flutter_launcher_icons

# Agregar configuración en pubspec.yaml
flutter_icons:
  android: true
  ios: false # Solo Android por ahora
  image_path: 'assets/icons/app_icon.png' # 1024x1024 px
  adaptive_icon_background: '#02569B'
  adaptive_icon_foreground: 'assets/icons/app_icon_foreground.png'

# Generar iconos
flutter pub run flutter_launcher_icons:main"
  language="bash"
  title="Configurar icono de app"
/>

### 📱 **Configurar aplicación Android**

```yaml title="pubspec.yaml - Configuración para release"
name: beamme
description: Plataforma para mostrar contenido en pantallas públicas
version: 1.0.0+1 # version+buildNumber

flutter:
  uses-material-design: true
  
# Configuración de iconos
flutter_icons:
  android: true
  image_path: "assets/icons/app_icon_1024.png"
  adaptive_icon_background: "#02569B"
  adaptive_icon_foreground: "assets/icons/app_icon_foreground.png"
  
# Configuración splash screen  
flutter_native_splash:
  color: "#02569B"
  image: assets/images/splash_logo.png
  android_12:
    image: assets/images/splash_logo_android12.png
```

### ⚙️ **Configurar Android Manifest**

```xml title="android/app/src/main/AndroidManifest.xml"
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:label="BeamMe"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher"
        android:theme="@style/LaunchTheme"
        android:exported="true"
        android:usesCleartextTraffic="false">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/LaunchTheme"
            android:orientation="portrait"
            android:screenOrientation="portrait"
            android:windowSoftInputMode="adjustResize">
            
            <!-- Pantalla de splash con nuevo estilo -->
            <meta-data
                android:name="io.flutter.embedding.android.NormalTheme"
                android:resource="@style/NormalTheme" />
            
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
            
            <!-- Deep links -->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW"/>
                <category android:name="android.intent.category.DEFAULT"/>
                <category android:name="android.intent.category.BROWSABLE"/>
                <data android:scheme="https"
                      android:host="beamme.app"/>
            </intent-filter>
        </activity>

        <!-- Don't delete the meta-data below.
             This is used by the Flutter tool to generate GeneratedPluginRegistrant.java -->
        <meta-data
            android:name="flutterEmbedding"
            android:value="2" />
            
        <!-- Firebase Cloud Messaging -->
        <service
            android:name=".MyFirebaseMessagingService"
            android:exported="false">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
    </application>

    <!-- Permisos necesarios -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    
    <!-- Features requeridas -->
    <uses-feature
        android:name="android.hardware.camera"
        android:required="false" />
    <uses-feature
        android:name="android.hardware.camera.autofocus"
        android:required="false" />
</manifest>
```

### 📋 **Configurar build.gradle**

```gradle title="android/app/build.gradle"
def localProperties = new Properties()
def localPropertiesFile = rootProject.file('local.properties')
if (localPropertiesFile.exists()) {
    localPropertiesFile.withReader('UTF-8') { reader ->
        localProperties.load(reader)
    }
}

def flutterRoot = localProperties.getProperty('flutter.sdk')
if (flutterRoot == null) {
    throw new GradleException("Flutter SDK not found. Define location with flutter.sdk in the local.properties file.")
}

def flutterVersionCode = localProperties.getProperty('flutter.versionCode')
if (flutterVersionCode == null) {
    flutterVersionCode = '1'
}

def flutterVersionName = localProperties.getProperty('flutter.versionName')
if (flutterVersionName == null) {
    flutterVersionName = '1.0'
}

apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply from: "$flutterRoot/packages/flutter_tools/gradle/flutter.gradle"

// 🔐 Configuración de firma
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    compileSdkVersion 34
    ndkVersion flutter.ndkVersion

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = '1.8'
    }

    sourceSets {
        main.java.srcDirs += 'src/main/kotlin'
    }

    defaultConfig {
        applicationId "com.example.selfie_street"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName
        
        // 🎯 Configuraciones adicionales
        multiDexEnabled true
        vectorDrawables.useSupportLibrary true
    }

    // 🔐 Configuración de signing
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            
            // 🗜️ Optimizaciones
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            
            // 📊 Configuración de build
            manifestPlaceholders = [
                appName: "BeamMe"
            ]
        }
        
        debug {
            signingConfig signingConfigs.debug
            manifestPlaceholders = [
                appName: "BeamMe Debug"
            ]
        }
    }

    // 🎨 Flavors para diferentes ambientes
    flavorDimensions "environment"
    productFlavors {
        dev {
            dimension "environment"
            applicationIdSuffix ".dev"
            versionNameSuffix "-dev"
            manifestPlaceholders = [
                appName: "BeamMe Dev"
            ]
        }
        
        staging {
            dimension "environment"
            applicationIdSuffix ".staging"
            versionNameSuffix "-staging"
            manifestPlaceholders = [
                appName: "BeamMe Staging"
            ]
        }
        
        prod {
            dimension "environment"
            manifestPlaceholders = [
                appName: "BeamMe"
            ]
        }
    }
}

flutter {
    source '../..'
}

dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    
    // 🔥 Firebase BOM
    implementation platform('com.google.firebase:firebase-bom:32.6.0')
    implementation 'com.google.firebase:firebase-analytics'
    
    // 📱 Android dependencies
    implementation 'androidx.multidex:multidex:2.0.1'
}

// 🔥 Apply Firebase plugin
apply plugin: 'com.google.gms.google-services'
```

## 🔐 **Generar Keystore para Firma**

### 🔑 **Crear keystore de producción**

<CodeSnippet 
  code="# Crear keystore (guarda TODA esta información en lugar seguro!)
keytool -genkey -v -keystore ~/keystores/selfie-street-key.jks \\
  -keyalg RSA -keysize 2048 -validity 10000 \\
  -alias selfie-street-key

# Información que necesitas proporcionar:
# - Nombre y apellido: Tu nombre o empresa
# - Nombre de la unidad organizacional: Tu equipo/departamento  
# - Nombre de la organización: Tu empresa
# - Ciudad o localidad: Tu ciudad
# - Estado o provincia: Tu estado/provincia
# - Código de país de dos letras: ES, MX, AR, etc.
# - Contraseña del keystore: (¡CRÍTICA! No la pierdas)
# - Contraseña de la clave: (¡CRÍTICA! No la pierdas)"
  language="bash"
  title="Crear keystore de producción"
/>

### 📄 **Configurar key.properties**

```properties title="android/key.properties"
storePassword=TU_STORE_PASSWORD
keyPassword=TU_KEY_PASSWORD  
keyAlias=selfie-street-key
storeFile=../keystores/selfie-street-key.jks
```

:::danger 🚨 IMPORTANTE
- ⚠️ **NUNCA** comitees el archivo key.properties a Git
- 🔐 **GUARDA** el keystore y contraseñas en lugar seguro
- 📁 **HACES BACKUP** del keystore - si lo pierdes, no puedes actualizar la app
- 🔒 **USA** contraseñas fuertes y únicas
:::

## 🏗️ **Build de Producción**

### 📱 **Generar APK/AAB**

<CodeSnippet 
  code="# Limpiar proyecto
flutter clean
flutter pub get

# Generar AAB (recomendado para Play Store)
flutter build appbundle --release --flavor prod

# O generar APK (para testing o distribución directa)  
flutter build apk --release --flavor prod

# Ubicación de archivos generados:
# AAB: build/app/outputs/bundle/prodRelease/app-prod-release.aab
# APK: build/app/outputs/flutter-apk/app-prod-release.apk"
  language="bash"
  title="Build de producción"
/>

### 🧪 **Testing del build**

<CodeSnippet 
  code="# Instalar APK de release en dispositivo
adb install build/app/outputs/flutter-apk/app-prod-release.apk

# Verificar que funciona correctamente:
# ✅ App inicia sin crashes
# ✅ Todas las funcionalidades funcionan  
# ✅ No hay logs de error
# ✅ Performance es buena
# ✅ Permisos se solicitan correctamente

# Probar en diferentes dispositivos si es posible"
  language="bash"
  title="Testing APK de release"
/>

## 📱 **Configuración en Google Play Console**

### 🌐 **Crear cuenta de desarrollador**

1. **Visita**: [Google Play Console](https://play.google.com/console)
2. **Pago único**: $25 USD (una sola vez)
3. **Información requerida**:
   - Nombre de desarrollador
   - Información de contacto
   - Información de pago/impuestos

### 📱 **Crear nueva aplicación**

1. **Crear app** - Seleccionar "Aplicación o juego"
2. **Información básica**:
   - Nombre de la aplicación: "BeamMe"
   - Idioma predeterminado: Español (España)
   - Aplicación gratuita o de pago: Gratuita
   - Declaraciones: Completar todas

### 📋 **Configurar información de la app**

#### 🎨 **Assets gráficos requeridos**

```
📱 Icono de aplicación:
   - 512 x 512 px (PNG)
   
🖼️ Gráfico de funciones:
   - 1024 x 500 px (PNG/JPG)
   
📱 Capturas de pantalla (mínimo 2, máximo 8):
   Teléfono:
   - 320 x 3040 px mínimo
   - 3840 x 2160 px máximo
   
   Tableta de 7":
   - 320 x 3040 px mínimo  
   - 3840 x 2160 px máximo
   
   Tableta de 10":
   - 320 x 3040 px mínimo
   - 3840 x 2160 px máximo
```

#### 📝 **Descripción de la app**

```markdown title="Descripción corta (80 caracteres)"
Comparte y descubre contenido visual en pantallas públicas
```

```markdown title="Descripción completa (4000 caracteres)"
🎨 **BeamMe - Transforma espacios públicos en galerías digitales**

BeamMe es la plataforma innovadora que permite a usuarios compartir y descubrir contenido visual en pantallas públicas de toda la ciudad. Convierte cualquier momento en una obra de arte digital.

✨ **Características principales:**

📸 **Contenido Visual Único**
• Sube fotos y videos desde tu dispositivo
• Edita contenido con filtros profesionales
• Comparte momentos únicos con la comunidad

🌆 **Experiencia Urbana**
• Descubre contenido en pantallas de tu ciudad
• Geolocalización para encontrar pantallas cercanas
• Interactúa con contenido de otros usuarios

🔒 **Seguridad y Privacidad**
• Autenticación segura (Google, Apple, Email)
• Control total sobre tu contenido
• Moderación automática de contenido

🎯 **Para Todos**
• Interfaz intuitiva y fácil de usar
• Soporte para múltiples idiomas
• Accesibilidad completa

🚀 **Tecnología Avanzada**
• Sincronización en tiempo real
• Modo offline disponible
• Notificaciones inteligentes
• Analytics de interacción

Únete a la revolución del arte digital urbano. Descarga BeamMe y convierte la ciudad en tu galería personal.

#DigitalArt #UrbanTech #ContentSharing #PublicDisplays
```

### 🎯 **Categorización**

- **Categoría**: Fotografía
- **Tags**: fotografía, arte digital, contenido visual, redes sociales
- **Clasificación de contenido**: Completar cuestionario detallado

### 📊 **Configurar precios y distribución**

```yaml
Disponibilidad:
  - Países: Todos (o seleccionar específicos)
  - Dispositivos: Teléfonos y tabletas
  - Funciones de dispositivo: Camera (opcional)

Precios:
  - Aplicación gratuita: ✅
  - Compras dentro de la app: ✅ (si aplica)
  - Anuncios: ✅ (si aplica)

Distribución:
  - Google Play: ✅
  - Programa para familias: ❌ (revisar si aplica)
```

## 🚀 **Proceso de Publicación**

### 📦 **Subir AAB/APK**

1. **Production** - **Create new release**
2. **Upload** - Arrastra tu .aab file  
3. **Release name**: "1.0.0" (coincide con version en pubspec.yaml)
4. **Release notes**:

```markdown
🎉 Lanzamiento inicial de BeamMe

✨ Nuevas características:
• Sistema completo de autenticación
• Subida y edición de contenido visual
• Descubrimiento de pantallas públicas
• Geolocalización integrada
• Notificaciones push
• Soporte multi-idioma (ES, EN, IT)

🔧 Mejoras técnicas:
• Performance optimizada
• Interfaz responsive  
• Modo offline disponible
• Seguridad mejorada

📱 Compatibilidad:
• Android 5.0+ (API 21+)
• Soporte para tabletas
• Optimizado para diferentes tamaños de pantalla
```

### 🧪 **Testing interno/cerrado**

Antes del lanzamiento público:

1. **Internal testing** - Invitar testers internos
2. **Closed testing** - Grupo cerrado de beta testers
3. **Open testing** - Beta pública (opcional)

<CodeSnippet 
  code="# Generar build para testing
flutter build appbundle --release --flavor staging

# Track de testing recomendado:
# 1. Internal testing (1-7 días)
# 2. Closed testing (1-2 semanas)  
# 3. Production release"
  language="bash"
  title="Builds para testing"
/>

### ✅ **Review checklist final**

Antes de enviar a review:

- [ ] **App inicia** sin crashes
- [ ] **Todas las funciones** están implementadas
- [ ] **Permisos** se solicitan adecuadamente
- [ ] **Metadata** completa y precisa
- [ ] **Screenshots** de alta calidad
- [ ] **Descripción** informativa
- [ ] **Políticas** de privacidad configuradas
- [ ] **Testing** en múltiples dispositivos
- [ ] **Performance** optimizada
- [ ] **Tamaño** de app razonable (menor a 150MB idealmente)

## 📊 **Monitoreo Post-Lanzamiento**

### 📈 **Métricas importantes**

```dart title="lib/core/services/play_store_service.dart"
import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:injectable/injectable.dart';

@injectable
class PlayStoreService {
  PlayStoreService(this._analytics);

  final FirebaseAnalytics _analytics;

  // 📊 Track instalaciones
  Future<void> trackAppInstall() async {
    await _analytics.logEvent(
      name: 'app_install',
      parameters: {
        'source': 'google_play',
        'timestamp': DateTime.now().toIso8601String(),
      },
    );
  }

  // 📱 Track primer uso
  Future<void> trackFirstOpen() async {
    await _analytics.logEvent(name: 'first_open');
  }

  // ⭐ Solicitar rating
  Future<void> requestReview() async {
    // Implementar in-app review
    // import 'package:in_app_review/in_app_review.dart';
  }
}
```

### 🔄 **Actualizaciones**

Para futuras actualizaciones:

1. **Incrementar version** en pubspec.yaml
2. **Build nuevo** AAB
3. **Crear nueva release** en Play Console
4. **Agregar release notes** detalladas
5. **Testing** antes de publicar

## ❌ **Problemas Comunes**

### 🚨 **App rechazada - Soluciones**

```yaml
❌ Problema: "App crashes on startup"
✅ Solución: 
  - Probar APK de release en dispositivos reales
  - Verificar logs con: adb logcat
  - Revisar ProGuard rules si usa minify

❌ Problema: "Missing privacy policy"  
✅ Solución:
  - Crear privacy policy
  - Agregar link en Play Console
  - Incluir en app si colectas datos sensibles

❌ Problema: "Inappropriate content"
✅ Solución:
  - Revisar screenshots y descripción
  - Asegurar clasificación de contenido correcta
  - Implementar moderación de contenido

❌ Problema: "Metadata policy violation"
✅ Solución:  
  - Descripción debe ser precisa
  - No usar keywords spam
  - Screenshots deben mostrar app real
```

### 🔧 **Comandos debug útiles**

<CodeSnippet 
  code="# Verificar signing de APK
keytool -printcert -jarfile app-release.apk

# Ver logs de dispositivo
adb logcat | grep flutter

# Verificar tamaño de APK
flutter build apk --analyze-size --target-platform=android-arm64

# Verificar dependencias  
flutter pub deps

# Limpiar y rebuild
flutter clean
flutter pub get
flutter build appbundle --release"
  language="bash"
  title="Debug commands"
/>

## ✅ **Checklist Final**

- [ ] Keystore generado y respaldado
- [ ] Build de producción testeado
- [ ] Google Play Console configurado
- [ ] Assets gráficos subidos
- [ ] Descripción completa
- [ ] Políticas de privacidad
- [ ] Testing interno completado
- [ ] Release notes escritas
- [ ] Métricas configuradas
- [ ] Plan de actualizaciones

:::tip 🚀 Consejos Pro
1. **Usa gradlew** para builds consistentes
2. **Implementa CI/CD** para automatizar builds
3. **Haz A/B testing** de screenshots
4. **Monitorea reviews** y responde rápido
5. **Planifica updates** regulares cada 2-4 semanas
:::

---

## 🎯 **Siguiente Paso**

¡Felicidades! Tu app está lista para Google Play Store.

👉 **Continúa con**: [Despliegue en App Store](./app-store.md)

---

*⏱️ Tiempo total: 4-8 horas (incluyendo review de Google)*