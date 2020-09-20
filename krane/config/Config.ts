export type Config = {
  name: string;
  alias: string[];
  registry?: string;
  image: string;
  secrets: { [key: string]: string };
  env: { [key: string]: string };
  tag: string;
  volumes: { [key: string]: string };
};
