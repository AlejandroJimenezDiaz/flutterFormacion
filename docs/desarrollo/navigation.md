# Navegación en Flutter

## Introducción

La navegación es un aspecto fundamental en cualquier aplicación móvil. Flutter proporciona un sistema robusto de navegación que permite a los usuarios moverse entre diferentes pantallas de manera intuitiva.

## Navigator

El `Navigator` es el widget principal para manejar la navegación en Flutter. Mantiene una pila de rutas (stack) que permite navegar hacia adelante y hacia atrás.

### Navegación Básica

```dart
// Navegar a una nueva pantalla
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => NuevaPantalla()),
);

// Regresar a la pantalla anterior
Navigator.pop(context);
```

## Rutas con Nombre

Para aplicaciones más complejas, es recomendable usar rutas con nombre:

```dart
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => PantallaInicio(),
    '/detalles': (context) => PantallaDetalles(),
    '/configuracion': (context) => PantallaConfiguracion(),
  },
)

// Navegación usando nombres
Navigator.pushNamed(context, '/detalles');
```

## Paso de Datos

### Usando Argumentos

```dart
// Enviar datos
Navigator.pushNamed(
  context, 
  '/detalles',
  arguments: {'id': '123', 'titulo': 'Mi Item'},
);

// Recibir datos
class PantallaDetalles extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map<String, String>;
    return Scaffold(
      appBar: AppBar(title: Text(args['titulo']!)),
      body: Text('ID: ${args['id']}'),
    );
  }
}
```

### Retorno de Datos

```dart
// Esperar resultado
final resultado = await Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => PantallaFormulario()),
);

// Retornar resultado
Navigator.pop(context, 'datos del formulario');
```

## Go Router (Navegación Avanzada)

Para aplicaciones complejas, se recomienda usar el paquete `go_router`:

```dart
dependencies:
  go_router: ^13.0.0
```

### Configuración Básica

```dart
import 'package:go_router/go_router.dart';

final GoRouter _router = GoRouter(
  routes: <RouteBase>[
    GoRoute(
      path: '/',
      builder: (BuildContext context, GoRouterState state) {
        return const PantallaInicio();
      },
      routes: <RouteBase>[
        GoRoute(
          path: '/detalles',
          builder: (BuildContext context, GoRouterState state) {
            return const PantallaDetalles();
          },
        ),
      ],
    ),
  ],
);

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
    );
  }
}
```

## Navegación con Pestañas

### Bottom Navigation Bar

```dart
class PantallaPrincipal extends StatefulWidget {
  @override
  _PantallaPrincipalState createState() => _PantallaPrincipalState();
}

class _PantallaPrincipalState extends State<PantallaPrincipal> {
  int _indiceSeleccionado = 0;
  
  final List<Widget> _pantallas = [
    PantallaInicio(),
    PantallaBuscar(),
    PantallaPerfil(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pantallas[_indiceSeleccionado],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _indiceSeleccionado,
        onTap: (index) {
          setState(() {
            _indiceSeleccionado = index;
          });
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Inicio',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Buscar',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Perfil',
          ),
        ],
      ),
    );
  }
}
```

## Drawer (Menú Lateral)

```dart
Scaffold(
  appBar: AppBar(title: Text('Mi App')),
  drawer: Drawer(
    child: ListView(
      children: [
        const DrawerHeader(
          decoration: BoxDecoration(
            color: Colors.blue,
          ),
          child: Text('Mi App'),
        ),
        ListTile(
          leading: Icon(Icons.home),
          title: Text('Inicio'),
          onTap: () {
            Navigator.pushNamed(context, '/');
          },
        ),
        ListTile(
          leading: Icon(Icons.settings),
          title: Text('Configuración'),
          onTap: () {
            Navigator.pushNamed(context, '/configuracion');
          },
        ),
      ],
    ),
  ),
  body: Container(),
)
```

## Transiciones Personalizadas

```dart
class TransicionPersonalizada<T> extends PageRouteBuilder<T> {
  final Widget child;

  TransicionPersonalizada({required this.child})
      : super(
          pageBuilder: (context, animation, _) => child,
        );

  @override
  Widget buildTransitions(BuildContext context, Animation<double> animation,
      Animation<double> secondaryAnimation, Widget child) {
    return SlideTransition(
      position: Tween<Offset>(
        begin: const Offset(1.0, 0.0),
        end: Offset.zero,
      ).animate(animation),
      child: child,
    );
  }
}

// Uso
Navigator.push(
  context,
  TransicionPersonalizada(child: NuevaPantalla()),
);
```

## Mejores Prácticas

1. **Usar rutas con nombre** para aplicaciones medianas/grandes
2. **Validar argumentos** antes de usarlos
3. **Manejar el estado** correctamente durante la navegación
4. **Usar go_router** para navegación compleja
5. **Considerar la experiencia del usuario** en las transiciones

## Recursos Adicionales

- [Documentación oficial de Flutter Navigation](https://docs.flutter.dev/development/ui/navigation)
- [Go Router package](https://pub.dev/packages/go_router)
- [Ejemplos de navegación](https://flutter.dev/docs/cookbook/navigation)