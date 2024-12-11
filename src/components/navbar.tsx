'use client';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useEffect, useState } from 'react';
import { Avatar } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { MessageCircleIcon } from 'lucide-react';
import { getUserInfo } from '@/store/slices/user';

export const Navbar = () => {
  const { data, loading } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <NextUINavbar
      position="static"
      maxWidth="2xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="text-custom md:px-[10% relative mx-auto mt-[35px] flex h-[32px] w-full max-w-[1170px] items-center justify-start overflow-visible rounded-[17.5px] bg-primary px-[25px] text-base"
    >
      <NavbarContent className="basis-1/5 gap-12 sm:basis-full" justify="start">
        <Button
          className="ml-0 h-[40px] w-[140px] rounded-[17.5px] border-[4px] border-primary bg-base text-center font-custom text-[15px] leading-[22px] text-primary transition-colors duration-300 hover:bg-primary hover:text-base md:ml-[105px]"
          aria-label="Грати"
        >
          Грати
        </Button>
        <ul className="ml-[30px] hidden h-10 items-center space-x-[30px] font-custom text-base md:flex">
          {siteConfig.navItems.map(item => (
            <Link
              className="text-standard relative transition-all duration-300 hover:text-lg hover:after:absolute hover:after:left-0 hover:after:top-[calc(100%+10px)] hover:after:h-[2px] hover:after:w-full hover:after:bg-primary"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </ul>
      </NavbarContent>
      <NavbarContent
        className="hidden basis-1/5 sm:basis-full md:flex"
        justify="end"
      >
        <MessageCircleIcon
          className="absolute right-[10rem] hidden cursor-pointer md:flex"
          size={24}
        />
        {!data ? (
          <Link className="absolute right-[50px]" href={'/login'}>
            <div
              className="flex cursor-pointer items-center justify-center"
              onClick={() => router.replace(siteConfig.links.login)}
            >
              <div className="absolute h-[80px] w-[80px] rounded-full bg-primary"></div>
              <div className="relative flex h-[75px] w-[75px] items-center justify-center rounded-full border-[2px] border-dashed border-base">
                <span className="font-custom text-[14px]">Увійти</span>
              </div>
            </div>
          </Link>
        ) : (
          <Avatar
            size="lg"
            src="https://s3-alpha-sig.figma.com/img/b81a/3d66/3c6f9b66749639d081f4dda82c968c5f?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CN8lE-4LIi9ZWyXzS9TBxrwm3Sn-RFTfgzB-tT2NjHpoGTcteYmU0VgzuUp9biFTu7FEHMEdtGGVyUQZMYn28G6ea5RxWzFtz-p-3x7vvo53wlPJZ16mFdvG2joz11riVBE1XsYzDu6~Li9lITEQYTQuhz2dAO9e057VHjwX-dxlO4uYViRYVJBALulQMzdm1Oc3hUuCXKG0oxfn-rMmH0DGfmYJ5rTOceTL035i6nA3ZHIQQu4WG6iEEl7VKUPwUO8Ge6a38watOVn7dJpQZ1HzHuxKm2KDlza6EiLAAL6M2-199c-zFQfv09y0dkMUQilQlJPopeKf2pIufRiBxg__"
            className="absolute right-[50px] h-[80px] w-[80px]"
          />
        )}
      </NavbarContent>

      <NavbarContent className="pl-4 md:hidden" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item}-${index}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Link
                href={item.href}
                className="text-standard relative transition-all duration-300 hover:text-lg hover:after:absolute hover:after:left-0 hover:after:top-[calc(100%+10px)] hover:after:h-[2px] hover:after:w-full hover:after:bg-primary"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
