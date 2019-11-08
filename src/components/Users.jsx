import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom";
import api from "../utils/api"

function Users(props) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		api().get("/users")
			.then(result => {
				setUsers(result.data);
			})
			.catch(error => {
				console.log(error)
			})
	}, [])

   const handleDelete = (event, id) => {
      event.preventDefault();

      api()
         .delete(`/users/${id}`)
         .then(response => {
            console.log("User was deleted");
            setUsers(users.filter(user => user.id !== id));
         })
         .catch(err => {
            console.log(err.response);
         })
   };
   
	return (
		<>
			<h1>My Account</h1>

         {users.map(user => (
            <div key={user.id} className="account">
               <Link className="account-update" to={`/users/${user.id}`}>Edit</Link>
               <button className="account-delete" onClick={e => {
                  handleDelete(e, user.id);
               }}>Delete</button>

               <div className="account-row">Name: {user.name}</div>
               <div className="account-row">Email: {user.email}</div>
            </div>
         ))}
		</>
	)
}

export default Users