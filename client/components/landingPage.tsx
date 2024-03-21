import Link from "next/link";

export function LandingPage() {
  return (
    <div>
      <div className="border-b bg-headerbackground border-outline h-[50px] text-white text-center text-4xl py-2"></div>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold mb-4">
          Welcome to my Code Snippet Submission and Display Application!
        </h1>
        <div className="mb-6">
          <p className="text-lg">
            Built with Express for the backend and Next.js for the frontend, my
            platform provides a seamless experience for users to submit and view
            code snippets.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Key Features:</h2>
          <ul className="list-disc list-inside">
            <li>Easily submit your code snippets using my intuitive form.</li>
            <li>
              View all submitted entries in a convenient tabular format on my
              second page.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Tech Stack:</h2>
          <ul className="list-disc list-inside">
            <li>Backend: Express.js</li>
            <li>Frontend: Next.js</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Hosting and Deployment:
          </h2>
          <p>
            My application is fully hosted, with both frontend and backend
            applications deployed for seamless access.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Bonus Tasks:</h2>
          <ul className="list-disc list-inside">
            <li>Judge0 API Integration</li>
          </ul>
        </div>

        <div className="">
          <h2 className="text-2xl font-semibold ">Get Involved:</h2>
          <p>
            Explore the power of code submission and display with my platform!
            Visit my hosted frontend, and don&apos;t forget to check out the
            source code on my publicly accessible git repository. I welcome your
            feedback and contributions to help me improve and expand my
            services.
          </p>

          <p>
            Ready to dive in? Click{" "}
            <a
              href="https://github.com/ehconitin/code-app.git"
              className="text-blue-600 underline"
            >
              here
            </a>{" "}
            to access the application!
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          className="inline-flex h-11 items-center rounded-md border border-transparent border-gray-200 bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
          href="/code"
        >
          Code
        </Link>
      </div>
    </div>
  );
}
