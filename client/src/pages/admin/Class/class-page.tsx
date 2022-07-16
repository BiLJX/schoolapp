import { AdminSearchBarButton } from "components/Admin/buttons";
import { ListContainer, ListItemContainer } from "container/admin/ListContainer";
import { useEffect, useState } from "react";
import Category from "./category";
import Modal from "react-modal"
import "./class-page.scss";
import AddClassModal from "./add-class-modal";
import { ClassSchema } from "@shared/School";
import { Classes } from "api/admin/admin";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { toastError } from "components/Toast/toast";
export default function AdminClassPage(){
    const [isOpen, setIsOpen] = useState(false);
    const [classes, setClasses] = useState<ClassSchema[]>([]);
    const get = async () => {
        const res = await Classes.getAdminClasses();
        if(res.error) return;
        setClasses(res.data)
    }
    useEffect(()=>{
        get()
    }, [])
    return(
        <div className = "admin-class-page">
            <AddClassModal addClasses={(class_obj)=>setClasses([class_obj, ...classes])} isOpen = {isOpen} onClose = {()=>setIsOpen(false)} />
            <header className="admin-header">
                <h1>Classes</h1>
            </header>
            <ListContainer>
                <div className = "admin-class-container-header">
                    <h2>School Classes</h2>
                    <AdminSearchBarButton label="Add Class" onClick={()=>setIsOpen(true)}  />
                </div>
                <Category />
                {
                    classes.map((x, i)=><ListItem key = {i} classData = {x} />)
                }
            </ListContainer>
        </div>
    )
}

function ListItem({classData}: {classData: ClassSchema}){
    const [isDeleted, setIsDeleted] = useState(false)
    const deleteItem = async () => {
        const shouldDelete = window.confirm("Are you sure you want to delete?")
        if(!shouldDelete) return;
        setIsDeleted(true);
        const res = await Classes.removeClass(classData.class_id);
        if(res.error){
            toastError(res.message);
            setIsDeleted(false);
            return;
        }
    }
    if(isDeleted){
        return <></>
    }
    return(
        <ListItemContainer>
            <div style={{width: "20%"}}>{classData.grade}</div>
            <div style={{width: "40%"}}>{classData.section}</div>
            <div style={{width: "35%"}}>2</div>
            <div className = "admin-list-item-delete" onClick={deleteItem}>
                <DeleteForeverOutlinedIcon />
            </div>
        </ListItemContainer>
    )
}