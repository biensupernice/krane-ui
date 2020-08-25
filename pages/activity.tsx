import { useState, useEffect } from "react";
import Nav from "../components/nav";
import { createClient, Activity } from "../app/apiClient";
import { toReadableDateString } from "../components/Date";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";

const endpoint = process.env.KRANE_HOST;
const token = process.env.KRANE_TOKEN;

const apiClient = createClient(endpoint, token);

export async function getServerSideProps() {
  const data = await apiClient.getActivity(1);

  return { props: { data } };
}

type Props = { query: Query };
type Query = { daysAgo: number };

export default function ActivityPage(props: Props) {
  const [selectedActivity, setActivity] = useState<Activity>();

  const [timeRange, setTimeRange] = useState<number>(1);

  useEffect(() => {
    if (props?.query?.daysAgo) {
      setTimeRange(props?.query?.daysAgo);
    }
  }, [timeRange]);

  const endpoint = `/api/activity?daysAgo=${timeRange}`;
  const swrOptions = { refreshInterval: 60000 };

  const { data, error } = useSWR(endpoint, axios.get, swrOptions);

  let revData = [];
  if (data) {
    revData = [...data?.data].reverse();
  }

  return (
    <div>
      <Nav />

      <div className="container mx-auto my-4">
        <div className="h-48 flex align-center justify-center">
          <div className="w-32 text-center m-auto">
            <div className="font-medium text-sm text-gray-700">ERRORS</div>
            <div className="text-4xl text-base text-gray-900">
              {revData.filter((d) => !d.job.success).length}
            </div>
          </div>
        </div>
        {error && (
          <div className="text-center text-red-400">
            An error has occurred when fetching your activity
          </div>
        )}

        {!error && (
          <div className="inline-block relative w-lg">
            <select
              className="my-6 rounded focus:outline-none"
              onChange={(e) => setTimeRange(parseInt(e.target.value))}
              value={timeRange}
            >
              <option value={1}>Past Day</option>
              <option value={7}>Past Week</option>
              <option value={30}>Past Month</option>
            </select>
          </div>
        )}

        {!error && revData && revData.length == 0 && (
          <div className="text-sm text-gray-600 text-center">
            No activity found
          </div>
        )}

        {!error && revData && revData.length > 0 && (
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
