import { Schools } from "./models/School";
import bcrypt from "bcrypt"
import { makeId } from "./utils/idgen";
import mongoose from "mongoose";

const CONNECTION_URL = "mongodb+srv://billjesh:Billu456@cluster0.vyegx.mongodb.net/Schoolapp?retryWrites=true&w=majority"

const SCHOOL_PASSWORD = "euro1221@admin"

const createSchool = async () => {
    const salt = await bcrypt.genSalt(10)
    const school = new Schools({
        school_id: makeId(),
        name: "Euro School",
        logo_url: "https://euroschool.edu.np/wp-content/uploads/2022/02/logo.png",
        password: await bcrypt.hash(SCHOOL_PASSWORD, salt)
    });
    await school.save();
    console.log("created")
}
mongoose.connect(CONNECTION_URL).then(()=>{
    createSchool()
})