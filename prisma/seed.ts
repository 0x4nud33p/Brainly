import prisma from "@/lib/db";
import { hash } from "bcryptjs";

async function main() {
  const password = await hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password,
      folders: {
        create: [
          {
            name: "My First Folder",
            description: "A folder for my links",
            isPublic: true,
            links: {
              create: [
                {
                  url: "https://example.com",
                  title: "Example Site",
                  description: "This is a test link",
                  isPublic: true,
                  userId: "1",
                },
              ],
            },
          },
        ],
      },
      links: {
        create: [
          {
            url: "https://anotherexample.com",
            title: "Another Site",
            description: "Another test link",
            isPublic: false,
          },
        ],
      },
    },
  });

  console.log(`Created user with id: ${user.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
