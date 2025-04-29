import { NextRequest, NextResponse } from 'next/server';
import getUserSession from '@/utils/getUserData';
import prisma from '@/lib/db';
import { folderSchema } from '../schema';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getUserSession();
    const id = await params.id;
    
    const folder = await prisma.folder.findUnique({
      where: { id },
      include: {
        links: {
          include: {
            tags: true,
          },
          orderBy: { createdAt: 'desc' },
        }
      }
    });
    
    if (!folder) {
      return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
    }
    
    if (folder.userId !== session?.user?.id && !folder.isPublic) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return NextResponse.json(folder);
  } catch (error) {
    console.error('Failed to get folder:', error);
    return NextResponse.json({ error: 'Failed to get folder' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getUserSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    const body = await req.json();
    const validatedData = folderSchema.parse(body);
    
    const existingFolder = await prisma.folder.findUnique({
      where: { id }
    });
    
    if (!existingFolder) {
      return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
    }
    
    if (existingFolder.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const updateData = {
      ...validatedData,
    };
    
    if (typeof validatedData.isPublic !== 'undefined' && validatedData.isPublic !== existingFolder.isPublic) {
      updateData.shareUrl = validatedData.isPublic ? 
        `${process.env.NEXTAUTH_URL}/shared/folder/${crypto.randomUUID()}` : 
        null;
    }
    
    const updatedFolder = await prisma.folder.update({
      where: { id },
      data: updateData
    });
    
    return NextResponse.json(updatedFolder);
  } catch (error) {
    console.error('Failed to update folder:', error);
    return NextResponse.json({ error: 'Failed to update folder' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getUserSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const id = params.id;
    
    const folder = await prisma.folder.findUnique({
      where: { id }
    });
    
    if (!folder) {
      return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
    }
    
    if (folder.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await db.folder.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete folder:', error);
    return NextResponse.json({ error: 'Failed to delete folder' }, { status: 500 });
  }
}