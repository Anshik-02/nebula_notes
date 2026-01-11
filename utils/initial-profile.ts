import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const initalProfile = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/signin");
  }

  const email = user.emailAddresses[0].emailAddress;

  const profile = await db.user.upsert({
    where: {
      userId: user.id, // MUST be @unique
    },
    update: {
      email, // optional sync
      profilePic: user.imageUrl,
    },
    create: {
      userId: user.id,
      email,
      username: user.firstName ?? "Nebula User",
      profilePic: user.imageUrl,
    },
  });

  return profile;
};
