import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from '../styles/UserLayout.module.css'

export default function Carrousel() {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        speed: 800,
        cssEase: "ease-in-out"
    };

    const imagenes = [
        '/h1.jpg',
        '/h2.jpg',
        '/h3.jpg'
    ];

    return (
        <div className={style.user_carrousel}>
            <Slider {...settings} className="h-full">
                {imagenes.map((img, i) => (
                    <div key={i} style={{ height: '100vh' }}>
                        <img
                            src={img}
                            alt={`imagen-${i}`}
                            className={style.user_img_bg}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

