import React from "react";
import UserTable from "./userTable";
import Foot from "./Foot";
import Head from "./Head";

export default function Home() {
  return (
    <div>
      <div >
        <Head />
      </div>

      <div className="center">
        <UserTable />
      </div>
    
      <div >
        <Foot />
      </div>
    </div>
  );
}
