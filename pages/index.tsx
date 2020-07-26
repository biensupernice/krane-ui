import Nav from "../components/nav";
import { createClient, KraneDeployment } from "../app/apiClient";
import Link from "next/link";
import { ExampleCard } from "../components/ExampleCard";
import { toReadableDateString } from "../components/Date";

const endpoint = "http://1cb999835e70.ngrok.io";

const apiClient = createClient(endpoint, "token");

export async function getServerSideProps() {
  const data = await apiClient.getDeployments();

  return { props: { data } };
}

type Props = {
  data: KraneDeployment[];
};

export default function IndexPage(props: Props) {
  const data = props.data;

  return (
    <div>
      <Nav />
      <div className="container mx-auto my-4">
        {!data && <div>Loading...</div>}
        {data.length == 0 && (
          <div className="py-6">
            <ExampleCard />
          </div>
        )}
        {data && data.length > 0 && (
          <div className="flex flex-wrap">
            {data.map((deployment) => (
              <div
                key={deployment.spec.name}
                className="w-full lg:w-1/3 pr-8 py-4 flex-shrink-0"
              >
                <Card deployment={deployment} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Card(data: { deployment: KraneDeployment }) {
  return (
    <div className="rounded shadow divide-y">
      <div className="space-y-8 p-4">
        <div>
          <div className="font-bold text-2xl text-gray-900">
            <Link
              href="/deployments/[name]"
              as={`deployments/${data.deployment.spec.name}`}
            >
              <a>{data.deployment.spec.name}</a>
            </Link>
          </div>

          <div className="text-gray-700 text-sm">
            {data.deployment.spec.updated_at
              ? "Updated " +
                toReadableDateString(data.deployment.spec.updated_at)
              : "No updates found"}
          </div>
        </div>

        <div className="text-gray-800 text-sm">
          {data.deployment.spec.config?.image ?? "No image found"}
        </div>
      </div>

      <div className="p-4 font-medium text-sm text-gray-900">
        <div className="flex justify-start items-center">
          <div className="rounded-full h-3 w-3 bg-gray-400 mr-2" />
          {data.deployment.alias == "" ? (
            <a
              href="http://github.com/biensupernice/krane-server/wiki/deployments"
              className=" font-sm text-gray-900"
            >
              Setup an alias →
            </a>
          ) : (
            <a
              href={`${data.deployment.alias}:${data.deployment.spec.config.host_port}`}
              target="_blank"
            >
              {data.deployment.alias}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
