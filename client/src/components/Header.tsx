import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <header className="h-11 bg-blue-500 mb-10 px-4 flex flex-row items-center">
            <img src="/logo.svg" alt="Crosswind Logo" className="h-5/6 cursor-pointer"/>
            <div className="grow flex flex-row justify-end gap-5 text-white">
                <NavLink
                    to="/songs"
                    className={({isActive}) => isActive ? 'font-medium' : undefined}
                >
                    Songs
                </NavLink>
                {/*TODO: to attribute here is a placeholder*/}
                <NavLink
                    to="/"
                    className={({isActive}) => isActive ? 'font-medium' : undefined}
                    end
                >
                    Log Out
                </NavLink>
            </div>
        </header>
    );
}
