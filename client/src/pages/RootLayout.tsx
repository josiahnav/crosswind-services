import Header from "../components/Header.tsx";
import {Outlet} from "react-router-dom";

export default function RootLayout () {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
}
