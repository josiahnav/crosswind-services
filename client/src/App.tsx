import './App.css'
import SongsPage from "./pages/SongsPage/SongsPage.tsx";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import RootLayout from "./pages/RootLayout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import EditPage from "./pages/SongsPage/EditPage/EditPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: 'songs', element: <SongsPage/>},
            {path: 'songs/edit/:songId', element: <EditPage/>}
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
