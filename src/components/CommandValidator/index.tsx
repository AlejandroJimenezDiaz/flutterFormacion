import React, { useState } from 'react';
import CodeSnippet from '../CodeSnippet';
import styles from './styles.module.css';

interface CommandTest {
  id: string;
  name: string;
  command: string;
  expectedOutput?: string;
  description: string;
  status: 'pending' | 'success' | 'warning' | 'error';
  icon: string;
}

const defaultTests: CommandTest[] = [
  {
    id: 'flutter-version',
    name: 'Flutter SDK',
    command: 'flutter --version',
    expectedOutput: 'Flutter 3.32',
    description: 'Verifica que Flutter SDK esté instalado correctamente',
    status: 'pending',
    icon: '📱'
  },
  {
    id: 'flutter-doctor',
    name: 'Flutter Doctor',
    command: 'flutter doctor',
    description: 'Revisa la configuración completa del entorno',
    status: 'pending',
    icon: '🩺'
  },
  {
    id: 'android-sdk',
    name: 'Android SDK',
    command: 'flutter doctor --android-licenses',
    description: 'Verifica las licencias de Android SDK',
    status: 'pending',
    icon: '🤖'
  },
  {
    id: 'ios-setup',
    name: 'iOS Setup',
    command: 'flutter doctor -v | grep Xcode',
    description: 'Verifica la configuración de Xcode',
    status: 'pending',
    icon: '🍎'
  }
];

export default function CommandValidator(): JSX.Element {
  const [tests, setTests] = useState<CommandTest[]>(defaultTests);
  const [isRunning, setIsRunning] = useState(false);

  const updateTestStatus = (id: string, status: CommandTest['status']) => {
    setTests(prevTests => 
      prevTests.map(test => 
        test.id === id ? { ...test, status } : test
      )
    );
  };

  const runTest = async (testId: string) => {
    setIsRunning(true);
    updateTestStatus(testId, 'pending');
    
    // Simular ejecución del comando (en una implementación real, esto haría una llamada a la API)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simular resultado aleatorio para demostración
    const randomResult = Math.random();
    const status: CommandTest['status'] = randomResult > 0.7 ? 'success' : 
                                         randomResult > 0.3 ? 'warning' : 'error';
    
    updateTestStatus(testId, status);
    setIsRunning(false);
  };

  const runAllTests = async () => {
    setIsRunning(true);
    
    for (const test of tests) {
      updateTestStatus(test.id, 'pending');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const randomResult = Math.random();
      const status: CommandTest['status'] = randomResult > 0.6 ? 'success' : 
                                           randomResult > 0.3 ? 'warning' : 'error';
      updateTestStatus(test.id, status);
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: CommandTest['status']) => {
    switch (status) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return '⏳';
    }
  };

  const getStatusColor = (status: CommandTest['status']) => {
    switch (status) {
      case 'success': return 'var(--ifm-color-success)';
      case 'warning': return 'var(--ifm-color-warning)';
      case 'error': return 'var(--ifm-color-danger)';
      default: return 'var(--ifm-color-emphasis-600)';
    }
  };

  return (
    <div className={styles.validatorContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>🔍 Validador de Instalación Flutter</h3>
        <button 
          className={styles.runAllButton}
          onClick={runAllTests}
          disabled={isRunning}
        >
          {isRunning ? '🔄 Ejecutando...' : '🚀 Validar Todo'}
        </button>
      </div>
      
      <p className={styles.description}>
        Ejecuta estos comandos para verificar que tu instalación de Flutter está correcta:
      </p>

      <div className={styles.testsList}>
        {tests.map((test) => (
          <div key={test.id} className={`${styles.testItem} ${styles[test.status]}`}>
            <div className={styles.testHeader}>
              <div className={styles.testInfo}>
                <span className={styles.testIcon}>{test.icon}</span>
                <div>
                  <h4 className={styles.testName}>{test.name}</h4>
                  <p className={styles.testDescription}>{test.description}</p>
                </div>
              </div>
              
              <div className={styles.testActions}>
                <div 
                  className={styles.statusIndicator}
                  style={{ color: getStatusColor(test.status) }}
                >
                  {getStatusIcon(test.status)}
                </div>
                <button 
                  className={styles.runButton}
                  onClick={() => runTest(test.id)}
                  disabled={isRunning}
                >
                  {isRunning && test.status === 'pending' ? '⏳' : '▶️'}
                </button>
              </div>
            </div>

            <div className={styles.commandContainer}>
              <CodeSnippet 
                code={test.command}
                language="bash"
                title="Ejecutar comando"
                copyable={true}
              />
              
              {test.expectedOutput && (
                <div className={styles.expectedOutput}>
                  <strong>Salida esperada:</strong> {test.expectedOutput}
                </div>
              )}
            </div>

            {test.status !== 'pending' && (
              <div className={styles.resultContainer}>
                <div className={`${styles.result} ${styles[test.status]}`}>
                  {test.status === 'success' && (
                    <div className={styles.successMessage}>
                      <span className={styles.resultIcon}>✅</span>
                      <span>¡Perfecto! Todo está funcionando correctamente.</span>
                    </div>
                  )}
                  {test.status === 'warning' && (
                    <div className={styles.warningMessage}>
                      <span className={styles.resultIcon}>⚠️</span>
                      <span>Hay algunas advertencias, pero puedes continuar.</span>
                    </div>
                  )}
                  {test.status === 'error' && (
                    <div className={styles.errorMessage}>
                      <span className={styles.resultIcon}>❌</span>
                      <span>Error detectado. Revisa la configuración.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.helpSection}>
        <h4>🆘 ¿Necesitas ayuda?</h4>
        <ul>
          <li>Si encuentras errores, consulta la sección de <strong>Problemas Comunes</strong></li>
          <li>Ejecuta <code>flutter doctor -v</code> para obtener información detallada</li>
          <li>Visita <a href="https://docs.flutter.dev/get-started/install" target="_blank" rel="noopener noreferrer">la documentación oficial</a></li>
        </ul>
      </div>
    </div>
  );
}