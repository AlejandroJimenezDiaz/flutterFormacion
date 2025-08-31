import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface UserData {
  name: string;
  email: string;
  userType: 'practicante' | 'trabajador';
  registeredAt: string;
  progress: {
    [key: string]: boolean;
  };
  completionPercentage: number;
}

const UserRegistration: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: 'practicante' as 'practicante' | 'trabajador'
  });

  // Secciones del curso para tracking
  const courseSections = [
    { id: 'intro', name: '🎓 Introducción', weight: 5 },
    { id: 'environment', name: '🛠️ Configuración del Entorno', weight: 10 },
    { id: 'project-structure', name: '🏗️ Estructura del Proyecto', weight: 15 },
    { id: 'ui-development', name: '🎨 Desarrollo UI/UX', weight: 20 },
    { id: 'auth', name: '🔐 Sistema de Autenticación', weight: 15 },
    { id: 'firebase', name: '🔥 Integración Firebase', weight: 10 },
    { id: 'payments', name: '💳 Sistema de Pagos', weight: 10 },
    { id: 'deployment', name: '🚀 Despliegue en Stores', weight: 15 }
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('flutterAcademyUser');
    if (savedUser) {
      const user: UserData = JSON.parse(savedUser);
      setUserData(user);
      setIsRegistered(true);
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser: UserData = {
      ...formData,
      registeredAt: new Date().toISOString(),
      progress: {},
      completionPercentage: 0
    };

    localStorage.setItem('flutterAcademyUser', JSON.stringify(newUser));
    setUserData(newUser);
    setIsRegistered(true);
  };

  const calculateProgress = (progress: { [key: string]: boolean }): number => {
    const completedWeight = courseSections
      .filter(section => progress[section.id])
      .reduce((total, section) => total + section.weight, 0);
    return Math.round(completedWeight);
  };

  const toggleSectionComplete = (sectionId: string) => {
    if (!userData) return;

    const newProgress = {
      ...userData.progress,
      [sectionId]: !userData.progress[sectionId]
    };

    const newPercentage = calculateProgress(newProgress);

    const updatedUser: UserData = {
      ...userData,
      progress: newProgress,
      completionPercentage: newPercentage
    };

    localStorage.setItem('flutterAcademyUser', JSON.stringify(updatedUser));
    setUserData(updatedUser);
  };

  const resetProgress = () => {
    if (!userData) return;
    
    const resetUser: UserData = {
      ...userData,
      progress: {},
      completionPercentage: 0
    };

    localStorage.setItem('flutterAcademyUser', JSON.stringify(resetUser));
    setUserData(resetUser);
  };

  const getUserTypeConfig = (userType: 'practicante' | 'trabajador') => {
    return userType === 'practicante' 
      ? {
          emoji: '👨‍🎓',
          title: 'Desarrollador en Prácticas',
          description: 'Estás aprendiendo Flutter como parte de tu programa de prácticas',
          color: '#02569B'
        }
      : {
          emoji: '👨‍💻',
          title: 'Desarrollador Trabajador',
          description: 'Estás mejorando tus skills de Flutter para proyectos profesionales',
          color: '#4CAF50'
        };
  };

  if (!isRegistered) {
    return (
      <div className={styles.registrationContainer}>
        <div className={styles.registrationCard}>
          <h2>🎓 Bienvenido a Kamaleonte Flutter Academy</h2>
          <p>Regístrate para comenzar tu aprendizaje y hacer seguimiento de tu progreso</p>
          
          <form onSubmit={handleRegister} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre completo</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                placeholder="Tu nombre completo"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                placeholder="tu.email@ejemplo.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="userType">Tipo de usuario</label>
              <select
                id="userType"
                value={formData.userType}
                onChange={(e) => setFormData({...formData, userType: e.target.value as 'practicante' | 'trabajador'})}
                required
              >
                <option value="practicante">👨‍🎓 Desarrollador en Prácticas</option>
                <option value="trabajador">👨‍💻 Desarrollador Trabajador</option>
              </select>
            </div>

            <button type="submit" className={styles.registerButton}>
              Comenzar Aprendizaje 🚀
            </button>
          </form>
        </div>
      </div>
    );
  }

  const userConfig = getUserTypeConfig(userData!.userType);

  return (
    <div className={styles.progressContainer}>
      <div className={styles.userInfo}>
        <div className={styles.userHeader}>
          <div className={styles.userAvatar}>
            {userConfig.emoji}
          </div>
          <div className={styles.userDetails}>
            <h3>{userData!.name}</h3>
            <p className={styles.userTypeLabel} style={{color: userConfig.color}}>
              {userConfig.title}
            </p>
            <p className={styles.userDescription}>
              {userConfig.description}
            </p>
          </div>
        </div>

        <div className={styles.progressSummary}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{width: `${userData!.completionPercentage}%`, backgroundColor: userConfig.color}}
            ></div>
          </div>
          <span className={styles.progressText}>
            {userData!.completionPercentage}% completado
          </span>
        </div>
      </div>

      <div className={styles.sectionsContainer}>
        <h4>📚 Progreso del Curso</h4>
        <div className={styles.sectionsList}>
          {courseSections.map(section => {
            const isCompleted = userData!.progress[section.id] || false;
            return (
              <div 
                key={section.id} 
                className={`${styles.sectionItem} ${isCompleted ? styles.completed : ''}`}
              >
                <div className={styles.sectionInfo}>
                  <span className={styles.sectionName}>{section.name}</span>
                  <span className={styles.sectionWeight}>{section.weight}%</span>
                </div>
                <button
                  onClick={() => toggleSectionComplete(section.id)}
                  className={`${styles.completeButton} ${isCompleted ? styles.completedButton : ''}`}
                  title={isCompleted ? 'Marcar como pendiente' : 'Marcar como completado'}
                >
                  {isCompleted ? '✅' : '⭕'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={resetProgress} className={styles.resetButton}>
          🔄 Reiniciar Progreso
        </button>
        <button 
          onClick={() => {
            localStorage.removeItem('flutterAcademyUser');
            setIsRegistered(false);
            setUserData(null);
          }} 
          className={styles.logoutButton}
        >
          👋 Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default UserRegistration;