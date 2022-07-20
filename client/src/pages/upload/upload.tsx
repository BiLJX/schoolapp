import { FormInput, FormSubmit } from "components/form/FormComponents";
import MobileStackHeader from "components/header/mobile-header";

import StackContainer from "container/mobile-layouts/stack-container";
import { UploadCategory } from "./components";
import "./scss/upload.scss";


export function UploadPost(){
    return(
        <>
            <MobileStackHeader label="Upload a post" />
            <StackContainer className="upload-page">
                <UploadCategory />
                <input placeholder="Write a Title..." className = "upload-title" />
                <textarea placeholder="Write a Body..." className="upload-body" />
                <FormSubmit label="Post" />
            </StackContainer>
        </>
    )
}