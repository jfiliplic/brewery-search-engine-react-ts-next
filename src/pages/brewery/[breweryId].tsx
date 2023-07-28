import { baseEndpoint } from "..";

export default function DetailedCard({ breweryData }: { breweryData: any }) {
  return (
    <div style={{ color: "red" }}>
      <div>
        <h2>
          <span>Name</span>: {breweryData.name}
        </h2>
        <h2>
          <span>Brewery type</span>: {breweryData.type || "no type available"}
        </h2>
        <h2>
          <span>Phone</span>:{breweryData.phone || "no phone available"}
        </h2>
        <a href={breweryData.website_url} target="_blank">
          <span>Website:</span>
          {breweryData.website_url || "no website available"}
        </a>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let breweryData: any = null;

  const response = await fetch(`${baseEndpoint}/${params.breweryId}`);
  breweryData = await response.json();

  return {
    props: {
      breweryData,
    },
  };
}
