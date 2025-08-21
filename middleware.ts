import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const authHeader = req.headers.get("authorization");

	// If the Authorization header is not present, prompt for login
	if (!authHeader) {
		return new Response(
			`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Access Denied</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background-color: #f9f9f9;
                  margin: 0;
                  padding: 0;
              }
              h1 {
                  color: #333;
              }
              p {
                  margin-bottom: 20px;
              }
              button {
                  background-color: #0070f3;
                  color: white;
                  padding: 10px 20px;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 16px;
                  display: flex;
                  align-items: center;
                  gap: 10px;
              }
              button:hover {
                  background-color: #005bb5;
              }
              .icon {
                  font-size: 24px;
              }
          </style>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      </head>
      <body>
          <h1><i class="fas fa-exclamation-triangle icon"></i> Sorry, you don't have access to this page.</h1>
          <p>Please use the button below to go back to the home page.</p>
          <button onclick="window.location.href='/'"><i class="fas fa-home"></i> Back to Home Page</button>
      </body>
      </html>
      `,
			{
				status: 401,
				headers: {
					"Content-Type": "text/html",
					"WWW-Authenticate": 'Basic realm="Secure Area"',
				},
			}
		);
	}

	// Decode the authorization header
	const auth = authHeader.split(" ")[1];
	const [user, pwd] = Buffer.from(auth, "base64").toString().split(":");

	// Check if username is 'wedding' and password is '14725'
	if (user !== "wedding" || pwd !== "14725") {
		// Redirect to the custom "Access Denied" page if credentials are incorrect
		return new Response(
			`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Access Denied</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background-color: #f9f9f9;
                  margin: 0;
                  padding: 0;
              }
              h1 {
                  color: #333;
              }
              p {
                  margin-bottom: 20px;
              }
              button {
                  background-color: #0070f3;
                  color: white;
                  padding: 10px 20px;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 16px;
                  display: flex;
                  align-items: center;
                  gap: 10px;
              }
              button:hover {
                  background-color: #005bb5;
              }
              .icon {
                  font-size: 24px;
              }
          </style>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      </head>
      <body>
          <h1><i class="fas fa-exclamation-triangle icon"></i> Sorry, you don't have access to this page.</h1>
          <p>Please use the button below to go back to the home page.</p>
          <button onclick="window.location.href='/'"><i class="fas fa-home"></i> Back to Home Page</button>
      </body>
      </html>
      `,
			{
				status: 403,
				headers: {
					"Content-Type": "text/html",
				},
			}
		);
	}

	// If authorization is successful, continue to the requested page
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/admin/:path*",
		"/check-in/:path*",
		"/stats/:path*",
		"/comments/:path*",
		"/check-in/:path*",
	], // Protect only admin and check-in routes
};
