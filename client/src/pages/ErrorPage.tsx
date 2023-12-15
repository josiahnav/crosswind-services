import Header from "../components/Header.tsx";

export default function ErrorPage() {
    return (
        <>
            <Header></Header>
            <main className="m-10">
                <h1 className="text-3xl">404 Not Found</h1>
                <p>Could not find the requested page</p>
            </main>
        </>
    );
}
