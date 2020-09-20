import { GetServerSideProps } from "next";

import CopyToClipboard from "react-copy-to-clipboard";

import DeploymentNav from "../../components/DeploymentNav";
import { ServerResponse } from "http";
import { KraneAPI } from "../../krane/api/api";
import { Config } from "../../krane/config/Config";
import Link from "next/link";

const endpoint = process.env.KRANE_HOST;
const token = process.env.KRANE_TOKEN;

const apiClient = new KraneAPI(endpoint, token);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context?.params;
  const name = params?.name as string;

  try {
    const deployment = await apiClient.getDeployment(name);
    return { props: { deployment } };
  } catch (e) {
    return { props: { deployment: null } };
  }
};

type Props = { deployment: Config };

export default function DeploymentUI(props: Props) {
  return (
    <div>
      {!props.deployment && (
        <div className="text-center uppercase text-gray-700 mt-24 text-medium">
          Deployment not found <br />
          <Link href="/">
            <a className="text-sm font-medium underline tracking-wider">HOME</a>
          </Link>
        </div>
      )}

      {props.deployment && (
        <div>
          <DeploymentNav name={props.deployment?.name ?? "_"} />
          <div className="container mx-auto my-8">
            <div className="font-bold text-2xl text-gray-900 uppercase tracking-wider">
              {props.deployment?.name}
            </div>

            {/* Row1 */}
            <div className="space-y-12 mt-8">
              <div className="flex space-x-12">
                <div className="w-64">
                  <div className="font-semibold pb-2 uppercase tracking-wide">
                    STATUS
                  </div>
                  <div className="flex justify-start items-center">
                    <div className="rounded-full h-3 w-3 bg-gray-400 mr-2" />
                    <div className="font-medium text-base text-gray-900">
                      Unknown
                    </div>
                  </div>

                  <div className="text-sm text-gray-900 pt-1">
                    0 containers found
                  </div>
                </div>

                <div className="w-64">
                  <div className="font-semibold pb-2 uppercase tracking-wide">
                    Containers
                  </div>

                  <div className="font-normal text-base text-gray-900">0</div>
                </div>

                <div className="flex-1 text-right">
                  <a href={`#`} target="_blank">
                    <button className="bg-black hover:shadow-lg text-sm uppercase tracking-wider shadow-lg text-white py-3 px-16 rounded-md">
                      VISIT
                    </button>
                  </a>
                </div>
              </div>

              {/* Row2 */}

              <div className="flex space-x-12">
                <div className="w-64">
                  <div className="font-semibold pb-2 uppercase tracking-wide">
                    IMAGE
                  </div>

                  <div className="font-normal text-gray-700 flex flex-col space-y-2">
                    <div>{props.deployment.image}</div>

                    <CopyToClipboard
                      text={"No image id"}
                      onCopy={() => alert(`Copied to clipboard`)}
                    >
                      <div className="cursor-pointer text-gray-700 hover:text-black">
                        No image id
                      </div>
                    </CopyToClipboard>
                  </div>
                </div>

                <div className="w-64">
                  <div className="font-semibold pb-2 uppercase tracking-wide">
                    TAG
                  </div>

                  <div className="font-normal text-base text-gray-900">
                    {props.deployment.tag}
                  </div>
                </div>

                <div className="w-64">
                  <div className="font-semibold pb-2 uppercase tracking-wider">
                    ALIAS
                  </div>

                  <div className="font-normal text-base text-gray-900">
                    <a
                      href="https://www.krane.sh/#/04-configuration"
                      className="hover:text-black"
                    >
                      Setup an alias →
                    </a>
                  </div>
                </div>
              </div>

              {/* End */}
            </div>
          </div>
        </div>
      )}
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
