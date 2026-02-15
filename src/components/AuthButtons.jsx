"use client";

import Link from "next/link";
import LoginButton from "./LoginButton";
import { signOut, useSession } from "next-auth/react";

const AuthButtons = () => {
  const session = useSession();

  return (
    <>
      {session.status === "authenticated" ? (
        <button className="btn" onClick={() => signOut()}>
          Logout
        </button>
      ) : (
        <div className="flex gap-5">
          <LoginButton></LoginButton>
          <Link href={"/register"} className="btn">
            Register
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthButtons;
