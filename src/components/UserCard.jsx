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
    </div>
  );
};

export default UserCard;
