import { Link } from 'react-router-dom';
import { userStore } from '../store/UserStore';
import style from '../styles/MyProperties.module.css'
import { Fade } from 'react-awesome-reveal';
import { propertyStore } from '../store/PropertyStore';
import { useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';

export default function MyProperties() {

    const getMyProperties = propertyStore(state => state.getMyProperties);
    const myHouses = propertyStore(state => state.myHouses)

    const isLogged = userStore(state => state.isLogged);

    useEffect(() => {
        getMyProperties()
    }, [])

    return (
        <div className={style.my_section}>

            <Fade triggerOnce={true} className={style.info_sec_fade}>
                <div className={style.may_info}>
                    <div className={style.info_src}>
                        <img src="/edid-house.webp" alt="edit" className={style.info_img}/>
                    </div>
                    <div className={style.info_text}>
                        <h1 className={style.my_title}>Manage Your Properties</h1>
                        <p className={style.my_des}>
                            Take full control of your listings with OpenDoor’s easy-to-use management panel.
                            Keep track of all your properties in one place, update details whenever needed,
                            and see which ones are attracting the most attention from potential buyers.
                        </p>
                        {isLogged && (
                            <div className='w-full'>
                                <Link className={style.btn_create} to={'/opendoor/add-property'}>Create publication</Link>
                            </div>
                        )}
                    </div>
                </div>
            </Fade>

            <Fade className={style.prop_sec_fade} delay={200}>
                <div className={style.my_properties}>
                        {
                            myHouses.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                />
                            ))
                        }
                </div>
            </Fade>
        </div>
    )
}
