import Image from "next/image";
import Link from "next/link";
import { grantModerator } from "@/lib/admin-config";
import { customInitApp } from "@/lib/firebase-admin-config";

export default async function Home() {
  customInitApp();
  // await grantModerator();

  return (
    <main className="flex min-h-screen bg-red-900 flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-red-500">Welcome!</h1>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </main>
  );
}
