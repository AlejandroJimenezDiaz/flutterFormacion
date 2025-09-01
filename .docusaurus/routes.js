import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/flutterFormacion/en/blog',
    component: ComponentCreator('/flutterFormacion/en/blog', '5ad'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/archive',
    component: ComponentCreator('/flutterFormacion/en/blog/archive', '13b'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/authors',
    component: ComponentCreator('/flutterFormacion/en/blog/authors', '1cb'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/flutterFormacion/en/blog/authors/all-sebastien-lorber-articles', '8bc'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/authors/yangshun',
    component: ComponentCreator('/flutterFormacion/en/blog/authors/yangshun', '37e'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/first-blog-post',
    component: ComponentCreator('/flutterFormacion/en/blog/first-blog-post', 'c89'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/lanzamiento-flutter-guia-completa',
    component: ComponentCreator('/flutterFormacion/en/blog/lanzamiento-flutter-guia-completa', '7a5'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/long-blog-post',
    component: ComponentCreator('/flutterFormacion/en/blog/long-blog-post', 'dc9'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/mdx-blog-post',
    component: ComponentCreator('/flutterFormacion/en/blog/mdx-blog-post', 'db6'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/tags',
    component: ComponentCreator('/flutterFormacion/en/blog/tags', '682'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/tags/anuncio',
    component: ComponentCreator('/flutterFormacion/en/blog/tags/anuncio', '714'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/tags/documentacion',
    component: ComponentCreator('/flutterFormacion/en/blog/tags/documentacion', '498'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/tags/docusaurus',
    component: ComponentCreator('/flutterFormacion/en/blog/tags/docusaurus', 'c79'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/tags/facebook',
    component: ComponentCreator('/flutterFormacion/en/blog/tags/facebook', '10a'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/tags/flutter',
    component: ComponentCreator('/flutterFormacion/en/blog/tags/flutter', '8ff'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/tags/hello',
    component: ComponentCreator('/flutterFormacion/en/blog/tags/hello', '67e'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/tags/hola',
    component: ComponentCreator('/flutterFormacion/en/blog/tags/hola', '8d2'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/blog/welcome',
    component: ComponentCreator('/flutterFormacion/en/blog/welcome', 'c51'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/markdown-page',
    component: ComponentCreator('/flutterFormacion/en/markdown-page', 'a2b'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/progreso',
    component: ComponentCreator('/flutterFormacion/en/progreso', '6aa'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/tools/validator',
    component: ComponentCreator('/flutterFormacion/en/tools/validator', '1b2'),
    exact: true
  },
  {
    path: '/flutterFormacion/en/docs',
    component: ComponentCreator('/flutterFormacion/en/docs', 'c2c'),
    routes: [
      {
        path: '/flutterFormacion/en/docs',
        component: ComponentCreator('/flutterFormacion/en/docs', '8de'),
        routes: [
          {
            path: '/flutterFormacion/en/docs',
            component: ComponentCreator('/flutterFormacion/en/docs', '6d2'),
            routes: [
              {
                path: '/flutterFormacion/en/docs/comunidad/registro-errores',
                component: ComponentCreator('/flutterFormacion/en/docs/comunidad/registro-errores', '383'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/desarrollo/arquitectura',
                component: ComponentCreator('/flutterFormacion/en/docs/desarrollo/arquitectura', 'a32'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/desarrollo/auth',
                component: ComponentCreator('/flutterFormacion/en/docs/desarrollo/auth', 'a65'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/desarrollo/navigation',
                component: ComponentCreator('/flutterFormacion/en/docs/desarrollo/navigation', '825'),
                exact: true
              },
              {
                path: '/flutterFormacion/en/docs/despliegue/app-store',
                component: ComponentCreator('/flutterFormacion/en/docs/despliegue/app-store', '9b3'),
                exact: true
              },
              {
                path: '/flutterFormacion/en/docs/despliegue/google-play',
                component: ComponentCreator('/flutterFormacion/en/docs/despliegue/google-play', '43c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/entorno/android-studio',
                component: ComponentCreator('/flutterFormacion/en/docs/entorno/android-studio', '4fa'),
                exact: true
              },
              {
                path: '/flutterFormacion/en/docs/entorno/instalacion',
                component: ComponentCreator('/flutterFormacion/en/docs/entorno/instalacion', '8c1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/entorno/vscode',
                component: ComponentCreator('/flutterFormacion/en/docs/entorno/vscode', '00b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/intro',
                component: ComponentCreator('/flutterFormacion/en/docs/intro', '6a9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/proyecto/estructura',
                component: ComponentCreator('/flutterFormacion/en/docs/proyecto/estructura', '9a7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/servicios/firebase',
                component: ComponentCreator('/flutterFormacion/en/docs/servicios/firebase', 'ad5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/servicios/payments',
                component: ComponentCreator('/flutterFormacion/en/docs/servicios/payments', '0bc'),
                exact: true
              },
              {
                path: '/flutterFormacion/en/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/flutterFormacion/en/docs/tutorial-basics/congratulations', '766'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/flutterFormacion/en/docs/tutorial-basics/create-a-blog-post', '0cd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/flutterFormacion/en/docs/tutorial-basics/create-a-document', 'ac7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/flutterFormacion/en/docs/tutorial-basics/create-a-page', '8c5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/flutterFormacion/en/docs/tutorial-basics/deploy-your-site', '74f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/flutterFormacion/en/docs/tutorial-basics/markdown-features', 'c98'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/flutterFormacion/en/docs/tutorial-extras/manage-docs-versions', 'f7c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/flutterFormacion/en/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/flutterFormacion/en/docs/tutorial-extras/translate-your-site', '137'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/flutterFormacion/en/',
    component: ComponentCreator('/flutterFormacion/en/', '9e9'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
