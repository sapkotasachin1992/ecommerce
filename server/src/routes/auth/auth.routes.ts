import { Router } from "express"
import { requiredAuth } from "../../middleware/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { clerkClient, getAuth } from "@clerk/express";
import { AppError } from "../../utils/AppError";
import { boolean } from "zod";
import { User } from "../../models/User";
import { ok } from "../../utils/envelope";


export const authRouter = Router()

authRouter.post('/sync', requiredAuth,
    asyncHandler(async (req, res) => {
        const { userId } = getAuth(req)

        if (!userId) {
            throw new AppError(401, "User is not authenticated")
        }

        const clerkUser = await clerkClient.users.getUser(userId)

        const extractEmailFromUserInfo =
            clerkUser.emailAddresses.find(
                item => item.id === clerkUser.primaryEmailAddressId
            ) || clerkUser.emailAddresses[0]

        const email = extractEmailFromUserInfo.emailAddress

        const fullName = [clerkUser.firstName, clerkUser.lastName]
            .filter(Boolean).join(" ").trim()

        const name = fullName || clerkUser.username

        const raw = process.env.ADMIN_EMAILS || ""
        const adminEmails = new Set(
            raw.split(",").map(item => item.trim().toLowerCase()).filter(Boolean)
        ); //new Set remove duplicate emails and store the values as set eg {e1,e2,e3} and later on we have access of has() method to check the avaible emails on our choice

        //checking if the current user is existing user or not

        const existingUser = await User.findOne({ clerkUserId: userId })
        const shouldBeAdmin = email ? adminEmails.has(email.toLocaleLowerCase()) : false //ckecking if the email is admin email or normal user Email

        const nextRole =
            existingUser?.role === "admin"
                ? "admin"
                : shouldBeAdmin
                    ? "admin"
                    : existingUser.role || "user"
        const newlyCreatedDbUser = await User.findOneAndUpdate(
            {
                clerkUserId: userId,
            },
            {
                clerkUserId: userId,
                email,
                name,
                role: nextRole,

            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        )

        res.status(200).json(
            ok({
                id: newlyCreatedDbUser._id,
                clerkUserId: newlyCreatedDbUser.clerkUserId,
                email: newlyCreatedDbUser.email,
                name: newlyCreatedDbUser.name,
                role: newlyCreatedDbUser.role

            })
        )
    })
)