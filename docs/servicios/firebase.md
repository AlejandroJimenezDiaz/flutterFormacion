---
sidebar_position: 1
---

# 🔥 Integración con Firebase

> **Objetivo**: Configurar Firebase completo para una aplicación Flutter profesional

Firebase es la plataforma de desarrollo de Google que proporciona servicios backend esenciales para aplicaciones móviles. Aprenderás a integrar todos los servicios necesarios para BeamMe.

## 🎯 **Servicios Firebase que Implementaremos**

### 🔧 **Backend as a Service:**
- 🔐 **Firebase Authentication** - Sistema completo de auth
- 🗄️ **Cloud Firestore** - Base de datos NoSQL en tiempo real
- 💾 **Cloud Storage** - Almacenamiento de archivos (imágenes/videos)
- 📱 **Cloud Messaging (FCM)** - Notificaciones push
- 📊 **Analytics** - Métricas y comportamiento de usuarios
- 🔥 **Crashlytics** - Reporte de crashes en producción
- ⚡ **Cloud Functions** - Lógica backend serverless

## 🚀 **Configuración Inicial**

### 📦 **Dependencias necesarias**

```yaml title="pubspec.yaml"
dependencies:
  # 🔥 Core Firebase
  firebase_core: ^2.24.2
  
  # 🔐 Authentication
  firebase_auth: ^4.15.3
  
  # 🗄️ Firestore Database
  cloud_firestore: ^4.13.6
  
  # 💾 Storage
  firebase_storage: ^11.5.6
  
  # 📱 Messaging
  firebase_messaging: ^14.7.10
  
  # 📊 Analytics & Crashlytics
  firebase_analytics: ^10.7.4
  firebase_crashlytics: ^3.4.9
  
  # ⚡ Cloud Functions
  cloud_functions: ^4.6.0
  
  # 🔧 Utilities
  image_picker: ^1.0.4
  path_provider: ^2.1.1

dev_dependencies:
  # 🛠️ Firebase Tools
  firebase_core_platform_interface: ^5.0.0
```

### 🔧 **Setup Firebase CLI**

import CodeSnippet from '@site/src/components/CodeSnippet';

<CodeSnippet 
  code="# Instalar Firebase CLI
npm install -g firebase-tools

# Login a Firebase
firebase login

# Instalar FlutterFire CLI
dart pub global activate flutterfire_cli

# Configurar Firebase para Flutter
flutterfire configure

# Seleccionar proyecto existente o crear uno nuevo
# Seleccionar plataformas: android, ios, web
# Esto genera firebase_options.dart automáticamente"
  language="bash"
  title="Configuración Firebase"
/>

## 🔧 **Inicialización en Flutter**

### 📱 **Configuración main.dart**

```dart title="lib/main.dart"
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';

import 'firebase_options.dart';
import 'app/app.dart';
import 'core/services/notification_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // 🔥 Inicializar Firebase
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  // 🐛 Configurar Crashlytics
  if (!kDebugMode) {
    FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterError;
    PlatformDispatcher.instance.onError = (error, stack) {
      FirebaseCrashlytics.instance.recordError(error, stack, fatal: true);
      return true;
    };
  }
  
  // 📱 Configurar notificaciones push
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  
  // 🚀 Ejecutar aplicación
  runApp(const BeamMeApp());
}

// 📱 Handler para mensajes en background
@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  await NotificationService.instance.handleBackgroundMessage(message);
}
```

## 🗄️ **Cloud Firestore - Base de Datos**

### 📊 **Estructura de datos**

```dart title="lib/data/models/user_model.dart"
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed/freezed.dart';
import 'package:json_annotation/json_annotation.dart';

import '../../domain/entities/user.dart';

part 'user_model.freezed.dart';
part 'user_model.g.dart';

@freezed
class UserModel with _$UserModel {
  const factory UserModel({
    required String id,
    required String email,
    String? displayName,
    String? photoURL,
    String? phoneNumber,
    @Default(false) bool emailVerified,
    @Default([]) List<String> interests,
    @Default(0) int postsCount,
    @Default(0) int followersCount,
    @Default(0) int followingCount,
    @JsonKey(name: 'created_at') DateTime? createdAt,
    @JsonKey(name: 'updated_at') DateTime? updatedAt,
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);

  // 🔄 Conversión desde DocumentSnapshot
  factory UserModel.fromDocumentSnapshot(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return UserModel.fromJson({
      'id': doc.id,
      ...data,
    });
  }

  // 📄 Conversión a Map para Firestore
  Map<String, dynamic> toFirestore() {
    final json = toJson();
    json.remove('id'); // El ID lo maneja Firestore
    return json;
  }
}

// 🎯 Extensión para convertir a entidad
extension UserModelExt on UserModel {
  User toEntity() {
    return User(
      id: id,
      email: email,
      displayName: displayName,
      photoURL: photoURL,
      phoneNumber: phoneNumber,
      emailVerified: emailVerified,
      createdAt: createdAt,
    );
  }
}
```

### 🔥 **Firestore Service**

```dart title="lib/data/services/firestore_service.dart"
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:injectable/injectable.dart';

import '../models/user_model.dart';
import '../models/post_model.dart';

@injectable
class FirestoreService {
  FirestoreService(this._firestore);

  final FirebaseFirestore _firestore;

  // 📚 Collections
  CollectionReference<UserModel> get users =>
      _firestore.collection('users').withConverter<UserModel>(
            fromFirestore: (snapshot, _) => UserModel.fromDocumentSnapshot(snapshot),
            toFirestore: (user, _) => user.toFirestore(),
          );

  CollectionReference<PostModel> get posts =>
      _firestore.collection('posts').withConverter<PostModel>(
            fromFirestore: (snapshot, _) => PostModel.fromDocumentSnapshot(snapshot),
            toFirestore: (post, _) => post.toFirestore(),
          );

  // 👤 Operaciones de Usuario
  Future<UserModel?> getUser(String userId) async {
    try {
      final doc = await users.doc(userId).get();
      return doc.exists ? doc.data() : null;
    } catch (e) {
      throw Exception('Error obteniendo usuario: $e');
    }
  }

  Future<void> createUser(UserModel user) async {
    try {
      await users.doc(user.id).set(user);
    } catch (e) {
      throw Exception('Error creando usuario: $e');
    }
  }

  Future<void> updateUser(String userId, Map<String, dynamic> updates) async {
    try {
      updates['updated_at'] = FieldValue.serverTimestamp();
      await users.doc(userId).update(updates);
    } catch (e) {
      throw Exception('Error actualizando usuario: $e');
    }
  }

  Stream<UserModel?> watchUser(String userId) {
    return users.doc(userId).snapshots().map((doc) {
      return doc.exists ? doc.data() : null;
    });
  }

  // 📄 Operaciones de Posts
  Future<List<PostModel>> getPosts({
    int limit = 10,
    DocumentSnapshot? startAfter,
    String? category,
  }) async {
    try {
      Query<PostModel> query = posts
          .orderBy('created_at', descending: true)
          .limit(limit);

      if (category != null) {
        query = query.where('category', isEqualTo: category);
      }

      if (startAfter != null) {
        query = query.startAfterDocument(startAfter);
      }

      final snapshot = await query.get();
      return snapshot.docs.map((doc) => doc.data()).toList();
    } catch (e) {
      throw Exception('Error obteniendo posts: $e');
    }
  }

  Future<PostModel> createPost(PostModel post) async {
    try {
      final docRef = await posts.add(post.copyWith(
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ));
      
      final doc = await docRef.get();
      return doc.data()!;
    } catch (e) {
      throw Exception('Error creando post: $e');
    }
  }

  Future<void> likePost(String postId, String userId) async {
    try {
      await _firestore.runTransaction((transaction) async {
        final postRef = posts.doc(postId);
        final likesRef = postRef.collection('likes').doc(userId);
        
        final postDoc = await transaction.get(postRef);
        final likeDoc = await transaction.get(likesRef);
        
        if (likeDoc.exists) {
          // 👎 Quitar like
          transaction.delete(likesRef);
          transaction.update(postRef, {
            'like_count': FieldValue.increment(-1),
          });
        } else {
          // 👍 Dar like
          transaction.set(likesRef, {
            'user_id': userId,
            'created_at': FieldValue.serverTimestamp(),
          });
          transaction.update(postRef, {
            'like_count': FieldValue.increment(1),
          });
        }
      });
    } catch (e) {
      throw Exception('Error actualizando like: $e');
    }
  }

  // 🔍 Búsqueda
  Future<List<PostModel>> searchPosts(String query) async {
    try {
      // ⚠️ Firestore no tiene búsqueda full-text nativa
      // Usar Algolia o ElasticSearch para producción
      final snapshot = await posts
          .where('title', isGreaterThanOrEqualTo: query)
          .where('title', isLessThanOrEqualTo: query + '\uf8ff')
          .limit(20)
          .get();
      
      return snapshot.docs.map((doc) => doc.data()).toList();
    } catch (e) {
      throw Exception('Error buscando posts: $e');
    }
  }

  // 📊 Agregaciones
  Future<Map<String, int>> getUserStats(String userId) async {
    try {
      final futures = await Future.wait([
        posts.where('author_id', isEqualTo: userId).count().get(),
        users.doc(userId).collection('followers').count().get(),
        users.doc(userId).collection('following').count().get(),
      ]);

      return {
        'posts': futures[0].count,
        'followers': futures[1].count,
        'following': futures[2].count,
      };
    } catch (e) {
      throw Exception('Error obteniendo estadísticas: $e');
    }
  }
}
```

## 💾 **Firebase Storage - Archivos**

### 📱 **Storage Service**

```dart title="lib/data/services/storage_service.dart"
import 'dart:io';
import 'dart:typed_data';

import 'package:firebase_storage/firebase_storage.dart';
import 'package:injectable/injectable.dart';
import 'package:path/path.dart' as path;

@injectable
class StorageService {
  StorageService(this._storage);

  final FirebaseStorage _storage;

  // 📁 Referencias de carpetas
  Reference get _images => _storage.ref('images');
  Reference get _videos => _storage.ref('videos');
  Reference get _profiles => _storage.ref('profiles');
  Reference get _posts => _storage.ref('posts');

  // 🖼️ Subir imagen de perfil
  Future<String> uploadProfileImage(String userId, File imageFile) async {
    try {
      final fileName = '${userId}_${DateTime.now().millisecondsSinceEpoch}${path.extension(imageFile.path)}';
      final ref = _profiles.child(fileName);
      
      final uploadTask = ref.putFile(
        imageFile,
        SettableMetadata(
          contentType: 'image/jpeg',
          customMetadata: {
            'user_id': userId,
            'type': 'profile_image',
          },
        ),
      );

      // 📊 Mostrar progreso
      uploadTask.snapshotEvents.listen((TaskSnapshot snapshot) {
        final progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        print('Upload progress: ${progress.toStringAsFixed(2)}%');
      });

      final snapshot = await uploadTask;
      return await snapshot.ref.getDownloadURL();
    } catch (e) {
      throw Exception('Error subiendo imagen de perfil: $e');
    }
  }

  // 📄 Subir imagen de post
  Future<String> uploadPostImage(String postId, File imageFile) async {
    try {
      final fileName = '${postId}_${DateTime.now().millisecondsSinceEpoch}${path.extension(imageFile.path)}';
      final ref = _posts.child(fileName);
      
      // 🗜️ Comprimir imagen antes de subir
      final compressedImage = await _compressImage(imageFile);
      
      final uploadTask = ref.putData(
        compressedImage,
        SettableMetadata(
          contentType: 'image/jpeg',
          customMetadata: {
            'post_id': postId,
            'type': 'post_image',
          },
        ),
      );

      final snapshot = await uploadTask;
      return await snapshot.ref.getDownloadURL();
    } catch (e) {
      throw Exception('Error subiendo imagen de post: $e');
    }
  }

  // 🎥 Subir video
  Future<String> uploadVideo(String postId, File videoFile) async {
    try {
      final fileName = '${postId}_${DateTime.now().millisecondsSinceEpoch}${path.extension(videoFile.path)}';
      final ref = _videos.child(fileName);
      
      final uploadTask = ref.putFile(
        videoFile,
        SettableMetadata(
          contentType: 'video/mp4',
          customMetadata: {
            'post_id': postId,
            'type': 'post_video',
          },
        ),
      );

      final snapshot = await uploadTask;
      return await snapshot.ref.getDownloadURL();
    } catch (e) {
      throw Exception('Error subiendo video: $e');
    }
  }

  // 🗑️ Eliminar archivo
  Future<void> deleteFile(String downloadUrl) async {
    try {
      final ref = _storage.refFromURL(downloadUrl);
      await ref.delete();
    } catch (e) {
      throw Exception('Error eliminando archivo: $e');
    }
  }

  // 📊 Obtener metadatos
  Future<FullMetadata> getFileMetadata(String downloadUrl) async {
    try {
      final ref = _storage.refFromURL(downloadUrl);
      return await ref.getMetadata();
    } catch (e) {
      throw Exception('Error obteniendo metadatos: $e');
    }
  }

  // 🗜️ Comprimir imagen
  Future<Uint8List> _compressImage(File imageFile) async {
    // Implementar compresión de imagen
    // Puedes usar packages como image_compress o flutter_image_compress
    return await imageFile.readAsBytes();
  }

  // 📱 Upload con múltiples archivos
  Future<List<String>> uploadMultipleImages(String postId, List<File> images) async {
    try {
      final futures = images.asMap().entries.map((entry) {
        final index = entry.key;
        final file = entry.value;
        final fileName = '${postId}_$index${path.extension(file.path)}';
        final ref = _posts.child(fileName);
        
        return ref.putFile(file).then((snapshot) => snapshot.ref.getDownloadURL());
      });

      return await Future.wait(futures);
    } catch (e) {
      throw Exception('Error subiendo múltiples imágenes: $e');
    }
  }
}
```

## 📱 **Firebase Cloud Messaging**

### 🔔 **Notification Service**

```dart title="lib/core/services/notification_service.dart"
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:injectable/injectable.dart';

@singleton
class NotificationService {
  static NotificationService? _instance;
  static NotificationService get instance => _instance ??= NotificationService._();

  NotificationService._();

  final FirebaseMessaging _fcm = FirebaseMessaging.instance;
  final FlutterLocalNotificationsPlugin _localNotifications =
      FlutterLocalNotificationsPlugin();

  bool _initialized = false;

  // 🚀 Inicializar servicio
  Future<void> initialize() async {
    if (_initialized) return;

    await _requestPermission();
    await _configureLocalNotifications();
    await _configureFCM();

    _initialized = true;
  }

  // 🔐 Solicitar permisos
  Future<void> _requestPermission() async {
    final settings = await _fcm.requestPermission(
      alert: true,
      badge: true,
      sound: true,
      provisional: false,
    );

    print('Permission status: ${settings.authorizationStatus}');
  }

  // 📱 Configurar notificaciones locales
  Future<void> _configureLocalNotifications() async {
    const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
    const iosSettings = DarwinInitializationSettings(
      requestSoundPermission: true,
      requestBadgePermission: true,
      requestAlertPermission: true,
    );

    await _localNotifications.initialize(
      const InitializationSettings(
        android: androidSettings,
        iOS: iosSettings,
      ),
      onDidReceiveNotificationResponse: _onNotificationTapped,
    );
  }

  // 🔥 Configurar FCM
  Future<void> _configureFCM() async {
    // 📱 Notificaciones en foreground
    FirebaseMessaging.onMessage.listen(_handleForegroundMessage);

    // 📱 Notificación clickeada
    FirebaseMessaging.onMessageOpenedApp.listen(_handleNotificationClick);

    // 📱 App abierta desde notificación (terminated)
    final initialMessage = await _fcm.getInitialMessage();
    if (initialMessage != null) {
      _handleNotificationClick(initialMessage);
    }
  }

  // 🔑 Obtener token FCM
  Future<String?> getFCMToken() async {
    try {
      return await _fcm.getToken();
    } catch (e) {
      print('Error obteniendo FCM token: $e');
      return null;
    }
  }

  // 📢 Suscribirse a tema
  Future<void> subscribeToTopic(String topic) async {
    try {
      await _fcm.subscribeToTopic(topic);
      print('Suscrito al tema: $topic');
    } catch (e) {
      print('Error suscribiéndose al tema: $e');
    }
  }

  // 📢 Desuscribirse de tema
  Future<void> unsubscribeFromTopic(String topic) async {
    try {
      await _fcm.unsubscribeFromTopic(topic);
      print('Desuscrito del tema: $topic');
    } catch (e) {
      print('Error desuscribiéndose del tema: $e');
    }
  }

  // 📱 Manejar mensajes en foreground
  Future<void> _handleForegroundMessage(RemoteMessage message) async {
    print('Mensaje recibido en foreground: ${message.messageId}');

    // 🔔 Mostrar notificación local
    await _showLocalNotification(
      title: message.notification?.title ?? 'Nueva notificación',
      body: message.notification?.body ?? '',
      data: message.data,
    );
  }

  // 📱 Manejar mensajes en background
  Future<void> handleBackgroundMessage(RemoteMessage message) async {
    print('Mensaje recibido en background: ${message.messageId}');
    // Procesar datos si es necesario
  }

  // 🔔 Mostrar notificación local
  Future<void> _showLocalNotification({
    required String title,
    required String body,
    Map<String, dynamic>? data,
  }) async {
    const androidDetails = AndroidNotificationDetails(
      'high_importance_channel',
      'High Importance Notifications',
      channelDescription: 'Notificaciones importantes de la aplicación',
      importance: Importance.high,
      priority: Priority.high,
      icon: '@mipmap/ic_launcher',
    );

    const iosDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );

    await _localNotifications.show(
      DateTime.now().millisecondsSinceEpoch ~/ 1000,
      title,
      body,
      const NotificationDetails(
        android: androidDetails,
        iOS: iosDetails,
      ),
      payload: data?.toString(),
    );
  }

  // 👆 Manejar click en notificación
  void _handleNotificationClick(RemoteMessage message) {
    print('Notificación clickeada: ${message.messageId}');
    
    // 🧭 Navegar según el tipo de notificación
    final data = message.data;
    final type = data['type'];
    
    switch (type) {
      case 'new_post':
        _navigateToPost(data['post_id']);
        break;
      case 'new_follower':
        _navigateToProfile(data['user_id']);
        break;
      case 'new_like':
        _navigateToPost(data['post_id']);
        break;
      default:
        _navigateToHome();
    }
  }

  // 👆 Manejar tap en notificación local
  void _onNotificationTapped(NotificationResponse response) {
    print('Notificación local tapped: ${response.payload}');
    // Procesar payload y navegar
  }

  // 🧭 Métodos de navegación
  void _navigateToPost(String? postId) {
    if (postId != null) {
      // Implementar navegación al post
      print('Navegando al post: $postId');
    }
  }

  void _navigateToProfile(String? userId) {
    if (userId != null) {
      // Implementar navegación al perfil
      print('Navegando al perfil: $userId');
    }
  }

  void _navigateToHome() {
    // Implementar navegación al home
    print('Navegando al home');
  }
}
```

## 📊 **Firebase Analytics**

### 📈 **Analytics Service**

```dart title="lib/core/services/analytics_service.dart"
import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:injectable/injectable.dart';

@singleton
class AnalyticsService {
  AnalyticsService(this._analytics);

  final FirebaseAnalytics _analytics;

  // 📊 Eventos personalizados
  Future<void> logPostCreated(String postId, String category) async {
    await _analytics.logEvent(
      name: 'post_created',
      parameters: {
        'post_id': postId,
        'category': category,
        'timestamp': DateTime.now().toIso8601String(),
      },
    );
  }

  Future<void> logPostLiked(String postId, String userId) async {
    await _analytics.logEvent(
      name: 'post_liked',
      parameters: {
        'post_id': postId,
        'user_id': userId,
        'timestamp': DateTime.now().toIso8601String(),
      },
    );
  }

  Future<void> logUserSignUp(String method) async {
    await _analytics.logSignUp(signUpMethod: method);
  }

  Future<void> logUserLogin(String method) async {
    await _analytics.logLogin(loginMethod: method);
  }

  // 🎯 Eventos de navegación
  Future<void> logScreenView(String screenName) async {
    await _analytics.logScreenView(screenName: screenName);
  }

  // 👤 Propiedades de usuario
  Future<void> setUserId(String userId) async {
    await _analytics.setUserId(id: userId);
  }

  Future<void> setUserProperty(String name, String value) async {
    await _analytics.setUserProperty(name: name, value: value);
  }

  // 🛒 E-commerce (si aplica)
  Future<void> logPurchase({
    required String transactionId,
    required double value,
    required String currency,
    required List<AnalyticsEventItem> items,
  }) async {
    await _analytics.logPurchase(
      transactionId: transactionId,
      value: value,
      currency: currency,
      items: items,
    );
  }
}
```

## 🐛 **Firebase Crashlytics**

### 📊 **Crash Reporting**

```dart title="lib/core/services/crashlytics_service.dart"
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:injectable/injectable.dart';
import 'package:flutter/foundation.dart';

@singleton
class CrashlyticsService {
  CrashlyticsService(this._crashlytics);

  final FirebaseCrashlytics _crashlytics;

  // 🐛 Reportar error
  Future<void> recordError(
    dynamic exception,
    StackTrace? stack, {
    String? reason,
    bool fatal = false,
  }) async {
    if (kDebugMode) {
      // No reportar en debug
      print('Error (debug): $exception');
      return;
    }

    await _crashlytics.recordError(
      exception,
      stack,
      reason: reason,
      fatal: fatal,
    );
  }

  // 📝 Log personalizado
  Future<void> log(String message) async {
    await _crashlytics.log(message);
  }

  // 👤 Establecer usuario
  Future<void> setUserId(String userId) async {
    await _crashlytics.setUserId(userId);
  }

  // 🔧 Establecer custom key
  Future<void> setCustomKey(String key, dynamic value) async {
    await _crashlytics.setCustomKey(key, value);
  }

  // 📊 Forzar crash (solo testing)
  void testCrash() {
    if (kDebugMode) {
      _crashlytics.crash();
    }
  }
}
```

## ⚙️ **Firebase Rules & Security**

### 🔒 **Firestore Security Rules**

```javascript title="firestore.rules"
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 👤 Users collection
    match /users/{userId} {
      // Solo el usuario puede leer/escribir su propio documento
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Todos pueden leer perfiles públicos (campos específicos)
      allow read: if request.auth != null;
    }
    
    // 📄 Posts collection
    match /posts/{postId} {
      // Todos los usuarios autenticados pueden leer posts
      allow read: if request.auth != null;
      
      // Solo el autor puede crear/actualizar sus posts
      allow create: if request.auth != null 
        && request.auth.uid == request.resource.data.author_id;
      
      allow update: if request.auth != null 
        && request.auth.uid == resource.data.author_id;
      
      allow delete: if request.auth != null 
        && request.auth.uid == resource.data.author_id;
        
      // 👍 Likes subcollection
      match /likes/{likeId} {
        allow read: if request.auth != null;
        allow create, delete: if request.auth != null 
          && request.auth.uid == request.resource.data.user_id;
      }
      
      // 💬 Comments subcollection
      match /comments/{commentId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null 
          && request.auth.uid == request.resource.data.user_id;
        allow update, delete: if request.auth != null 
          && request.auth.uid == resource.data.user_id;
      }
    }
    
    // 🔔 Notifications collection
    match /notifications/{notificationId} {
      // Solo el usuario destinatario puede leer sus notificaciones
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.data.user_id;
    }
  }
}
```

### 💾 **Storage Security Rules**

```javascript title="storage.rules"
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // 🖼️ Profile images
    match /profiles/{fileName} {
      // Solo el usuario puede subir/leer su imagen de perfil
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.metadata.customMetadata.user_id;
    }
    
    // 📄 Post images
    match /posts/{fileName} {
      // Todos pueden leer imágenes de posts
      allow read: if request.auth != null;
      
      // Solo usuarios autenticados pueden subir
      allow write: if request.auth != null
        && request.resource.size < 10 * 1024 * 1024 // Máximo 10MB
        && request.resource.contentType.matches('image/.*');
    }
    
    // 🎥 Videos
    match /videos/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
        && request.resource.size < 100 * 1024 * 1024 // Máximo 100MB
        && request.resource.contentType.matches('video/.*');
    }
  }
}
```

## ✅ **Checklist Firebase**

- [ ] Firebase CLI instalado y configurado
- [ ] Proyecto Firebase creado
- [ ] FlutterFire CLI configurado
- [ ] firebase_options.dart generado
- [ ] Dependencias instaladas
- [ ] Inicialización en main.dart
- [ ] Firestore service implementado
- [ ] Storage service implementado
- [ ] Notification service configurado
- [ ] Analytics configurado
- [ ] Crashlytics configurado
- [ ] Security rules implementadas
- [ ] Testing en dispositivos reales

:::tip 🔥 Mejores Prácticas
1. **Usar TypeScript** para Cloud Functions
2. **Implementar Security Rules** restrictivas
3. **Cachear datos** para mejor performance
4. **Comprimir imágenes** antes de subir
5. **Manejar estados offline** correctamente
6. **Monitorear costos** en Firebase Console
:::

---

## 🎯 **Siguiente Paso**

¡Excelente! Ya tienes Firebase completamente integrado. 

👉 **Continúa con**: [Integración de Pagos](./payments.md)

---

*⏱️ Tiempo de implementación: 4-6 horas*