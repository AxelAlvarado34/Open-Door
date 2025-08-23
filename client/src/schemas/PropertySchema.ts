import z from "zod";

export const PropertyFormDataSchema = z.object({
    title: z.string(),
    category: z.string(),
    price: z.number(),
    bedrooms: z.number(),
    parking: z.number(),
    bathrooms: z.number(),
    location: z.string(),
    description: z.string()
})

export const PropertySchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(100),
  description: z.string().max(500),
  category: z.enum(["Houses", "Apartment", "Warehouse", "Lots", "Cabins"]),
  price: z.number().positive(),
  bedroom: z.number().int().nonnegative(),
  bathroom: z.number().int().nonnegative(),
  parking: z.number().int().nonnegative(),
  location: z.string().max(500),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});


export const PropertiesArraySchema = z.array(PropertySchema);
