import { Gender, UserPersonalInformation } from "@shared/User";
import { CreateUserButtons, CreateUserFormInput, FormContainer } from "../components/form";
import { ChildrenProps } from "../create-student-page";
const PERSONAL_INFORMATION: UserPersonalInformation = {
    email: "",
    DOB: "",
    full_name: "",
    gender: "Male",
    nationality: "",
    phone_no: 98
}
export default function PersonalInformation({
    data, 
    setData,
    next,
}: ChildrenProps<UserPersonalInformation>){
    return(
        <FormContainer title="Personal Information" onSubmit={next}>
            <CreateUserFormInput label="Full Name" placeholder="Enter student's name..." value={data.full_name} onChange={val=>setData({...data, full_name: val})} />
            <CreateUserFormInput label="Email Address" placeholder="example@gmail.com" value={data.email} onChange={val=>setData({...data, email: val})} type = "email" />
            <CreateUserFormInput label="Phone no." placeholder="Enter student's phone number..." value={data.phone_no + ""} onChange={val=>setData({...data, phone_no: parseInt(val)})} />
            <CreateUserFormInput label="DOB" placeholder="" value={data.DOB} type="date" onChange={val=>setData({...data, DOB: val})} />
            <CreateUserFormInput label="Gender" placeholder="Male" value={data.gender} onChange={val=>setData({...data, gender: val as Gender})} />
            <CreateUserFormInput label="Nationality" placeholder="Enter stident's nationality..." value={data.nationality} onChange={val=>setData({...data, nationality: val})} />
            <CreateUserButtons />
        </FormContainer>
    )
}