import React from 'react'
const Comment = (props) => <p className='well'>{props.comment.comment} por: {props.comment.user.name}</p>
export default Comment
