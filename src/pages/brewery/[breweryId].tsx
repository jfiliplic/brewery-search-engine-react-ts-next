import { baseEndpoint } from "..";

function Brewery({ brewery }) {
  return (
    <div>
      <p>{brewery.id}</p>
      <p>{brewery.name}</p>
      <p>{brewery.city}</p>
      <p>{brewery.country}</p>
    </div>
  );
}

export default Brewery;

export async function getServerSideProps({ params }) {
  const response = await fetch(`${baseEndpoint}/${params.breweryId}`);
  const brewery = await response.json();

  return {
    props: {
      brewery,
    },
  };
}
