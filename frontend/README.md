# Front end

Краткая справка по работе над front-end кодом. Заранее необходимо установить Node.js (лучше последней версии)

### Установка необходимых зависимостей

```bash
fin_tutor/frontend$ npm i
```

### Запуск сервера (dev mode)

```bash
fin_tutor/frontend$ npm run dev
```

### Структура URL-путей

Next.js использует routing на основе файловой системы. Каждая папка внутри `/app` превращается в действующий на сайте URL. Страница, рендерящаяся по этому пути должна быть в файле `page.tsx`, содержащим `export default`-компонент.

### Добавление v0-компонента

После генерации компонента нажимаем на кнопку "Code" и используем появившуюся команду:

```bash
fin_tutor/frontend$ npx v0 add <какой-то номер>
```

Учтите, что названия React-компонентов обязаны начинаться с заглавной буквы.

После завершения выполнения команды, создаем `page.tsx`-файл под нужным URL и пишем:

```tsx
import { YourComponent } from "@/components/component/your-component";

export default function Page() {
  return <YourComponent />;
}
```

**Примечание:** если новый компонент используется лишь в одном месте, его код стоит переместить из `@components/component` в это место.

---

дефолтные доки:

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
