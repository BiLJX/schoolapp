import { Response } from "express";

export default class JsonResponse {
    constructor(private res: Response){}
    
    public success(data: any = {}, message: string = "sucess"){
        this.res.status(200).json({
            error: false,
            status: 200,
            data,
            message
        })
    }
    public serverError(){
        this.res.status(200).json({
            error: true,
            status: 500,
            data: null,
            message: "Internal Server Error"
        })
    }
    public notFound(message: string){
        this.res.status(200).json({
            error: true,
            status: 404,
            data: {},
            message
        })
    }
    public notAuthorized(message: string = "Not authorized"){
        this.res.status(200).json({
            error: true,
            status: 401,
            data: null,
            message
        })
    }
    public clientError(message: string, data: any = null){
        this.res.status(200).json({
            error: true,
            status: 400,
            data,
            message
        })
    }
}