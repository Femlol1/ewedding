import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// ✅ Prevent this API from being pre-rendered at build time
export const dynamic = "force-dynamic";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
	router: ourFileRouter,
});
