import HomeClient from "@/components/Home";
import { getSession } from "@/lib/getSession";

export default async function Home() {
  const user = await getSession();
  return (
    <>
      <HomeClient email={user?.user?.email!}/>
    </>
  );
}
