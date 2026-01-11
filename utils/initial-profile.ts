import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const initalProfile = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/signin");
  }

  const email = user.emailAddresses[0].emailAddress;


  let profile = await db.user.findFirst({
    where: {
      OR: [
        { userId: user.id },
        { email },
      ],
    },
  });


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
