import * as React from 'react';

const ExplainText = () => (
  <div className="mx-auto mb-8 p-8 max-w-sm rounded overflow-hidden bg-gray-200 grayscale hover:grayscale-0">
    <div className="divide-y divide-gray-300/50">
      <div className="space-y-6 text-base leading-7 text-gray-600">
        <p>This app is also a frontend React boilerplate template including Next.js and Tailwind CSS</p>
        <p>Next steps:</p>
        <ul className="space-y-4">
          <li className="flex items-center">
            <svg
              className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="11" />
              <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
            </svg>
            <p className="ml-4">
              Start by editing&nbsp;
              <code className="text-sm font-bold text-gray-900">pages/index.tsx</code>
              &nbsp;file
            </p>
          </li>

          <li className="flex items-center">
            <svg
              className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="11" />
              <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
            </svg>
            <p className="ml-4">
              Customizing your&nbsp;
              <code className="text-sm font-bold text-gray-900">tailwind.config.js</code>
              &nbsp;file
            </p>
          </li>
          <li className="flex items-center">
            <svg
              className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="11" />
              <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
            </svg>
            <p className="ml-4">
              Extracting classes with&nbsp;
              <code className="text-sm font-bold text-gray-900">@apply</code>
            </p>
          </li>
          <li className="flex items-center">
            <svg
              className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="11" />
              <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
            </svg>
            <p className="ml-4">Code completion with instant preview</p>
          </li>
        </ul>
        <p>Perfect for learning how the frontend part of templates works.</p>
      </div>

      <div className="pt-8 text-base font-semibold leading-7">
        <p className="text-gray-900">Find in-depth information about Next.js features and&nbsp;API.</p>
        <p>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="text-sky-500 hover:text-sky-600"
          >
            Read the docs &rarr;
          </a>
        </p>

        <p className="text-gray-900">Want to dig deeper into Tailwind?</p>
        <p>
          <a href="https://tailwindcss.com/docs" className="text-sky-500 hover:text-sky-600">
            Read the docs &rarr;
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default ExplainText;
