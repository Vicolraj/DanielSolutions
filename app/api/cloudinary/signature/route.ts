import { NextResponse } from 'next/server';
import { z } from 'zod';
import { cloudinary } from '@/lib/cloudinary';

const bodySchema = z.object({
  slug: z.string().min(1),
  target: z.enum(['projects', 'testimonials', 'avatar', 'cv']),
  fileType: z.string().min(1),
  fileSize: z.number().positive()
});

export async function POST(request: Request) {
  try {
    const payload = bodySchema.parse(await request.json());

    const isPdf = payload.fileType === 'application/pdf';
    const isImage = payload.fileType.startsWith('image/');

    if (payload.target === 'cv') {
      if (!isPdf || payload.fileSize > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'CV must be a PDF up to 5MB.' }, { status: 400 });
      }
    } else if (!isImage || payload.fileSize > 8 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be up to 8MB.' }, { status: 400 });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = `${payload.slug}/${payload.target}`;
    const signature = cloudinary.utils.api_sign_request({ folder, timestamp }, process.env.CLOUDINARY_API_SECRET || '');

    return NextResponse.json({
      signature,
      timestamp,
      folder,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY
    });
  } catch {
    return NextResponse.json({ error: 'Invalid upload request' }, { status: 400 });
  }
}
