import { NextRequest, NextResponse } from 'next/server';
import { authClient } from '@/lib/auth-client';
import { z } from 'zod';
import prisma from '@/lib/db';

const folderSchema = z.object({
  name: z.string().min(1).max(100),
  color: z.enum([
    'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'gray', 'teal', 'indigo'
  ]).optional(),
  description: z.string().optional(),
  isPublic: z.boolean().optional(),
});


export async function GET(req: NextRequest) {
  try {
    const session = authClient.useSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const folders = await prisma.folder.findMany({
      where: {
        userId: session.data?.user.id
      },
      include: {
        _count: {
          select: { links: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
    console.log(folders,"folders");
    if(folders?.length === 0){
      return NextResponse.json({ message: 'No folders found Create Some folders' }, { status: 404 });
    }
    
    return NextResponse.json(folders);
  } catch (error) {
    console.error('Failed to get folders:', error);
    return NextResponse.json({ error: 'Failed to get folders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = authClient.useSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const validatedData = folderSchema.parse(body);
    
    const folder = await prisma.folder.create({
      data: {
        name: validatedData.name,
        color: validatedData.color,
        description: validatedData?.description || null,
        userId: session.data?.user.id,
        shareUrl: validatedData.isPublic ? `${process.env.NEXTAUTH_URL}/shared/folder/${crypto.randomUUID()}` : null,
      }
    });
    
    return NextResponse.json(folder);
  } catch (error) {
    console.error('Failed to create folder:', error);
    return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 });
  }
}
