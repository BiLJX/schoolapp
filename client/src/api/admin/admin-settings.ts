import { School } from "@shared/School";
import axios from "../instance";

export const editSchool = async (data: School, logo: File|undefined) => {
    const formData = new FormData();
    for(let key in data){
        let _data: any = {...data};
        delete _data.logo_url
        formData.append(key, _data[key]);
    }
    formData.append("logo", logo as File);
    const res = await axios.patch("/api/admin/settings/edit/school", formData);
    return res.data as ApiResponse<School>;
}