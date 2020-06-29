import Link from "next/link";

export default function Nav() {
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
          <div className="inline-block border-b-4 border-gray-900 py-3 px-6">Deployments</div>
          {/* <div className="inline-block border-gray-900 py-3 px-6">Whatever</div> */}
        </div>
      </div>
    </nav>
  );
}
