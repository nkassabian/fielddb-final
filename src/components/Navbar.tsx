import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ThemeToggle from "./ThemeToggle";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = () => {
  var versionNum = process.env.VERSION_NUMBER;

  return (
    <div className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b dark:border-gray-700 border-gray-200 dark:bg-black/70 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b dark:border-zinc-700 border-zinc-200">
          <Link href={"/"} className="flex z-40 font-semibold">
            FieldDb
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <ThemeToggle />
              <Link
                href={"/pricing"}
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Pricing
              </Link>
              <LoginLink
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Log in
              </LoginLink>
              <RegisterLink
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Get Started <ArrowRight className="h-4 w-4 ml-2" />
              </RegisterLink>
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
