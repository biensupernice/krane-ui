import Nav from "../components/nav";
import { createClient, KraneDeployment } from "../app/apiClient";
import Link from "next/link";

const endpoint = "http://localhost:8080";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlc3Npb25faWQiOiI0YTg4MzUzZC03NDgxLTRkZjctYWM5NC00OTU2Nzc2ZWU1NzIifSwiZXhwIjoxNjIzMTkzMjA3LCJpc3MiOiJrcmFuZS1zZXJ2ZXIifQ.BqlAIepgKp6F4ZHlJyO7CbMD4YvcoFvWvAwNdNvRYxQ`;

const apiClient = createClient(endpoint, token);

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
        {data && data.length > 0 && (
          <div className="flex flex-wrap">
            {data.map((deployment) => (
              <div
                key={deployment.spec.name}
                className="w-full lg:w-1/3 px-2 py-4 flex-shrink-0"
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
            Updated December 8, 2017 8:29 AM
          </div>
        </div>

        <div className="text-gray-800 text-sm">
          {data.deployment.spec.config.image}
        </div>
      </div>

      <div className="p-4 font-medium text-sm text-gray-900">
        {data.deployment.alias == "" ? (
          <div className="flex justify-start items-center">
            <div className="rounded-full h-3 w-3 bg-green-400 mr-2" />
            <div className="font-sm text-gray-900">http://</div>
          </div>
        ) : (
          <a
            href={`http://biensupernice.com/${data.deployment.spec.name}`}
            target="_blank"
          >
            {data.deployment.alias}
          </a>
        )}
      </div>
    </div>
  );
}
