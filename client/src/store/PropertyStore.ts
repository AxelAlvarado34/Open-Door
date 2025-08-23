import { create } from "zustand";
import type { MyPropertyData, PropertyFormData } from "../types";
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
        console.log(data);

        try {
            await axios.post(`${baseURL}/property/create`, {
                ...data,
                price: Number(data.price),
                bedroom: Number(data.bedrooms),
                bathroom: Number(data.bathrooms),
                parking: Number(data.parking)
            }, {
                withCredentials: true
            });

            notifySucces("Publication created successfully");
        } catch (error) {
            console.log(error);
            notifyError("Error creating publication");
        }
    }
})))