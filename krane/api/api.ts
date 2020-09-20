import { Config } from "./../config/Config";
import { AuthPostResponse } from "./responses/auth";
import { Login } from "./responses/login";
import axios, { AxiosInstance } from "axios";

type Response<T> = {
  success: boolean;
  code: number;
  data: T[];
};

type ResponseMany<T> = {
  success: boolean;
  code: number;
  data: T[];
};

export class KraneAPI {
  client: AxiosInstance;

  constructor(endpoint?: string, token?: string) {
    if (!endpoint) {
      console.error("Endpoint not provided");
    }

    if (!token) {
      console.debug("Token not provided");
    }

    this.client = axios.create({
      baseURL: endpoint,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async login() {
    return this.client
      .get<Response<Login>>("/login")
      .then((res) => res.data)
      .then((res) => res.data)
      .catch((e) => {
        console.error("Unable to login: ", e);
        throw e;
      });
  }

  async auth(request_id: string, token: string) {
    return this.client
      .post<Response<AuthPostResponse>>("/auth", { request_id, token })
      .then((res) => res.data)
      .then((res) => res.data)
      .catch((e) => {
        console.error("Unable to authenticate: ", e);
        throw e;
      });
  }

  async getDeployments() {
    console.log("Getting deployments");
    return this.client
      .get<ResponseMany<Config>>("/deployments")
      .then((res) => res.data)
      .then((res) => res.data)
      .catch((e) => {
        console.error("Unable to get deployments: ", e);
        throw e;
      });
  }

  async getDeployment(deploymentName: string) {
    return this.client
      .get<Response<Config>>(`/deployments/${deploymentName}`)
      .then((res) => res.data)
      .then((res) => res.data)
      .catch((e) => {
        console.error("Unable to get deployment: ", e);
        throw e;
      });
  }
}
