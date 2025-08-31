import React, { useState, useMemo } from 'react';
import styles from './styles.module.css';

interface ErrorReport {
  id: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  author: string;
  date: string;
  status: 'open' | 'in-progress' | 'solved';
  votes: number;
  solutions: number;
  tags: string[];
  environment: {
    flutter: string;
    os: string;
  };
}

// Casos documentados por practicantes
const mockErrors: ErrorReport[] = [
  {
    id: '1',
    title: 'RenderFlex overflowed by pixels en ListView',
    category: 'ui-widgets',
    priority: 'medium',
    description: 'Durante el desarrollo del módulo de listado de selfies, aparece error de overflow cuando el contenido es muy largo...',
    author: 'Ana García (Practicante)',
    date: '2025-08-28',
    status: 'solved',
    votes: 8,
    solutions: 2,
    tags: ['ListView', 'Overflow', 'RenderFlex', 'SelfieStreet'],
    environment: { flutter: '3.16.5', os: 'macOS' }
  },
  {
    id: '2',
    title: 'Firebase Auth state listener no funciona después de hot reload',
    category: 'firebase',
    priority: 'high',
    description: 'En el módulo de autenticación de SelfieStreet, después de hacer hot reload, el listener de estado deja de funcionar...',
    author: 'Carlos Mendez (Practicante)',
    date: '2025-08-27',
    status: 'in-progress',
    votes: 5,
    solutions: 1,
    tags: ['Firebase', 'Auth', 'Hot Reload', 'SelfieStreet'],
    environment: { flutter: '3.16.3', os: 'Windows' }
  },
  {
    id: '3',
    title: 'Error de compilación: Could not resolve package dependencies',
    category: 'dependencies',
    priority: 'critical',
    description: 'Al configurar el entorno de desarrollo para SelfieStreet, aparece error de dependencias después de agregar flutter_bloc...',
    author: 'María López (Practicante)',
    date: '2025-08-26',
    status: 'open',
    votes: 7,
    solutions: 1,
    tags: ['Dependencies', 'flutter_bloc', 'Setup', 'SelfieStreet'],
    environment: { flutter: '3.15.2', os: 'Linux' }
  },
  {
    id: '4',
    title: 'BlocProvider.of() called with context that does not contain a Bloc',
    category: 'architecture',
    priority: 'medium',
    description: 'Implementando la arquitectura BLoC en SelfieStreet, intento acceder a un BLoC desde un widget hijo pero aparece este error...',
    author: 'Diego Ramírez (Practicante)',
    date: '2025-08-25',
    status: 'solved',
    votes: 4,
    solutions: 2,
    tags: ['BLoC', 'Provider', 'Context', 'Architecture'],
    environment: { flutter: '3.16.1', os: 'macOS' }
  },
  {
    id: '5',
    title: 'Problema con permisos de cámara en Android',
    category: 'platform',
    priority: 'high',
    description: 'Durante las pruebas de SelfieStreet en Android 13+, la app crashea al solicitar permisos de cámara para capturar selfies...',
    author: 'Laura Silva (Practicante)',
    date: '2025-08-24',
    status: 'in-progress',
    votes: 6,
    solutions: 1,
    tags: ['Android', 'Permissions', 'Camera', 'SelfieStreet'],
    environment: { flutter: '3.16.0', os: 'Windows' }
  },
  {
    id: '6',
    title: 'Tests unitarios fallan con Provider',
    category: 'testing',
    priority: 'low',
    description: 'Al implementar testing para los widgets de SelfieStreet que usan Provider, los tests unitarios fallan consistentemente...',
    author: 'Roberto Castro (Practicante)',
    date: '2025-08-23',
    status: 'solved',
    votes: 3,
    solutions: 1,
    tags: ['Testing', 'Provider', 'Unit Tests', 'Quality'],
    environment: { flutter: '3.15.8', os: 'macOS' }
  }
];

const categories = {
  'installation': { name: 'Instalación', icon: '🚀', color: '#ff6b6b' },
  'dependencies': { name: 'Dependencias', icon: '📦', color: '#4ecdc4' },
  'ui-widgets': { name: 'UI/Widgets', icon: '🎨', color: '#45b7d1' },
  'architecture': { name: 'Arquitectura', icon: '🏗️', color: '#96ceb4' },
  'firebase': { name: 'Firebase', icon: '🔥', color: '#ffeaa7' },
  'platform': { name: 'Platform', icon: '📱', color: '#fd79a8' },
  'testing': { name: 'Testing', icon: '🧪', color: '#a29bfe' },
  'deployment': { name: 'Deployment', icon: '🚀', color: '#fd79a8' },
  'performance': { name: 'Performance', icon: '⚡', color: '#fdcb6e' },
  'others': { name: 'Otros', icon: '🔧', color: '#6c5ce7' },
};

const priorities = {
  'low': { name: 'Baja', color: '#10b981', icon: '🟢' },
  'medium': { name: 'Media', color: '#f59e0b', icon: '🟡' },
  'high': { name: 'Alta', color: '#f97316', icon: '🟠' },
  'critical': { name: 'Crítica', color: '#ef4444', icon: '🔴' },
};

const statuses = {
  'open': { name: 'Abierto', color: '#6b7280', icon: '🔍' },
  'in-progress': { name: 'En Progreso', color: '#3b82f6', icon: '🔧' },
  'solved': { name: 'Resuelto', color: '#10b981', icon: '✅' },
};

export default function ErrorList(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'votes' | 'solutions'>('date');
  const [expandedError, setExpandedError] = useState<string | null>(null);

  const filteredAndSortedErrors = useMemo(() => {
    let filtered = mockErrors.filter(error => {
      const matchesSearch = error.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           error.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           error.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || error.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || error.status === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || error.priority === selectedPriority;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'votes':
          return b.votes - a.votes;
        case 'solutions':
          return b.solutions - a.solutions;
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedStatus, selectedPriority, sortBy]);

  const handleVote = (errorId: string) => {
    // En producción, aquí harías la llamada a la API
    console.log(`Voting for error: ${errorId}`);
  };

  return (
    <div className={styles.errorListContainer}>
      {/* Filtros */}
      <div className={styles.filtersContainer}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="🔍 Buscar errores, tags, descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filtersGrid}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Categoría</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Todas las categorías</option>
              {Object.entries(categories).map(([key, cat]) => (
                <option key={key} value={key}>{cat.icon} {cat.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Estado</label>
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Todos los estados</option>
              {Object.entries(statuses).map(([key, status]) => (
                <option key={key} value={key}>{status.icon} {status.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Prioridad</label>
            <select 
              value={selectedPriority} 
              onChange={(e) => setSelectedPriority(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Todas las prioridades</option>
              {Object.entries(priorities).map(([key, priority]) => (
                <option key={key} value={key}>{priority.icon} {priority.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Ordenar por</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as 'date' | 'votes' | 'solutions')}
              className={styles.filterSelect}
            >
              <option value="date">📅 Más recientes</option>
              <option value="votes">👍 Más votados</option>
              <option value="solutions">💡 Más soluciones</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className={styles.resultsHeader}>
        <h4>📋 {filteredAndSortedErrors.length} errores encontrados</h4>
        {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' || selectedPriority !== 'all') && (
          <button 
            className={styles.clearFiltersButton}
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedStatus('all');
              setSelectedPriority('all');
            }}
          >
            🗑️ Limpiar filtros
          </button>
        )}
      </div>

      {/* Lista de errores */}
      <div className={styles.errorsList}>
        {filteredAndSortedErrors.map((error) => (
          <div key={error.id} className={styles.errorCard}>
            <div className={styles.errorHeader}>
              <div className={styles.errorMeta}>
                <div className={styles.categoryBadge} style={{ backgroundColor: categories[error.category]?.color + '20' }}>
                  <span style={{ color: categories[error.category]?.color }}>
                    {categories[error.category]?.icon} {categories[error.category]?.name}
                  </span>
                </div>
                
                <div className={styles.priorityBadge} style={{ backgroundColor: priorities[error.priority].color + '20' }}>
                  <span style={{ color: priorities[error.priority].color }}>
                    {priorities[error.priority].icon} {priorities[error.priority].name}
                  </span>
                </div>

                <div className={styles.statusBadge} style={{ backgroundColor: statuses[error.status].color + '20' }}>
                  <span style={{ color: statuses[error.status].color }}>
                    {statuses[error.status].icon} {statuses[error.status].name}
                  </span>
                </div>
              </div>

              <div className={styles.errorStats}>
                <span className={styles.stat}>👍 {error.votes}</span>
                <span className={styles.stat}>💡 {error.solutions}</span>
              </div>
            </div>

            <h3 
              className={styles.errorTitle}
              onClick={() => setExpandedError(expandedError === error.id ? null : error.id)}
            >
              {error.title}
            </h3>

            <p className={styles.errorDescription}>
              {error.description}
            </p>

            <div className={styles.errorTags}>
              {error.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.errorFooter}>
              <div className={styles.errorInfo}>
                <span className={styles.author}>👤 {error.author}</span>
                <span className={styles.date}>📅 {new Date(error.date).toLocaleDateString('es-ES')}</span>
                <span className={styles.environment}>
                  📱 Flutter {error.environment.flutter} • {error.environment.os}
                </span>
              </div>

              <div className={styles.errorActions}>
                <button 
                  className={styles.voteButton}
                  onClick={() => handleVote(error.id)}
                >
                  👍 Votar
                </button>
                <button 
                  className={styles.expandButton}
                  onClick={() => setExpandedError(expandedError === error.id ? null : error.id)}
                >
                  {expandedError === error.id ? '👆 Ocultar' : '👀 Ver detalles'}
                </button>
              </div>
            </div>

            {expandedError === error.id && (
              <div className={styles.errorDetails}>
                <div className={styles.detailsSection}>
                  <h5>🔍 Información Completa</h5>
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                      <strong>ID:</strong> {error.id}
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Entorno completo:</strong> 
                      Flutter {error.environment.flutter} en {error.environment.os}
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Estado:</strong> {statuses[error.status].name}
                    </div>
                  </div>
                </div>

                {error.solutions > 0 && (
                  <div className={styles.solutionsSection}>
                    <h5>💡 Soluciones Propuestas ({error.solutions})</h5>
                    <div className={styles.solutionCard}>
                      <div className={styles.solutionAuthor}>🧑‍💻 Juan Pérez</div>
                      <div className={styles.solutionContent}>
                        Para resolver este problema, asegúrate de envolver tu ListView en un Expanded o Flexible widget...
                      </div>
                      <div className={styles.solutionActions}>
                        <button className={styles.solutionVote}>👍 15</button>
                        <button className={styles.solutionReply}>💬 Responder</button>
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.discussionSection}>
                  <h5>💬 Discusión</h5>
                  <textarea 
                    className={styles.commentInput}
                    placeholder="Agregar comentario o solución..."
                    rows={3}
                  />
                  <button className={styles.commentSubmit}>📝 Comentar</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredAndSortedErrors.length === 0 && (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>🔍</div>
          <h4>No se encontraron errores</h4>
          <p>Prueba con diferentes filtros o términos de búsqueda</p>
        </div>
      )}
    </div>
  );
}