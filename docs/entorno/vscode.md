---
sidebar_position: 2
---

# 💻 VS Code para Flutter

> **Objetivo**: Configurar VS Code como el IDE perfecto para desarrollo Flutter profesional

Visual Studio Code es el editor preferido por la mayoría de desarrolladores Flutter. Esta guía te ayudará a configurarlo completamente para máxima productividad.

## 🎯 **¿Por qué VS Code para Flutter?**

### ✅ **Ventajas principales:**
- 🚀 **Rápido y ligero** comparado con Android Studio
- 🔧 **Altamente personalizable** con miles de extensiones
- 🔄 **Hot reload** súper rápido
- 🐛 **Debugging potente** con breakpoints avanzados
- 📱 **Integración nativa** con Flutter DevTools
- 🌍 **Soporte multiplataforma** (Mac, Windows, Linux)

## 📦 **Extensiones Esenciales**

### 🎯 **Extensiones obligatorias**

import CodeSnippet from '@site/src/components/CodeSnippet';

<CodeSnippet 
  code="# Instalar extensiones desde terminal
code --install-extension Dart-Code.flutter
code --install-extension Dart-Code.dart-code
code --install-extension usernamehw.errorlens
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-json"
  language="bash"
  title="Instalar extensiones esenciales"
/>

#### 1. **Flutter & Dart** (Dart-Code.flutter)
- 📱 Soporte completo para Flutter y Dart
- 🔄 Hot reload, hot restart
- 🐛 Debugging integrado
- 📊 Flutter DevTools
- 🏗️ Refactoring automático

#### 2. **Error Lens** (usernamehw.errorlens)
- 🔍 Muestra errores y warnings inline
- ⚡ Detección de problemas en tiempo real
- 🎨 Sintaxis highlighting mejorada

#### 3. **Bracket Pair Colorizer** (CoenraadS.bracket-pair-colorizer-2)
- 🌈 Colorea brackets para mejor legibilidad
- 📖 Esencial para código Dart con muchos widgets anidados

### 🚀 **Extensiones productividad**

```json title="extensions.json (recomendado)"
{
  "recommendations": [
    "Dart-Code.flutter",
    "Dart-Code.dart-code", 
    "usernamehw.errorlens",
    "PKief.material-icon-theme",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-json",
    "bradlc.vscode-tailwindcss",
    "alefragnani.Bookmarks",
    "ms-vscode.vscode-typescript-next",
    "christian-kohler.path-intellisense"
  ]
}
```

#### 4. **Material Icon Theme** (PKief.material-icon-theme)
- 🎨 Iconos visuales para mejor navegación
- 📁 Reconocimiento rápido de tipos de archivo

#### 5. **Auto Rename Tag** (formulahendry.auto-rename-tag)
- 🔄 Renombra widgets automáticamente
- ⚡ Evita errores de sintaxis

#### 6. **Path Intellisense** (christian-kohler.path-intellisense)
- 📂 Autocompletado de rutas de archivos
- 🎯 Importaciones más rápidas

## ⚙️ **Configuración Optimizada**

### 📝 **settings.json profesional**

```json title=".vscode/settings.json"
{
  // === CONFIGURACIÓN FLUTTER ===
  "dart.flutterSdkPath": "/Users/[usuario]/flutter",
  "dart.checkForSdkUpdates": true,
  "dart.openDevTools": "flutter",
  "dart.previewFlutterUiGuides": true,
  "dart.previewFlutterUiGuidesCustomTracking": true,
  "dart.flutterCreateAndroidLanguage": "kotlin",
  "dart.flutterCreateIOSLanguage": "swift",
  
  // === HOT RELOAD OPTIMIZADO ===
  "dart.flutterHotReloadOnSave": "allIfDirty",
  "dart.hotReloadOnSave": "allIfDirty",
  
  // === DEBUGGING ===
  "dart.debugExternalPackageLibraries": false,
  "dart.debugSdkLibraries": false,
  "dart.evaluateGettersInDebugViews": true,
  "dart.vmAdditionalArgs": ["--disable-dart-dev"],
  
  // === EDITOR ===
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit"
  },
  "editor.rulers": [80, 120],
  "editor.wordWrap": "bounded",
  "editor.wordWrapColumn": 80,
  
  // === ARCHIVOS ===
  "files.associations": {
    "*.dart": "dart"
  },
  "files.exclude": {
    "**/.dart_tool": true,
    "**/.packages": true,
    "**/build": true,
    "**/*.lock": true
  },
  
  // === TERMINAL ===
  "terminal.integrated.shell.osx": "/bin/zsh",
  "terminal.integrated.fontSize": 14,
  
  // === TEMA Y APARIENCIA ===
  "workbench.colorTheme": "Material Theme Ocean High Contrast",
  "workbench.iconTheme": "material-icon-theme",
  "editor.fontFamily": "'Fira Code', 'SF Mono', Menlo, Monaco, 'Courier New'",
  "editor.fontLigatures": true,
  "editor.fontSize": 14,
  
  // === FLUTTER ESPECÍFICO ===
  "dart.lineLength": 80,
  "dart.insertArgumentPlaceholders": false,
  "dart.showTodos": true,
  "dart.reportAnalyzerErrors": true,
  "dart.allowAnalytics": false,
  "dart.flutterScreenshotPath": "screenshots",
  
  // === EMMET PARA DART ===
  "emmet.includeLanguages": {
    "dart": "html"
  },
  "emmet.syntaxProfiles": {
    "dart": "xml"
  }
}
```

### 🎯 **launch.json para debugging**

```json title=".vscode/launch.json"
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🐛 Debug Flutter (Development)",
      "request": "launch",
      "type": "dart",
      "flutterMode": "debug",
      "program": "lib/main.dart",
      "args": ["--flavor", "dev", "--dart-define=ENV=development"]
    },
    {
      "name": "📱 Profile Flutter",
      "request": "launch", 
      "type": "dart",
      "flutterMode": "profile",
      "program": "lib/main.dart"
    },
    {
      "name": "🚀 Release Flutter",
      "request": "launch",
      "type": "dart", 
      "flutterMode": "release",
      "program": "lib/main.dart"
    },
    {
      "name": "🌐 Flutter Web",
      "request": "launch",
      "type": "dart",
      "program": "lib/main.dart",
      "args": ["--web-renderer", "html"]
    },
    {
      "name": "🔧 Flutter Test",
      "request": "launch",
      "type": "dart",
      "program": "test/",
      "flutterMode": "debug"
    }
  ]
}
```

### 📋 **tasks.json para automatización**

```json title=".vscode/tasks.json"
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "🧹 Flutter Clean",
      "type": "shell",
      "command": "flutter",
      "args": ["clean"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "📦 Flutter Pub Get",
      "type": "shell", 
      "command": "flutter",
      "args": ["pub", "get"],
      "group": "build"
    },
    {
      "label": "🏗️ Flutter Build APK",
      "type": "shell",
      "command": "flutter", 
      "args": ["build", "apk", "--release"],
      "group": "build"
    },
    {
      "label": "🧪 Flutter Test",
      "type": "shell",
      "command": "flutter",
      "args": ["test"],
      "group": "test"
    },
    {
      "label": "📊 Flutter Analyze",
      "type": "shell",
      "command": "flutter",
      "args": ["analyze"],
      "group": "test"
    }
  ]
}
```

## ⌨️ **Atajos de Teclado Esenciales**

### 🚀 **Atajos Flutter específicos**

| Atajo | Acción | Descripción |
|-------|--------|-------------|
| `Cmd+F5` | Hot Reload | Recarga cambios sin reiniciar |
| `Cmd+Shift+F5` | Hot Restart | Reinicia la app completa |
| `Cmd+Shift+P` → `Flutter: New Project` | Nuevo Proyecto | Crear proyecto Flutter |
| `Cmd+Shift+P` → `Dart: Open DevTools` | DevTools | Herramientas desarrollo |
| `F5` | Start Debugging | Iniciar debug |
| `Shift+F5` | Stop Debugging | Parar debug |

### 💻 **Atajos de productividad**

| Atajo | Acción | Descripción |
|-------|--------|-------------|
| `Cmd+.` | Quick Fix | Soluciones automáticas |
| `Option+Shift+F` | Format Document | Formatear código |
| `Cmd+Shift+O` | Go to Symbol | Navegar símbolos |
| `Cmd+P` | Quick Open | Abrir archivo rápido |
| `Cmd+Shift+P` | Command Palette | Paleta comandos |
| `F2` | Rename Symbol | Renombrar símbolo |

## 🎨 **Snippets Personalizados**

### 📱 **Snippets Flutter útiles**

```json title="flutter.code-snippets"
{
  "StatelessWidget": {
    "prefix": "stless",
    "body": [
      "class ${1:WidgetName} extends StatelessWidget {",
      "  const ${1:WidgetName}({Key? key}) : super(key: key);",
      "",
      "  @override",
      "  Widget build(BuildContext context) {",
      "    return ${2:Container()};",
      "  }",
      "}"
    ],
    "description": "Create a StatelessWidget"
  },
  "StatefulWidget": {
    "prefix": "stful",
    "body": [
      "class ${1:WidgetName} extends StatefulWidget {",
      "  const ${1:WidgetName}({Key? key}) : super(key: key);",
      "",
      "  @override",
      "  State<${1:WidgetName}> createState() => _${1:WidgetName}State();",
      "}",
      "",
      "class _${1:WidgetName}State extends State<${1:WidgetName}> {",
      "  @override",
      "  Widget build(BuildContext context) {",
      "    return ${2:Container()};",
      "  }",
      "}"
    ],
    "description": "Create a StatefulWidget"
  },
  "BlocProvider": {
    "prefix": "blocprovider",
    "body": [
      "BlocProvider(",
      "  create: (context) => ${1:BlocName}(),",
      "  child: ${2:ChildWidget()},",
      ")"
    ],
    "description": "BlocProvider wrapper"
  },
  "BlocBuilder": {
    "prefix": "blocbuilder", 
    "body": [
      "BlocBuilder<${1:BlocName}, ${2:StateName}>(",
      "  builder: (context, state) {",
      "    return ${3:Container()};",
      "  },",
      ")"
    ],
    "description": "BlocBuilder widget"
  }
}
```

## 🔧 **Configuración Avanzada**

### 🎯 **Workspace específico**

```json title="flutter_app.code-workspace"
{
  "folders": [
    {
      "path": "."
    }
  ],
  "settings": {
    "dart.flutterSdkPath": "/Users/[usuario]/flutter",
    "files.associations": {
      "*.dart": "dart",
      "pubspec.yaml": "yaml", 
      "analysis_options.yaml": "yaml"
    }
  },
  "extensions": {
    "recommendations": [
      "dart-code.flutter",
      "dart-code.dart-code"
    ]
  }
}
```

### 📊 **DevTools Integration**

```json title="Configuración DevTools"
{
  "dart.devToolsTheme": "dark",
  "dart.openDevTools": "flutter", 
  "dart.devToolsPort": 9100,
  "dart.vmServicePort": 8181,
  "dart.embedDevTools": true
}
```

## 🐛 **Debugging Avanzado**

### 🎯 **Configuración de breakpoints**

1. **Breakpoint condicional**:
   ```dart
   // Breakpoint solo cuando user.id == 123
   if (user.id == 123) {
     print('Debug specific user'); // <- Breakpoint aquí
   }
   ```

2. **Logpoints**:
   - Click derecho en línea
   - "Add Logpoint"
   - Mensaje: `User: {user.name}, Age: {user.age}`

3. **Exception breakpoints**:
   - Debug panel → Breakpoints 
   - ✅ Uncaught Exceptions
   - ✅ All Exceptions

### 📱 **Debug en múltiples dispositivos**

```json title="Configuración multi-device"
{
  "configurations": [
    {
      "name": "Debug Android",
      "type": "dart",
      "deviceId": "emulator-5554"
    },
    {
      "name": "Debug iOS", 
      "type": "dart",
      "deviceId": "ios-simulator"
    }
  ]
}
```

## 🚀 **Optimización Rendimiento**

### ⚡ **Configuraciones para velocidad**

```json title="Optimización VS Code"
{
  "dart.analysisServerFolding": false,
  "dart.completeFunctionCalls": false,
  "dart.analyzerDiagnosticsPort": 0,
  "dart.analyzerInstrumentationLogFile": null,
  "dart.analyzerLogFile": null,
  "dart.analyzerPath": null,
  "dart.checkForSdkUpdates": false,
  "dart.closingLabels": false,
  "extensions.autoUpdate": false
}
```

### 📈 **Monitoring performance**

- **Memory usage**: `Cmd+Shift+P` → "Developer: Reload Window With Extensions Disabled"
- **Flutter Inspector**: Analizar árbol de widgets
- **Performance Overlay**: Mostrar métricas en tiempo real

## 🎨 **Temas Recomendados**

### 🌙 **Temas oscuros**
- **Material Theme Ocean High Contrast** - Ideal para Flutter
- **One Dark Pro** - Popular y ergonómico  
- **Dracula Official** - Colores vibrantes

### ☀️ **Temas claros**
- **Material Theme Lighter High Contrast**
- **Atom One Light Theme**
- **Winter is Coming (Light)**

## ✅ **Checklist de Configuración**

- [ ] Flutter y Dart extensions instaladas
- [ ] settings.json configurado
- [ ] launch.json para debugging
- [ ] tasks.json para automatización
- [ ] Snippets personalizados creados
- [ ] Tema y fuentes configuradas
- [ ] Atajos de teclado memorizados
- [ ] DevTools funcionando
- [ ] Hot reload operativo
- [ ] Debugging probado

:::tip 🚀 Pro Tips
1. **Usar workspace files** para proyectos grandes
2. **Configurar múltiples launch configs** para diferentes flavors
3. **Personalizar snippets** según tu arquitectura
4. **Usar tasks** para automatizar builds
5. **Configurar DevTools** en puerto fijo para estabilidad
:::

## 🆘 **Problemas Comunes**

### ❌ **Flutter extension no funciona**

<CodeSnippet 
  code="# Reinstalar extensión Flutter
code --uninstall-extension Dart-Code.flutter
code --install-extension Dart-Code.flutter

# Recargar VS Code
# Cmd+Shift+P → Developer: Reload Window"
  language="bash"
  title="Solución reinstalación"
/>

### ❌ **Hot reload lento**

```json title="Optimizar hot reload"
{
  "dart.flutterHotReloadOnSave": "allIfDirty",
  "dart.hotReloadOnSave": "allIfDirty", 
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/build/**": true,
    "**/.dart_tool/**": true
  }
}
```

### ❌ **Análisis lento**

```json title="Optimizar análisis"
{
  "dart.analysisServerFolding": false,
  "dart.completeFunctionCalls": false,
  "editor.suggestOnTriggerCharacters": false
}
```

---

## 🎯 **Siguiente Paso**

¡Perfecto! Ya tienes VS Code optimizado para Flutter. 

👉 **Continúa con**: [Creación del Proyecto](../proyecto/estructura.md)

---

*⏱️ Tiempo de configuración: 30-45 minutos*