/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from "react"
import { ChessBoard } from "../components/ChessBoard"
import { Button } from "../components/Button";
import { useSocket } from "../hooks/useSocket";
import {Chess} from 'chess.js';


export const INIT_GAME="init_game";
export const MOVE="move";
export const GAME_OVER="game_over"

export const Game = () => {
const socket=useSocket();
const [chess]=useState(new Chess());
const [board,setboard]=useState(chess.board());

useEffect(()=>{
    if(!socket){
        return;
    }
    socket.onmessage=(event)=>{
        const message =JSON.parse(event.data);
         switch(message.type)
        {
            case INIT_GAME:
                setboard(chess.board());
                console.log("game initialzed");
                break;
            case MOVE:
                const move=message.payload;
                chess.move(move);
                setboard(chess.board());
                console.log("Move made");
                break;
            case GAME_OVER:
                console.log("game over");
                break;
                       
        }

    }
},[socket]);

if(!socket) return (
    <div>
      Connecting ...  
    </div>
);
return <div className="justify-center flex">
<div className="pt-8 max-w-screen-lg w-full">
<div className="grid grid-cols-6 gap-4w-full flex justify-center">
<div className="col-span-4
 w-full">
<ChessBoard chess={chess} setboard={setboard} socket={socket} board={board}/>
</div>
<div className="col-span-2 bg-slate-900 w-full flex justify-center">
<div className="pt-8">
<Button onClick={()=> {
            socket.send(JSON.stringify({
                type:INIT_GAME
            }))
           }}>
            play
           </Button>
</div>           
</div>
</div>
</div>
</div>
}