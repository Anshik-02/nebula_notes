import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/not-found",
  "/_not-found",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    /*
     * Run middleware on all routes except:
     * - next internals
     * - static files
     * - error pages
     */
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
