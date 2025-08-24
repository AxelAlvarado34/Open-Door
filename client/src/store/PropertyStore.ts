import { create } from "zustand";
import type { MyPropertyData, PropertyFormData, PropertyType } from "../types";
import { notifyError, notifySucces } from "../helpers/notifys";
import axios from "axios";
import { PropertiesArraySchema } from "../schemas/PropertySchema";
import { devtools } from "zustand/middleware";

type PropertyStoreType = {
    properties: MyPropertyData,
    myHouses: MyPropertyData,
    getAllProperties: () => Promise<void>
    getMyProperties: () => Promise<void>
    createPublication: (data: PropertyFormData) => Promise<void>
    deleteProperty: (id: PropertyType['id']) => Promise<void>
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const propertyStore = create<PropertyStoreType>()(devtools((set) => ({

    properties: [],
    myHouses: [],
    getAllProperties: async () => {
        try {

            const response = await axios.get(`${baseURL}/property/all-properties`)
            const result = PropertiesArraySchema.safeParse(response.data.data)

            if (!result.success) {
                console.log(result.error);
                return;
            }

            set({ properties: result.data });

        } catch (error) {
            console.log(error);
        }
    },
    getMyProperties: async () => {
        try {
            const response = await axios.get(`${baseURL}/property/get-my-properties`, {
                withCredentials: true
            });
            const result = PropertiesArraySchema.safeParse(response.data.data);

            if (!result.success) {
                console.error(result.error);
                return;
            }

            set({ myHouses: result.data })

        } catch (error) {
            console.log(error);
        }
    },
    createPublication: async (data: PropertyFormData) => {
        try {
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("category", data.category);
            formData.append("price", String(data.price));
            formData.append("bedroom", String(data.bedrooms));
            formData.append("bathroom", String(data.bathrooms));
            formData.append("parking", String(data.parking));
            formData.append("location", data.location);
            formData.append("description", data.description);

            if (data.image) {
                formData.append("image", data.image);
            }

            await axios.post(`${baseURL}/property/create`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            notifySucces("Publication created successfully");
        } catch (error) {
            console.error(error);
            notifyError("Error creating publication");
        }
    },
    deleteProperty: async (id) => {
        try {

            await axios.delete(`${baseURL}/property/delete-property/${id}`, {
                withCredentials: true
            });
            set((state) => ({
                properties: state.properties.filter((prop) => prop.id !== id),
                myHouses: state.myHouses.filter((prop) => prop.id !== id),
            }));

            notifySucces('Property delete sucessfully')

        } catch (error) {
            console.log(error);
            notifyError('Error to delete property')
        }
    }

})))