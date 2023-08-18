'use client'
import { useAuth } from "@/app/context/authService";
import { ProfileMenu } from "@/data/profileMenu";
import { usePathname } from "next/navigation";
import Link from "next/link";


export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
    const { user } = useAuth();

  return (
    <>
      <div className="mx-[4%] flex mobile:flex-col lg:flex-row border-2 border-black min-h-[22rem]">
        <div className="basis-[25%] border-r-2 border-r-black">
          <div className="h-[6rem] border-b-2 border-b-black">
            <div className="flex items-center gap-2 p-3">
              <div className="rounded-full overflow-hidden h-12 w-12">
                <img src={user?.photoURL!} alt="User picture" />
              </div>
              <div>
                <p className="font-bold text-2xl">{user?.displayName}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="pl-6 pt-4">
            {ProfileMenu.map((menu, indx) => (
              <div
                style={{ color: menu.link === pathname ? "blue" : "black" }}
                key={indx}
                className="flex items-center gap-2 mb-4"
              >
                <div>{menu.icon}</div>
                <div>
                  <Link href={menu.link}>{menu.item}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <main className="basis-[75%]">{children}</main>
      </div>
    </>
  );
}