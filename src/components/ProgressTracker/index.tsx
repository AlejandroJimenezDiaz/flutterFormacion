import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface ProgressItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: string;
}

interface ProgressTrackerProps {
  items: ProgressItem[];
  title?: string;
}

export default function ProgressTracker({ 
  items: initialItems, 
  title = "📋 Progreso de Instalación" 
}: ProgressTrackerProps): JSX.Element {
  const [items, setItems] = useState(initialItems);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const completedCount = items.filter(item => item.completed).length;
    const newProgress = (completedCount / items.length) * 100;
    setProgress(newProgress);
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className={styles.progressContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.progressInfo}>
          <span className={styles.progressText}>
            {Math.round(progress)}% Completado
          </span>
        </div>
      </div>
      
      <div className={styles.progressBarContainer}>
        <div 
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={styles.itemsList}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.item} ${item.completed ? styles.completed : ''}`}
            onClick={() => toggleItem(item.id)}
          >
            <div className={styles.itemNumber}>
              {item.completed ? '✅' : `${index + 1}`}
            </div>
            <div className={styles.itemContent}>
              <div className={styles.itemTitle}>
                <span className={styles.itemIcon}>{item.icon}</span>
                {item.title}
              </div>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
            <div className={styles.checkmark}>
              {item.completed && <span className={styles.checkmarkIcon}>✓</span>}
            </div>
          </div>
        ))}
      </div>

      {progress === 100 && (
        <div className={styles.completionMessage}>
          <div className={styles.celebration}>🎉</div>
          <h4>¡Perfecto! Instalación completada</h4>
          <p>Ya tienes todo listo para desarrollar con Flutter</p>
        </div>
      )}
    </div>
  );
}