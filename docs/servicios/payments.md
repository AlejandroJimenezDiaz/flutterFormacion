# Pagos y Monetización en Flutter

## Introducción

Implementar sistemas de pago en aplicaciones Flutter es esencial para monetizar tu app. Esta guía cubre las principales opciones de pago disponibles, desde compras in-app hasta procesadores de pago externos.

## Tipos de Monetización

### 1. Compras In-App (IAP)
- **Consumibles**: Monedas virtuales, power-ups
- **No consumibles**: Eliminación de anuncios, features premium
- **Suscripciones**: Acceso mensual/anual a contenido premium

### 2. Procesadores de Pago
- **Stripe**: Pagos con tarjeta
- **PayPal**: Pagos online
- **Square**: Solución completa
- **Razorpay**: Popular en India

### 3. Pagos Móviles
- **Apple Pay**: iOS
- **Google Pay**: Android
- **Samsung Pay**: Dispositivos Samsung

## Compras In-App con in_app_purchase

### 1. Instalación
```yaml
# pubspec.yaml
dependencies:
  in_app_purchase: ^3.1.11
  in_app_purchase_android: ^0.3.0+11
  in_app_purchase_storekit: ^0.3.6+4
```

### 2. Configuración Android

#### Google Play Console
1. Crear productos en Google Play Console
2. Configurar precios y disponibilidad
3. Publicar productos (pueden tardar hasta 24h)

#### android/app/src/main/AndroidManifest.xml
```xml
<uses-permission android:name="com.android.vending.BILLING" />
```

### 3. Configuración iOS

#### App Store Connect
1. Crear productos en App Store Connect
2. Configurar información del producto
3. Establecer precios por región

#### ios/Runner/Info.plist
No requiere configuración adicional para IAP básico.

### 4. Implementación Básica

#### Inicialización
```dart
import 'package:in_app_purchase/in_app_purchase.dart';
import 'package:in_app_purchase_android/in_app_purchase_android.dart';
import 'package:in_app_purchase_storekit/in_app_purchase_storekit.dart';

class PurchaseService {
  static const String _consumibleId = 'monedas_100';
  static const String _noConsumibleId = 'sin_anuncios';
  static const String _suscripcionId = 'premium_mensual';

  final InAppPurchase _inAppPurchase = InAppPurchase.instance;
  late StreamSubscription<List<PurchaseDetails>> _subscription;
  List<ProductDetails> _products = [];

  Future<void> initializePurchases() async {
    final bool isAvailable = await _inAppPurchase.isAvailable();
    if (!isAvailable) {
      throw Exception('Store no disponible');
    }

    // Configurar listener para compras
    final Stream<List<PurchaseDetails>> purchaseStream =
        _inAppPurchase.purchaseStream;
    _subscription = purchaseStream.listen(
      _onPurchaseUpdate,
      onDone: () => _subscription.cancel(),
      onError: (error) => print('Error en compras: $error'),
    );

    // Cargar productos disponibles
    await _loadProducts();
  }

  Future<void> _loadProducts() async {
    const Set<String> ids = {
      _consumibleId,
      _noConsumibleId,
      _suscripcionId,
    };

    final ProductDetailsResponse response =
        await _inAppPurchase.queryProductDetails(ids);

    if (response.notFoundIDs.isNotEmpty) {
      print('Productos no encontrados: ${response.notFoundIDs}');
    }

    _products = response.productDetails;
  }
}
```

#### Realizar Compra
```dart
Future<void> buyProduct(ProductDetails product) async {
  final PurchaseParam purchaseParam = PurchaseParam(
    productDetails: product,
  );

  try {
    await _inAppPurchase.buyNonConsumable(
      purchaseParam: purchaseParam,
    );
  } catch (e) {
    print('Error al comprar: $e');
    throw Exception('Error en la compra');
  }
}

Future<void> buyConsumable(ProductDetails product) async {
  final PurchaseParam purchaseParam = PurchaseParam(
    productDetails: product,
  );

  try {
    await _inAppPurchase.buyConsumable(
      purchaseParam: purchaseParam,
    );
  } catch (e) {
    print('Error al comprar consumible: $e');
    throw Exception('Error en la compra');
  }
}
```

#### Manejar Updates de Compras
```dart
void _onPurchaseUpdate(List<PurchaseDetails> purchaseDetailsList) {
  for (final PurchaseDetails purchaseDetails in purchaseDetailsList) {
    if (purchaseDetails.status == PurchaseStatus.pending) {
      // Mostrar loading
      _showPendingUI();
    } else if (purchaseDetails.status == PurchaseStatus.error) {
      // Manejar error
      _handleError(purchaseDetails.error!);
    } else if (purchaseDetails.status == PurchaseStatus.purchased ||
               purchaseDetails.status == PurchaseStatus.restored) {
      // Verificar compra y dar contenido
      _verifyPurchase(purchaseDetails);
    }

    // Importante: completar la transacción
    if (purchaseDetails.pendingCompletePurchase) {
      _inAppPurchase.completePurchase(purchaseDetails);
    }
  }
}

void _verifyPurchase(PurchaseDetails purchaseDetails) {
  // Verificar compra en tu servidor
  // Dar acceso al contenido comprado
  switch (purchaseDetails.productID) {
    case _consumibleId:
      _addCoins(100);
      break;
    case _noConsumibleId:
      _removeAds();
      break;
    case _suscripcionId:
      _activatePremium();
      break;
  }
}
```

## Stripe Integration

### 1. Instalación
```yaml
dependencies:
  flutter_stripe: ^10.1.1
  http: ^1.1.0
```

### 2. Configuración

#### Android
```kotlin
// android/app/src/main/kotlin/.../MainActivity.kt
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugins.GeneratedPluginRegistrant

class MainActivity: FlutterActivity() {
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        GeneratedPluginRegistrant.registerWith(flutterEngine)
    }
}
```

#### iOS
```swift
// ios/Runner/AppDelegate.swift
import UIKit
import Flutter
import Stripe

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        GeneratedPluginRegistrant.register(with: self)
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }
}
```

### 3. Implementación

#### Inicialización
```dart
import 'package:flutter_stripe/flutter_stripe.dart';

class StripeService {
  static const String _publishableKey = 'pk_test_...'; // Tu clave pública
  
  static Future<void> init() async {
    Stripe.publishableKey = _publishableKey;
    await Stripe.instance.applySettings();
  }
}
```

#### Crear Payment Intent
```dart
// Backend (Node.js/Express ejemplo)
app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount, // En centavos
    currency: currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
```

#### Procesar Pago en Flutter
```dart
class PaymentService {
  Future<bool> processPayment({
    required double amount,
    required String currency,
  }) async {
    try {
      // 1. Crear PaymentIntent en tu servidor
      final response = await _createPaymentIntent(
        amount: (amount * 100).round(), // Convertir a centavos
        currency: currency,
      );

      // 2. Confirmar pago con Stripe
      await Stripe.instance.initPaymentSheet(
        paymentSheetParameters: SetupPaymentSheetParameters(
          paymentIntentClientSecret: response['clientSecret'],
          merchantDisplayName: 'Mi Tienda',
          style: ThemeMode.system,
        ),
      );

      // 3. Presentar Payment Sheet
      await Stripe.instance.presentPaymentSheet();

      return true;
    } on StripeException catch (e) {
      print('Error de Stripe: ${e.error}');
      return false;
    } catch (e) {
      print('Error general: $e');
      return false;
    }
  }

  Future<Map<String, dynamic>> _createPaymentIntent({
    required int amount,
    required String currency,
  }) async {
    final response = await http.post(
      Uri.parse('https://tu-servidor.com/create-payment-intent'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'amount': amount,
        'currency': currency,
      }),
    );

    return json.decode(response.body);
  }
}
```

## Apple Pay & Google Pay

### 1. pay Package
```yaml
dependencies:
  pay: ^2.0.0
```

### 2. Configuración Apple Pay

#### ios/Runner/Info.plist
```xml
<key>com.apple.developer.in-app-payments</key>
<array>
    <string>merchant.com.miempresa.miapp</string>
</array>
```

### 3. Configuración Google Pay

#### android/app/src/main/res/raw/gpay_merchant.json
```json
{
  "type": "PAYMENT_GATEWAY",
  "gateway": "stripe",
  "gatewayMerchantId": "tu_merchant_id"
}
```

### 4. Implementación
```dart
import 'package:pay/pay.dart';

class MobilePayService {
  static const _paymentItems = [
    PaymentItem(
      label: 'Mi Producto',
      amount: '9.99',
      status: PaymentItemStatus.final_price,
    )
  ];

  Widget buildApplePayButton() {
    return ApplePayButton(
      paymentConfiguration: PaymentConfiguration.fromAsset(
        'apple_pay_payment_profile.json'
      ),
      paymentItems: _paymentItems,
      style: ApplePayButtonStyle.black,
      type: ApplePayButtonType.buy,
      onPaymentResult: _onApplePayResult,
      loadingIndicator: const Center(child: CircularProgressIndicator()),
    );
  }

  Widget buildGooglePayButton() {
    return GooglePayButton(
      paymentConfiguration: PaymentConfiguration.fromAsset(
        'gpay_payment_profile.json'
      ),
      paymentItems: _paymentItems,
      type: GooglePayButtonType.buy,
      onPaymentResult: _onGooglePayResult,
      loadingIndicator: const Center(child: CircularProgressIndicator()),
    );
  }

  void _onApplePayResult(Map<String, dynamic> result) {
    // Procesar resultado de Apple Pay
    print('Apple Pay result: $result');
  }

  void _onGooglePayResult(Map<String, dynamic> result) {
    // Procesar resultado de Google Pay
    print('Google Pay result: $result');
  }
}
```

## Verificación de Compras

### 1. Verificación Local
```dart
class PurchaseValidator {
  static bool isValidPurchase(PurchaseDetails purchase) {
    // Verificaciones básicas
    if (purchase.status != PurchaseStatus.purchased) {
      return false;
    }

    if (purchase.verificationData.localVerificationData.isEmpty) {
      return false;
    }

    return true;
  }
}
```

### 2. Verificación en Servidor
```dart
Future<bool> verifyPurchaseOnServer(PurchaseDetails purchase) async {
  final response = await http.post(
    Uri.parse('https://tu-servidor.com/verify-purchase'),
    headers: {'Content-Type': 'application/json'},
    body: json.encode({
      'purchaseToken': purchase.verificationData.localVerificationData,
      'productId': purchase.productID,
      'platform': Platform.isIOS ? 'ios' : 'android',
    }),
  );

  final result = json.decode(response.body);
  return result['valid'] == true;
}
```

## Manejo de Suscripciones

### 1. Verificar Estado de Suscripción
```dart
class SubscriptionService {
  Future<bool> isSubscriptionActive(String subscriptionId) async {
    try {
      final QueryPurchaseDetailsResponse response =
          await InAppPurchase.instance.queryPastPurchases();

      for (PurchaseDetails purchase in response.pastPurchases) {
        if (purchase.productID == subscriptionId &&
            purchase.status == PurchaseStatus.purchased) {
          // Verificar si la suscripción sigue activa
          return await _verifySubscriptionStatus(purchase);
        }
      }

      return false;
    } catch (e) {
      print('Error verificando suscripción: $e');
      return false;
    }
  }

  Future<bool> _verifySubscriptionStatus(PurchaseDetails purchase) async {
    // Verificar en tu servidor si la suscripción sigue activa
    // Esto debe incluir verificación de fecha de expiración
    final response = await http.post(
      Uri.parse('https://tu-servidor.com/verify-subscription'),
      body: json.encode({
        'purchaseToken': purchase.verificationData.localVerificationData,
        'productId': purchase.productID,
      }),
    );

    final result = json.decode(response.body);
    return result['active'] == true;
  }
}
```

## Seguridad y Mejores Prácticas

### 1. Validación en Servidor
- **Nunca confiar solo en el cliente**
- Verificar todas las compras en tu servidor
- Usar webhooks para actualizaciones en tiempo real

### 2. Manejo de Errores
```dart
class PurchaseErrorHandler {
  static String getErrorMessage(IAPError error) {
    switch (error.code) {
      case 'purchase_cancelled':
        return 'Compra cancelada por el usuario';
      case 'network_error':
        return 'Error de conexión. Inténtalo más tarde';
      case 'purchase_invalid':
        return 'Producto no válido';
      case 'purchase_not_allowed':
        return 'Compras no permitidas en este dispositivo';
      default:
        return 'Error desconocido: ${error.message}';
    }
  }
}
```

### 3. Testing
```dart
// Solo para testing - NUNCA en producción
class TestPurchases {
  static const Map<String, String> testProducts = {
    'android.test.purchased': 'Test Purchased',
    'android.test.canceled': 'Test Canceled',
    'android.test.item_unavailable': 'Test Unavailable',
  };
}
```

## Recursos Adicionales

- [In-App Purchase Documentation](https://pub.dev/packages/in_app_purchase)
- [Stripe Flutter Documentation](https://docs.stripe.com/payments/quickstart)
- [Apple Pay Guidelines](https://developer.apple.com/apple-pay/)
- [Google Pay API](https://developers.google.com/pay/api)
- [App Store Review Guidelines - Payments](https://developer.apple.com/app-store/review/guidelines/#payments)