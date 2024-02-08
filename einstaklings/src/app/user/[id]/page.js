
export default function UserPage({params}) {
    console.log(params.id);

    return (
        <main>
            <h1>{params.id}</h1>
        </main>
    );
}