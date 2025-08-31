import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Sidebar principal de la guía Flutter
  tutorialSidebar: [
    // Introducción
    'intro',
    
    // Preparación del entorno
    {
      type: 'category',
      label: '🛠️ Preparación del Entorno',
      collapsed: false,
      items: [
        'entorno/instalacion',
        'entorno/vscode',
      ],
    },
    
    // Proyecto base
    {
      type: 'category',
      label: '🏗️ Estructura del Proyecto',
      collapsed: false,
      items: [
        'proyecto/estructura',
      ],
    },
    
    // Desarrollo de la aplicación
    {
      type: 'category',
      label: '📱 Desarrollo',
      collapsed: false,
      items: [
        'desarrollo/auth',
        'desarrollo/arquitectura',
      ],
    },
    
    // Servicios e integraciones
    {
      type: 'category',
      label: '🌐 Servicios',
      collapsed: false,
      items: [
        'servicios/firebase',
      ],
    },
    
    // Despliegue en stores
    {
      type: 'category',
      label: '🚀 Despliegue',
      collapsed: false,
      items: [
        'despliegue/google-play',
      ],
    },
    
    // Comunidad y soporte
    {
      type: 'category',
      label: '🤝 Comunidad',
      collapsed: false,
      items: [
        'comunidad/registro-errores',
      ],
    },
    
    // Tutorial básico (ejemplos de Docusaurus - mantener ocultos por ahora)
    {
      type: 'category',
      label: '📚 Ejemplos Docusaurus',
      collapsed: true,
      items: [
        'tutorial-basics/create-a-document',
        'tutorial-basics/create-a-page',
        'tutorial-basics/create-a-blog-post',
        'tutorial-basics/markdown-features',
        'tutorial-basics/deploy-your-site',
        'tutorial-basics/congratulations',
      ],
    },
    
    // Extras
    {
      type: 'category',
      label: '🔧 Extras',
      collapsed: true,
      items: [
        'tutorial-extras/manage-docs-versions',
        'tutorial-extras/translate-your-site',
      ],
    },
  ],
};

export default sidebars;