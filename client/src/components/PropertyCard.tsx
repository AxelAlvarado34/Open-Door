import type { PropertyType } from "../types"
import style from '../styles/PropertyCard.module.css'
import { MdOutlineBed } from "react-icons/md"
import { PiBathtub } from "react-icons/pi"
import { IoCarSportOutline } from "react-icons/io5"

type PropertyCardProps = {
  property: PropertyType
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className={style.property_card}>
      <div className={style.card_src}>

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
          <button className={style.card_btn}>
            View Detail
          </button>
          <div className={style.actions_btn}>
            <button className={style.card_btn_edit}>
              Edit
            </button>
            <button className={style.card_btn_delete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
