import Image from "next/image";
import Link from "next/link";
import { SVGProps } from "react";

export default function Footer() {
  return (
    <center>
      <footer className="w-full py-6 md:py-12">
        <div className="container flex flex-col items-center gap-4 px-4 md:px-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-2">
              <Image
                alt="Logo"
                className="aspect-square rounded-lg overflow-hidden object-cover"
                src="/arbuz.png"
                width={40}
                height={40}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Платформа для репетиторов.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ul className="flex flex-col gap-2 text-center">
              <li>
                <Link
                  className="text-sm text-gray-500 underline dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                  href="#"
                >
                  Условия пользования
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 underline dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                  href="#"
                >
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ul className="flex gap-4 text-sm">
              <li>
                <Link
                  className="underline hover:text-gray-900 dark:hover:text-gray-50"
                  href="/"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  className="underline hover:text-gray-900 dark:hover:text-gray-50"
                  href="#"
                >
                  О проекте
                </Link>
              </li>
              <li>
                <Link
                  className="underline hover:text-gray-900 dark:hover:text-gray-50"
                  href="#"
                >
                  Сервисы
                </Link>
              </li>
              <li>
                <Link
                  className="underline hover:text-gray-900 dark:hover:text-gray-50"
                  href="#"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ul className="flex gap-2 text-sm">
              <li>
                <Link
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <span className="sr-only">Facebook</span>
                  <FacebookIcon className="w-4 h-4" />
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <span className="sr-only">Twitter</span>
                  <TwitterIcon className="w-4 h-4" />
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <span className="sr-only">Instagram</span>
                  <InstagramIcon className="w-4 h-4" />
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <span className="sr-only">LinkedIn</span>
                  <LinkedinIcon className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2024 Arbuz Inc. All rights not reserved.
            </p>
          </div>
        </div>
      </footer>
    </center>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
