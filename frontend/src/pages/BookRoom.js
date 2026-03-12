import React, { useEffect, useState } from "react";
import axios from "axios";

function BookRoom(){

const [rooms,setRooms] = useState([]);

useEffect(()=>{
fetchRooms();
},[]);

const fetchRooms = async()=>{
const res = await axios.get("http://localhost:8080/api/rooms");
setRooms(res.data);
};

const bookRoom = async(roomId)=>{

await axios.post("http://localhost:8080/api/tenants",{
name:"New Tenant",
phone:"0000000000",
roomId:roomId
});

alert("Room Booked!");

};

return(

<div>

<h2>Available Rooms</h2>

<table className="table">

<thead>
<tr>
<th>Room</th>
<th>Capacity</th>
<th>Rent</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{rooms.map((room)=>(
<tr key={room.roomId}>

<td>{room.roomNumber}</td>
<td>{room.capacity}</td>
<td>₹{room.rent}</td>

<td>
<button onClick={()=>bookRoom(room.roomId)}>
Book
</button>
</td>

</tr>
))}

</tbody>

</table>

</div>

);

}

export default BookRoom;