import "./post.scss"
export default function PostSkeleton(){
    return(
        <article className = "post-card">
        <div className = "post-card-author-container">
            <div className = "post-card-pfp-container skeleton">
            </div>
            <div className="post-card-author-info" style = {{flex: "1"}}>
                <div className="post-card-author-name skeleton" style = {{width: "40%", height: "1rem"}}></div>
                <div className="post-card-category skeleton" style = {{width: "80%", height: "1rem", marginTop: "0.4rem"}}> </div>
            </div>
        </div>
        <div className = "post-card-title-container skeleton" style = {{width: "100%", height: "1rem", marginBottom: "1rem"}}>
            
        </div>
        <div className = "post-card-title-container skeleton" style = {{width: "50%", height: "1rem", marginBottom: "1rem"}}>
            
        </div>
        <div className = "post-card-title-container skeleton" style = {{width: "70%", height: "1rem", marginBottom: "1rem"}}>
            
        </div>
        <div className = "post-card-buttons-container">
            <div className = "post-card-button">
                
            </div>
            <div className = "post-card-button">
              
            </div>
        </div>
    </article>
    )
}