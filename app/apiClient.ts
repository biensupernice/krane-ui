import axios, { AxiosInstance } from "axios";

export function createClient(endpoint: string, token?: string): KraneAPI {
  return new KraneAPI(endpoint, token);
}

export class KraneAPI {
  client: AxiosInstance;
  constructor(endpoint: string, token?: string) {
    this.client = axios.create({
      baseURL: endpoint,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async login() {
    return this.client
      .get<LoginGetResponse>("/login")
      .then((res) => res.data)
      .then((res) => res.data);
  }

  async auth(request_id: string, token: string) {
    return this.client
      .post<AuthPostResponse>("/auth", { request_id, token })
      .then((res) => res.data)
      .then((res) => res.data);
  }

  async getDeployments() {
    return this.client
      .get<GetDeploymentsResponse>("/deployments")
      .then((res) => res.data)
      .then((res) => res.data);
  }

  async getDeployment(deploymentName: string) {
    return this.client
      .get<GetDeploymentResponse>(`/deployments/${deploymentName}`)
      .then((res) => res.data)
      .then((res) => res.data);
  }

  async createDeployment(config: KraneProjectSpec) {
    return this.client
      .post<CreateDeploymentReponse>("/deployments", config)
      .then((res) => res.data);
  }

  async runDeployment(deploymentName: string, tag: string = "latest") {
    return this.client
      .post(`/deployments/${deploymentName}/run?tag=${tag}`)
      .then((res) => res.data);
  }

  async getActivity() {
    return this.client
      .get<GetActivityResponse>("/activity")
      .then((res) => res.data)
      .then((res) => res.data);
  }
}

interface GetDeploymentsResponse {
  code: number;
  data: KraneDeployment[];
  success: boolean;
}

interface GetDeploymentResponse {
  code: number;
  data: KraneDeployment;
  success: boolean;
}

interface GetActivityResponse {
  code: number;
  data: Activity[];
  success: boolean;
}

export interface Activity {
  activity_id: string;
  created_at: string;
  job: Job;
}

interface Job {
  id: string;
  created_at: string;

  // The body on a job can technically be anything it will
  // be casted as a KraneDeployment for now because this
  // is the only "type" of job we currently have.
  body: KraneDeployment;

  props: { [key: string]: string };

  // Job Type is not really the type but the job name (update deployment).
  // This will be nice to refactor to be JobType -> KraneDeployment, JobName -> UpdateDeployment
  // Somewhre along the chain we can use the JobType to convert the body into a typed object. By includiong the
  // schema of the body we can generate a typed body instead of Any
  job_type: string;
  metadata: JobMetadata;
  success: boolean;
  error: string;
}

interface JobMetadata {
  worker_id: string;
}

interface LoginGetResponse {
  code: number;
  data: {
    request_id: string;
    phrase: string;
  };
  success: boolean;
}

interface AuthPostResponse {
  code: number;
  data: {
    error: string;
    session: Session;
  };
  success: boolean;
}

interface CreateDeploymentReponse {
  code: number;
  data: KraneProjectSpec;
  success: boolean;
}

interface Session {
  token: string;
  expires_at: string;
  id: string;
}

interface ProjectSpecConfig {
  registry?: string;
  container_port?: string;
  host_port?: string;
  image: string;
  env: { [key: string]: string };
  tag: string;
  volumes: { [key: string]: string };
}

export interface KraneProjectSpec {
  updated_at: string;
  created_at: string;
  name: string;
  config: ProjectSpecConfig;
}

export interface KraneDeployment {
  alias: string;
  spec: KraneProjectSpec;
  containers: Container[];
}
