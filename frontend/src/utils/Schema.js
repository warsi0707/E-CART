import {z} from "zod"

export const signupSchema = z.object({
    firstName: z.string().min(3,"First name required").max(100),
    lastName: z.string().min(3,"Last name required").max(100),
    email: z.email("Please enter a valid email"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*\d).{8,}$/,"Enter at least 8 char, with uppercase, lowercase and a number"),
})

export const signinSchema = z.object({
    email: z.email("Please enter a valid email"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*\d).{8,}$/, "Enter at least 8 char, with uppercase, lowercase and a number"),
})

export const productSchema = z.object({
    title: z.string().min(3,"Product name required").max(100),
    price: z.string().min(2,"Price required").max(100),
    category: z.string().min(5, "Category required").max(200),
    stock: z.string().min(1, "Stock required").max(500),
    description: z.string().min(5, "Must be full description").max(800),
})
export const addressSchema = z.object({
    locality: z.string().min(1,"Locality name required").max(400),
    city: z.string().min(1,"City required").max(100),
    country: z.string().min(1, "Country required").max(200),
    pin: z.string().min(1, "pin required").max(500),
})
export const updatePasswordSchema = z.object({
    email: z.email("Please enter a valid email"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*\d).{8,}$/, "Enter at least 8 char, with uppercase, lowercase and a number"),
    confirmPassword: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*\d).{8,}$/, "Enter at least 8 char, with uppercase, lowercase and a number"),
})