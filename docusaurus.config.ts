import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Kamaleonte Flutter Academy',
  tagline: 'Guía completa de desarrollo Flutter para nuevos desarrolladores en prácticas',
  favicon: 'img/flutter-icon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://alejandrojimenezdiaz.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/flutterFormacion/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'alejandrojimenezdiaz', // Usually your GitHub org/user name.
  projectName: 'flutterFormacion', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/tu-usuario/flutter-guia-completa/tree/main/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          // Versioning
          includeCurrentVersion: true,
          // Enhanced features
          breadcrumbs: true,
          // SEO improvements
          remarkPlugins: [],
          rehypePlugins: [],
        },
        blog: {
          showReadingTime: true,
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, options: {wordsPerMinute: 200}}),
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            copyright: `Copyright © ${new Date().getFullYear()} Flutter Guía Completa`,
            createFeedItems: async (params) => {
              const {blogPosts, defaultCreateFeedItems, ...rest} = params;
              return defaultCreateFeedItems({
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
          editUrl: 'https://github.com/tu-usuario/flutter-guia-completa/tree/main/',
          blogTitle: 'Flutter Blog - Guía Completa',
          blogDescription: 'Tips, trucos y novedades de Flutter para desarrolladores',
          postsPerPage: 10,
          blogSidebarCount: 5,
          blogSidebarTitle: 'Posts Recientes',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          // Tags page
          tagsBasePath: 'tags',
          // Archives
          archiveBasePath: 'archive',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-XXXXXXXXXX', // Replace with your Google Analytics ID
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // PWA plugin for offline functionality
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/flutter-icon.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#02569B',
          },
        ],
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/flutter-social-card.png',
    navbar: {
      title: 'Kamaleonte Academy',
      logo: {
        alt: 'Kamaleonte Logo',
        src: 'img/kamaleonte-logo.svg',
        srcDark: 'img/kamaleonte-logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '📚 Guía',
        },
        {to: '/blog', label: '📝 Blog', position: 'left'},
        {to: '/progreso', label: '📊 Mi Progreso', position: 'left'},
        {
          type: 'dropdown',
          label: '🛠️ Herramientas',
          position: 'left',
          items: [
            {
              label: '⚙️ Configuración VS Code',
              to: '/docs/entorno/vscode',
            },
            {
              label: '🔍 Validador Flutter',
              to: '/tools/validator',
            },
            {
              label: '📦 Paquetes Recomendados',
              href: 'https://pub.dev',
            },
            {
              label: '🎯 Plantillas de Proyecto',
              href: 'https://github.com/flutter/samples',
            },
          ],
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/tu-usuario/flutter-guia-completa',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '📚 Documentación',
          items: [
            {
              label: '🚀 Comenzar',
              to: '/docs/intro',
            },
            {
              label: '⚙️ Configuración',
              to: '/docs/entorno/instalacion',
            },
            {
              label: '📱 Despliegue',
              to: '/docs/despliegue/google-play',
            },
          ],
        },
        {
          title: '🌍 Comunidad Flutter',
          items: [
            {
              label: 'Flutter.dev',
              href: 'https://flutter.dev',
            },
            {
              label: 'Pub.dev',
              href: 'https://pub.dev',
            },
            {
              label: 'Flutter Community',
              href: 'https://flutter.dev/community',
            },
          ],
        },
        {
          title: '🔗 Recursos',
          items: [
            {
              label: '📝 Blog',
              to: '/blog',
            },
            {
              label: '💻 GitHub',
              href: 'https://github.com/tu-usuario/flutter-guia-completa',
            },
            {
              label: '🎯 Ejemplos',
              href: 'https://github.com/flutter/samples',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Flutter Guía Completa. Construido con ❤️ y Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['dart', 'yaml', 'json', 'bash'],
    },
    // Enhanced UI features
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    // Announcement bar for important updates
    announcementBar: {
      id: 'flutter-launch',
      content:
        '🚀 <b>¡Nueva guía disponible!</b> Aprende Flutter desde cero hasta producción. <a target="_blank" rel="noopener noreferrer" href="/docs/intro">¡Comenzar ahora!</a>',
      backgroundColor: '#02569B',
      textColor: '#ffffff',
      isCloseable: true,
    },
    // Table of contents configuration
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    // Docs configuration
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    // Blog configuration
    blog: {
      sidebar: {
        groupByYear: true,
      },
    },
    // Live code blocks
    liveCodeBlock: {
      playgroundPosition: 'bottom',
    },
    // Search configuration (commented out Algolia, using local search instead)
    // algolia: {
    //   appId: 'YOUR_APP_ID',
    //   apiKey: 'YOUR_SEARCH_API_KEY', 
    //   indexName: 'flutter-guia-completa',
    //   contextualSearch: true,
    //   searchParameters: {},
    //   searchPagePath: 'search',
    // },
  } satisfies Preset.ThemeConfig,
};

export default config;
