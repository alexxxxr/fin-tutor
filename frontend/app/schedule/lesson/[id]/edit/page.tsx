import EditLessonForm from "@/components/EditLessonForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { backendURL } from "@/settings";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const response = await fetch(backendURL + "get_lesson_by_id", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      id: Number(params.id),
    }),
  });

  if (!response.ok) {
    return (
      <Card>
        <CardContent>
          <CardTitle>Произошла ошибка</CardTitle>
          <CardDescription>
            {await JSON.stringify(response.json())}
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  const { date, start_time, length, price } = await response.json();
  const pricePerHour = Math.round((price * 60) / length);
  const splittedDate = date.split(".");
  const jsDate =
    splittedDate[2] + "-" + splittedDate[1] + "-" + splittedDate[0];

  return (
    <EditLessonForm
      event={{
        id: Number(params.id),
        date: jsDate,
        startTime: start_time,
        length: length,
        pricePerHour: pricePerHour,
      }}
    />
  );
}
