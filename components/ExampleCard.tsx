export function ExampleCard() {
  const launch = () => {
    console.log("here");
  };

  return (
    <div className=" w-1/3 rounded shadow divide-y">
      <div className="p-4">
        <div className="font-bold text-2xl"> Nothing found!</div>
        <div className="font-medium pt-2 text-sm">Command glossary 🏗</div>
      </div>

      <div className="p-4">
        <div className="font-mono text-sm text-gray-600">→ krane</div>
        <div className="font-mono text-sm text-gray-600">→ krane init</div>
      </div>
    </div>
  );
}
