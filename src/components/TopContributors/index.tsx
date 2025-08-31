import React, { useState } from 'react';
import styles from './styles.module.css';

interface Contributor {
  id: string;
  name: string;
  avatar: string;
  role: string;
  stats: {
    errorsReported: number;
    solutionsProvided: number;
    helpfulVotes: number;
    reputation: number;
  };
  badges: string[];
  joinDate: string;
  lastActive: string;
  specialties: string[];
}

const contributors: Contributor[] = [
  {
    id: '1',
    name: 'Ana García',
    avatar: '👩‍💻',
    role: 'Flutter Expert',
    stats: {
      errorsReported: 45,
      solutionsProvided: 89,
      helpfulVotes: 234,
      reputation: 1580
    },
    badges: ['🏆', '🔥', '💎', '⭐'],
    joinDate: '2024-01-15',
    lastActive: 'hace 2 horas',
    specialties: ['UI/Widgets', 'State Management', 'Animations']
  },
  {
    id: '2',
    name: 'Carlos Mendez',
    avatar: '👨‍💼',
    role: 'Senior Developer',
    stats: {
      errorsReported: 32,
      solutionsProvided: 67,
      helpfulVotes: 198,
      reputation: 1240
    },
    badges: ['🏆', '🔥', '💎'],
    joinDate: '2024-02-03',
    lastActive: 'hace 1 hora',
    specialties: ['Firebase', 'Backend Integration', 'Performance']
  },
  {
    id: '3',
    name: 'María López',
    avatar: '👩‍🎓',
    role: 'Mobile Architect',
    stats: {
      errorsReported: 28,
      solutionsProvided: 78,
      helpfulVotes: 189,
      reputation: 1180
    },
    badges: ['🏆', '🔥', '⭐'],
    joinDate: '2023-11-20',
    lastActive: 'hace 30 minutos',
    specialties: ['Architecture', 'Testing', 'CI/CD']
  },
  {
    id: '4',
    name: 'Diego Ramírez',
    avatar: '👨‍🔬',
    role: 'Flutter Developer',
    stats: {
      errorsReported: 51,
      solutionsProvided: 43,
      helpfulVotes: 167,
      reputation: 980
    },
    badges: ['🔥', '💎'],
    joinDate: '2024-03-12',
    lastActive: 'hace 5 horas',
    specialties: ['BLoC Pattern', 'State Management', 'Navigation']
  },
  {
    id: '5',
    name: 'Laura Silva',
    avatar: '👩‍🚀',
    role: 'Platform Specialist',
    stats: {
      errorsReported: 36,
      solutionsProvided: 52,
      helpfulVotes: 145,
      reputation: 850
    },
    badges: ['🔥', '⭐'],
    joinDate: '2024-04-08',
    lastActive: 'hace 1 día',
    specialties: ['Android', 'iOS', 'Platform Channels']
  },
  {
    id: '6',
    name: 'Roberto Castro',
    avatar: '👨‍🎨',
    role: 'UI/UX Developer',
    stats: {
      errorsReported: 22,
      solutionsProvided: 41,
      helpfulVotes: 128,
      reputation: 720
    },
    badges: ['💎', '⭐'],
    joinDate: '2024-05-14',
    lastActive: 'hace 3 horas',
    specialties: ['Custom Widgets', 'Animations', 'Design Systems']
  }
];

const badgeDescriptions = {
  '🏆': 'Top Contributor - Más de 1000 puntos de reputación',
  '🔥': 'Hot Streak - 5+ soluciones en los últimos 7 días',
  '💎': 'Quality Helper - 90%+ de votos positivos',
  '⭐': 'Community Star - Miembro destacado por la comunidad'
};

export default function TopContributors(): JSX.Element {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('month');
  const [selectedContributor, setSelectedContributor] = useState<string | null>(null);

  const getContributorRank = (index: number): string => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';  
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  return (
    <div className={styles.contributorsContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>🌟 Top Contributors</h3>
        <div className={styles.periodSelector}>
          <button 
            className={`${styles.periodButton} ${selectedPeriod === 'week' ? styles.active : ''}`}
            onClick={() => setSelectedPeriod('week')}
          >
            Semana
          </button>
          <button 
            className={`${styles.periodButton} ${selectedPeriod === 'month' ? styles.active : ''}`}
            onClick={() => setSelectedPeriod('month')}
          >
            Mes
          </button>
          <button 
            className={`${styles.periodButton} ${selectedPeriod === 'all' ? styles.active : ''}`}
            onClick={() => setSelectedPeriod('all')}
          >
            Todo
          </button>
        </div>
      </div>

      {/* Lista de contributors */}
      <div className={styles.contributorsList}>
        {contributors.map((contributor, index) => (
          <div 
            key={contributor.id} 
            className={`${styles.contributorCard} ${selectedContributor === contributor.id ? styles.expanded : ''}`}
            onClick={() => setSelectedContributor(
              selectedContributor === contributor.id ? null : contributor.id
            )}
          >
            <div className={styles.contributorHeader}>
              <div className={styles.rankBadge}>
                {getContributorRank(index)}
              </div>
              
              <div className={styles.contributorAvatar}>
                {contributor.avatar}
              </div>
              
              <div className={styles.contributorInfo}>
                <div className={styles.contributorName}>
                  {contributor.name}
                </div>
                <div className={styles.contributorRole}>
                  {contributor.role}
                </div>
                <div className={styles.contributorBadges}>
                  {contributor.badges.map((badge, badgeIndex) => (
                    <span 
                      key={badgeIndex} 
                      className={styles.badge}
                      title={badgeDescriptions[badge]}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className={styles.contributorStats}>
                <div className={styles.mainStat}>
                  <span className={styles.statValue}>{contributor.stats.reputation}</span>
                  <span className={styles.statLabel}>puntos</span>
                </div>
                <div className={styles.secondaryStat}>
                  <span className={styles.statValue}>{contributor.stats.solutionsProvided}</span>
                  <span className={styles.statLabel}>soluciones</span>
                </div>
              </div>
              
              <div className={styles.expandIcon}>
                {selectedContributor === contributor.id ? '▲' : '▼'}
              </div>
            </div>

            {selectedContributor === contributor.id && (
              <div className={styles.contributorDetails}>
                <div className={styles.detailsGrid}>
                  <div className={styles.detailSection}>
                    <h5 className={styles.detailTitle}>📊 Estadísticas Detalladas</h5>
                    <div className={styles.statsGrid}>
                      <div className={styles.statItem}>
                        <span className={styles.statIcon}>🐛</span>
                        <div className={styles.statContent}>
                          <span className={styles.statNumber}>{contributor.stats.errorsReported}</span>
                          <span className={styles.statText}>Errores Reportados</span>
                        </div>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statIcon}>💡</span>
                        <div className={styles.statContent}>
                          <span className={styles.statNumber}>{contributor.stats.solutionsProvided}</span>
                          <span className={styles.statText}>Soluciones Aportadas</span>
                        </div>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statIcon}>👍</span>
                        <div className={styles.statContent}>
                          <span className={styles.statNumber}>{contributor.stats.helpfulVotes}</span>
                          <span className={styles.statText}>Votos Útiles</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.detailSection}>
                    <h5 className={styles.detailTitle}>🎯 Especialidades</h5>
                    <div className={styles.specialties}>
                      {contributor.specialties.map((specialty, specIndex) => (
                        <span key={specIndex} className={styles.specialty}>
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className={styles.contributorMeta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Miembro desde:</span>
                    <span className={styles.metaValue}>
                      {new Date(contributor.joinDate).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Última actividad:</span>
                    <span className={styles.metaValue}>{contributor.lastActive}</span>
                  </div>
                </div>
                
                <div className={styles.badgeExplanation}>
                  <h6 className={styles.badgeTitle}>🏅 Insignias</h6>
                  <div className={styles.badgeList}>
                    {contributor.badges.map((badge, badgeIndex) => (
                      <div key={badgeIndex} className={styles.badgeItem}>
                        <span className={styles.badgeEmoji}>{badge}</span>
                        <span className={styles.badgeDescription}>
                          {badgeDescriptions[badge]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Call to action */}
      <div className={styles.callToAction}>
        <div className={styles.ctaContent}>
          <h4 className={styles.ctaTitle}>🚀 ¡Únete a Nuestros Top Contributors!</h4>
          <p className={styles.ctaDescription}>
            Ayuda a la comunidad reportando errores y compartiendo soluciones. 
            Gana reputación y obtén insignias por tus contribuciones.
          </p>
          <div className={styles.ctaActions}>
            <button className={styles.ctaPrimary}>
              📝 Reportar Error
            </button>
            <button className={styles.ctaSecondary}>
              💡 Ayudar con Soluciones
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}