import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession() {
  const session = await cookies();
  const token = session.get("access_token")?.value;
  // console.log(token);
  if (!token) {
    return null;
  }
  try {
    const res: any = await scalekit.validateToken(token!);
    const user = await scalekit.user.getUser(res.sub);
    return user;
  } catch (error) {
    console.error("Error Message:", error);
  }
}
