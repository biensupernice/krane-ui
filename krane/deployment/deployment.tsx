import { Container } from "../containers/container";
import { Config } from "../config/Config";

export type Deployment = {
  config: Config;
  containers: Container[];
};
