import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, LucideCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  var versionNum = process.env.VERSION_NUMBER;
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200  px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50 dark:text-white bg-white dark:hover:border-gray-400 dark:hover:bg-black/50 dark:border-gray-200 dark:bg-transparent">
          <p className="text-sm font-semibold flex flex-row items-center gap-2 text-gray-700 dark:text-zinc-200">
            {/* <LucideCheck className="bg-green-500 rounded-full text-white w-4 h-4" /> */}
            FieldDb{" "}
            <code className="font-medium bg-gray-200 px-2 py-1 text-xs rounded-sm dark:bg-gray-800">
              v{versionNum}
            </code>{" "}
            Open Beta!
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Design, Diagram, <span className="text-green-600">Database</span>.
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-xl dark:text-zinc-200">
          Your Ultimate ERD Companion. Design elegant database schemas in
          Crow&apos;s Foot notation and effortlessly generate table scripts.
          Simplify your data modeling journey with FieldDB.
        </p>
        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          href="/dashboard"
          target="_blank"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      {/* {value proposition section} */}
      <div>
        <div className="relative isolate -z-10">
          <div
            aria-hidden="true"
            className="pointer-event-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#86ff80] to-[#89b5fc] opacity-30 sm:left-[calc(59% - 30rem]) sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl dark:bg-white/5 dark:ring-white/10 bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    alt="product-preview"
                    src="/dashboard-preview.jpg"
                    width={3360}
                    height={1758}
                    quality={100}
                    className="rounded-md bg-white p-2 sm:p-8 md:p-5 shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-event-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#86ff80] to-[#89b5fc] opacity-30 sm:left-[calc(59% - 36rem]) sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      {/* {Feature section} */}
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 dark:text-white sm:text-5xl">
              Forward Engineering Easily
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Place nodes, create relationsips, and get your code!
            </p>
          </div>
        </div>
      </div>

      {/* {Feature section} */}
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 dark:text-white sm:text-5xl">
              Start Generating in Minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Generating ER-Diagram SQL Codes has never been easier.
            </p>
          </div>
        </div>

        {/* {steps} */}
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-green-600">Step 1</span>
              <span className="text-xl font-semibold">
                Sign up for an account
              </span>
              <span className="mt-2 text-zinc-700 dark:text-zinc-400">
                Either starting out with a free plan or choose our{" "}
                <Link
                  href="pricing"
                  className="text-green-700 underline underline-offset-2"
                >
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-green-600">Step 2</span>
              <span className="text-xl font-semibold">Create your ERD</span>
              <span className="mt-2 text-zinc-700 dark:text-zinc-400">
                Use our advanced ERD maker using Crow&apos;s foot OR Chenn
                notation.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-green-600">Step 3</span>
              <span className="text-xl font-semibold">Get your code!</span>
              <span className="mt-2 text-zinc-700 dark:text-zinc-400">
                Our technologies then generate the respective SQL Code needed to
                generate the tables and relationships based on your ERD.
              </span>
            </div>
          </li>
        </ol>

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl dark:bg-white/5 dark:ring-white/10 bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                alt="product-preview"
                src="/file-upload-preview.jpg"
                width={1419}
                height={732}
                quality={100}
                className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
