import Link from 'next/link';
import process from 'process';
import type { ReactNode } from 'react';

type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <header className="border-b border-gray-300">
        <div className="pb-8 pt-16">
          <h1 className="text-3xl font-bold text-gray-900">
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </h1>
          <h2 className="text-xl">
            {process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
          </h2>
        </div>

        <div className="flex justify-between">
          <nav>
            <ul className="flex flex-wrap text-xl">
              <li className="mr-6">
                <Link
                  href="/"
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  Home
                </Link>
              </li>

              <li className="mr-6">
                <Link
                  href="/privacypolicy/"
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  Privacy and Policy
                </Link>
              </li>
              <li className="mr-6">
                <Link
                  href="/termsofservice/"
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="  py-5 text-xl">{props.children}</main>

      <footer className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()}{' '}
        {process.env.NEXT_PUBLIC_SITE_NAME}.
      </footer>
    </div>
  </div>
);

export { Main };
