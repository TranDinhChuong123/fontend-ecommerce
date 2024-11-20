// app/admin/layout.tsx
import React from "react";
import AdminSideBar from "../components/admin/AdminSideBar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row">
      <AdminSideBar/>
      <main className="w-[77%] bg-slate-100">{children}</main>
    </div>
  );
}
