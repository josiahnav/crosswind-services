import './App.css'
import SongsPage from "./pages/SongsPage/SongsPage.tsx";
import Header from "./components/Header.tsx";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
    {path: 'songs', element: <SongsPage/>}
]);

function App() {
    return (
        <>
            <Header></Header>
            <RouterProvider router={router}></RouterProvider>
        </>
    )
}

export default App
