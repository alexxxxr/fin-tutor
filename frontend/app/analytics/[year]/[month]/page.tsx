import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getAnanytics, getLinearRegression } from "./actions";
import { IncomeGraph } from "@/components/income-graph";

type Props = {
  params: {
    month: string;
    year: string;
  };
};

const months = [
  ,
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export default async function Page({ params }: Props) {
  const analytics = await getAnanytics(
    Number(params.year),
    Number(params.month),
  );

  const linearRegression = await getLinearRegression(
    Number(params.year),
    Number(params.month),
  );

  if (analytics.status === "error" || linearRegression.status === "error") {
    return (
      <Card>
        <CardContent>
          <CardTitle>Произошла ошибка</CardTitle>
          <CardDescription>
            Возможно, указаны неверные месяц и год.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  const data = analytics.response;
  const points = linearRegression.response;

  return (
    <div className="grid justify-items-center gap-4">
      <Card className="grid w-8/12 p-2 grid-cols-2 gap-1.5">
        <CardTitle className="text-3xl col-start-1 col-end-3 p-1.5">
          Заработок за всё время
        </CardTitle>
        <Card className="p-1.5">
          <p className="text-lg font-medium">Совокупный доход</p>
          <p className="w-full text-xl font-semibold">{data.total_earning}</p>
        </Card>
      </Card>

      <Card className="grid w-8/12 p-2 grid-cols-2 gap-1.5">
        <CardTitle className="text-3xl col-start-1 col-end-3 p-1.5">
          Статистика за {params.year} год
        </CardTitle>
        <Card className="p-1.5">
          <p className="text-lg font-medium">Самый прибыльный месяц</p>
          <p className="w-full text-xl font-semibold">
            {months[data.most_profitable_month]}:{" "}
            {data.most_profitable_month_income}₽
          </p>
        </Card>
        <Card className="p-1.5">
          <p className="text-lg font-medium">Наимеенее прибыльный месяц</p>
          <p className="w-full text-xl font-semibold">
            {months[data.least_profitable_month]}:{" "}
            {data.least_profitable_month_income}₽
          </p>
        </Card>
      </Card>

      <Card className="grid w-8/12 p-2 grid-cols-2 gap-1.5">
        <CardTitle className="text-3xl col-start-1 col-end-3 p-1.5">
          Статистика за {months[Number(params.month)]}
        </CardTitle>
        <Card className="p-1.5">
          <p className="text-lg font-medium">Средняя цена занятия</p>
          <p className="w-full text-xl font-semibold">
            {data.lesson_price_mean.toPrecision(5)}₽
          </p>
        </Card>
        <Card className="p-1.5">
          <p className="text-lg font-medium">Самый прибыльный ученик</p>
          <p className="w-full text-xl font-semibold">
            {data.most_profitable_student}:{" "}
            {data.most_profitable_student_income}₽
          </p>
        </Card>
        <Card className="p-1.5">
          <p className="text-lg font-medium">Наименее прибыльный ученик</p>
          <p className="w-full text-xl font-semibold">
            {data.least_profitable_student}:{" "}
            {data.least_profitable_student_income}₽
          </p>
        </Card>
      </Card>

      <IncomeGraph
        points={[
          points.past_month_income,
          points.previous_month_income,
          points.current_month_income,
          points.next_month_income,
          points.following_month_income,
        ]}
        months={[
          months[Number(params.month) - 2] as string,
          months[Number(params.month) - 1] as string,
          months[Number(params.month)] as string,
          months[Number(params.month) + 1] as string,
          months[Number(params.month) + 2] as string,
        ]}
      />
    </div>
  );
}
