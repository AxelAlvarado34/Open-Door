import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MapSelector from '../components/MapSelector';
import style from '../styles/AddProperties.module.css';
import { fetchAddress, getCoordinates } from '../services/map';
import EditProperty from '../components/EditProperty';

export default function EditPropertyPage() {
    const { state } = useLocation();
    const property = state.property;

    const [address, setAddress] = useState(property.location || "");
    const [coords, setCoords] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (property.location) {
            setAddress(property.location);
            getCoordinates(property.location).then((c) => {
                if (c) setCoords(c);
            });
        }
    }, [property]);

    const handleLocationSelect = async (lat: number, lng: number) => {
        const addr = await fetchAddress(lat, lng);
        setAddress(addr);
        setCoords([lat, lng]);
    };

    return (
        <section className={style.add_content}>
            <div className={style.add_form_content}>
                <EditProperty
                    address={address}
                    setAddress={setAddress}
                    property={property}
                />
            </div>

            <div className={style.add_map_content}>
                {coords ? (
                    <MapSelector
                        onLocationSelect={handleLocationSelect}
                        initialPosition={coords}
                    />
                ) : (
                    <p className='text-white text-center'>Cargando mapa...</p>
                )}
            </div>
        </section>
    );
}
