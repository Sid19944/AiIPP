"use client";

import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";

function page() {
  return (
    <div>
      <Button onClick={() => signOut()}>signout</Button>
      dashboard
    </div>
  );
}

export default page;
