import React from "react";
import AdminSideBar from "../components/admin/layout/AdminSideBar";
import { useSession } from "next-auth/react"
import getCurrentUser from "@/actions/getCurrentUser";
import decodeToken from "@/utils/decodeToken";
import AccessDenied from "../components/common/AccessDenied";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {


  const currentUser = await getCurrentUser();
  const user = decodeToken(currentUser?.accessToken || " ")
  if (user?.role == "ROLE_ADMIN") {
    return (
      <div className="flex flex-row">
        <AdminSideBar />
        <main className="w-[77%] bg-slate-100 min-h-screen">{children}</main>
      </div>
    );

  }
  return <AccessDenied />;


}
