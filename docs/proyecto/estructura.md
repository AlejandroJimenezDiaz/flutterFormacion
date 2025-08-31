---
sidebar_position: 1
---

# 🏗️ Estructura del Proyecto

> **Objetivo**: Crear un proyecto Flutter con arquitectura profesional y escalable

En esta sección aprenderás a estructurar un proyecto Flutter siguiendo las mejores prácticas de la industria, basado en la aplicación real **BeamMe**.

## 🎯 **¿Por qué la arquitectura importa?**

### 📊 **Beneficios de una buena estructura:**
- 🔧 **Mantenibilidad** - Código fácil de modificar y extender
- 🧪 **Testabilidad** - Testing unitario e integración sencillos
- 👥 **Colaboración** - Múltiples desarrolladores sin conflictos
- 🚀 **Escalabilidad** - Crece con tu aplicación
- 🐛 **Debugging** - Errores más fáciles de encontrar

## 🏁 **Crear el Proyecto Base**

### 📱 **Comando de creación**

import CodeSnippet from '@site/src/components/CodeSnippet';

<CodeSnippet 
  code="# Crear proyecto con configuración profesional
flutter create beamme \\
  --org com.example \\
  --description 'Plataforma para mostrar contenido en pantallas públicas' \\
  --platforms=android,ios,web \\
  --template=app

cd beamme"
  language="bash"
  title="Crear proyecto BeamMe"
/>

### ⚙️ **Configuración inicial pubspec.yaml**

```yaml title="pubspec.yaml"
name: beamme
description: Plataforma para mostrar contenido en pantallas públicas
publish_to: 'none' # Remove this line if you wish to publish to pub.dev

version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'
  flutter: ">=3.16.0"

dependencies:
  flutter:
    sdk: flutter
  
  # 🎨 UI & Theming
  cupertino_icons: ^1.0.6
  google_fonts: ^6.1.0
  flutter_svg: ^2.0.9
  
  # 🏗️ State Management
  flutter_bloc: ^8.1.3
  provider: ^6.1.1
  equatable: ^2.0.5
  
  # 🌐 Networking
  dio: ^5.4.0
  retrofit: ^4.0.3
  json_annotation: ^4.8.1
  
  # 💾 Local Storage
  shared_preferences: ^2.2.2
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  
  # 🔑 Authentication
  firebase_auth: ^4.15.3
  google_sign_in: ^6.1.6
  sign_in_with_apple: ^5.0.0
  
  # 📱 Device Features
  image_picker: ^1.0.4
  permission_handler: ^11.1.0
  device_info_plus: ^9.1.1
  
  # 🌍 Internationalization
  flutter_localizations:
    sdk: flutter
  intl: ^0.19.0
  
  # 🔧 Utilities
  get_it: ^7.6.4
  injectable: ^2.3.2
  auto_route: ^7.8.4
  logger: ^2.0.2+1
  freezed: ^2.4.6

dev_dependencies:
  flutter_test:
    sdk: flutter
  
  # 🧪 Testing
  bloc_test: ^9.1.5
  mockito: ^5.4.4
  integration_test:
    sdk: flutter
  
  # 🏗️ Code Generation
  build_runner: ^2.4.7
  json_serializable: ^6.7.1
  injectable_generator: ^2.4.1
  auto_route_generator: ^7.3.2
  retrofit_generator: ^8.0.6
  hive_generator: ^2.0.1
  freezed: ^2.4.6
  
  # 📊 Code Quality
  flutter_lints: ^3.0.1
  very_good_analysis: ^5.1.0
  
  # 🎨 Assets
  flutter_launcher_icons: ^0.13.1
  flutter_native_splash: ^2.3.6

flutter:
  uses-material-design: true
  generate: true # Para internacionalización
  
  assets:
    - assets/images/
    - assets/icons/
    - assets/animations/
    - assets/translations/
  
  fonts:
    - family: CustomFont
      fonts:
        - asset: assets/fonts/CustomFont-Regular.ttf
          weight: 400
        - asset: assets/fonts/CustomFont-Bold.ttf
          weight: 700

# 🎨 Configuración de iconos de app
flutter_icons:
  android: true
  ios: true
  image_path: "assets/icons/app_icon.png"
  adaptive_icon_background: "#02569B"
  adaptive_icon_foreground: "assets/icons/app_icon_foreground.png"

# 🌊 Splash screen
flutter_native_splash:
  color: "#02569B"
  image: assets/images/splash_logo.png
  color_dark: "#1a1a1a"
  image_dark: assets/images/splash_logo_dark.png
  android_12:
    image: assets/images/splash_logo_android12.png
    color: "#02569B"
```

## 📁 **Arquitectura de Carpetas**

### 🏗️ **Estructura Clean Architecture**

```
lib/
├── 🎯 main.dart                          # Punto de entrada
├── 🚀 app/                              # Configuración de la app
│   ├── app.dart                         # Widget principal
│   ├── router/                          # Navegación
│   │   ├── app_router.dart
│   │   └── routes.dart
│   ├── theme/                           # Tema y estilos
│   │   ├── app_theme.dart
│   │   ├── colors.dart
│   │   └── text_styles.dart
│   └── constants/                       # Constantes globales
│       ├── app_constants.dart
│       └── api_constants.dart
│
├── 🏗️ core/                             # Funcionalidad base
│   ├── di/                             # Dependency Injection
│   │   ├── injection.dart
│   │   └── injection.config.dart
│   ├── error/                          # Manejo de errores
│   │   ├── failures.dart
│   │   └── exceptions.dart
│   ├── network/                        # Configuración red
│   │   ├── dio_client.dart
│   │   └── network_info.dart
│   ├── utils/                          # Utilidades
│   │   ├── validators.dart
│   │   ├── formatters.dart
│   │   └── extensions.dart
│   └── resources/                      # Recursos compartidos
│       ├── data_state.dart
│       └── use_case.dart
│
├── 📊 data/                            # Capa de datos
│   ├── datasources/                    # Fuentes de datos
│   │   ├── local/                      # Datos locales
│   │   │   ├── auth_local_datasource.dart
│   │   │   └── user_local_datasource.dart
│   │   └── remote/                     # APIs
│   │       ├── auth_remote_datasource.dart
│   │       └── user_remote_datasource.dart
│   ├── models/                         # Modelos de datos
│   │   ├── user_model.dart
│   │   └── auth_model.dart
│   └── repositories/                   # Implementación repositories
│       ├── auth_repository_impl.dart
│       └── user_repository_impl.dart
│
├── 🏛️ domain/                          # Lógica de negocio
│   ├── entities/                       # Entidades del dominio
│   │   ├── user.dart
│   │   └── auth.dart
│   ├── repositories/                   # Contratos repositories
│   │   ├── auth_repository.dart
│   │   └── user_repository.dart
│   └── usecases/                       # Casos de uso
│       ├── auth/
│       │   ├── login_usecase.dart
│       │   └── logout_usecase.dart
│       └── user/
│           ├── get_user_usecase.dart
│           └── update_user_usecase.dart
│
├── 🎨 presentation/                    # Capa de presentación
│   ├── pages/                          # Páginas/Screens
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   ├── login_page.dart
│   │   │   │   ├── widgets/
│   │   │   │   └── cubit/
│   │   │   │       ├── login_cubit.dart
│   │   │   │       └── login_state.dart
│   │   │   └── register/
│   │   ├── home/
│   │   │   ├── home_page.dart
│   │   │   ├── widgets/
│   │   │   └── cubit/
│   │   └── profile/
│   ├── widgets/                        # Widgets reutilizables
│   │   ├── common/
│   │   │   ├── custom_button.dart
│   │   │   ├── loading_indicator.dart
│   │   │   └── error_widget.dart
│   │   └── specific/
│   └── utils/                          # Utils de presentación
│       ├── dialog_utils.dart
│       └── snackbar_utils.dart
│
├── 🌍 l10n/                            # Internacionalización
│   ├── app_localizations.dart
│   └── arb/
│       ├── app_en.arb
│       └── app_es.arb
│
└── 🧪 test/                           # Tests (espejo de lib/)
    ├── unit/
    ├── widget/
    └── integration/
```

## 🎯 **Configuración main.dart**

### 🚀 **Punto de entrada profesional**

```dart title="lib/main.dart"
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hive_flutter/hive_flutter.dart';

import 'app/app.dart';
import 'core/di/injection.dart';
import 'core/utils/app_bloc_observer.dart';

void main() async {
  // 🔧 Inicialización de Flutter
  WidgetsFlutterBinding.ensureInitialized();
  
  // 📱 Configuración de orientación
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);
  
  // 🎨 Configuración de UI sistema
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
    ),
  );
  
  // 💾 Inicialización Hive
  await Hive.initFlutter();
  
  // 🔧 Configuración Dependency Injection
  await configureDependencies();
  
  // 📊 Observer para BLoC
  Bloc.observer = AppBlocObserver();
  
  // 🚀 Ejecutar aplicación
  runApp(const BeamMeApp());
}
```

## 🚀 **Configuración App Principal**

### 📱 **Widget de aplicación**

```dart title="lib/app/app.dart"
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import '../core/di/injection.dart';
import '../l10n/app_localizations.dart';
import '../presentation/cubit/app_cubit.dart';
import 'router/app_router.dart';
import 'theme/app_theme.dart';

class BeamMeApp extends StatelessWidget {
  const BeamMeApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<AppCubit>()..initialize(),
      child: const _BeamMeAppView(),
    );
  }
}

class _BeamMeAppView extends StatelessWidget {
  const _BeamMeAppView();

  @override
  Widget build(BuildContext context) {
    final appRouter = getIt<AppRouter>();
    
    return BlocBuilder<AppCubit, AppState>(
      builder: (context, state) {
        return MaterialApp.router(
          // 🎨 Configuración básica
          title: 'BeamMe',
          debugShowCheckedModeBanner: false,
          
          // 🎭 Tema
          theme: AppTheme.light,
          darkTheme: AppTheme.dark,
          themeMode: state.themeMode,
          
          // 🌍 Localización
          localizationsDelegates: const [
            AppLocalizations.delegate,
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          supportedLocales: AppLocalizations.supportedLocales,
          locale: state.locale,
          
          // 🧭 Navegación
          routerConfig: appRouter.config(),
        );
      },
    );
  }
}
```

## 🎨 **Sistema de Temas**

### 🌈 **Configuración de temas**

```dart title="lib/app/theme/app_theme.dart"
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'colors.dart';
import 'text_styles.dart';

class AppTheme {
  static ThemeData get light => _buildTheme(
    brightness: Brightness.light,
    primaryColor: AppColors.primary,
    backgroundColor: AppColors.lightBackground,
  );
  
  static ThemeData get dark => _buildTheme(
    brightness: Brightness.dark,
    primaryColor: AppColors.primaryDark,
    backgroundColor: AppColors.darkBackground,
  );
  
  static ThemeData _buildTheme({
    required Brightness brightness,
    required Color primaryColor,
    required Color backgroundColor,
  }) {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: primaryColor,
      brightness: brightness,
    );
    
    return ThemeData(
      // 🎨 Configuración base
      useMaterial3: true,
      brightness: brightness,
      colorScheme: colorScheme,
      
      // 📝 Tipografía
      textTheme: GoogleFonts.interTextTheme().apply(
        bodyColor: colorScheme.onSurface,
        displayColor: colorScheme.onSurface,
      ),
      
      // 🔘 Componentes
      appBarTheme: AppBarTheme(
        elevation: 0,
        centerTitle: true,
        backgroundColor: backgroundColor,
        foregroundColor: colorScheme.onSurface,
        titleTextStyle: AppTextStyles.heading2.copyWith(
          color: colorScheme.onSurface,
        ),
      ),
      
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(
            vertical: 16,
            horizontal: 24,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
      
      inputDecorationTheme: InputDecorationTheme(
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        filled: true,
        fillColor: colorScheme.surfaceVariant.withOpacity(0.3),
      ),
      
      cardTheme: CardTheme(
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),
    );
  }
}
```

### 🎨 **Sistema de colores**

```dart title="lib/app/theme/colors.dart"
import 'package:flutter/material.dart';

class AppColors {
  // 🎯 Colores principales
  static const Color primary = Color(0xFF02569B);
  static const Color primaryDark = Color(0xFF024F8B);
  static const Color primaryLight = Color(0xFF54C5F8);
  
  // 🌈 Colores secundarios
  static const Color secondary = Color(0xFF54C5F8);
  static const Color accent = Color(0xFF0273CB);
  
  // ✅ Estados
  static const Color success = Color(0xFF4CAF50);
  static const Color warning = Color(0xFF FF9800);
  static const Color error = Color(0xFFFF5252);
  static const Color info = Color(0xFF2196F3);
  
  // 🔲 Neutros
  static const Color white = Color(0xFFFFFFFF);
  static const Color black = Color(0xFF000000);
  static const Color grey = Color(0xFF9E9E9E);
  static const Color lightGrey = Color(0xFFF5F5F5);
  static const Color darkGrey = Color(0xFF424242);
  
  // 🌅 Backgrounds
  static const Color lightBackground = Color(0xFFF8F9FA);
  static const Color darkBackground = Color(0xFF1A1A1A);
  static const Color surfaceLight = Color(0xFFFFFFFF);
  static const Color surfaceDark = Color(0xFF2D2D2D);
  
  // 🎨 Gradientes
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [primary, primaryLight],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
  
  static const LinearGradient darkGradient = LinearGradient(
    colors: [darkBackground, Color(0xFF2D2D2D)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );
}
```

## ⚙️ **Configuración Dependency Injection**

### 🔧 **Setup GetIt + Injectable**

```dart title="lib/core/di/injection.dart"
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:dio/dio.dart';

import 'injection.config.dart';

final getIt = GetIt.instance;

@InjectableInit(
  initializerName: r'$initGetIt',
  preferRelativeImports: true,
  asExtension: false,
)
Future<void> configureDependencies() async {
  // 💾 SharedPreferences
  final sharedPreferences = await SharedPreferences.getInstance();
  getIt.registerSingleton<SharedPreferences>(sharedPreferences);
  
  // 🌐 Dio cliente
  final dio = Dio();
  getIt.registerSingleton<Dio>(dio);
  
  // 🔧 Configurar dependencias generadas
  $initGetIt(getIt);
}
```

## 📊 **Estado de la Aplicación**

### 🎯 **App Cubit para estado global**

```dart title="lib/presentation/cubit/app_cubit.dart"
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import 'package:freezed/freezed.dart';

part 'app_cubit.freezed.dart';
part 'app_state.dart';

@injectable
class AppCubit extends Cubit<AppState> {
  AppCubit() : super(const AppState.initial());
  
  void initialize() async {
    emit(const AppState.loading());
    
    try {
      // 🔧 Inicializaciones necesarias
      await _loadUserPreferences();
      await _checkAuthenticationStatus();
      
      emit(const AppState.ready());
    } catch (e) {
      emit(AppState.error(e.toString()));
    }
  }
  
  void changeThemeMode(ThemeMode themeMode) {
    emit(state.copyWith(themeMode: themeMode));
  }
  
  void changeLocale(Locale locale) {
    emit(state.copyWith(locale: locale));
  }
  
  Future<void> _loadUserPreferences() async {
    // Lógica para cargar preferencias
  }
  
  Future<void> _checkAuthenticationStatus() async {
    // Lógica para verificar autenticación
  }
}
```

```dart title="lib/presentation/cubit/app_state.dart"
part of 'app_cubit.dart';

@freezed
class AppState with _$AppState {
  const factory AppState.initial({
    @Default(ThemeMode.system) ThemeMode themeMode,
    @Default(Locale('en')) Locale locale,
  }) = _Initial;
  
  const factory AppState.loading({
    @Default(ThemeMode.system) ThemeMode themeMode,
    @Default(Locale('en')) Locale locale,
  }) = _Loading;
  
  const factory AppState.ready({
    @Default(ThemeMode.system) ThemeMode themeMode,
    @Default(Locale('en')) Locale locale,
  }) = _Ready;
  
  const factory AppState.error(
    String message, {
    @Default(ThemeMode.system) ThemeMode themeMode,
    @Default(Locale('en')) Locale locale,
  }) = _Error;
}
```

## 🧪 **Configuración de Testing**

### 📋 **Estructura de tests**

```dart title="test/helpers/test_helpers.dart"
import 'package:flutter_test/flutter_test.dart';
import 'package:get_it/get_it.dart';
import 'package:mockito/mockito.dart';

class TestHelpers {
  static void setupTestDependencies() {
    final getIt = GetIt.instance;
    getIt.reset();
    
    // 🔧 Registrar mocks
    // getIt.registerSingleton<AuthRepository>(MockAuthRepository());
    // getIt.registerSingleton<UserRepository>(MockUserRepository());
  }
  
  static void tearDownTestDependencies() {
    GetIt.instance.reset();
  }
}
```

## ✅ **Checklist de Estructura**

- [ ] Proyecto creado con configuración correcta
- [ ] pubspec.yaml configurado con dependencias
- [ ] Estructura de carpetas Clean Architecture
- [ ] main.dart con inicializaciones
- [ ] App widget principal configurado
- [ ] Sistema de temas implementado
- [ ] Dependency Injection configurado
- [ ] Estado global con BLoC/Cubit
- [ ] Configuración de testing
- [ ] Navegación preparada

:::tip 🚀 Próximo Paso
Con la estructura base lista, ahora podemos implementar las funcionalidades específicas de la aplicación.
:::

---

## 🎯 **Siguiente Paso**

¡Excelente! Ya tienes la estructura profesional del proyecto. 

👉 **Continúa con**: [Implementación de Autenticación](../desarrollo/auth.md)

---

*⏱️ Tiempo de configuración: 1-2 horas*