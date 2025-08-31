---
sidebar_position: 1
---

# 🔐 Sistema de Autenticación Completo

> **Objetivo**: Implementar autenticación robusta con Email, Google y Apple Sign-In

Implementaremos un sistema de autenticación completo siguiendo las mejores prácticas de seguridad y UX, basado en la aplicación real **BeamMe**.

## 🎯 **Funcionalidades del Sistema**

### 🔑 **Métodos de autenticación:**
- 📧 **Email y contraseña** - Registro/login tradicional
- 🌐 **Google Sign-In** - OAuth con Google
- 🍎 **Apple Sign-In** - OAuth con Apple (iOS)
- 📱 **Verificación por SMS** - Opcional para mayor seguridad
- 🔄 **Recuperación de contraseña** - Reset por email

### ✨ **Características avanzadas:**
- 🔐 **Persistencia de sesión** - Remember me
- 🛡️ **Validación en tiempo real** - UX mejorada
- 📊 **Estados de loading** - Feedback visual
- ❌ **Manejo de errores** - Mensajes informativos
- 🎨 **Interfaz adaptativa** - Responsive design

## 📋 **Dependencias Necesarias**

### 🔧 **Actualizar pubspec.yaml**

```yaml title="pubspec.yaml - Dependencias Auth"
dependencies:
  # 🔑 Autenticación
  firebase_auth: ^4.15.3
  firebase_core: ^2.24.2
  google_sign_in: ^6.1.6
  sign_in_with_apple: ^5.0.0
  crypto: ^3.0.3
  
  # 📱 UI Components
  flutter_signin_button: ^2.0.0
  pinput: ^3.0.1
  
  # 🔧 Utilities
  validators: ^3.0.0
  equatable: ^2.0.5
  
  # 🏗️ State Management
  flutter_bloc: ^8.1.3
  
  # 💾 Storage
  shared_preferences: ^2.2.2
  flutter_secure_storage: ^9.0.0

dev_dependencies:
  # 🧪 Testing Auth
  mockito: ^5.4.4
  firebase_auth_mocks: ^0.13.0
```

## 🏗️ **Arquitectura de Autenticación**

### 📁 **Estructura de archivos**

```
lib/
├── domain/
│   ├── entities/
│   │   ├── user.dart
│   │   └── auth_result.dart
│   ├── repositories/
│   │   └── auth_repository.dart
│   └── usecases/
│       ├── login_with_email_usecase.dart
│       ├── login_with_google_usecase.dart
│       ├── login_with_apple_usecase.dart
│       ├── register_usecase.dart
│       ├── logout_usecase.dart
│       └── get_current_user_usecase.dart
│
├── data/
│   ├── models/
│   │   ├── user_model.dart
│   │   └── auth_result_model.dart
│   ├── datasources/
│   │   ├── local/
│   │   │   └── auth_local_datasource.dart
│   │   └── remote/
│   │       └── auth_remote_datasource.dart
│   └── repositories/
│       └── auth_repository_impl.dart
│
└── presentation/
    ├── pages/
    │   ├── auth/
    │   │   ├── login_page.dart
    │   │   ├── register_page.dart
    │   │   ├── forgot_password_page.dart
    │   │   └── phone_verification_page.dart
    │   └── widgets/
    │       ├── auth_button.dart
    │       ├── social_login_buttons.dart
    │       └── auth_text_field.dart
    └── cubit/
        ├── auth_cubit.dart
        └── auth_state.dart
```

## 🎯 **Entidades del Dominio**

### 👤 **User Entity**

```dart title="lib/domain/entities/user.dart"
import 'package:equatable/equatable.dart';

class User extends Equatable {
  const User({
    required this.id,
    required this.email,
    this.displayName,
    this.photoURL,
    this.phoneNumber,
    this.emailVerified = false,
    this.isAnonymous = false,
    this.createdAt,
    this.lastLoginAt,
  });

  final String id;
  final String email;
  final String? displayName;
  final String? photoURL;
  final String? phoneNumber;
  final bool emailVerified;
  final bool isAnonymous;
  final DateTime? createdAt;
  final DateTime? lastLoginAt;

  @override
  List<Object?> get props => [
        id,
        email,
        displayName,
        photoURL,
        phoneNumber,
        emailVerified,
        isAnonymous,
        createdAt,
        lastLoginAt,
      ];

  User copyWith({
    String? id,
    String? email,
    String? displayName,
    String? photoURL,
    String? phoneNumber,
    bool? emailVerified,
    bool? isAnonymous,
    DateTime? createdAt,
    DateTime? lastLoginAt,
  }) {
    return User(
      id: id ?? this.id,
      email: email ?? this.email,
      displayName: displayName ?? this.displayName,
      photoURL: photoURL ?? this.photoURL,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      emailVerified: emailVerified ?? this.emailVerified,
      isAnonymous: isAnonymous ?? this.isAnonymous,
      createdAt: createdAt ?? this.createdAt,
      lastLoginAt: lastLoginAt ?? this.lastLoginAt,
    );
  }
}
```

### 🔐 **AuthResult Entity**

```dart title="lib/domain/entities/auth_result.dart"
import 'package:equatable/equatable.dart';
import 'user.dart';

enum AuthStatus {
  authenticated,
  unauthenticated,
  emailNotVerified,
  phoneNotVerified,
  accountDisabled,
  error,
}

class AuthResult extends Equatable {
  const AuthResult({
    required this.status,
    this.user,
    this.message,
    this.errorCode,
  });

  final AuthStatus status;
  final User? user;
  final String? message;
  final String? errorCode;

  bool get isAuthenticated => status == AuthStatus.authenticated;
  bool get needsEmailVerification => status == AuthStatus.emailNotVerified;
  bool get needsPhoneVerification => status == AuthStatus.phoneNotVerified;
  bool get hasError => status == AuthStatus.error;

  @override
  List<Object?> get props => [status, user, message, errorCode];
}
```

## 📊 **Repository Contract**

### 🔌 **Auth Repository Interface**

```dart title="lib/domain/repositories/auth_repository.dart"
import '../entities/user.dart';
import '../entities/auth_result.dart';

abstract class AuthRepository {
  // 🔍 Estado actual
  Future<User?> getCurrentUser();
  Stream<User?> get authStateChanges;
  
  // 📧 Email Authentication
  Future<AuthResult> signInWithEmail(String email, String password);
  Future<AuthResult> registerWithEmail(
    String email, 
    String password, 
    String displayName,
  );
  
  // 🌐 Social Authentication
  Future<AuthResult> signInWithGoogle();
  Future<AuthResult> signInWithApple();
  
  // 📱 Phone Authentication
  Future<void> verifyPhoneNumber(
    String phoneNumber,
    {
      required Function(String verificationId) codeSent,
      required Function(String error) verificationFailed,
    }
  );
  Future<AuthResult> signInWithPhoneCredential(
    String verificationId,
    String smsCode,
  );
  
  // 🔄 Password Management
  Future<void> sendPasswordResetEmail(String email);
  Future<void> changePassword(String newPassword);
  
  // ✉️ Email Verification
  Future<void> sendEmailVerification();
  Future<void> reloadUser();
  
  // 🚪 Sign Out
  Future<void> signOut();
  
  // 🗑️ Account Management
  Future<void> deleteAccount();
}
```

## 🔧 **Casos de Uso**

### 🎯 **Login with Email Use Case**

```dart title="lib/domain/usecases/login_with_email_usecase.dart"
import 'package:injectable/injectable.dart';

import '../../core/resources/use_case.dart';
import '../entities/auth_result.dart';
import '../repositories/auth_repository.dart';

@injectable
class LoginWithEmailUseCase implements UseCase<AuthResult, LoginWithEmailParams> {
  const LoginWithEmailUseCase(this._authRepository);

  final AuthRepository _authRepository;

  @override
  Future<AuthResult> call(LoginWithEmailParams params) async {
    // 📧 Validar formato email
    if (!_isValidEmail(params.email)) {
      return const AuthResult(
        status: AuthStatus.error,
        message: 'Formato de email inválido',
        errorCode: 'invalid-email-format',
      );
    }

    // 🔐 Validar contraseña
    if (!_isValidPassword(params.password)) {
      return const AuthResult(
        status: AuthStatus.error,
        message: 'La contraseña debe tener al menos 6 caracteres',
        errorCode: 'weak-password',
      );
    }

    try {
      return await _authRepository.signInWithEmail(
        params.email,
        params.password,
      );
    } catch (e) {
      return AuthResult(
        status: AuthStatus.error,
        message: e.toString(),
        errorCode: 'login-failed',
      );
    }
  }

  bool _isValidEmail(String email) {
    return RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
        .hasMatch(email);
  }

  bool _isValidPassword(String password) {
    return password.length >= 6;
  }
}

class LoginWithEmailParams {
  const LoginWithEmailParams({
    required this.email,
    required this.password,
  });

  final String email;
  final String password;
}
```

## 📊 **Estado de Autenticación**

### 🏗️ **Auth Cubit**

```dart title="lib/presentation/cubit/auth_cubit.dart"
import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import 'package:freezed/freezed.dart';

import '../../domain/entities/user.dart';
import '../../domain/entities/auth_result.dart';
import '../../domain/usecases/login_with_email_usecase.dart';
import '../../domain/usecases/login_with_google_usecase.dart';
import '../../domain/usecases/register_usecase.dart';
import '../../domain/usecases/logout_usecase.dart';
import '../../domain/usecases/get_current_user_usecase.dart';

part 'auth_cubit.freezed.dart';
part 'auth_state.dart';

@injectable
class AuthCubit extends Cubit<AuthState> {
  AuthCubit(
    this._loginWithEmailUseCase,
    this._loginWithGoogleUseCase,
    this._registerUseCase,
    this._logoutUseCase,
    this._getCurrentUserUseCase,
  ) : super(const AuthState.initial());

  final LoginWithEmailUseCase _loginWithEmailUseCase;
  final LoginWithGoogleUseCase _loginWithGoogleUseCase;
  final RegisterUseCase _registerUseCase;
  final LogoutUseCase _logoutUseCase;
  final GetCurrentUserUseCase _getCurrentUserUseCase;

  StreamSubscription<User?>? _authSubscription;

  void initialize() {
    _checkAuthState();
    _listenToAuthChanges();
  }

  Future<void> _checkAuthState() async {
    emit(const AuthState.loading());
    
    try {
      final user = await _getCurrentUserUseCase.call(null);
      
      if (user != null) {
        emit(AuthState.authenticated(user));
      } else {
        emit(const AuthState.unauthenticated());
      }
    } catch (e) {
      emit(AuthState.error(e.toString()));
    }
  }

  void _listenToAuthChanges() {
    // Implementar stream de cambios de autenticación
    // _authSubscription = _authRepository.authStateChanges.listen(...)
  }

  Future<void> signInWithEmail(String email, String password) async {
    emit(const AuthState.loading());
    
    try {
      final result = await _loginWithEmailUseCase.call(
        LoginWithEmailParams(email: email, password: password),
      );
      
      _handleAuthResult(result);
    } catch (e) {
      emit(AuthState.error(e.toString()));
    }
  }

  Future<void> signInWithGoogle() async {
    emit(const AuthState.loading());
    
    try {
      final result = await _loginWithGoogleUseCase.call(null);
      _handleAuthResult(result);
    } catch (e) {
      emit(AuthState.error(e.toString()));
    }
  }

  Future<void> register(String email, String password, String displayName) async {
    emit(const AuthState.loading());
    
    try {
      final result = await _registerUseCase.call(
        RegisterParams(
          email: email,
          password: password,
          displayName: displayName,
        ),
      );
      
      _handleAuthResult(result);
    } catch (e) {
      emit(AuthState.error(e.toString()));
    }
  }

  Future<void> signOut() async {
    try {
      await _logoutUseCase.call(null);
      emit(const AuthState.unauthenticated());
    } catch (e) {
      emit(AuthState.error(e.toString()));
    }
  }

  void _handleAuthResult(AuthResult result) {
    switch (result.status) {
      case AuthStatus.authenticated:
        if (result.user != null) {
          emit(AuthState.authenticated(result.user!));
        }
        break;
      case AuthStatus.emailNotVerified:
        emit(AuthState.emailVerificationRequired(result.user));
        break;
      case AuthStatus.phoneNotVerified:
        emit(AuthState.phoneVerificationRequired(result.user));
        break;
      case AuthStatus.error:
        emit(AuthState.error(result.message ?? 'Error desconocido'));
        break;
      default:
        emit(const AuthState.unauthenticated());
    }
  }

  @override
  Future<void> close() {
    _authSubscription?.cancel();
    return super.close();
  }
}
```

### 🎭 **Auth State**

```dart title="lib/presentation/cubit/auth_state.dart"
part of 'auth_cubit.dart';

@freezed
class AuthState with _$AuthState {
  const factory AuthState.initial() = _Initial;
  
  const factory AuthState.loading() = _Loading;
  
  const factory AuthState.authenticated(User user) = _Authenticated;
  
  const factory AuthState.unauthenticated() = _Unauthenticated;
  
  const factory AuthState.emailVerificationRequired(User? user) = _EmailVerificationRequired;
  
  const factory AuthState.phoneVerificationRequired(User? user) = _PhoneVerificationRequired;
  
  const factory AuthState.error(String message) = _Error;
}
```

## 🎨 **Interfaz de Usuario**

### 🔐 **Login Page**

```dart title="lib/presentation/pages/auth/login_page.dart"
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:auto_route/auto_route.dart';

import '../../../core/di/injection.dart';
import '../../cubit/auth_cubit.dart';
import '../../widgets/auth_text_field.dart';
import '../../widgets/auth_button.dart';
import '../../widgets/social_login_buttons.dart';

@RoutePage()
class LoginPage extends StatefulWidget implements AutoRouteWrapper {
  const LoginPage({Key? key}) : super(key: key);

  @override
  Widget wrappedRoute(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<AuthCubit>(),
      child: this,
    );
  }

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  
  bool _obscurePassword = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocListener<AuthCubit, AuthState>(
        listener: (context, state) {
          state.whenOrNull(
            authenticated: (user) {
              context.router.pushAndClearStack('/home');
            },
            error: (message) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(message),
                  backgroundColor: Theme.of(context).colorScheme.error,
                ),
              );
            },
          );
        },
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24.0),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const SizedBox(height: 60),
                  
                  // 🎨 Logo y título
                  _buildHeader(),
                  
                  const SizedBox(height: 48),
                  
                  // 📧 Email field
                  AuthTextField(
                    controller: _emailController,
                    labelText: 'Email',
                    keyboardType: TextInputType.emailAddress,
                    prefixIcon: Icons.email_outlined,
                    validator: _validateEmail,
                  ),
                  
                  const SizedBox(height: 16),
                  
                  // 🔐 Password field
                  AuthTextField(
                    controller: _passwordController,
                    labelText: 'Contraseña',
                    obscureText: _obscurePassword,
                    prefixIcon: Icons.lock_outlined,
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscurePassword
                            ? Icons.visibility_outlined
                            : Icons.visibility_off_outlined,
                      ),
                      onPressed: () => setState(() {
                        _obscurePassword = !_obscurePassword;
                      }),
                    ),
                    validator: _validatePassword,
                  ),
                  
                  const SizedBox(height: 8),
                  
                  // 🔗 Forgot password
                  Align(
                    alignment: Alignment.centerRight,
                    child: TextButton(
                      onPressed: _handleForgotPassword,
                      child: const Text('¿Olvidaste tu contraseña?'),
                    ),
                  ),
                  
                  const SizedBox(height: 24),
                  
                  // 🔘 Login button
                  BlocBuilder<AuthCubit, AuthState>(
                    builder: (context, state) {
                      final isLoading = state.maybeWhen(
                        loading: () => true,
                        orElse: () => false,
                      );
                      
                      return AuthButton(
                        onPressed: isLoading ? null : _handleLogin,
                        isLoading: isLoading,
                        child: const Text('Iniciar Sesión'),
                      );
                    },
                  ),
                  
                  const SizedBox(height: 24),
                  
                  // 🌐 Social login
                  const SocialLoginButtons(),
                  
                  const SizedBox(height: 24),
                  
                  // 📝 Register link
                  _buildRegisterLink(),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      children: [
        // 🎨 Logo
        Container(
          width: 120,
          height: 120,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: LinearGradient(
              colors: [
                Theme.of(context).colorScheme.primary,
                Theme.of(context).colorScheme.secondary,
              ],
            ),
          ),
          child: Icon(
            Icons.camera_alt,
            size: 60,
            color: Theme.of(context).colorScheme.onPrimary,
          ),
        ),
        
        const SizedBox(height: 24),
        
        Text(
          'Bienvenido',
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        
        const SizedBox(height: 8),
        
        Text(
          'Inicia sesión para continuar',
          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
            color: Theme.of(context).colorScheme.onSurfaceVariant,
          ),
        ),
      ],
    );
  }

  Widget _buildRegisterLink() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          '¿No tienes cuenta? ',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        TextButton(
          onPressed: () => context.router.push('/register'),
          child: const Text('Regístrate'),
        ),
      ],
    );
  }

  String? _validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return 'Por favor ingresa tu email';
    }
    if (!RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
        .hasMatch(value)) {
      return 'Por favor ingresa un email válido';
    }
    return null;
  }

  String? _validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Por favor ingresa tu contraseña';
    }
    if (value.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
  }

  void _handleLogin() {
    if (_formKey.currentState!.validate()) {
      context.read<AuthCubit>().signInWithEmail(
        _emailController.text.trim(),
        _passwordController.text,
      );
    }
  }

  void _handleForgotPassword() {
    context.router.push('/forgot-password');
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
}
```

### 🎨 **Custom Auth Widgets**

```dart title="lib/presentation/widgets/auth_button.dart"
import 'package:flutter/material.dart';

class AuthButton extends StatelessWidget {
  const AuthButton({
    Key? key,
    required this.onPressed,
    required this.child,
    this.isLoading = false,
    this.variant = AuthButtonVariant.primary,
  }) : super(key: key);

  final VoidCallback? onPressed;
  final Widget child;
  final bool isLoading;
  final AuthButtonVariant variant;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 56,
      child: ElevatedButton(
        onPressed: isLoading ? null : onPressed,
        style: _getButtonStyle(context),
        child: isLoading
            ? SizedBox(
                height: 20,
                width: 20,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  valueColor: AlwaysStoppedAnimation<Color>(
                    variant == AuthButtonVariant.primary
                        ? Theme.of(context).colorScheme.onPrimary
                        : Theme.of(context).colorScheme.onSurface,
                  ),
                ),
              )
            : child,
      ),
    );
  }

  ButtonStyle _getButtonStyle(BuildContext context) {
    switch (variant) {
      case AuthButtonVariant.primary:
        return ElevatedButton.styleFrom(
          backgroundColor: Theme.of(context).colorScheme.primary,
          foregroundColor: Theme.of(context).colorScheme.onPrimary,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        );
      case AuthButtonVariant.secondary:
        return ElevatedButton.styleFrom(
          backgroundColor: Theme.of(context).colorScheme.surfaceVariant,
          foregroundColor: Theme.of(context).colorScheme.onSurfaceVariant,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        );
      case AuthButtonVariant.outlined:
        return OutlinedButton.styleFrom(
          foregroundColor: Theme.of(context).colorScheme.primary,
          side: BorderSide(
            color: Theme.of(context).colorScheme.primary,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        );
    }
  }
}

enum AuthButtonVariant {
  primary,
  secondary,
  outlined,
}
```

## 🔒 **Configuración Firebase**

### 🔥 **Inicialización Firebase**

import CodeSnippet from '@site/src/components/CodeSnippet';

<CodeSnippet 
  code="# Instalar Firebase CLI
npm install -g firebase-tools

# Login a Firebase
firebase login

# Configurar proyecto Flutter
dart pub global activate flutterfire_cli

# Configurar Firebase para el proyecto
flutterfire configure"
  language="bash"
  title="Setup Firebase"
/>

### ⚙️ **Configuración iOS (Apple Sign-In)**

```swift title="ios/Runner/Info.plist"
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>com.example.beamme</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>com.googleusercontent.apps.YOUR_CLIENT_ID</string>
        </array>
    </dict>
</array>
```

### 🤖 **Configuración Android**

```xml title="android/app/src/main/res/values/strings.xml"
<resources>
    <string name="app_name">BeamMe</string>
    <string name="default_web_client_id">YOUR_WEB_CLIENT_ID</string>
</resources>
```

## ✅ **Checklist de Implementación**

- [ ] Dependencias de auth instaladas
- [ ] Firebase configurado correctamente
- [ ] Entidades del dominio creadas
- [ ] Repository interface definido
- [ ] Casos de uso implementados
- [ ] Estados de auth configurados
- [ ] UI de login/register completada
- [ ] Validaciones implementadas
- [ ] Manejo de errores configurado
- [ ] Social login funcional
- [ ] Testing unitario completado

:::tip 🔒 Seguridad
1. **Nunca** hardcodear API keys en el código
2. Usar **Flutter Secure Storage** para tokens
3. Implementar **rate limiting** en login attempts
4. Validar **siempre** en servidor también
5. Usar **HTTPS** para todas las comunicaciones
:::

---

## 🎯 **Siguiente Paso**

¡Perfecto! Ya tienes un sistema de autenticación robusto. 

👉 **Continúa con**: [Navegación y Routing](./navigation.md)

---

*⏱️ Tiempo de implementación: 4-6 horas*