import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';
import { db } from '@/lib/db';
import { getLinkMetadata } from '@/lib/metadata';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const id = params.id;
    
    const link = await db.link.findUnique({
      where: { id },
      include: {
        tags: true,
        folder: { select: { id: true, name: true } }
      }
    });
    
    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }
    
    if (link.userId !== session?.user?.id && !link.isPublic) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return NextResponse.json(link);
  } catch (error) {
    console.error('Failed to get link:', error);
    return NextResponse.json({ error: 'Failed to get link' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    const body = await req.json();
    const linkSchema = z.object({
      url: z.string().url().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      notes: z.string().optional(),
      folderId: z.string().optional().nullable(),
      tags: z.array(z.string()).optional(),
      isPublic: z.boolean().optional(),
    });
    
    const validatedData = linkSchema.parse(body);
    const { tags, ...linkData } = validatedData;
    
    const existingLink = await db.link.findUnique({
      where: { id },
      include: { tags: true }
    });
    
    if (!existingLink) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }
    
    if (existingLink.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    let metadata = {};
    if (linkData.url && linkData.url !== existingLink.url) {
      metadata = await getLinkMetadata(linkData.url);
    }
    
    const updateData: any = {
      ...linkData,
      ...metadata,
    };
    
    if (typeof linkData.isPublic !== 'undefined' && linkData.isPublic !== existingLink.isPublic) {
      updateData.shareUrl = linkData.isPublic ? 
        `${process.env.NEXTAUTH_URL}/shared/link/${crypto.randomUUID()}` : 
        null;
    }
    
    let tagUpdateData = {};
    if (tags) {
      tagUpdateData = {
        disconnect: existingLink.tags.map(tag => ({ id: tag.id })),
        connectOrCreate: tags.map(tag => ({
          where: { id: tag },
          create: { 
            id: tag,
            name: tag, 
            color: `#${Math.floor(Math.random()*16777215).toString(16)}` 
          }
        }))
      };
    }
    
    const updatedLink = await db.link.update({
      where: { id },
      data: {
        ...updateData,
        tags: tagUpdateData
      },
      include: {
        tags: true,
        folder: true
      }
    });
    
    return NextResponse.json(updatedLink);
  } catch (error) {
    console.error('Failed to update link:', error);
    return NextResponse.json({ error: 'Failed to update link' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    
    // Check if link exists and belongs to user
    const link = await db.link.findUnique({
      where: { id }
    });
    
    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }
    
    if (link.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await db.link.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete link:', error);
    return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 });
  }
}