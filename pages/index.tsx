import Nav from "../components/nav";
import useSWR from "swr";
import { createClient, KraneProjectSpec } from "../app/apiClient";

const endpoint = "http://localhost";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlc3Npb25faWQiOiI0YTg4MzUzZC03NDgxLTRkZjctYWM5NC00OTU2Nzc2ZWU1NzIifSwiZXhwIjoxNjIzMTkzMjA3LCJpc3MiOiJrcmFuZS1zZXJ2ZXIifQ.BqlAIepgKp6F4ZHlJyO7CbMD4YvcoFvWvAwNdNvRYxQ`;

const apiClient = createClient(endpoint, token);

export async function getServerSideProps() {
  const data = await apiClient.getDeployments();
  return { props: { data } };
}

type Props = {
  data: KraneProjectSpec[];
};

export default function IndexPage(props: Props) {
  const initialData = props.data;

  const { data, error } = useSWR(
    "/deployments/",
    () => apiClient.getDeployments(),
    { initialData }
  );

  // console.log(error);

  return (
    <div>
      <Nav />
      <div className="container mx-auto">
        {error && <div>failed to load {}</div>}
        {!data && <div>Loading...</div>}
        {data && (
          <div>
            {data.map((spec) => (
              <div>{spec.name}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
