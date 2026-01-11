import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const initalProfile = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/signin");
  }

  const email = user.emailAddresses[0].emailAddress;

  // 1️⃣ Check if user already exists by email OR clerk userId
  let profile = await db.user.findFirst({
    where: {
      OR: [
        { userId: user.id },
        { email },
      ],
    },
  });

  // 2️⃣ If not exists → create
  if (!profile) {
    profile = await db.user.create({
      data: {
        userId: user.id,
        email,
        username: user.firstName ?? "Nebula User",
        profilePic: user.imageUrl,
      },
    });
  }

  return profile;
};
