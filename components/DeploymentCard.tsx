import Link from "next/link";

import { Config } from "../krane/config/Config";
type Props = { deployment: Config };

export default function DeploymentCard(props: Props) {
  return (
    <div className="rounded shadow divide-y">
      <div className="space-y-8 p-4">
        <div>
          <div className="font-bold text-2xl text-gray-900 flex justify-between">
            <Link
              href="/deployments/[name]"
              as={`deployments/${props.deployment.name}`}
            >
              <a>{props.deployment.name}</a>
            </Link>
            <div className="text-sm font-normal text-gray-700">
              {props.deployment.tag}
            </div>
          </div>

          <div className="text-gray-800 text-sm">{props.deployment.image}</div>
        </div>

        <div className="font-medium text-sm text-gray-900">
          <div className="flex justify-start items-center">
            <div className="rounded-full h-3 w-3 bg-gray-400 mr-2" />

            {props.deployment.alias.length == 0 ? (
              <a
                href="https://www.krane.sh/#/04-configuration"
                className=" font-sm text-gray-900"
              >
                Setup an alias →
              </a>
            ) : (
              <a href={props.deployment.alias[0]} target="_blank">
                {props.deployment.alias[0]}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
