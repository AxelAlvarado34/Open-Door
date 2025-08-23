import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import styles from '../../styles/ClientsCarousel.module.css'

export default function ClientCarousel() {
    const [sliderRef] = useKeenSlider({
        loop: true,
        renderMode: "performance",
        drag: false,
        slides: { perView: 3, spacing: 15 },
        breakpoints: {
            "(max-width: 767px)": { slides: { perView: 1, spacing: 10 } },
            "(min-width: 768px) and (max-width: 1024px)": { slides: { perView: 2, spacing: 15 } },
            "(min-width: 1025px)": { slides: { perView: 3, spacing: 20 } },
        },
        created(s) {
            s.moveToIdx(0, true, { duration: 2000 })
            setInterval(() => {
                s.next()
            }, 2500)
        }
    });
    const clients = [
        {
            img: "/client-1.png",
            name: "John Smith",
            comment: "The service was outstanding from the very first contact. Thanks to them, I found my dream home with all the personalized attention I needed."
        },
        {
            img: "/client-2.png",
            name: "Emily Johnson",
            comment: "They were very attentive and professional throughout the entire process. They guided me every step of the way and answered all my questions patiently and clearly."
        },
        {
            img: "/client-3.png",
            name: "Michael Brown",
            comment: "The process was quick, efficient, and hassle-free. The platform is very intuitive, and the team was always available to assist me."
        },
        {
            img: "/client-4.png",
            name: "Sarah Davis",
            comment: "They guided me through the entire buying process with dedication and honesty. I highly recommend them for anyone looking for friendly and professional service."
        },
        {
            img: "/client-5.png",
            name: "David Wilson",
            comment: "They offer a wide range of options for every budget. The service was excellent, and they always took the time to understand my needs."
        },
        {
            img: "/client-6.png",
            name: "Laura Martinez",
            comment: "Highly committed professionals who provided high-quality service and constant support throughout the entire process."
        },
    ];


    return (
        <div className={styles.clients_content}>
            <div ref={sliderRef} className="keen-slider">
                {clients.map((client, i) => (
                    <div key={i} className={`keen-slider__slide ${styles.clientCard}`}>
                        <div className={styles.clientHeader}>
                            <img src={client.img} className={styles.clientImg} alt={client.name} />
                            <span className={styles.clientName}>{client.name}</span>
                        </div>
                        <p className={styles.clientComment}>{client.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
