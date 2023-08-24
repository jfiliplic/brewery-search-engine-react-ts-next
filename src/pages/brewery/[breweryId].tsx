import { baseEndpoint } from "..";
import styles from "../brewery/BreweryId.module.scss";

function BreweryMapLink({ breweryData }: { breweryData: any }) {
  if (breweryData.latitude && breweryData.longitude) {
    return (
      <>
        <a
          href={`https://www.google.com/maps/place/${breweryData.latitude},%20${breweryData.longitude}`}
          target="_blank"
        >
          <span>Map: </span>click to see location on map
        </a>
      </>
    );
  }
  return (
    <>
      <h2>
        <span>Map: </span>no coordinates available
      </h2>
    </>
  );
}

export default function DetailedCard({ breweryData }: { breweryData: any }) {
  return (
    <div className={styles.detailedCardWrapper}>
      <div className={styles.detailedCard}>
        <h2>
          <span>Name: </span> {breweryData.name}
        </h2>
        <h2>
          <span>Brewery type: </span> {breweryData.type || "no type available"}
        </h2>
        <h2>
          <span>Phone: </span>
          {breweryData.phone || "no phone available"}
        </h2>
        <a
          className={breweryData.website_url ? "" : styles.noLink}
          href={breweryData.website_url}
          target="_blank"
        >
          <span>Website: </span>
          {breweryData.website_url || "no website available"}
        </a>
        <BreweryMapLink breweryData={breweryData} />
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }: { params: any }) {
  let breweryData: any = null;

  const response = await fetch(`${baseEndpoint}/${params.breweryId}`);
  breweryData = await response.json();

  return {
    props: {
      breweryData,
    },
  };
}
