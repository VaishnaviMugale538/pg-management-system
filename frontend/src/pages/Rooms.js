import React, { useEffect, useState } from "react";
import axios from "axios";

function Rooms() {

  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");

  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    capacity: "",
    rent: ""
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms", error);
    }
  };

  const handleChange = (e) => {
    setNewRoom({
      ...newRoom,
      [e.target.name]: e.target.value
    });
  };

  const addRoom = async () => {

    if (!newRoom.roomNumber || !newRoom.capacity || !newRoom.rent) {
      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post("http://localhost:8080/api/rooms", {
        roomNumber: newRoom.roomNumber,
        capacity: Number(newRoom.capacity),
        rent: Number(newRoom.rent)
      });

      fetchRooms();

      setNewRoom({
        roomNumber: "",
        capacity: "",
        rent: ""
      });

    } catch (error) {
      console.error("Error adding room", error);
    }
  };

  const filteredRooms = rooms.filter(r =>
    r.roomNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px" }}>

      <h2>Rooms Management</h2>

      <input
        placeholder="Search room..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "250px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginBottom: "20px"
        }}
      />

      <h3>Add Room</h3>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>

        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          value={newRoom.roomNumber}
          onChange={handleChange}
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={newRoom.capacity}
          onChange={handleChange}
        />

        <input
          type="number"
          name="rent"
          placeholder="Rent"
          value={newRoom.rent}
          onChange={handleChange}
        />

        <button
          onClick={addRoom}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Add Room
        </button>

      </div>

     <table className="table">

        <thead style={{ background: "#111827", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Room Number</th>
            <th>Capacity</th>
            <th>Occupied</th>
            <th>Vacancy</th>
            <th>Rent</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {filteredRooms.map((room) => (

            <tr key={room.roomId} style={{ borderBottom: "1px solid #ddd" }}>

              <td>{room.roomId}</td>
              <td>{room.roomNumber}</td>
              <td>{room.capacity}</td>

              <td>{room.occupiedBeds}</td>

              <td>{room.capacity - room.occupiedBeds}</td>

              <td>{room.rent}</td>

              <td>

                {room.occupiedBeds === room.capacity ? (

                  <span style={{ color: "red", fontWeight: "bold" }}>
                    FULL
                  </span>

                ) : (

                  <span style={{ color: "green", fontWeight: "bold" }}>
                    AVAILABLE
                  </span>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Rooms;