import { Fade } from 'react-awesome-reveal'
import style from '../styles/Home.module.css'
import { IoMdAddCircle } from 'react-icons/io'
import { FaEye } from "react-icons/fa";
import { userStore } from '../store/UserStore';
import { Link } from 'react-router-dom';
import { propertyStore } from '../store/PropertyStore';
import { useEffect, useMemo } from 'react';
import PropertyCardPublic from '../components/PropertyCardPublic';
import LastProperty from '../components/LastProperty';

export default function HomePage() {

  const properties = propertyStore(state => state.properties)
  const propertiesAll = propertyStore(state => state.getAllProperties)
  const isLogged = userStore(state => state.isLogged);

  useEffect(() => {
    propertiesAll()
  }, [])

  const latestProperty = useMemo(() => {
    if (properties.length === 0) return null;
    return [...properties].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  }, [properties]);

  return (
    <>
      <div className={style.home_page}>

        <div className={style.home_left}>

          <Fade triggerOnce={true}>
            <div className={style.banner}>

              <div className={style.banner_text}>
                <p className={style.banner_title}>Your Next Home Awaits</p>
                <p className={style.banner_description}>
                  Explore listings, browse houses and apartments, and find the perfect place to call home. OpenDoor makes your search simple and fun!
                </p>
              </div>

              <div className={style.banner_image}>
                <img className={style.banner_house} src="/house-sec.png" alt="house_banner" />
              </div>
            </div>
          </Fade>

          <div className={style.double_home}>
            <Fade triggerOnce={true} delay={200}>
              <div className={style.home_create}>
                <p className={style.create_title}><IoMdAddCircle className={style.create_icon} /> Publish Your Property</p>
                <p className={style.create_des}>
                  Share your property with thousands of potential buyers. Add photos, details, and make your listing stand out on OpenDoor.
                </p>

                {isLogged && (
                  <div className='w-full'>
                    <Link className={style.btn_create} to={'/opendoor/add-property'}>Create publication</Link>
                  </div>
                )}
              </div>
            </Fade>

            <Fade triggerOnce={true} delay={400}>
              <div className={style.home_create}>
                <p className={style.create_title}><FaEye className={style.create_icon} /> Watch your properties</p>
                <p className={style.create_des}>
                  View and monitor all your published listings in real time. Stay updated on your properties and manage them easily with OpenDoor.
                </p>

                {isLogged && (
                  <div className='w-full'>
                    <Link className={style.btn_create} to={'/opendoor/my-properties'}>Your properties</Link>
                  </div>
                )}
              </div>
            </Fade>
          </div>
        </div>

        <div className={style.home_right}>
          {latestProperty ? (
            <LastProperty property={latestProperty} />
          ) : (
            <p className='text-center'>No properties available</p>
          )}
        </div>

      </div >

      <div className={style.all_publications}>
        {
          properties.map((property) => (
            <PropertyCardPublic property={property} key={property.id} />
          ))
        }
      </div>
    </>
  )
}
