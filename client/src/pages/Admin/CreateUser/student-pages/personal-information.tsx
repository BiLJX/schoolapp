import { CreateUserButtons, CreateUserFormInput, FormContainer } from "../components/form";

export default function PersonalInformation(){
    return(
        <FormContainer title="Personal Information">
            <CreateUserFormInput label="Full Name" placeholder="Enter student's name..." value="" onChange={()=>null} />
            <CreateUserFormInput label="Email Address" placeholder="example@gmail.com" value="" onChange={()=>null} type = "email" />
            <CreateUserFormInput label="Phone no." placeholder="Enter student's phone number..." value="" onChange={()=>null} />
            <CreateUserFormInput label="DOB" placeholder="" value="" type="date" onChange={()=>null} />
            <CreateUserFormInput label="Gender" placeholder="Male" value="" onChange={()=>null} />
            <CreateUserFormInput label="Nationality" placeholder="Enter stident's nationality..." value="" onChange={()=>null} />
            <CreateUserButtons />
        </FormContainer>
    )
}