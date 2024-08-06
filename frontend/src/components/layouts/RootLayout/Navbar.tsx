"use client";

import Link from "next/link";
import Image from "next/image";
import {
  IconBug,
  IconMenu2,
  IconRocket,
  IconBrandGithub,
  IconMessageChatbot,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import ActiveLink from "@/components/ActiveLink";
import { ThemeToggle } from "./ThemeToggle";
import useSystemStore from "@/store/system";

const NavSkeleton = () => (
  <div className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
    <Skeleton className="h-6 w-[100px]" />
    <Skeleton className="h-6 w-[100px]" />
    <Skeleton className="h-6 w-[100px]" />
  </div>
);

const Navbar = () => {
  const loading = useSystemStore((state) => state.loading);
  const optionSets = useSystemStore((state) => state.items);

  const [_, systems] = optionSets;

  return (
    <header className="sticky z-50 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      {/* desktop nav */}
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base h-6 w-6"
        >
          <Image
            src="/lowcode/omost/logo.png"
            width={24}
            height={24}
            alt="wukong"
            priority
          />
          <span className="sr-only">Omost</span>
        </Link>

        {loading ? (
          <NavSkeleton />
        ) : (
          <>
            {systems?.options.map((system) => (
              <ActiveLink
                key={system.key}
                href={`/system/${system.key}`}
                className="text-nowrap text-muted-foreground transition-colors hover:text-foreground"
                activeClassName="!text-foreground"
              >
                {system.value}
              </ActiveLink>
            ))}
          </>
        )}
      </nav>

      {/* mobile nav */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <IconMenu2 className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semiboldh-6 w-6"
            >
              <Image
                src="/logo.png"
                width={24}
                height={24}
                alt="wukong"
                priority
              />
              <span className="sr-only">Omost</span>
            </Link>

            {systems?.options.map((system) => (
              <ActiveLink
                key={system.key}
                href={`/system/${system.key}`}
                className="text-nowrap text-muted-foreground transition-colors hover:text-foreground"
                activeClassName="!text-foreground"
              >
                {system.value}
              </ActiveLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* social nav */}
      <div className="flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="/lowcode/omost/lei-zhang.jpg"
                  alt="Lei Zhang"
                />
                <AvatarFallback>Lei</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Lei Zhang</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconRocket className="mr-2 h-5 w-5" />
              <Link
                href={process.env.NEXT_PUBLIC_LOWCODE_RELEASE_URL!}
                target="_blank"
              >
                发布应用
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconBug className="mr-2 h-5 w-5" />
              <Link href="dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=skv_jbul4o042">
                报告问题
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconMessageChatbot className="mr-2 h-5 w-5" />
              <Link href="https://www.lovchun.com" target="_blank">
                👋 Hello!
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconBrandGithub className="mr-2 h-5 w-5" />
              <Link href="https://github.com/PassionZale" target="_blank">
                PassionZale
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
