import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, getNewToken, logOut } from './services/Auth';
import { isTokenExpired } from './lib/verifyToken';

const authRoutes = ['/login', '/register', '/reset-password'];

export const middleware = async (request: NextRequest) => {
  const { origin, pathname } = request.nextUrl;
  // const baseURL = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;

  const userInfo = await getCurrentUser(); // getting user-information
  const nextResponse = NextResponse.next(); // making default response
  const redirectToLogin = NextResponse.redirect(new URL('/login', request.url)); // redirectToLogin

  // if no user-information
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return nextResponse; // forwarding to the login/register/reset-password page
    } else {
      return NextResponse.redirect(`${origin}/login?redirectPath=${pathname}`);
    }
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // if no accessToken or it's expired
  if (!accessToken || (await isTokenExpired(accessToken))) {
    // if no refreshToken or it's expired, then logOut
    if (!refreshToken || (await isTokenExpired(refreshToken))) {
      try {
        await logOut();
        return redirectToLogin;
      } catch (error) {
        console.error('Logout failed:', error);
        return redirectToLogin;
      }
    }

    // if refreshToken is valid, get a new accessToken
    try {
      const { data } = await getNewToken(refreshToken); // Fetch a new token
      const newToken = data?.accessToken;
      if (newToken) {
        // setting newToken as accessToken
        nextResponse.cookies.set('accessToken', newToken, {
          httpOnly: true, // can't be accessed by document.cookie
          path: '/', // Cookie will be available everywhere
          secure: process.env.NODE_ENV === 'production', // will work on HTTPS, not HTTP
        });
        nextResponse.headers.set('X-Access-Token', newToken); // to give other functions immediate access to the new token
      } else {
        await logOut();
        return redirectToLogin;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      await logOut();
      return redirectToLogin;
    }
  }

  if (userInfo?.role) {
    return nextResponse; // forwarding to the permitted path
  }

  return NextResponse.redirect(new URL('/', request.url));
};

export const config = {
  matcher: [
    '/login',
    '/register',
    '/reset-password',
    '/add-post',
    '/profile',
    '/profile/:page*',
    '/dashboard',
    '/dashboard/:page*',
  ],
};
