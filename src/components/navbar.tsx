import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@nextui-org/navbar';
import NextLink from 'next/link';
import clsx from 'clsx';
import { link as linkStyles } from '@nextui-org/theme';
import { Header } from './custom/Header';

export const Navbar = () => {
  return (
    <NextUINavbar
      maxWidth="xl"
      position="static"
      className="border-b-small border-b-neutral-300 pb-4 pt-4"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink
            className="flex items-center justify-start gap-1"
            href="/"
          ></NextLink>
        </NavbarBrand>
        <ul className="ml-2 hidden justify-start gap-4 lg:flex">
          {[{ href: '/rooms', label: 'Rooms' }].map(item => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:font-medium data-[active=true]:text-primary',
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden transition-all sm:flex sm:w-[10rem] lg:flex lg:w-[20rem]">
          <Header />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
