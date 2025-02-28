'use client';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { siteConfig } from '@/config/site';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useEffect, useState } from 'react';
import { Avatar } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/store/slices/user';
import Link from 'next/link';

export const Navbar = () => {
  const { data, loading } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
      <NextUINavbar
          position="static"
          maxWidth="2xl"
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          className="relative mx-auto mt-[35px] flex h-[32px] w-full max-w-[1170px] items-center justify-start overflow-visible rounded-[17.5px] bg-darkHome px-[25px] text-base sm:px-[25px] sm:w-[calc(100%-50px)]"
      >
      <NavbarContent
            className="ml-28 basis-1/5 gap-[35px] sm:basis-full"
            justify="start"
        >
          <Button
              as={Link}
              href="/rooms"
              className="h-[40px] w-[140px] shrink-0 rounded-[17.5px] border-[4px] border-darkHome bg-base text-center font-custom text-[15px] leading-[22px] text-darkHome transition-colors duration-300 hover:border-base hover:bg-darkHome hover:text-base"
              aria-label="Грати"
          >
            Play
          </Button>

          <ul className="hidden h-10 items-center space-x-[30px] font-custom text-base md:flex">
            {siteConfig.navItems.map(item => (
                <Link
                    key={item.href + item.label}
                    className="relative inline-block text-standard transition-all duration-300 hover:scale-110 hover:after:absolute hover:after:left-0 hover:after:top-[calc(100%+10px)] hover:after:h-[1px] hover:after:w-full hover:after:bg-base"
                    href={item.href}
                >
                  {item.label}
                </Link>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent className="absolute right-[50px] top-0 hidden items-center justify-end sm:flex md:flex">
          <div className="flex items-center gap-[15px]">
            <img src="/images/icon_chat_nav.svg" alt="Chat Icon" />

            {!data ? (
                <Link href={'/login'}>
                  <div
                      className="relative flex cursor-pointer items-center justify-center"
                      onClick={() => router.replace(siteConfig.links.login)}
                  >
                    <div className="absolute h-[80px] w-[80px] rounded-full bg-darkHome"></div>
                    <div className="relative flex h-[75px] w-[75px] items-center justify-center rounded-full border-[1px] border-dashed border-base">
                      <span className="font-custom text-[14px]">Login</span>
                    </div>
                  </div>
                </Link>
            ) : (
                <Avatar
                    size="lg"
                    src="https://s3-alpha-sig.figma.com/img/b81a/3d66/3c6f9b66749639d081f4dda82c968c5f?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CN8lE-4LIi9ZWyXzS9TBxrwm3Sn-RFTfgzB-tT2NjHpoGTcteYmU0VgzuUp9biFTu7FEHMEdtGGVyUQZMYn28G6ea5RxWzFtz-p-3x7vvo53wlPJZ16mFdvG2joz11riVBE1XsYzDu6~Li9lITEQYTQuhz2dAO9e057VHjwX-dxlO4uYViRYVJBALulQMzdm1Oc3hUuCXKG0oxfn-rMmH0DGfmYJ5rTOceTL035i6nA3ZHIQQu4WG6iEEl7VKUPwUO8Ge6a38watOVn7dJpQZ1HzHuxKm2KDlza6EiLAAL6M2-199c-zFQfv09y0dkMUQilQlJPopeKf2pIufRiBxg__"
                    className="h-[80px] w-[80px]"
                />
            )}
          </div>
        </NavbarContent>

        <NavbarContent className="pl-4 md:hidden" justify="end">
          <img
              src="/images/menu_navbar.svg"
              alt="Menu"
              onClick={toggleMenu}
              className="cursor-pointer"
          />
        </NavbarContent>

        {isMenuOpen && (
            <NavbarMenu className="absolute top-0 right-0 mt-[50px] bg-white shadow-md p-4">
              <div className="mx-4 mt-2 flex flex-col gap-2">
                {siteConfig.navMenuItems.map((item, index) => (
                    <NavbarMenuItem
                        key={`${item}-${index}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                      <Link
                          href={item.href}
                          className="relative text-standard transition-all duration-300 hover:text-lg hover:after:absolute hover:after:left-0 hover:after:top-[calc(100%+10px)] hover:after:h-[2px] hover:after:w-full hover:after:bg-primary"
                      >
                        {item.label}
                      </Link>
                    </NavbarMenuItem>
                ))}
              </div>
            </NavbarMenu>
        )}
      </NextUINavbar>
  );
};
