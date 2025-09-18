import React, { useState } from "react";

const predefinedRooms = ["General", "Tech", "Gaming", "Music", "Random"];

export default function RoomList({ onSelectRoom }) {
  const [rooms, setRooms] = useState(predefinedRooms);
  const [newRoom, setNewRoom] = useState("");

  const handleAddRoom = () => {
    if (newRoom.trim() && !rooms.includes(newRoom)) {
      setRooms([...rooms, newRoom]);
      setNewRoom("");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Choose a Chat Room</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {rooms.map((room, index) => (
          <li key={index} style={{ margin: "10px 0" }}>
            <button
              onClick={() => onSelectRoom(room)}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              {room}
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="New room name"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          style={{ padding: "5px 10px" }}
        />
        <button
          onClick={handleAddRoom}
          style={{ padding: "5px 10px", marginLeft: "5px", cursor: "pointer" }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
