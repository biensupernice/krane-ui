import { Activity } from "../../app/apiClient";
import { toReadableDateString } from "../Date";

interface Props {
  activity: Activity;
  selected: boolean;

  onClick: (activity: Activity) => {};
}
export default function Item({ activity, selected, onClick }: Props) {
  return (
    <div className="cursor-pointer">
      <div
        className="flex whitespace-no-wrap space-x-4 overflow-hidden"
        onClick={() => onClick(activity)}
      >
        {activity.job.success ? (
          <div className="text-gray-600 text-sm font-bold">INFO</div>
        ) : (
          <div className="text-red-400 text-sm font-bold">ERROR</div>
        )}

        <div className="rounded-full bg-blue-100 text-blue-500 px-2 py-1 text-xs text-white font-semibold">
          {activity.job.body.spec.name}
        </div>

        <div className="text-gray-600">
          {toReadableDateString(activity.created_at)}
        </div>

        <p className="text-gray-700">
          {activity.job.error ?? activity.job.body.spec.config.image}
        </p>
      </div>

      {selected && (
        <pre className="cursor-default bg-gray-100 p-4 my-4 overflow-scroll shadow-sm">
          <p className="text-gray-700 text-start">
            {JSON.stringify(activity.job, null, 4)}
          </p>
        </pre>
      )}
    </div>
  );
}
