'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  console.log(session?.user);


  return (
    <main className="flex h-screen w-screen  flex-row items-center justify-between p-24 ">

      <div className="w-screen h-screen">
        {session && (
          <>
            <p>{session?.user.name}</p>
            <p>{session?.user.email}</p>
            <Image
              src={session?.user.picture || "/default-avatar.png"}
              alt="User Image"
              width={50}
              height={50}
            />
            <p>{session?.user.accessToken}</p>
            <p>{session?.user.refreshToken}</p>
            <p>iamge {session?.user.picture}</p>
          </>
        )}
      </div>

    </main>
  );
}
