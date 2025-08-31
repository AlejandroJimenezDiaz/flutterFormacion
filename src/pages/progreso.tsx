import React from 'react';
import Layout from '@theme/Layout';
import UserRegistration from '@site/src/components/UserRegistration';
import styles from './progreso.module.css';

export default function ProgresoPage(): JSX.Element {
  return (
    <Layout
      title="Mi Progreso"
      description="Sigue tu progreso en Kamaleonte Flutter Academy"
    >
      <div className={styles.progressPage}>
        <div className="container">
          <div className={styles.header}>
            <h1>📊 Mi Progreso en Flutter Academy</h1>
            <p className={styles.subtitle}>
              Registra tu progreso y mantén seguimiento de tu aprendizaje en Flutter
            </p>
          </div>
          
          <UserRegistration />
          
          <div className={styles.tipsSection}>
            <h2>💡 Consejos para maximizar tu aprendizaje</h2>
            <div className={styles.tipsGrid}>
              <div className={styles.tipCard}>
                <div className={styles.tipIcon}>🎯</div>
                <h3>Establece metas diarias</h3>
                <p>Dedica al menos 1-2 horas diarias para mantener constancia en tu aprendizaje.</p>
              </div>
              
              <div className={styles.tipCard}>
                <div className={styles.tipIcon}>🛠️</div>
                <h3>Practica con proyectos reales</h3>
                <p>No solo leas la teoría, implementa cada ejemplo en tu propio proyecto.</p>
              </div>
              
              <div className={styles.tipCard}>
                <div className={styles.tipIcon}>👥</div>
                <h3>Participa en la comunidad</h3>
                <p>Únete a las discusiones y comparte tus dudas con otros desarrolladores.</p>
              </div>
              
              <div className={styles.tipCard}>
                <div className={styles.tipIcon}>📝</div>
                <h3>Toma notas personales</h3>
                <p>Documenta tus aprendizajes y crea tu propia guía de referencia rápida.</p>
              </div>
            </div>
          </div>

          <div className={styles.resourcesSection}>
            <h2>🔗 Recursos Adicionales</h2>
            <div className={styles.resourcesList}>
              <a 
                href="https://docs.flutter.dev/" 
                className={styles.resourceLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.resourceIcon}>📚</div>
                <div>
                  <h4>Flutter Documentation</h4>
                  <p>Documentación oficial de Flutter</p>
                </div>
              </a>
              
              <a 
                href="https://pub.dev/" 
                className={styles.resourceLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.resourceIcon}>📦</div>
                <div>
                  <h4>Pub.dev</h4>
                  <p>Repositorio de paquetes de Dart y Flutter</p>
                </div>
              </a>
              
              <a 
                href="https://github.com/flutter/flutter" 
                className={styles.resourceLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.resourceIcon}>💻</div>
                <div>
                  <h4>Flutter GitHub</h4>
                  <p>Código fuente y issues de Flutter</p>
                </div>
              </a>
              
              <a 
                href="https://flutter.dev/community" 
                className={styles.resourceLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.resourceIcon}>🌍</div>
                <div>
                  <h4>Flutter Community</h4>
                  <p>Únete a la comunidad global de Flutter</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}