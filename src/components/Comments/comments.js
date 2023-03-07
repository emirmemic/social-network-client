import React, { useEffect, useState } from "react";
import axios from "axios";

const Comments = (props) => {
    
    return(
        <div>
         {props.comments && props.comments.map((comment, i) => (
             <div key={comment._id + "-" + i}>
             <p>{comment.content}</p>
             <p>{comment.author.username}</p>

             </div>
         ))}
        </div>
    )
}

export default Comments;