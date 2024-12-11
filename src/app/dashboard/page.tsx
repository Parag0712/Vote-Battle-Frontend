import Navbar from "@/components/base/Navbar";
import AddClash from "@/components/clash/AddClash";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/option";

export default async function dashboard() {
  const session:CustomSession | null = await getServerSession(authOptions);

  return (
    <div className="container">
      <Navbar />
      <div className="text-end mt-4">
        <AddClash 
          user = {session?.user!}
        />
      </div>
    </div>
  );
}