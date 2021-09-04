import React from "react";
import { useSelector } from "react-redux";
import { NoteScreen } from "../notes/NoteScreen";
import { NothingSelected } from "./NothingSelected";
import { Sidebar } from "./Sidebar";

export const JournalScreen = () => {

  const {active} = useSelector(state => state.notes);

  return (
    <div className='container-sm-fluid journal__main-content animate__animated animate__fadeIn animate__faster'>
      <Sidebar/>
      <main> 
        { (active) ? (<NoteScreen/>) : (<NothingSelected/>) }   
        <a class="btn-floating" id="menu-btn" ><i class="fa-solid fa-bars"></i></a> 
      </main>
    </div>
  );
};
