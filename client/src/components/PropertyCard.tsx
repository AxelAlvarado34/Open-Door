import type { PropertyType } from "../types"
import style from '../styles/PropertyCard.module.css'
import { MdOutlineBed } from "react-icons/md"
import { PiBathtub } from "react-icons/pi"
import { IoCarSportOutline } from "react-icons/io5"
import PopUp from "./PopUp"
import ActionsBtn from "./ActionsBtn"

type PropertyCardProps = {
  property: PropertyType
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className={style.property_card}>
      <div className={style.card_src}>
        <img src={property.image} alt="" className={style.card_img} />
      </div>

      <div className={style.card_text}>
        <div className={style.text_head}>
          <p className={style.head_title}>{property.title}</p>
          <p className={style.head_price}>${property.price}</p>
        </div>
        <p className={style.category}>Category:{' '}{property.category}</p>

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

        <div>
          <div className={style.actions_btn}>
            <PopUp property={property} />
            <ActionsBtn
              property={property}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
