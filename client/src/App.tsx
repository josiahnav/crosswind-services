import './App.css'
import SongsPage from "./pages/SongsPage/SongsPage.tsx";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import RootLayout from "./pages/RootLayout.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {path: 'songs', element: <SongsPage/>}
        ]
    }
]);

function App() {
    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    )
}

export default App
