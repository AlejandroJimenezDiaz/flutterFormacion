---
sidebar_position: 1
---

# 🛠️ Instalación de Flutter

> **Objetivo**: Configurar completamente el entorno de desarrollo Flutter en macOS

## 📋 **Checklist de Instalación**

- [ ] Flutter SDK
- [ ] Android Studio + Android SDK
- [ ] Xcode + Command Line Tools
- [ ] VS Code + Extensiones
- [ ] Git configurado
- [ ] Dispositivos de prueba configurados

## 🔧 **1. Instalación Flutter SDK**

### Opción A: Homebrew (Recomendado)

```bash title="Terminal"
# Instalar Homebrew si no lo tienes
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Flutter
brew install --cask flutter
```

### Opción B: Descarga Manual

```bash title="Terminal"
# Descargar desde: https://docs.flutter.dev/get-started/install/macos
# Extraer en /Users/[usuario]/flutter

# Agregar al PATH
echo 'export PATH="$PATH:/Users/[usuario]/flutter/bin"' >> ~/.zshrc
source ~/.zshrc
```

### ✅ Verificar Instalación

import CodeSnippet from '@site/src/components/CodeSnippet';

<CodeSnippet 
  code="flutter --version
# Debe mostrar: Flutter 3.32.8 • channel stable

flutter doctor
# Revisar que no haya errores críticos"
  language="bash"
  title="Verificar Flutter"
/>

:::tip 💡 Consejo Pro
Usa `flutter doctor -v` para obtener información detallada de tu configuración.
:::

:::info 🔍 Herramienta Interactiva
¿Quieres una verificación paso a paso más detallada? Usa nuestro [Validador de Instalación](/tools/validator) interactivo.
:::

## 📱 **2. Android Studio y SDK**

### Instalación Android Studio

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="homebrew" label="🍺 Homebrew">

```bash
brew install --cask android-studio
```

</TabItem>
<TabItem value="manual" label="📥 Descarga Manual">

1. Descargar desde: https://developer.android.com/studio
2. Arrastar a Applications
3. Abrir y seguir configuración inicial

</TabItem>
</Tabs>

### ⚙️ Configuración Android SDK

1. **Abrir Android Studio**
2. **Configuración inicial**:
   - Tools → SDK Manager
   - SDK Platforms → Android 14 (API 34)
   - SDK Tools → Android SDK Build-Tools 34.0.0

3. **Variables de entorno**:

```bash title="~/.zshrc"
# Agregar al final del archivo
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Recargar terminal
source ~/.zshrc
```

### 📱 Crear AVD (Android Virtual Device)

1. **Tools → AVD Manager**
2. **Create Virtual Device**
3. **Seleccionar**: Pixel 7 Pro
4. **API Level**: 34 (Android 14)
5. **Finish**

:::warning ⚠️ Importante
Asegúrate de habilitar la virtualización en BIOS para mejor rendimiento del emulador.
:::

## 🍎 **3. Xcode y iOS**

### Instalación Xcode

```bash title="Terminal"
# Desde App Store (recomendado)
# O desde: https://developer.apple.com/xcode/

# Instalar Command Line Tools
sudo xcode-select --install
```

### ⚙️ Configuración Xcode

1. **Abrir Xcode** (primera vez)
2. **Aceptar licencias**:

```bash title="Terminal"
sudo xcodebuild -license accept
```

3. **Instalar simuladores iOS**:
   - Xcode → Preferences → Components
   - Descargar iOS 17.x Simulator

### 🍎 Configurar Cocoapods

```bash title="Terminal"
# Instalar CocoaPods
sudo gem install cocoapods

# Verificar instalación
pod --version
```

## 🔍 **4. Verificación Final**

### 🩺 Flutter Doctor

```bash title="Terminal"
flutter doctor -v
```

**Resultado esperado**:

```bash title="Output esperado"
✓ Flutter (Channel stable, 3.32.8, on macOS 14.x)
✓ Android toolchain - develop for Android devices (Android SDK version 34.0.0)
✓ Xcode - develop for iOS and macOS (Xcode 15.x)
✓ Chrome - develop for the web
✓ Android Studio (version 2024.x)
✓ VS Code (version 1.x)
✓ Connected device (2 available)
✓ HTTP Host Availability
```

### 📱 Prueba de Dispositivos

```bash title="Terminal"
# Listar dispositivos disponibles
flutter devices

# Debe mostrar:
# - Android emulator
# - iOS Simulator  
# - Chrome (web)
# - macOS (desktop)
```

## 🚀 **5. Primera Aplicación de Prueba**

```bash title="Terminal"
# Crear proyecto de prueba
flutter create test_app
cd test_app

# Ejecutar en Android
flutter run -d android

# Ejecutar en iOS  
flutter run -d ios

# Ejecutar en web
flutter run -d chrome
```

:::tip 🚀 ¡Éxito!
Si ves "Hello World" en tus dispositivos, ¡felicidades! Tu entorno Flutter está correctamente configurado.
:::

## ⚠️ **Problemas Comunes**

### ❌ Android license status unknown

```bash title="Solución"
flutter doctor --android-licenses
# Aceptar todas las licencias
```

### ❌ Xcode installation incomplete

```bash title="Solución"
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

### ❌ CocoaPods no encontrado

```bash title="Solución"
# Reinstalar CocoaPods
sudo gem uninstall cocoapods
sudo gem install cocoapods
```

### ❌ Android SDK no encontrado

```bash title="Solución"
# Verificar path
echo $ANDROID_HOME
# Si está vacío, revisar ~/.zshrc
```

## ✅ **Checklist Final**

- [ ] `flutter doctor` sin errores críticos
- [ ] Android emulator funciona
- [ ] iOS simulator funciona  
- [ ] Hot reload funciona en ambos
- [ ] Depuración funciona
- [ ] Logs se muestran correctamente

---

## 🎯 **Siguiente Paso**

¡Perfecto! Ya tienes tu entorno configurado. 

👉 **Continúa con**: [Android Studio Configuración](./android-studio.md)

---

## 📚 **Referencias Útiles**

- [Flutter Installation Guide](https://docs.flutter.dev/get-started/install)
- [Android Studio Setup](https://developer.android.com/studio)
- [Xcode Setup](https://developer.apple.com/xcode/)

---

*⏱️ Tiempo estimado: 2-3 horas*