export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Kurosawa - streaming platform',
  description: 'Make beautiful websites regardless of your design experience.',
  navItems: [
    {
      label: 'TV',
      href: '/',
    },
    {
      label: 'Friends',
      href: '/',
    },
    {
      label: 'Inventory',
      href: '/',
    },
    {
      label: 'Shop',
      href: '/',
    },
  ],
  navMenuItems: [
    {
      label: 'TV',
      href: '/',
    },
    {
      label: 'Friends',
      href: '/',
    },
    {
      label: 'Inventory',
      href: '/',
    },
    {
      label: 'Shop',
      href: '/',
    },
    {
      label: 'Log out',
      href: '/logout',
    },
  ],
  links: {
    login: '/login',
    signup: '/signup',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};
