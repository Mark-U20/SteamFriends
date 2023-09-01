
import { useState, useEffect } from "react";
import reactLogo from "../assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "../App.css";
import { Users } from "../types/api";

export const Test = () => {
  const [steamData, setSteamData] = useState<Users | null>(null); // Use null as initial value


  async function steamUser() {
    setSteamData(await invoke("getSteamUser", {}));
  }



  useEffect(() => {
    steamUser();
  }, []);

  return (
    <div className="container">
      <h2>Steam Friends</h2>
      {steamData && (
        <div>
        <h1>{steamData.user[0].steamid}</h1>
        <h1>{steamData.user[0].avatar}</h1>

        <a href={steamData.user[0].profileurl} target="_blank">
        <img src={steamData.user[0].avatarmedium} alt="steam avatar" />
        </a>

          {/* Add more properties as needed */}
        </div>
      )} 
      
    </div>
  );
};

