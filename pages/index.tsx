import Nav from "../components/nav";

import { KraneAPI } from "../krane/api/api";
import { Config } from "../krane/config/Config";
import Link from "next/link";

const endpoint = process.env.KRANE_HOST;
const token = process.env.KRANE_TOKEN;

const apiClient = new KraneAPI(endpoint, token);

export async function getServerSideProps() {
  const deployments = await apiClient.getDeployments();
  return { props: { deployments } };
}

type Props = { deployments: Config[] };

export default function IndexPage(props: Props) {
  return (
    <div>
      <Nav />

      <div className="container mx-auto my-4">
        {!props.deployments && <div>Loading...</div>}
        {props.deployments.length == 0 && (
          <div className="py-6">
            <div className="font-regular text-md text-gray-700 text-center">
              No deployments found
            </div>
          </div>
        )}

        {props.deployments.length > 0 && (
          <div className="py-6 flex space-x-12">
            <div className="tracking-wider text-sm font-medium uppercase">
              {props.deployments.length} Deployments
            </div>
          </div>
        )}

        {props.deployments && props.deployments.length > 0 && (
          <div className="flex flex-wrap">
            {props.deployments.map((deployment) => (
              <div className="border-b-2 border-gray-200 py-10 w-full">
                <div className="space-y-2">
                  <div className="font-bold tracking-wider uppercase text-medium">
                    <Link
                      href="/deployments/[name]"
                      as={`deployments/${deployment.name}`}
                    >
                      <a>{deployment.name}</a>
                    </Link>
                  </div>
                  <div className="flex space-x-2">
                    {deployment.alias.map((alias) => (
                      <div className="text-gray-600 font-regular tracking-wide hover:text-black">
                        <a href={alias}>{alias}</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
