export type Job = {
  id: string;
  namespace: string;
  type: string;
  status: Status;
  state: State;
  start_time: number;
  end_time: number;
  retry_policy: number;
  args: Args;
};

type Args = { [key: string]: any };

type Status = {
  execution_count: number;
  failure_count: number;
  failures: number;
};

enum State {
  STARTED,
  COMPLETED,
}
