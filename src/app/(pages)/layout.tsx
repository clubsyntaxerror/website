import Nav from "../../components/nav";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Nav />
            {children}
        </>
    );
}
