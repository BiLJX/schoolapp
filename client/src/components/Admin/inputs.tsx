interface Props {
    label?: string,
    placeholder: string,
    type: string,
    onChange: (value: string)=>any;
}

export function AdminInput(props: Props){
    return(
        <div className="admin-input-container">
            {props.label && <div className="label">{props.label}</div>}
            <input placeholder={props.placeholder} onChange = {(e)=>props.onChange?.(e.target.value)} type = {props.type}/>
        </div>
    )
}
