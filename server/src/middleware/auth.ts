import { getAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError";
import { User } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";

export function requiredAuth(req: Request, res: Response, next: NextFunction) {

    const { userId } = getAuth(req)

    if (!userId) {
        return next(new AppError(401, 'User is not loggedin. Means auth user'))
    }

    next()
}

export async function getDbUserFromReq(req: Request) {
    const { userId } = getAuth(req)
    if (!userId) {
        throw new AppError(401, 'User is not loggedin. Means auth user')
    }
    const dbUser = await User.findOne({ clerkUserId: userId })

    if (!dbUser) {
        throw new AppError(401, 'User is not found in db')
    }

    return dbUser
}


//admin gate
//logged in user + admin access


export const requireAdmin = asyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
        const extractCurrentDbUser = await getDbUserFromReq(req)

        if (extractCurrentDbUser.role !== 'admin') throw new AppError(400, "Admin action needed")

        next()
    }
);


