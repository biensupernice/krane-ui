import { useRouter } from "next/router";

export default function Deployment() {
  const router = useRouter();
  const { name } = router.query;

  return <p>Deployment Name: {name}</p>;
}
