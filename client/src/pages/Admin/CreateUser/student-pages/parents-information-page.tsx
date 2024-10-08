import { StudentParentsInformation } from "@shared/User";
import { CreateUserButtons, CreateUserFormInput, FormContainer, SubHeading } from "../components/form";
import { ChildrenProps } from "../create-student-page";

export default function ParentsInformationPage({data, next, setData}:ChildrenProps<StudentParentsInformation>){
    return(
        <FormContainer title="Parent's Information" onSubmit={next}>
            
            <SubHeading>Mother's Information</SubHeading>

            <CreateUserFormInput label="Mother's Name" placeholder="Enter student's mother's name..." value="" onChange={()=>null} />
            <CreateUserFormInput label="Mother's Email" placeholder="example@gmail.com" value="" onChange={()=>null} type = "email" />
            <CreateUserFormInput label="Mother's Contact no." placeholder="Enter Mother's phone number..." value="" onChange={()=>null} />
            
            <SubHeading>Father's Information</SubHeading>

            <CreateUserFormInput label="Father's Name" placeholder="Enter student's Father's name..." value="" onChange={()=>null} />
            <CreateUserFormInput label="Father's Email" placeholder="example@gmail.com" value="" onChange={()=>null} type = "email" />
            <CreateUserFormInput label="Father's Contact no." placeholder="Enter Father's phone number..." value="" onChange={()=>null} />
            
            <CreateUserButtons />
        </FormContainer>
    )
}