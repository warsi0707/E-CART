import {z} from "zod"

export const signupSchema = z.object({
    fistName: z.string().min(3,"First name required").max(100),
    lastName: z.string().min(3,"Laset name required").max(100),
    email: z.email("Please enter a valid email"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*\d).{8,}$/,"Enter at least 8 char, with uppercase, lowercase and a number"),
})

export const signinSchema = z.object({
    email: z.email("Please enter a valid email"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*\d).{8,}$/, "Enter at least 8 char, with uppercase, lowercase and a number"),
})