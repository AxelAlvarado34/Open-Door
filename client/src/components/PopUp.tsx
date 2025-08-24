import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import type { PropertyType } from '../types'
import style from '../styles/Dialog.module.css'
import { BsHouseDoor } from "react-icons/bs";
import { MdOutlineBed } from 'react-icons/md';
import { PiBathtub } from 'react-icons/pi';
import { IoCarSportOutline } from 'react-icons/io5';
import { useGeocode } from '../hooks/useLocation';
import MapSelector from './MapSelector';
import { IoLocation } from "react-icons/io5";

type PopUpProps = {
    property: PropertyType
}

export default function PopUp({ property }: PopUpProps) {
    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const coords = useGeocode(property.location);

    return (
        <>
            <Button
                onClick={open}
                className="cursor-pointer mt-5 rounded-2xl text-white text-lg w-full bg-black p-4"
            >
                View Details
            </Button>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>

                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className={`${style.modal} backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0`}
                        >
                            <div className={style.modal_info}>
                                <section className={style.modal_src}>
                                    <img src={property.image} alt="home" className={style.modal_img} />
                                </section>
                                <div>
                                    <DialogTitle as="h3" className={style.modal_title}>
                                        {property.title}
                                    </DialogTitle>
                                    <p className={style.modal_cat}>
                                        <BsHouseDoor className={style.modal_icon} />
                                        Category:{' '}{property.category}
                                    </p>
                                    <p className={style.modal_loc}>
                                         <div className='flex gap-1 items-center'>
                                            <IoLocation  className={style.modal_icon} />{' '}Location:
                                         </div>
                                        {property.location}
                                    </p>
                                    <p className={style.modal_des}>
                                        {property.description}
                                    </p>

                                    <div className={style.modal_dates}>
                                        <div className={style.card_icons}>
                                            <div className={style.icon_div}>
                                                <MdOutlineBed />
                                                <p>{property.bedroom}{' '}Beds</p>
                                            </div>

                                            <div className={style.icon_div}>
                                                <PiBathtub />
                                                <p>{property.bathroom}{' '}Bathrooms</p>
                                            </div>

                                            <div className={style.icon_div}>
                                                <IoCarSportOutline />
                                                <p>{property.parking}{' '}Parkings</p>
                                            </div>
                                        </div>
                                        <div className={style.modal_map}>
                                            {coords ? (
                                                <MapSelector
                                                    onLocationSelect={() => { }}
                                                    initialPosition={coords}
                                                />
                                            ) : (
                                                <p>Cargando mapa...</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <Button
                                            className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-whit data-open:bg-gray-700"
                                            onClick={close}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
