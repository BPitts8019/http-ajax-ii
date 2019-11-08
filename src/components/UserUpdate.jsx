import React, {useState, useEffect} from "react";
import api from "../utils/api";

function UserUpdate (props) {
   const [user, setUser] = useState({
      id: "",
      name: "",
      email: ""
   });

   useEffect(() => {
      api()
         .get(`/users/${props.match.params.id}`)
         .then(response => {
            // console.log("Grabed a user: " + JSON.stringify(response, null, 3));
            setUser(response.data);
         })
         .catch(err => {
            console.log(err.response);
         })
   }, [props.match.params.id]);

   const handleChange = event => {
      setUser({
         ...user,
         [event.target.name]: event.target.value
      });
   };

   const handleSubmit = event => {
      event.preventDefault();
      console.log(user);
   };

   return (
      <>
         <h1>Update User</h1>

         <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} />
            <input type="text" name="email" placeholder="Email" value={user.email} onChange={handleChange} />

            <button type="submit">Save</button>
         </form>
      </>
   );
}

export default UserUpdate;