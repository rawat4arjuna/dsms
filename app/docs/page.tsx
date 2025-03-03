import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./ReactSwagger";

export default async function Page() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}