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
      label: 'Друзі',
      href: '/',
    },
    {
      label: 'Інвентар',
      href: '/',
    },
    {
      label: 'Магазин',
      href: '/',
    },
  ],
  navMenuItems: [
    {
      label: 'TV',
      href: '/',
    },
    {
      label: 'Друзі',
      href: '/',
    },
    {
      label: 'Інвентар',
      href: '/',
    },
    {
      label: 'Магазин',
      href: '/',
    },
    {
      label: 'Вийти',
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
