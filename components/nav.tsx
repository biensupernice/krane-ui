import Link from "next/link";
import { useRouter } from "next/router";

type NavPath = {
  href: string;
  name: string;
};

export default function Nav() {
  const router = useRouter();

  const paths: NavPath[] = [{ name: "Deployments", href: "/" }];
  return (
    <nav className="border-b shadow-sm space-y-2">
      <div className="container mx-auto py-6">
        <Link href="/">
          <a className="text-xl tracking-widest font-extrabold text-gray-800 no-underline">
            KRANE
          </a>
        </Link>
      </div>

      {/* <div className="container mx-auto">
        <div className="flex">
          {paths.map((path) => (
            <Link href={path.href}>
              <a>
                {router.pathname == path.href ? (
                  <div className="border-b-4 inline-block border-gray-900 py-3 px-6 mr-2  ">
                    {path.name}
                  </div>
                ) : (
                  <div className="inline-block border-gray-900 py-3 px-6 mr-2">
                    {path.name}
                  </div>
                )}
              </a>
            </Link>
          ))}
        </div>
      </div> */}
    </nav>
  );
}
