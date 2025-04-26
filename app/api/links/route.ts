import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
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
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const validatedData = linkSchema.parse(body);
    
    const { tags, ...linkData } = validatedData;
    
    const metadata = await fetch(`https://api.linkpreview.net/?key=${process.env.LINK_PREVIEW_API_KEY}&q=${linkData.url}`) 
    
    const link = await prisma.link.create({
      data: {
        ...linkData,
        userId: session.user.id,
        title: linkData.title || metadata.title,
        description: linkData.description || metadata.description,
        thumbnail: metadata.image,
        favicon: metadata.favicon,
        source: metadata.source,
        tags: tags ? {
          connectOrCreate: tags.map(tag => ({
            where: { id: tag },
            create: { 
              id: tag,
              name: tag, 
              color: `#${Math.floor(Math.random()*16777215).toString(16)}` 
            }
          }))
        } : undefined,
        shareUrl: linkData.isPublic ? `${process.env.NEXTAUTH_URL}/shared/link/${crypto.randomUUID()}` : null,
      },
      include: {
        tags: true,
        folder: { select: { id: true, name: true } }
      }
    });
    
    return NextResponse.json(link);
  } catch (error) {
    console.error('Failed to create link:', error);
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
  }
}
