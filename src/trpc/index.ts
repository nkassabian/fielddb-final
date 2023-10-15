import { db } from "@/db";
import { publicProcedure, router } from "./trpc";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  //Used to authenticate the user
  //more text
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();
    if (!user || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    if (user && user.id) {
      //check if user is in the DB
      const dbUser = await db.user.findFirst({
        where: {
          id: user?.id,
        },
      });

      console.log("TRCP User", dbUser);
      if (!dbUser) {
        //create dbuser
        await db.user.create({
          data: {
            id: user.id,
            email: user.email,
          },
        });
      }
      return { success: true };
    }
  }),
});

export type AppRouter = typeof appRouter;
