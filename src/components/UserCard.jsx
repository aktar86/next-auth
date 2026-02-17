"use client";

import { useSession } from "next-auth/react";

const UserCard = () => {
  const session = useSession();

  return (
    <div>
      <h3 className="font-bold">use client</h3>
      <p className="font-semibold border p-5 rounded">
        {JSON.stringify(session)}
      </p>
      <div className="bg-white p-5 rounded border-gray-400 text-black w-md flex flex-col justify-center items-center my-5 mx-auto">
        <img
          src={session?.data?.user?.image}
          alt={session?.data?.user?.name}
          className="h-64 w-64 rounded-full border border-gray-500"
        />
        <h3 className="text-3xl font-black">{session?.data?.user?.name}</h3>
        <h4>{session?.data?.user?.email}</h4>
        <h4 className="text-green-400">{session?.status}</h4>
      </div>
    </div>
  );
};

export default UserCard;
