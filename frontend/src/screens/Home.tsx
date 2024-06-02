import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Home = () => {
    const navigate=useNavigate();
    return (
    <div>
      <div className="pt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-center">
          <div className="flex justify-center">
            <img src={"/chess.png"} className="max-w-96" />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-white mb-4 text-center">
              Play chess online on the #2 Site!
            </h1>
           <Button onClick={()=> {
            navigate("/game");
           }}> play
           </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
