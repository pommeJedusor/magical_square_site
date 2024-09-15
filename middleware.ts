import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Extract the language from the URL path
  const segments = request.nextUrl.pathname.split('/');
  const lang = segments[1]; // Get the first segment of the path

  // Define valid languages
  const validLanguages = ["en", "fr"];

  // Check if the lang parameter is valid
  if (lang && !validLanguages.includes(lang)) {
    // Find the first valid language (you can customize this logic)
    const newLang = validLanguages[0]; // Default to the first valid language

    // Construct the new URL with the valid language
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${newLang}${request.nextUrl.pathname.slice(lang.length + 1)}`; // Replace the lang segment

    // Redirect to the new URL
    return NextResponse.redirect(newUrl);
  }

  // If valid, continue to the requested page
  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.svg).*)'], // Exclude API routes and static files
};
