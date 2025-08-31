import React, { useState } from 'react';
import styles from './styles.module.css';

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
  color: string;
}

const categories: Category[] = [
  {
    id: 'installation',
    name: 'Instalación y Setup',
    icon: '🚀',
    description: 'Problemas configurando Flutter, SDK, herramientas',
    count: 45,
    color: '#ff6b6b'
  },
  {
    id: 'dependencies',
    name: 'Dependencias',
    icon: '📦',
    description: 'Issues con packages, pub.dev, versiones',
    count: 38,
    color: '#4ecdc4'
  },
  {
    id: 'ui-widgets',
    name: 'UI/Widgets',
    icon: '🎨',
    description: 'Errores de interfaz, widgets, layouts',
    count: 62,
    color: '#45b7d1'
  },
  {
    id: 'architecture',
    name: 'Arquitectura',
    icon: '🏗️',
    description: 'Problemas con BLoC, Provider, estado',
    count: 29,
    color: '#96ceb4'
  },
  {
    id: 'firebase',
    name: 'Firebase',
    icon: '🔥',
    description: 'Errores de integración Firebase, Auth, Firestore',
    count: 33,
    color: '#ffeaa7'
  },
  {
    id: 'platform',
    name: 'Platform Específico',
    icon: '📱',
    description: 'Issues Android/iOS, permisos, configuraciones',
    count: 27,
    color: '#fd79a8'
  },
  {
    id: 'testing',
    name: 'Testing',
    icon: '🧪',
    description: 'Problemas con tests unitarios, widgets, integration',
    count: 15,
    color: '#a29bfe'
  },
  {
    id: 'deployment',
    name: 'Deployment',
    icon: '🚀',
    description: 'Errores de despliegue, Play Store, App Store',
    count: 21,
    color: '#fd79a8'
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: '⚡',
    description: 'Problemas de rendimiento, memoria, optimización',
    count: 12,
    color: '#fdcb6e'
  },
  {
    id: 'others',
    name: 'Otros',
    icon: '🔧',
    description: 'Errores que no encajan en otras categorías',
    count: 18,
    color: '#6c5ce7'
  }
];

export default function ErrorCategory(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalErrors = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className={styles.errorCategoryContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>📊 Categorías de Errores</h3>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{totalErrors}</span>
            <span className={styles.statLabel}>Total Errores</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{categories.length}</span>
            <span className={styles.statLabel}>Categorías</span>
          </div>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="🔍 Buscar categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.categoriesGrid}>
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className={`${styles.categoryCard} ${
              selectedCategory === category.id ? styles.selected : ''
            }`}
            onClick={() => 
              setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )
            }
          >
            <div 
              className={styles.categoryIcon}
              style={{ backgroundColor: category.color }}
            >
              {category.icon}
            </div>
            
            <div className={styles.categoryContent}>
              <h4 className={styles.categoryName}>{category.name}</h4>
              <p className={styles.categoryDescription}>
                {category.description}
              </p>
              
              <div className={styles.categoryStats}>
                <span className={styles.errorCount}>
                  {category.count} errores
                </span>
                <div 
                  className={styles.progressBar}
                  style={{ backgroundColor: category.color + '20' }}
                >
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${(category.count / Math.max(...categories.map(c => c.count))) * 100}%`,
                      backgroundColor: category.color
                    }}
                  />
                </div>
              </div>
            </div>

            {selectedCategory === category.id && (
              <div className={styles.categoryDetails}>
                <h5>Errores más comunes en esta categoría:</h5>
                <ul className={styles.commonErrors}>
                  {_getCommonErrorsForCategory(category.id).map((error, index) => (
                    <li key={index} className={styles.commonError}>
                      <span className={styles.errorTitle}>{error.title}</span>
                      <span className={styles.errorFrequency}>
                        {error.frequency} reportes
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={styles.viewAllButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Implementar navegación a categoría específica
                  }}
                >
                  Ver todos los errores →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>🔍</div>
          <h4>No se encontraron categorías</h4>
          <p>Prueba con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  );
}

// Función auxiliar para obtener errores comunes por categoría
function _getCommonErrorsForCategory(categoryId: string) {
  const commonErrors = {
    'installation': [
      { title: 'Flutter SDK not found', frequency: 12 },
      { title: 'Android license status unknown', frequency: 8 },
      { title: 'Xcode installation incomplete', frequency: 6 }
    ],
    'dependencies': [
      { title: 'Package version conflict', frequency: 15 },
      { title: 'Could not resolve package', frequency: 10 },
      { title: 'Pub get failed', frequency: 7 }
    ],
    'ui-widgets': [
      { title: 'RenderFlex overflowed', frequency: 20 },
      { title: 'Widget not disposed properly', frequency: 12 },
      { title: 'setState called after dispose', frequency: 8 }
    ],
    'architecture': [
      { title: 'BlocProvider not found', frequency: 11 },
      { title: 'Provider not found in context', frequency: 9 },
      { title: 'Bad state: Stream already listened', frequency: 5 }
    ],
    'firebase': [
      { title: 'Firebase not initialized', frequency: 14 },
      { title: 'Google services missing', frequency: 9 },
      { title: 'Firebase auth state issues', frequency: 7 }
    ]
  };

  return commonErrors[categoryId] || [
    { title: 'Error común 1', frequency: 5 },
    { title: 'Error común 2', frequency: 3 },
    { title: 'Error común 3', frequency: 2 }
  ];
}