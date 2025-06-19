import { NextRequest, NextResponse } from 'next/server';
import getUserSession from '@/utils/getUserData';
import prisma from '@/lib/db';
import { TagPropsTypes } from '@/types/types';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getUserSession();
    const id = (await params).id;
    
    const link = await prisma.link.findUnique({
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getUserSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = (await params).id;
    const body = await req.json();
    
    const { tags, ...linkData } = body;
    const existingLink = await prisma.link.findUnique({
      where: { id },
      include: { tags: true }
    });

    if (!existingLink) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }
    
    if (existingLink.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updateData = {
      ...linkData,
      updatedAt: new Date()
    };
    if (linkData.folderId === '') {
      delete updateData.folderId;
    }
    
    let tagUpdateData = {};
    if (tags) {
      tagUpdateData = {
        disconnect: existingLink.tags.map(tag => ({ id: tag.id })),
        connectOrCreate: tags.map((tag: TagPropsTypes) => ({
          where: { name: tag },
          create: {
            name: tag,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
          }
        }))
      };
    }
    
    const updatedLink = await prisma.link.update({
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getUserSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = (await params).id;

    // Check if link exists and belongs to user
    const link = await prisma.link.findUnique({
      where: { id }
    });

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    if (link.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.link.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Failed to delete link:', error);
    return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 });
  }
}
