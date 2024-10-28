// app/admin/layout.tsx
import React from "react";
import AdminSideBar from "../components/admin/AdminSideBar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout flex flex-row min-h-screen">
      <AdminSideBar/>
      <main className="w-[77%] bg-slate-100">{children}</main>
    </div>
  );
}
