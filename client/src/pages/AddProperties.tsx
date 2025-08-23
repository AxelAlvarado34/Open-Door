import { useState } from 'react';
import GeneralInfoForm from '../components/GeneralInfoForm';
import MapSelector from '../components/MapSelector';
import style from '../styles/AddProperties.module.css';
import { fetchAddress } from '../services/map';

export default function AddProperties() {
  const [address, setAddress] = useState("");

  const handleLocationSelect = async (lat: number, lng: number) => {
    const addr = await fetchAddress(lat, lng);
    setAddress(addr);
    console.log(location);
  };

  return (
    <section className={style.add_content}>
      <div className={style.add_form_content}>
        <GeneralInfoForm
          address={address}
          setAddress={setAddress}
        />
      </div>

      <div className={style.add_map_content}>
        <MapSelector onLocationSelect={handleLocationSelect} />
      </div>
    </section>
  );
}
