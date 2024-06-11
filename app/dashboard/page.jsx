"use client";
import { useRouter } from "next/navigation";
import DashboardLayout from "./layout";
import { useEffect } from "react";

function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, [router]);
    return (
        <DashboardLayout>
            <h1>Welcome to the Dashboard</h1>
        </DashboardLayout>
    );
}

export default Dashboard;
