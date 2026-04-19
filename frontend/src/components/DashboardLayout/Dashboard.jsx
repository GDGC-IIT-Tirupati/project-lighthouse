import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

import "./dashboard.css";


function DashboardLayout(){
    return (
        <>
            <div className="app-shell">
                <Sidebar></Sidebar>
                <Header></Header>
                <main className="mainarea">
                    <div className="main-canvas">

                    </div>
                </main>
            </div>
        </>
    );
}

export default DashboardLayout;