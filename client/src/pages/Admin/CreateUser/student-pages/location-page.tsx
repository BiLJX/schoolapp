import { CreateUserButtons, CreateUserFormInput, FormContainer, SubHeading } from "../components/form";

export default function LocationAndAddressPage(){
    return(
        <FormContainer title="Location and Address">

            <CreateUserFormInput label="City's Name" placeholder="City's name" value="" onChange={()=>null} />
            <CreateUserFormInput label="Permanent Address" placeholder="Mahadevsthan Marg, Koteshwor" value="" onChange={()=>null} />
            <CreateUserFormInput label="Temporary Address" placeholder="Optional" value="" onChange={()=>null} />
            <CreateUserFormInput label="Ward No." placeholder="Ward no." value="" onChange={()=>null} />
            
            
            <CreateUserButtons />
        </FormContainer>
    )
}