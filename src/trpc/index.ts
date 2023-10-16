import { db } from "@/db";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const appRouter = router({
  /**
   * Handles user authentication and database operations.
   * @function
   * @async
   * @returns {Promise<{ success: boolean }>} A promise that resolves to an object indicating the operation's success.
   * @throws {TRPCError} Throws an error with code "UNAUTHORIZED" if the user is not authenticated.
   */
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user || !user.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    if (user && user.id) {
      // Check if user is in the DB and create if not found
      const dbUser = await db.user.upsert({
        where: { id: user.id },
        create: {
          id: user.id,
          email: user.email,
        },
        update: {},
      });

      console.log("TRPC User", dbUser);
      return { success: true };
    }
  }),
  /**
   * Retrieves files associated with the authenticated user.
   * @function
   * @async
   * @returns {Promise<File[]>} A promise that resolves to an array of files associated with the user.
   */
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId, user } = ctx;

    const id = userId;

    return await db.database.findMany({
      where: {
        userId: userId,
      },
    });
  }),
  /**
   * Deletes a file associated with the authenticated user.
   *
   * @function
   * @async
   *
   * @param {Object} params - Parameters for the function.
   * @param {Object} params.ctx - The execution context containing user information.
   * @param {string} params.ctx.userId - The user's unique ID.
   * @param {Object} params.input - Input parameters for the function.
   * @param {string} params.input.id - The ID of the file to be deleted.
   *
   * @throws {TRPCError} Throws an error with code "NOT_FOUND" if the file is not found.
   */
  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      // Check if the file exists and belongs to the user
      const file = await db.database.findFirst({
        where: {
          id: input.id,
          userId: userId,
        },
      });

      if (!file) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      // Delete the file
      await db.database.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
