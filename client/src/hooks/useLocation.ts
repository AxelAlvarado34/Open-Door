import { useEffect, useState } from "react";

type Coordinates = [number, number];

export function useGeocode(address: string) {
  const [coords, setCoords] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchCoords = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await res.json();
        if (data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (err) {
        console.error("Error geocoding address:", err);
      }
    };

    fetchCoords();
  }, [address]);

  return coords;
}
