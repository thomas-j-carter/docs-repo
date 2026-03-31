import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Project Documentation',
  tagline: 'Public docs, tutorials, and build journal',
  url: 'https://docs.example.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',

  organizationName: 'your-org',
  projectName: 'your-project',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/your-org/your-repo/edit/main/apps/docs-public/',
          editCurrentVersion: true,
        },
        blog: {
          path: 'blog',
          routeBasePath: 'blog',
          showReadingTime: true,
          editUrl: 'https://github.com/your-org/your-repo/edit/main/apps/docs-public/',
          blogTitle: 'Captain’s Log',
          blogDescription: 'Public progress log and build journal',
          postsPerPage: 10,
          feedOptions: {
            type: ['rss', 'atom'],
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Project Docs',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'usersSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Journal', position: 'left'},
        {to: '/start', label: 'Start Here', position: 'left'},
        {to: '/versions', label: 'Versions', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
