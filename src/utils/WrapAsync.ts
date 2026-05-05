import { NextRequest, NextResponse } from "next/server";
import { errorMiddleware } from "./ErrorHandler";

type Handler = (req: NextRequest, context : any) => Promise<NextResponse>;
export const WrapAsync = (fn : Handler) : Handler => {
    return async (req : NextRequest, context : any) =>{
        try {
            return await fn(req, context);
        } catch (error) {
            return errorMiddleware(error)
        }
        
    }
}