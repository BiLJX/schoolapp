import { AdminSearchBarButton } from "components/Admin/buttons";
import { ListContainer } from "container/admin/ListContainer";
import { useState } from "react";
import Category from "./category";
import Modal from "react-modal"
import "./class-page.scss";
import AddClassModal from "./add-class-modal";

export default function AdminClassPage(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className = "admin-class-page">
            <AddClassModal isOpen = {isOpen} onClose = {()=>setIsOpen(false)} />
            <header className="admin-header">
                <h1>Classes</h1>
            </header>
            <ListContainer>
                <div className = "admin-class-container-header">
                    <h2>School Classes</h2>
                    <AdminSearchBarButton label="Add Class" onClick={()=>setIsOpen(true)}  />
                </div>
                <Category />
            </ListContainer>
        </div>
    )
}