"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, HelpCircle, Minus } from "lucide-react";

const Page = () => {
  const pricingItems = [
    {
      plan: "Free",
      tagline: "For small side projects.",
      quota: 3,
      price: 0,
      features: [
        {
          text: "15 tables per schema",
          footnote: "The maximum amount of tables per schema.",
        },
        {
          text: "Forward Engineer to MySQL",
          footnote:
            "Generate the scripts (relationships, tables and indexes) in MySql.",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Export to PNG, JPG, or PDF",
          footnote: "Export an ERD project to a jpg, png or pdf.",
          negative: true,
        },
        {
          text: "Priority support",
          negative: true,
        },
      ],
    },
    {
      plan: "Pro",
      tagline: "For larger projects with higher needs.",
      quota: 15,
      price: 10,
      features: [
        {
          text: "15 tables per schema",
          footnote: "The maximum amount of tables per schema.",
        },
        {
          text: "Forward Engineer to multiple languages",
          footnote:
            "Generate the scripts (relationships, tables and indexes) in MySql, SQL Server, Postgress, Oracle and more.",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Export to PNG, JPG, or PDF",
          footnote: "Export an ERD project to a jpg, png or pdf.",
        },
        {
          text: "Priority support",
        },
      ],
    },
  ];

  return (
    <>
      <MaxWidthWrapper className="mb-8  mt-24 text-center max-w-5xl">
        <div className="mx-auto mb-10 sm:max-w-lg">
          <h1 className="text-6lx font-bold sm:text-7xl">Pricing</h1>
          <p className="mt-5 text-gray-600 sm:text-lg">
            Wether you&apos;re just trying out our service or need more,
            we&apos;ve got you covered.
          </p>
        </div>
        <div className="pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <TooltipProvider>
            {pricingItems.map(({ plan, tagline, quota, features, price }) => (
              <div
                key={plan}
                className={cn(
                  "relative rounded-2xl bg-white dark:bg-black shadow-lg",
                  {
                    "border-2 border-green-600 shadow-blue-200": plan === "Pro",
                    "border border-gray-200": plan !== "Pro",
                  }
                )}
              >
                {plan === "Pro" && (
                  <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-green-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white">
                    Upgrade Now
                  </div>
                )}
                <div className="p-5">
                  <h3 className="my-3 text-center font-display text-3xl font-bold">
                    {plan}
                  </h3>
                  <p className="text-gray-500">{tagline}</p>
                  <p className="my-5 font-display text-6xl font-semibold">
                    ${price}
                  </p>
                  <p className="text-gray-500">per month</p>
                </div>
                <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-700">
                  <div className="flex items-center space-x-1">
                    <p>{quota.toLocaleString()} Schemas</p>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger className="cursor-default ml-1.5">
                        <HelpCircle className="h-4 w-4 text-zinc-500" />
                      </TooltipTrigger>
                      <TooltipContent className="w-80 p-2">
                        How many tables you can have per project, per user.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <ul className="my-10 space-y-5 px-8">
                  {features.map(({ text, footnote, negative }) => (
                    <li key={text} className="flex space-x-5">
                      <div className="flex-shrink-0">
                        {negative ? (
                          <Minus className="h-6 w-6 text-gray-300" />
                        ) : (
                          <Check className="h-6 w-6 text-green-500" />
                        )}
                      </div>
                      {footnote ? (
                        <div className="flex items-center space-x-1">
                          <p
                            className={cn("text-gray-400 text-left", {
                              "text-gray-600": negative,
                            })}
                          >
                            {text}
                          </p>
                          <Tooltip delayDuration={300}>
                            <TooltipTrigger className="cursor-default ml-1.5">
                              <HelpCircle className="h-4 w-4 text-zinc-500" />
                            </TooltipTrigger>
                            <TooltipContent className="w-80 p-2">
                              {footnote}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      ) : (
                        <p
                          className={cn("text-gray-400", {
                            "text-gray-600": negative,
                          })}
                        >
                          {text}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200"></div>
                <div className="p-5">
                  <Button
                    className={buttonVariants({
                      variant: "default",
                      className: "w-full",
                      size: "lg",
                    })}
                  >
                    Buy now
                  </Button>
                </div>
              </div>
            ))}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
