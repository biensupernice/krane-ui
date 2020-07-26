import Nav from "../components/nav";
import { createClient, Activity } from "../app/apiClient";
import { toReadableDateString } from "../components/Date";
import { useState } from "react";
import Link from "next/link";

const endpoint = "http://1cb999835e70.ngrok.io";

const apiClient = createClient(endpoint, "token");

export async function getServerSideProps() {
  const data = await apiClient.getActivity();

  return { props: { data } };
}

type Props = {
  data: Activity[];
};

export default function ActivityPage({ data }: Props) {
  const [selectedActivity, setActivity] = useState<Activity>();

  const revData = [...data].reverse();
  return (
    <div>
      <Nav />

      <div className="container mx-auto my-4">
        <div className="h-48 flex align-center justify-center">
          <div className="w-32 text-center m-auto">
            <div className="font-medium text-sm text-gray-700">ERRORS</div>
            <div className="text-4xl text-base text-gray-900">
              {data.filter((d) => !d.job.success).length}
            </div>
          </div>
        </div>
        {!data && <div>Loading...</div>}
        {data && data.length == 0 && (
          <div className="text-sm text-gray-600 text-center">
            No activity found
          </div>
        )}

        {/* Selected Date range*/}
        <div className="inline-block relative w-lg">
          <select className="my-6 rounded focus:outline-none">
            <option>Past Day</option>
            <option>Past Week</option>
            <option>Past Month</option>
          </select>
        </div>

        {data && data.length > 0 && (
          <div className="space-y-2">
            {revData.map((activity) => (
              <div key={activity.activity_id}>
                <div
                  className="flex whitespace-no-wrap space-x-4 overflow-hidden" // whitespace-no-wrap
                >
                  {activity.job.success ? (
                    <div className="text-gray-600 text-sm font-bold">INFO</div>
                  ) : (
                    <div className="text-red-400 text-sm font-bold">ERROR</div>
                  )}

                  <div className="rounded-full bg-blue-100 text-blue-500 px-2 py-1 text-xs text-white font-semibold">
                    <Link
                      href="/deployments/[name]"
                      as={`deployments/${activity.job.body.spec.name}`}
                    >
                      <a>{activity.job.body.spec.name}</a>
                    </Link>
                  </div>

                  <div className="text-gray-600">
                    {toReadableDateString(activity.created_at)}
                  </div>

                  <div
                    className="text-gray-700 cursor-pointer"
                    onClick={() =>
                      selectedActivity?.activity_id == activity.activity_id
                        ? setActivity(undefined)
                        : setActivity(activity)
                    }
                  >
                    {activity.job.error ?? JSON.stringify(activity.job)}
                  </div>
                </div>

                {selectedActivity?.activity_id == activity.activity_id && (
                  <div>
                    {activity.job.error && (
                      <p className="p-2 mt-4 text-gray-700 bg-red-100 text-red-700 rounded border border-red-200">
                        {activity.job.error}
                      </p>
                    )}
                    <pre className="cursor-default bg-gray-100 p-4 my-4 overflow-scroll border border-gray-300">
                      <p className="text-gray-700 text-start">
                        {JSON.stringify(activity.job, null, 4)}
                      </p>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
