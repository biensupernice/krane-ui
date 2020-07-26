import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();

  return (
    <nav className="border-b shadow-sm space-y-2">
      <div className="container mx-auto py-6">
        <Link href="/">
          <a className="text-2xl font-bold text-gray-900 no-underline">
            /krane
          </a>
        </Link>
      </div>

      <div className="container mx-auto">
        <div className="flex">
          <Link href="/">
            <a>
              {router.pathname == "/" ? (
                <div className="inline-block border-b-4 border-gray-900 py-3 px-6 mr-2">
                  Deployments
                </div>
              ) : (
                <div className="inline-block border-gray-900 py-3 px-6 mr-2">
                  Deployments
                </div>
              )}
            </a>
          </Link>

          <Link href="/activity">
            <a>
              {router.pathname == "/activity" ? (
                <div className="inline-block border-b-4 border-gray-900 py-3 px-6 mr-2">
                  Activity
                </div>
              ) : (
                <div className="inline-block border-gray-900 py-3 px-6 mr-2">
                  Activity
                </div>
              )}
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
