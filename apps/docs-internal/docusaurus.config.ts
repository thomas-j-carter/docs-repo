import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Internal Documentation',
  tagline: 'Engineering, architecture, operations, and internal journal',
  url: 'https://internal-docs.example.com',
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
          editUrl: 'https://github.com/your-org/your-repo/edit/main/apps/docs-internal/',
          editCurrentVersion: true,
        },
        blog: {
          path: 'blog',
          routeBasePath: 'blog',
          showReadingTime: true,
          editUrl: 'https://github.com/your-org/your-repo/edit/main/apps/docs-internal/',
          blogTitle: 'Internal Captain’s Log',
          blogDescription: 'Private engineering journal and build trace',
          postsPerPage: 20,
          feedOptions: {
            type: [], // disable feeds if desired
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
      title: 'Internal Docs',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'engineersSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Journal', position: 'left'},
        {to: '/documentation-map', label: 'Documentation Map', position: 'left'},
        {to: '/release-map', label: 'Release Map', position: 'left'},
        {to: '/contributor-workflow', label: 'Contributor Workflow', position: 'left'},
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
