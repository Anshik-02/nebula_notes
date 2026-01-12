import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const initalProfile = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/signin");
  }

  const email = user.emailAddresses[0].emailAddress;

  // Use upsert to handle create OR update atomically
  const profile = await db.user.upsert({
    where: { 
      userId: user.id  // Must match your @unique field in schema
    },
    update: {
      // Update these fields if user exists (keeps data fresh)
      email,
      username: user.firstName ?? "Nebula User",
      profilePic: user.imageUrl,
    },
    create: {
      // Create with these fields if user doesn't exist
      userId: user.id,
      email,
      username: user.firstName ?? "Nebula User",
      profilePic: user.imageUrl,
    },
  });

  return profile;
};