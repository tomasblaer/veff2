export default function GameLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <nav></nav>
            {children}
        </section>
    )
}