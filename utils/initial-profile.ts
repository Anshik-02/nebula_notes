  import { db } from "@/lib/db";
  import { currentUser } from "@clerk/nextjs/server";
  import { redirect } from "next/navigation";

  export const initalProfile = async () => {
    const user = await currentUser();

    if (!user) {
      return redirect("/signin");
    }

    const profile = await db.user.upsert({
      where: {
        userId: user.id,
      },
      update: {},
      create: {
        userId: user.id,
        username: user.firstName || "",
        profilePic: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    return profile;
  };
