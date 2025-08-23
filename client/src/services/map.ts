export const fetchAddress = async (lat: number, lng: number) => {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        return data.display_name || "";
    } catch (error) {
        console.error("Error fetching address:", error);
        return "";
    }
};