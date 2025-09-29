import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useParams } from "react-router-dom";
import { useFetchlocationQuery } from "../../../stores/apiSlice";
import { useEffect, useState } from "react";

function LocationMap() {
  const { id } = useParams(); // order id from route
  const { data, isLoading, error } = useFetchlocationQuery(id); // fetch raw response
  const [loc, setLoc] = useState(null);

  useEffect(() => {
    if (data && Array.isArray(data.data) && data.data.length > 0) {
      setLoc(data.data[0]); // pick the first (and only) item in the array
    }
  }, [data]);

  if (isLoading) return <div>Loading map...</div>;
  if (error) return <div>Error loading location: {error.message}</div>;
  if (!loc) return <div>No location found</div>;

  return (
    <MapContainer
      center={[parseFloat(loc.lat), parseFloat(loc.lng)]} // ensure numbers
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[parseFloat(loc.lat), parseFloat(loc.lng)]}>
        <Popup>
          <strong>{loc.name}</strong>
          <div>{loc.tracking_url}?token={loc.token}</div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default LocationMap;
