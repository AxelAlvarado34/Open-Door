import {z} from 'zod'

export const LoginDataFormSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const RegisterDataFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    repeat_password: z.string(),
})

export const ForgetDataFormSchema = z.object({
    email: z.string()
})


export const ResetDataFormtSchema = z.object({
    new_password: z.string(),
    new_repeat_password: z.string(),
    token: z.string()
})


export const UserDataResponseSchema = z.object({
    name: z.string()
})