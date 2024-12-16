import { CustomSession } from "@/app/api/auth/[...nextauth]/option";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { fetchClash } from "@/app/fetch/clashFetch";
import Navbar from "@/components/base/Navbar";
import AddClashItems from "@/components/clash/AddClashItems";
import ViewClashItems from "@/components/clash/ViewClashItems";
import { ClashType } from "@/types";
import { getServerSession } from "next-auth";

export default async function clashItems({
  params,
}: {
  params: { id: number };
}) {
  const session: CustomSession | null = await getServerSession(authOptions);
  const clash: ClashType | null = await fetchClash(
    session?.user?.token!,
    params.id
  );

  return (
    <div className="container">
      <Navbar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold">{clash?.title}</h1>
        <p className="text-lg">{clash?.description}</p>
      </div>

      {clash?.ClashItem && clash.ClashItem.length > 0 ? (
        <ViewClashItems clash={clash} />
      ): (
        <AddClashItems
          token={session?.user?.token!}
          clashId={params?.id.toString()}
        />
      )}
    </div>
  );
}
