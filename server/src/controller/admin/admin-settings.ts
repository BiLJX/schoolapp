import { Schools } from "../../models/School";
import JsonResponse from "../../utils/Response";
import { Controller } from "../../types/controller";
import { upload, uploadFile } from "../../utils/upload";
import { School } from "@shared/School";
import bcrypt from "bcrypt";
import sharp from "sharp";
import { validatePassowrd } from "../../utils/validator";

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

export const changePassword: Controller = async (req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const school_id = res.locals.admin.school_id; 
        const school = await Schools.findOne({school_id});
        if(!school) return jsonResponse.notFound("Not logged in.");
        const data: {old_password: string, new_password: string, confirm_password: string} = req.body;
        const result = await bcrypt.compare(data.old_password, school?.password);
        if(!result) return jsonResponse.clientError("Invalid old password");
        const passwordValidation = validatePassowrd(data.new_password);
        if(!passwordValidation.success) return jsonResponse.clientError(passwordValidation.message);
        if(data.new_password !== data.confirm_password) return jsonResponse.clientError("Confirm password does not match.");
        const salt = await bcrypt.genSalt(10);
        const new_password = await bcrypt.hash(data.new_password, salt);
        await Schools.findOneAndUpdate({school_id}, {
            $set: {
                password: new_password
            }
        })
        jsonResponse.success("Successfully changed password.")
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}