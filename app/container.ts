interface Container {
  Id: string;
  Name: string[];
  Image: string;
  ImageId: string;
  Command: string;
  Created: number;
  Ports: Port[];
  Labels: { [key: string]: string };
  State: string;
  Status: string;
  HostConfig: HostConfig;
  NetworkSettings: object;
  Mounts: object[];
}

interface Port {
  IP: string;
  PrivatePort: number;
  PublicPort: number;
  Type: string;
}

interface HostConfig {
  NetworkMode: string;
}
