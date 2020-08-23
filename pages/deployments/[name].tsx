import { GetServerSideProps } from "next";

import { createClient, KraneDeployment } from "../../app/apiClient";
import DeploymentNav from "../../components/DeploymentNav";
import { ServerResponse } from "http";
import { toReadableDateString } from "../../components/Date";

const endpoint = process.env.KRANE_HOST;
const token = process.env.KRANE_TOKEN;

const apiClient = createClient(endpoint, token);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context?.params;
  const name = params?.name as string;

  // WTF is this errrrorrrrrrr :(
  try {
    const data = await apiClient.getDeployment(name);
    return { props: { data } };
  } catch (e) {
    console.log("Error: ", e);
    // If an error is found a redirect to / will happend occurs
    // redirect(context.res, "/");
    return { props: { data: [] } };
  }
};

type Props = {
  data: KraneDeployment;
};

export default function Deployment(props: Props) {
  const data = props.data;

  console.log("heree");

  // Currently krane treats 1 container as 1 deployment. Because of this we only use the container in the first position of the array however a list of containers is also possible if one day a `scale` feature was implemented allowing 1 deployment to have many containers attached. This is possible since the reverse proxy (traefik) handles multi-container routing using custom container labels.
  const container = data?.containers[0];

  return (
    <div>
      <DeploymentNav />
      <div className="container mx-auto my-12">
        <div className="font-bold text-4xl text-gray-900">
          {data?.spec.name}
        </div>
        <div className="text-md font-normal text-gray-700">
          {data.spec.updated_at
            ? toReadableDateString(data.spec.updated_at)
            : "No updates found"}
        </div>

        {/* Row1 */}
        <div className="space-y-12 mt-16">
          <div className="flex space-x-12">
            <div className="w-64">
              <div className="font-semibold text-medium text-gray-600 pb-2">
                STATUS
              </div>
              <div className="flex justify-start items-center">
                <div className="rounded-full h-3 w-3 bg-gray-400 mr-2" />
                <div className="font-medium text-base text-gray-900">
                  {container?.State
                    ? toUpperCase(container.State, 0)
                    : "Unknown"}
                </div>
              </div>

              <div className="text-sm text-gray-900 pt-1">
                {container?.Status ?? "0 containers found"}
              </div>
            </div>

            <div className="w-64">
              <div className="font-semibold text-medium text-gray-600 pb-2">
                UP
              </div>

              <div className="font-normal text-base text-gray-900">
                {container?.State == "running" ? 1 : 0}
              </div>
            </div>

            <div className="w-64">
              <div className="font-semibold text-medium text-gray-600 pb-2">
                PORT
              </div>

              <div className="font-normal text-base text-gray-900">
                {data.spec.config.container_port} → {data.spec.config.host_port}
              </div>
            </div>

            <div className="flex-1 text-right">
              <a
                href={`${data?.alias == "" ? "http://localhost" : data.alias}:${
                  data.spec.config.host_port
                }`}
                target="_blank"
              >
                <button className="bg-notify-blue hover:shadow-lg text-lg shadow-lg text-white py-3 px-16 rounded-md">
                  Visit
                </button>
              </a>
            </div>
          </div>

          {/* Row2 */}

          <div className="flex space-x-12">
            <div className="w-64">
              <div className="font-semibold text-medium text-gray-600 pb-2">
                IMAGE
              </div>

              <div className="font-normal text-gray-900">
                {data.spec.config?.image ?? "No image found"}
              </div>
            </div>

            <div className="w-64">
              <div className="font-semibold text-medium text-gray-600 pb-2">
                TAG
              </div>

              <div className="font-normal text-base text-gray-900">
                {data.spec.config.tag ?? "latest"}
              </div>
            </div>

            <div className="w-64">
              <div className="font-semibold text-medium text-gray-600 pb-2">
                ALIAS
              </div>

              <div className="font-normal text-base text-gray-900">
                {data?.alias.length > 0 ? (
                  data.alias
                ) : (
                  <a
                    href="http://github.com/biensupernice/krane-server/wiki/deployments"
                    className="hover:text-notify-blue"
                  >
                    Setup an alias →
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* End */}
        </div>
      </div>
    </div>
  );
}

function toUpperCase(str: string, index: number) {
  return (
    str?.slice(0, index) +
    str?.charAt(index).toUpperCase() +
    str?.slice(index + 1)
  );
}

function redirect(res: ServerResponse, path: string) {
  if (res) {
    res.writeHead(301, { Location: path });
    res.end();
  }
}
