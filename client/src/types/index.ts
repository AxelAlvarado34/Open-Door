import type z from "zod";
import type { ForgetDataFormSchema, LoginDataFormSchema, RegisterDataFormSchema, ResetDataFormtSchema, UserDataResponseSchema,  } from "../schemas/User.schemas";
import type { PropertiesArraySchema, PropertyFormDataSchema, PropertySchema } from "../schemas/PropertySchema";

//Auth Types
export type LoginDataForm = z.infer<typeof LoginDataFormSchema>
export type RegisterDataForm = z.infer<typeof RegisterDataFormSchema>
export type ForgetDataForm = z.infer<typeof ForgetDataFormSchema>
export type ResetDataForm = z.infer<typeof ResetDataFormtSchema>
export type UsrDataResponse = z.infer<typeof UserDataResponseSchema>

//Proepties Types
export type PropertyFormData = z.infer<typeof PropertyFormDataSchema>

export type PropertyType = z.infer<typeof PropertySchema>;
export type MyPropertyData = z.infer<typeof PropertiesArraySchema>