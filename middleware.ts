import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_ADMIN_PATHS = ['/admin/login'];

async function isValidSession(token: string | undefined) {
  if (!token || !process.env.SESSION_SECRET) {
    return false;
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.SESSION_SECRET));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');
  const isUploadSignature = pathname.startsWith('/api/cloudinary/signature');

  if (!isAdminPage && !isAdminApi && !isUploadSignature) {
    return NextResponse.next();
  }

  if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_session')?.value;
  const valid = await isValidSession(token);

  if (valid) {
    return NextResponse.next();
  }

  if (isAdminApi || isUploadSignature) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/cloudinary/signature']
};
