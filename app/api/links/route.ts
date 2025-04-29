import { NextRequest, NextResponse } from 'next/server';
import getUserSession from '@/utils/getUserData';
import prisma from '@/lib/db';
import { linkSchema } from './schema';

export async function GET(req: NextRequest) {
  try {
    const session = await getUserSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const folderId = searchParams.get('folderId');
    const source = searchParams.get('source');
    const query = searchParams.get('query');
    
    const whereClause: any = {
      userId: session.user.id,
    };
    
    if (folderId) {
      whereClause.folderId = folderId;
    }
    
    if (source) {
      whereClause.source = source;
    }
    
    if (query) {
      whereClause.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { notes: { contains: query, mode: 'insensitive' } },
        { url: { contains: query, mode: 'insensitive' } },
      ];
    }
    
    const links = await prisma.link.findMany({
      where: whereClause,
      include: { 
        tags: true,
        folder: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(links);
  } catch (error) {
    console.error('Failed to get links:', error);
    return NextResponse.json({ error: 'Failed to get links' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getUserSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const validatedData = linkSchema.parse(body);

    const linkData = await prisma.link.create({
      data: {
        url: validatedData.url,
        title: validatedData.title,
        description: validatedData.description,
        notes: validatedData.notes,
        folderId: validatedData.folderId,
        tags: {
          connectOrCreate: body.tags.map((tag: { name: string; color: string }) => ({
            where: { 
              name: tag.name, 
            },
            create: { 
              name: tag.name, 
              color: tag.color, 
            },
          })),
        },
        userId: session.user.id,
      },
      include: { tags: true, folder: true },
    });

    return NextResponse.json({ linkData }, { status: 201 });
  } catch (error) {
    console.error('Failed to create link:', error);
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
  }
}
