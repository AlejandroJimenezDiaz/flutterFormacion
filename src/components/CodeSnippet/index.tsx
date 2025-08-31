import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  copyable?: boolean;
}

export default function CodeSnippet({ 
  code, 
  language = 'bash', 
  title = 'Terminal',
  copyable = true 
}: CodeSnippetProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={styles.codeSnippetContainer}>
      <div className={styles.header}>
        <span className={styles.title}>📱 {title}</span>
        {copyable && (
          <button 
            className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
            onClick={handleCopy}
            aria-label="Copiar código"
          >
            {copied ? '✅ Copiado!' : '📋 Copiar'}
          </button>
        )}
      </div>
      <div className={styles.codeContainer}>
        <CodeBlock language={language} title="">
          {code}
        </CodeBlock>
      </div>
    </div>
  );
}