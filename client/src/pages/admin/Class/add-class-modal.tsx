import { ClassSchema } from "@shared/School"
import { Classes } from "api/admin/admin"
import { AdminCancelButton, AdminSearchBarButton } from "components/Admin/buttons"
import { AdminInput } from "components/Admin/inputs"
import { toastError, toastSuccess } from "components/Toast/toast"
import { useState } from "react"
import Modal from "react-modal"

interface props {
    isOpen: boolean,
    onClose: ()=>any,
    addClasses: (class_obj: ClassSchema) => any;
}
export default function AddClassModal(props: props){
    const [adding, setAdding] = useState(false)
    const [data, setData] = useState({
        grade: 0,
        section: ""
    })
    const add = async (e: any) => {
        e.preventDefault();
        if(!data.section) return;
        setAdding(true);
        const res = await Classes.addClass(data);
        if(res.error){
            toastError(res.message);
            setAdding(false)
            return;
        }
        props.addClasses(res.data);
        toastSuccess(res.message)
        props.onClose()
    }

    return(
        <Modal 
        isOpen = {props.isOpen}
        className = "modal"
        overlayClassName="modal-overlay admin-modal-overlay"
        shouldCloseOnOverlayClick = {true}
        onRequestClose = {props.onClose}
        >
            <form className="admin-form" onSubmit={add} > 
                <h2 style={{fontSize: "1.1rem", color: "var(--text-title)", marginBottom: "2rem"}}>Add class and section</h2>
                <div className="form-double-input-container">
                    <AdminInput placeholder="Class..." type="number" onChange={(val)=>setData({...data, grade: parseInt(val)})} />
                    <AdminInput placeholder="Section..." type="text" onChange={(val)=>setData({...data, section: val})} />
                </div>
                <div style={{display: "flex"}}>
                    <AdminSearchBarButton label="Add class" className="form-add-button" loading = {adding}/>
                    <AdminCancelButton onClick={props.onClose} className="form-add-button" />
                </div>

            </form>
        </Modal>
       
    )
}