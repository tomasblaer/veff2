
export default function Home({params}) {
  console.log(params);
  return (
    <main>
      <h1>{params.id}</h1>
    </main>
  );
}
