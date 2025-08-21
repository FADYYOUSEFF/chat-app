"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  return (
    <div className="page-container">
      <div className="middel-card">
        <h3 className="card-title">Enter your username</h3>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-username"
        />

        <button
          onClick={() => router.push(`/chat-room/${username}`)}
          className="start-chat-btn"
        >
          Start Chat
        </button>
      </div>
    </div>
  );
}
