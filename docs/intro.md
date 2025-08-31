---
sidebar_position: 1
---

# 🎓 Bienvenido a Kamaleonte Flutter Academy

¡Bienvenido al **programa de formación Flutter** de **Kamaleonte**! 

Este centro de formación está diseñado específicamente para **desarrolladores en prácticas** que se incorporan al equipo. Te guiaremos paso a paso desde los fundamentos hasta convertirte en un desarrollador Flutter competente, trabajando con proyectos reales y estándares profesionales.

## 🎯 Tu Programa de Prácticas

### 👤 **Dirigido a:**
- **Desarrolladores en prácticas** recién incorporados a Kamaleonte
- **Estudiantes** de ingeniería informática o desarrollo de software
- **Desarrolladores junior** que buscan especializarse en desarrollo móvil
- **Profesionales** en transición hacia desarrollo Flutter

### 📚 **Requisitos previos:**
- Conocimientos básicos de **programación orientada a objetos**
- Familiaridad con **Git** y metodologías de desarrollo
- Motivación para aprender y trabajar en equipo
- **No es necesaria experiencia previa en Flutter o Dart**

## 🚀 Proyecto Real: BeamMe

Durante tu programa de prácticas, trabajarás con **BeamMe**, una aplicación real desarrollada y utilizada por Kamaleonte en producción. Esta aplicación incluye:

### 🏗️ **Características principales:**
- 🔐 **Autenticación completa** (Email, Google, Apple Sign-In)
- 💳 **Sistema de pagos** con Adyen
- 🎥 **Editor de video** con FFmpeg
- 🌍 **Internacionalización** (3 idiomas)
- 🔔 **Notificaciones push** con Firebase
- 📍 **Geolocalización** y mapas
- 🏪 **Integración con APIs REST**
- 📊 **Analytics** y crash reporting

### 🎨 **Arquitectura y patrones:**
- ✅ **Clean Architecture**
- ✅ **BLoC Pattern** para gestión de estado  
- ✅ **Provider** para inyección de dependencias
- ✅ **Repository Pattern** para datos
- ✅ **Testing** unitario e integración

## 📖 ¿Cómo usar esta guía?

### 🎯 **Enfoque paso a paso:**

1. **📚 Lee completamente** cada sección antes de ejecutar comandos
2. **💻 Practica** creando tu propio proyecto paralelo
3. **🔄 Experimenta** con variaciones de los ejemplos
4. **❓ Consulta** las secciones de troubleshooting cuando sea necesario

### ⏱️ **Tiempo estimado:**

| Sección | Tiempo | Dificultad |
|---------|--------|------------|
| 🛠️ Configuración entorno | 2-3 horas | ⭐⭐ |
| 📱 Proyecto base | 1-2 horas | ⭐ |
| 🎨 Desarrollo UI/UX | 8-12 horas | ⭐⭐⭐ |
| 🔧 Funcionalidades avanzadas | 15-20 horas | ⭐⭐⭐⭐ |
| 🚀 Despliegue producción | 3-5 horas | ⭐⭐⭐ |
| **🎯 Total** | **30-40 horas** | **⭐⭐⭐** |

### 📝 **Convenciones de la guía:**

:::tip 💡 Consejos Pro
Mejores prácticas y trucos para desarrolladores experimentados.
:::

:::warning ⚠️ Importante
Información crítica que debes tener en cuenta.
:::

:::danger 🚨 Atención
Errores comunes y cómo evitarlos.
:::

:::info 📋 Información
Datos adicionales y contexto útil.
:::

## 🌟 **¿Qué hace especial esta guía?**

### ✅ **Basada en aplicación real**
- No es un tutorial de "Hello World"
- Casos de uso reales de producción
- Problemas reales y sus soluciones

### ✅ **Actualizada constantemente**
- Compatible con **Flutter 3.32+**
- Últimas mejores prácticas
- Dependencias actualizadas

### ✅ **Enfoque profesional**
- Arquitectura escalable
- Código limpio y documentado
- Testing incluido

### ✅ **Completa de verdad**
- Desde instalación hasta stores
- Configuraciones de producción
- Optimizaciones de rendimiento

## 📱 **Aplicación de referencia**

### 🎬 **BeamMe - Características técnicas:**

```yaml
name: beamme  
description: Plataforma para mostrar contenido en pantallas públicas
version: 1.0.1+2

dependencies:
  # Estado y arquitectura
  flutter_bloc: ^9.1.1
  provider: ^6.1.5
  equatable: ^2.0.7
  
  # Networking y APIs
  dio: ^5.8.0+1
  http: ^1.4.0
  
  # Autenticación
  firebase_auth: ^5.0.0
  google_sign_in: ^6.1.5
  sign_in_with_apple: ^7.0.1
  
  # Pagos
  adyen_checkout: ^1.5.1
  
  # Media y edición
  ffmpeg_kit_flutter: ^3.2.0
  video_editor: ^3.0.0
  image_picker: ^1.1.2
  
  # Internacionalización
  flutter_localizations:
    sdk: flutter
  intl: ^0.19.0
```

## 🚀 **¿Listo para empezar?**

### 🎯 **Tu próximo paso:**

1. **📖 Lee** la sección de [Configuración del Entorno](./entorno/instalacion.md)
2. **💻 Configura** tu máquina de desarrollo
3. **📱 Crea** tu primer proyecto Flutter profesional
4. **🌟 Despliega** tu aplicación en las stores

:::tip 🏃‍♂️ ¿Con prisa?
Si ya tienes Flutter configurado, puedes saltar directamente a [Creación del Proyecto](./proyecto/estructura.md).
:::

---

## 🤝 **Contribuir a la guía**

Esta guía es **código abierto** y siempre está mejorando:

- 🐛 **Reporta bugs** en [GitHub Issues](https://github.com/tu-usuario/flutter-guia-completa/issues)
- ✨ **Sugiere mejoras** con Pull Requests
- ❓ **Haz preguntas** en [Discussions](https://github.com/tu-usuario/flutter-guia-completa/discussions)
- ⭐ **Dale una estrella** si te resulta útil

---

**¡Comencemos esta increíble aventura con Flutter! 🎉**