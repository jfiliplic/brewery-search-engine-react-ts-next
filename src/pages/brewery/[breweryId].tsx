import { baseEndpoint } from "..";

function Brewery({ brewery, error }) {
  if (error) {
    return <div>Something went wrong</div>;
  }

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
  let brewery: any = null;
  let error = false;

  try {
    const response = await fetch(`${baseEndpoint}/${params.breweryId}`);
    brewery = await response.json();
  } catch (error) {
    error = true;
  }

  return {
    props: {
      brewery,
      error,
    },
  };
}
