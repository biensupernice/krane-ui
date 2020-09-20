import Link from "next/link";
import { Config } from "../krane/config/Config";

type Props = { name: string };
export default function DeploymentNav(props: Props) {
  return (
    <nav className="border-b shadow-sm space-y-2">
      <div className="container mx-auto py-6">
        <Link href="/">
          <a className="text-xl tracking-widest font-extrabold text-gray-800 no-underline">
            KRANE
          </a>
        </Link>
      </div>

      <div className="container mx-auto">
        <div className="flex">
          <Link href="/deployments/[name]" as={`${props.name}`}>
            <a>
              <div className="inline-block border-b-4 border-gray-900 py-3 px-6 mr-2 tracking-widest font-medium text-sm">
                OVERVIEW
              </div>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
