import React, { useState } from 'react';
import styles from './styles.module.css';

interface ErrorReport {
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  environment: {
    flutter: string;
    dart: string;
    os: string;
    ide: string;
  };
  code: string;
  errorMessage: string;
  stepsToReproduce: string;
  attemptedSolutions: string;
  authorName: string;
  authorEmail: string;
}

const categories = [
  { id: 'installation', name: '🚀 Instalación y Setup' },
  { id: 'dependencies', name: '📦 Dependencias' },
  { id: 'ui-widgets', name: '🎨 UI/Widgets' },
  { id: 'architecture', name: '🏗️ Arquitectura' },
  { id: 'firebase', name: '🔥 Firebase' },
  { id: 'platform', name: '📱 Platform Específico' },
  { id: 'testing', name: '🧪 Testing' },
  { id: 'deployment', name: '🚀 Deployment' },
  { id: 'performance', name: '⚡ Performance' },
  { id: 'others', name: '🔧 Otros' },
];

const priorities = [
  { id: 'low', name: '🟢 Baja', description: 'Error menor, no bloquea trabajo' },
  { id: 'medium', name: '🟡 Media', description: 'Dificulta el trabajo pero hay workaround' },
  { id: 'high', name: '🟠 Alta', description: 'Bloquea funcionalidad importante' },
  { id: 'critical', name: '🔴 Crítica', description: 'Impide completamente continuar' },
];

export default function ErrorForm(): JSX.Element {
  const [formData, setFormData] = useState<ErrorReport>({
    title: '',
    category: '',
    priority: 'medium',
    description: '',
    environment: {
      flutter: '',
      dart: '',
      os: '',
      ide: '',
    },
    code: '',
    errorMessage: '',
    stepsToReproduce: '',
    attemptedSolutions: '',
    authorName: '',
    authorEmail: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('environment.')) {
      const envField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        environment: {
          ...prev.environment,
          [envField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // En producción aquí harías la llamada a la API
      console.log('Error report submitted:', formData);
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.title.length >= 10 && formData.category !== '' && formData.description.length >= 20;
      case 2:
        return formData.environment.flutter !== '' && formData.environment.os !== '';
      case 3:
        return formData.errorMessage.length >= 10;
      case 4:
        return formData.authorName !== '';
      default:
        return false;
    }
  };

  if (submitted) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✅</div>
        <h3>¡Error Reportado Exitosamente!</h3>
        <p>Gracias por contribuir a la comunidad. Tu reporte ha sido enviado y será revisado pronto.</p>
        <div className={styles.successActions}>
          <button 
            className={styles.primaryButton}
            onClick={() => {
              setSubmitted(false);
              setFormData({
                title: '',
                category: '',
                priority: 'medium',
                description: '',
                environment: { flutter: '', dart: '', os: '', ide: '' },
                code: '',
                errorMessage: '',
                stepsToReproduce: '',
                attemptedSolutions: '',
                authorName: '',
                authorEmail: '',
              });
              setCurrentStep(1);
            }}
          >
            Reportar Otro Error
          </button>
          <button 
            className={styles.secondaryButton}
            onClick={() => window.scrollTo(0, document.body.scrollHeight)}
          >
            Ver Errores Registrados
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h3>📝 Reportar Nuevo Error</h3>
        <div className={styles.progressBar}>
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`${styles.progressStep} ${
                currentStep >= step ? styles.active : ''
              } ${
                currentStep > step ? styles.completed : ''
              }`}
            >
              {currentStep > step ? '✓' : step}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Paso 1: Información básica */}
        {currentStep === 1 && (
          <div className={styles.step}>
            <h4 className={styles.stepTitle}>🎯 Paso 1: Información Básica</h4>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Título del Error *
                <span className={styles.helpText}>
                  Describe el error en una línea clara (mín. 10 caracteres)
                </span>
              </label>
              <input
                type="text"
                className={styles.input}
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ej: Error de compilación: 'package:flutter/material.dart' not found"
                required
              />
              <div className={styles.charCount}>
                {formData.title.length}/100
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Categoría *</label>
              <select
                className={styles.select}
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Prioridad</label>
              <div className={styles.priorityGrid}>
                {priorities.map(priority => (
                  <label key={priority.id} className={styles.priorityOption}>
                    <input
                      type="radio"
                      name="priority"
                      value={priority.id}
                      checked={formData.priority === priority.id}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                    />
                    <div className={styles.priorityCard}>
                      <div className={styles.priorityName}>{priority.name}</div>
                      <div className={styles.priorityDescription}>
                        {priority.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Descripción Detallada *
                <span className={styles.helpText}>
                  ¿Qué estabas haciendo? ¿Qué esperabas? ¿Qué pasó? (mín. 20 caracteres)
                </span>
              </label>
              <textarea
                className={styles.textarea}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Explica detalladamente el contexto del error..."
                rows={4}
                required
              />
              <div className={styles.charCount}>
                {formData.description.length}/500
              </div>
            </div>
          </div>
        )}

        {/* Paso 2: Entorno */}
        {currentStep === 2 && (
          <div className={styles.step}>
            <h4 className={styles.stepTitle}>📱 Paso 2: Información del Entorno</h4>
            
            <div className={styles.environmentGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Versión Flutter *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.environment.flutter}
                  onChange={(e) => handleInputChange('environment.flutter', e.target.value)}
                  placeholder="Ej: 3.16.5"
                  required
                />
                <div className={styles.helpText}>
                  💡 Ejecuta: <code>flutter --version</code>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Versión Dart</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.environment.dart}
                  onChange={(e) => handleInputChange('environment.dart', e.target.value)}
                  placeholder="Ej: 3.2.3"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Sistema Operativo *</label>
                <select
                  className={styles.select}
                  value={formData.environment.os}
                  onChange={(e) => handleInputChange('environment.os', e.target.value)}
                  required
                >
                  <option value="">Selecciona tu OS</option>
                  <option value="macOS">macOS</option>
                  <option value="Windows">Windows</option>
                  <option value="Linux">Linux</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>IDE/Editor</label>
                <select
                  className={styles.select}
                  value={formData.environment.ide}
                  onChange={(e) => handleInputChange('environment.ide', e.target.value)}
                >
                  <option value="">Selecciona tu IDE</option>
                  <option value="VS Code">VS Code</option>
                  <option value="Android Studio">Android Studio</option>
                  <option value="IntelliJ IDEA">IntelliJ IDEA</option>
                  <option value="Vim/Emacs">Vim/Emacs</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Paso 3: Código y Error */}
        {currentStep === 3 && (
          <div className={styles.step}>
            <h4 className={styles.stepTitle}>💻 Paso 3: Código y Mensaje de Error</h4>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Código que Causa el Error
                <span className={styles.helpText}>
                  Incluye el código mínimo que reproduce el error
                </span>
              </label>
              <textarea
                className={styles.codeTextarea}
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                placeholder="// Tu código Dart aquí
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}"
                rows={8}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Mensaje de Error Completo *
                <span className={styles.helpText}>
                  Copia y pega el mensaje de error completo de la consola
                </span>
              </label>
              <textarea
                className={styles.errorTextarea}
                value={formData.errorMessage}
                onChange={(e) => handleInputChange('errorMessage', e.target.value)}
                placeholder="Error: Could not find a file named 'pubspec.yaml' in '/path/to/project'..."
                rows={6}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Pasos para Reproducir</label>
              <textarea
                className={styles.textarea}
                value={formData.stepsToReproduce}
                onChange={(e) => handleInputChange('stepsToReproduce', e.target.value)}
                placeholder="1. Abrir proyecto
2. Ejecutar flutter run
3. Error aparece aquí..."
                rows={4}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>¿Qué has intentado para solucionarlo?</label>
              <textarea
                className={styles.textarea}
                value={formData.attemptedSolutions}
                onChange={(e) => handleInputChange('attemptedSolutions', e.target.value)}
                placeholder="He probado:
- flutter clean && flutter pub get
- Reiniciar IDE
- ..."
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Paso 4: Información del autor */}
        {currentStep === 4 && (
          <div className={styles.step}>
            <h4 className={styles.stepTitle}>👤 Paso 4: Información de Contacto</h4>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nombre *</label>
              <input
                type="text"
                className={styles.input}
                value={formData.authorName}
                onChange={(e) => handleInputChange('authorName', e.target.value)}
                placeholder="Tu nombre o usuario"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Email (Opcional)
                <span className={styles.helpText}>
                  Para contactarte si necesitamos más información
                </span>
              </label>
              <input
                type="email"
                className={styles.input}
                value={formData.authorEmail}
                onChange={(e) => handleInputChange('authorEmail', e.target.value)}
                placeholder="tu@email.com"
              />
            </div>

            <div className={styles.summary}>
              <h5>📋 Resumen del Reporte:</h5>
              <div className={styles.summaryItem}>
                <strong>Título:</strong> {formData.title}
              </div>
              <div className={styles.summaryItem}>
                <strong>Categoría:</strong> {
                  categories.find(c => c.id === formData.category)?.name || 'No seleccionada'
                }
              </div>
              <div className={styles.summaryItem}>
                <strong>Prioridad:</strong> {
                  priorities.find(p => p.id === formData.priority)?.name
                }
              </div>
              <div className={styles.summaryItem}>
                <strong>Entorno:</strong> Flutter {formData.environment.flutter} en {formData.environment.os}
              </div>
            </div>
          </div>
        )}

        <div className={styles.formActions}>
          {currentStep > 1 && (
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              ← Anterior
            </button>
          )}
          
          {currentStep < 4 ? (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!isStepValid(currentStep)}
            >
              Siguiente →
            </button>
          ) : (
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isStepValid(currentStep) || isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : '🚀 Reportar Error'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}