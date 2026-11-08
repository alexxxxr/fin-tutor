import AuthLinks from "@/components/AuthLinks";

export default function Page() {
  return (
    <main className="w-full py-12 md:py-24 lg:py-32">
      <div
        style={{
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        className="container space-y-12 px-4 md:px-6"
      >
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Финансовый трекер для репетиторов
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Управляйте своими финансами с легкостью.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-1 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Отслеживание доходов</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Легко отслеживайте свои доходы от репетиторства.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Выставление счетов</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Создавайте и отправляйте счета своим студентам.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Напоминания об оплате</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Настройте автоматические напоминания, чтобы обеспечить
              своевременные платежи.
            </p>
          </div>
        </div>
        <AuthLinks />
      </div>
    </main>
  );
}
