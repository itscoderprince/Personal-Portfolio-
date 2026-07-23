import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Panel | Portfolio Control",
    description: "Private admin dashboard for managing portfolio projects and assets.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return children;
}
