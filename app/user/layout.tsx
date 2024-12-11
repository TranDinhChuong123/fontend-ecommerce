import React from "react";
import AdminSideBar from "../components/admin/layout/AdminSideBar";
import NavBar from "../components/nav/NavBar";
import SideBar from "./SideBar";


export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="admin-layout flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-row w-full  ">
                <SideBar />
                <main className="w-[78%] ">{children}</main>
            </div>

        </div>
    );
}
