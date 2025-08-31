import React from 'react';
import Layout from '@theme/Layout';
import CommandValidator from '../../components/CommandValidator';
import ProgressTracker from '../../components/ProgressTracker';

const validatorItems = [
  {
    id: 'flutter-sdk',
    title: 'Flutter SDK Instalado',
    description: 'Verificar que Flutter SDK esté correctamente instalado',
    completed: false,
    icon: '📱'
  },
  {
    id: 'android-setup',
    title: 'Android Studio Configurado', 
    description: 'Android SDK, emuladores y licencias configuradas',
    completed: false,
    icon: '🤖'
  },
  {
    id: 'ios-setup',
    title: 'Xcode y iOS Setup',
    description: 'Xcode, command line tools y simuladores instalados',
    completed: false,
    icon: '🍎'
  },
  {
    id: 'vscode-setup',
    title: 'VS Code Extensions',
    description: 'Extensiones de Flutter y Dart instaladas',
    completed: false,
    icon: '💻'
  },
  {
    id: 'device-connection',
    title: 'Dispositivos Conectados',
    description: 'Al menos un dispositivo o emulador disponible',
    completed: false,
    icon: '📲'
  },
  {
    id: 'first-app',
    title: 'Primera App Funcional',
    description: 'Crear y ejecutar tu primera aplicación Flutter',
    completed: false,
    icon: '🚀'
  }
];

export default function ValidatorPage(): JSX.Element {
  return (
    <Layout
      title="Validador de Instalación Flutter"
      description="Herramienta interactiva para verificar tu instalación de Flutter paso a paso"
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <header className="margin-bottom--lg text--center">
              <h1>🔍 Validador de Instalación Flutter</h1>
              <p className="lead">
                Verifica que tu entorno de desarrollo Flutter esté correctamente configurado.
                Esta herramienta interactiva te guiará a través de todos los pasos necesarios.
              </p>
            </header>

            <div className="margin-bottom--xl">
              <ProgressTracker 
                items={validatorItems}
                title="📋 Lista de Verificación Flutter"
              />
            </div>

            <div className="margin-bottom--xl">
              <CommandValidator />
            </div>

            <div className="card margin-bottom--lg">
              <div className="card__header">
                <h3>🎯 Próximos Pasos</h3>
              </div>
              <div className="card__body">
                <p>Una vez que hayas verificado tu instalación:</p>
                <ul>
                  <li>
                    <strong>📚 Continúa con el tutorial</strong> - 
                    <a href="/docs/intro"> Ir a la guía completa</a>
                  </li>
                  <li>
                    <strong>🏗️ Crea tu primer proyecto</strong> - 
                    <a href="/docs/proyecto/estructura"> Estructura de proyectos</a>
                  </li>
                  <li>
                    <strong>💻 Configura VS Code</strong> - 
                    <a href="/docs/entorno/vscode"> Configuración avanzada</a>
                  </li>
                  <li>
                    <strong>📖 Explora ejemplos</strong> - 
                    <a href="https://github.com/flutter/samples" target="_blank" rel="noopener noreferrer">
                      Repositorio oficial de ejemplos
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="alert alert--info">
              <h4>💡 Consejo Pro</h4>
              <p>
                Si encuentras errores durante la validación, consulta nuestra 
                <strong> sección de troubleshooting</strong> en la guía de instalación.
                La mayoría de problemas comunes tienen soluciones documentadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}