import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  emoji: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🎯 Formación Estructurada',
    emoji: '📚',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Programa de formación diseñado para desarrolladores en prácticas.
        Desde configuración del entorno hasta deployment, siguiendo estándares industriales.
      </>
    ),
  },
  {
    title: '💼 Proyectos Reales',
    emoji: '🚀',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Aprende desarrollando aplicaciones reales utilizadas en Kamaleonte.
        Arquitectura Clean, BLoC, Firebase, pagos y todas las tecnologías actuales.
      </>
    ),
  },
  {
    title: '🤝 Mentoring Continuo',
    emoji: '👥',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Sistema de soporte y resolución de dudas. Comparte errores, 
        encuentra soluciones y aprende de la experiencia del equipo senior.
      </>
    ),
  },
];

function Feature({title, Svg, description, emoji}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>
          <span className={styles.featureEmoji}>{emoji}</span>
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">🎯 Tu Programa de Prácticas en Flutter</Heading>
          <p className="hero__subtitle">
            Programa de formación completo diseñado específicamente para desarrolladores 
            en prácticas en Kamaleonte. Aprende con proyectos reales y metodologías profesionales.
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        
        {/* Stack tecnológico de Kamaleonte */}
        <div className="margin-top--lg text--center">
          <Heading as="h3">💻 Stack Tecnológico Kamaleonte</Heading>
          <p className="margin-bottom--md" style={{color: 'var(--ifm-color-content-secondary)'}}>
            Domina las tecnologías que utilizamos diariamente en nuestros proyectos
          </p>
          <div className="row margin-top--md">
            <div className="col">
              <div className={styles.techBadge}>Flutter & Dart</div>
              <div className={styles.techBadge}>Firebase Suite</div>
              <div className={styles.techBadge}>Clean Architecture</div>
              <div className={styles.techBadge}>BLoC Pattern</div>
            </div>
            <div className="col">
              <div className={styles.techBadge}>Google & Apple Sign-In</div>
              <div className={styles.techBadge}>Adyen Payments</div>
              <div className={styles.techBadge}>FFmpeg Video</div>
              <div className={styles.techBadge}>Push Notifications</div>
            </div>
            <div className="col">
              <div className={styles.techBadge}>REST APIs</div>
              <div className={styles.techBadge}>Unit & Widget Testing</div>
              <div className={styles.techBadge}>CI/CD Pipeline</div>
              <div className={styles.techBadge}>Store Publishing</div>
            </div>
          </div>
        </div>

        {/* Sección de registro de errores */}
        <div className="margin-top--xl">
          <div className={styles.errorSection}>
            <div className="text--center">
              <Heading as="h3">🎓 Centro de Soporte para Practicantes</Heading>
              <p className="hero__subtitle margin-bottom--lg">
                Espacio colaborativo para resolver dudas, documentar errores y compartir conocimiento.
                El equipo senior de Kamaleonte supervisa y valida las soluciones.
              </p>
            </div>
            
            <div className="row">
              <div className="col col--6">
                <div className={styles.errorCard}>
                  <div className={styles.errorCardIcon}>❓</div>
                  <h4>Reportar Dudas & Errores</h4>
                  <p>Documenta problemas que encuentres durante las prácticas. El equipo senior validará y proporcionará feedback constructivo.</p>
                  <Link
                    className="button button--outline button--primary"
                    to="/docs/comunidad/registro-errores#reportar-nuevo-error">
                    Solicitar Ayuda
                  </Link>
                </div>
              </div>
              
              <div className="col col--6">
                <div className={styles.errorCard}>
                  <div className={styles.errorCardIcon}>💡</div>
                  <h4>Base de Conocimiento</h4>
                  <p>Consulta soluciones verificadas por el equipo senior y aprende de errores comunes documentados por otros practicantes.</p>
                  <Link
                    className="button button--outline button--primary"
                    to="/docs/comunidad/registro-errores#errores-registrados">
                    Explorar Soluciones
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="text--center margin-top--lg">
              <div className={styles.communityStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>47</div>
                  <div className={styles.statLabel}>Casos Documentados</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>38</div>
                  <div className={styles.statLabel}>Soluciones Validadas</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>12</div>
                  <div className={styles.statLabel}>Practicantes Activos</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>6</div>
                  <div className={styles.statLabel}>Mentores Senior</div>
                </div>
              </div>
              
              <div className="margin-top--lg">
                <Link
                  className="button button--primary button--lg"
                  to="/docs/comunidad/registro-errores">
                  💬 Acceder al Centro de Soporte
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}