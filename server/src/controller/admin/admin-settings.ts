import { Schools } from "../../models/School";
import JsonResponse from "../../utils/Response";
import { Controller } from "../../types/controller";
import { upload, uploadFile } from "../../utils/upload";
import { School } from "@shared/School";
import sharp from "sharp";

export const editSchool: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    upload(req, res, async err=>{
        if(err) return jsonResponse.serverError();
        try {
            const school_id = res.locals.admin.school_id; 
            const files = req.files as Express.Multer.File[];
            const image = files[0];
            const data: School = req.body;
            if(image){
                if(!image.mimetype.includes("image")) return jsonResponse.clientError("Invalid image type.")
                const buffer = await sharp(image.buffer).jpeg({ quality: 80 }).toBuffer();
                const url = await uploadFile({buffer, dir: `school/${school_id}/logo/`, replace: true})
                data.logo_url = url;
            }
            await Schools.findOneAndUpdate({school_id}, {
                $set: data
            });
            jsonResponse.success(data);
        } catch (error) {
            console.log(error);
            jsonResponse.serverError()
        }
    })
    
}