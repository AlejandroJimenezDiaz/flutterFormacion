import React from 'react';
import styles from './styles.module.css';

interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend: {
    value: string;
    isPositive: boolean;
  };
}

const statsData: StatCard[] = [
  {
    title: 'Casos Documentados',
    value: 47,
    icon: '📋',
    color: '#ff6b6b',
    trend: { value: '+12%', isPositive: true }
  },
  {
    title: 'Soluciones Validadas',
    value: 38,
    icon: '✅',
    color: '#51cf66',
    trend: { value: '+8%', isPositive: true }
  },
  {
    title: 'Practicantes Activos',
    value: 12,
    icon: '👨‍💻',
    color: '#339af0',
    trend: { value: '+15%', isPositive: true }
  },
  {
    title: 'Casos Resueltos',
    value: 35,
    icon: '🎯',
    color: '#51cf66',
    trend: { value: '+22%', isPositive: true }
  },
  {
    title: 'Tiempo Respuesta Senior',
    value: '1.2h',
    icon: '⚡',
    color: '#ffd43b',
    trend: { value: '-18%', isPositive: true }
  },
  {
    title: 'Efectividad Mentoring',
    value: '92%',
    icon: '⭐',
    color: '#ff8cc8',
    trend: { value: '+3%', isPositive: true }
  }
];

const categoryActivity = [
  { name: 'UI/Widgets', errors: 14, solutions: 12, color: '#45b7d1' },
  { name: 'Firebase', errors: 11, solutions: 9, color: '#ffeaa7' },
  { name: 'Dependencies', errors: 8, solutions: 7, color: '#4ecdc4' },
  { name: 'Architecture', errors: 7, solutions: 5, color: '#96ceb4' },
  { name: 'Platform', errors: 4, solutions: 3, color: '#fd79a8' },
  { name: 'Testing', errors: 3, solutions: 2, color: '#a29bfe' }
];

export default function CommunityStats(): JSX.Element {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>📊 Métricas del Programa de Prácticas</h3>
        <div className={styles.period}>
          <span className={styles.periodLabel}>Último mes</span>
        </div>
      </div>

      {/* Estadísticas generales */}
      <div className={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div 
              className={styles.statIcon} 
              style={{ backgroundColor: stat.color + '20', color: stat.color }}
            >
              {stat.icon}
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statTitle}>{stat.title}</div>
              <div className={`${styles.statTrend} ${stat.trend.isPositive ? styles.positive : styles.negative}`}>
                {stat.trend.isPositive ? '↗️' : '↘️'} {stat.trend.value} vs mes anterior
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actividad por categorías */}
      <div className={styles.categorySection}>
        <h4 className={styles.sectionTitle}>🎯 Actividad por Categorías</h4>
        <div className={styles.categoryGrid}>
          {categoryActivity.map((category, index) => (
            <div key={index} className={styles.categoryItem}>
              <div className={styles.categoryHeader}>
                <div 
                  className={styles.categoryDot}
                  style={{ backgroundColor: category.color }}
                />
                <span className={styles.categoryName}>{category.name}</span>
              </div>
              <div className={styles.categoryStats}>
                <div className={styles.categoryStat}>
                  <span className={styles.categoryStatValue}>{category.errors}</span>
                  <span className={styles.categoryStatLabel}>errores</span>
                </div>
                <div className={styles.categoryStat}>
                  <span className={styles.categoryStatValue}>{category.solutions}</span>
                  <span className={styles.categoryStatLabel}>soluciones</span>
                </div>
              </div>
              <div className={styles.categoryProgress}>
                <div 
                  className={styles.categoryProgressBar}
                  style={{ 
                    width: `${(category.solutions / category.errors) * 100}%`,
                    backgroundColor: category.color
                  }}
                />
              </div>
              <div className={styles.categoryResolution}>
                {Math.round((category.solutions / category.errors) * 100)}% resuelto
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas de tiempo */}
      <div className={styles.timeMetrics}>
        <h4 className={styles.sectionTitle}>⏱️ Métricas de Tiempo</h4>
        <div className={styles.timeGrid}>
          <div className={styles.timeCard}>
            <div className={styles.timeIcon}>🚀</div>
            <div className={styles.timeContent}>
              <div className={styles.timeValue}>1.2h</div>
              <div className={styles.timeLabel}>Primera Respuesta</div>
              <div className={styles.timeSubtext}>Promedio de respuesta inicial</div>
            </div>
          </div>
          <div className={styles.timeCard}>
            <div className={styles.timeIcon}>🎯</div>
            <div className={styles.timeContent}>
              <div className={styles.timeValue}>4.8h</div>
              <div className={styles.timeLabel}>Resolución</div>
              <div className={styles.timeSubtext}>Promedio hasta solución</div>
            </div>
          </div>
          <div className={styles.timeCard}>
            <div className={styles.timeIcon}>📈</div>
            <div className={styles.timeContent}>
              <div className={styles.timeValue}>87%</div>
              <div className={styles.timeLabel}>Tasa Resolución</div>
              <div className={styles.timeSubtext}>Errores resueltos exitosamente</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actividad reciente */}
      <div className={styles.recentActivity}>
        <h4 className={styles.sectionTitle}>🔥 Actividad Reciente</h4>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>❓</div>
            <div className={styles.activityContent}>
              <div className={styles.activityText}>
                <strong>María López (Practicante)</strong> documentó un nuevo caso en <span className={styles.activityCategory}>Dependencies</span>
              </div>
              <div className={styles.activityTime}>hace 23 minutos</div>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>🎯</div>
            <div className={styles.activityContent}>
              <div className={styles.activityText}>
                <strong>Senior Dev</strong> validó la solución para <span className={styles.activityCategory}>Firebase Auth</span>
              </div>
              <div className={styles.activityTime}>hace 1 hora</div>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>✅</div>
            <div className={styles.activityContent}>
              <div className={styles.activityText}>
                Caso <strong>"RenderFlex overflow"</strong> resuelto con mentoring
              </div>
              <div className={styles.activityTime}>hace 2 horas</div>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>👍</div>
            <div className={styles.activityContent}>
              <div className={styles.activityText}>
                La solución de <strong>Ana García</strong> recibió 5 votos positivos
              </div>
              <div className={styles.activityTime}>hace 3 horas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}