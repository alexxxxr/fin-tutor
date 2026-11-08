import { getProfile } from "@/app/profile/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import Content from "./content";

export default async function Page() {
  let profile;
  try {
    profile = await getProfile();
  } catch (error) {
    return (
      <Card>
        <CardContent>
          <CardTitle>Произошла ошибка</CardTitle>
          <CardDescription>{(error as Error).message}</CardDescription>
        </CardContent>
      </Card>
    );
  }

  if (profile.user_type == 1) {
    redirect("/schedule");
  }

  return <Content />;
}
