export function ExampleCard() {
  return (
    <div className="divide-y w-1/2">
      <div className="py-4">
        <div className="font-bold text-2xl"> Nothing found!</div>
        <div className="pt-2 text-sm text-gray-700">
          Some useful commands to start building 🏗
        </div>
      </div>

      <div className="py-4 space-y-4">
        <div className="font-mono text-sm text-gray-800">
          → krane <span className="font-semibold">deploy</span>
        </div>
        <div className="font-mono text-sm text-gray-800">
          → krane <span className="font-semibold">alias</span> create app1
          app1.localhost.com
        </div>
        <div className="font-mono text-sm text-gray-800">
          → krane <span className="font-semibold">status</span> app1
        </div>
        <div className="font-mono text-sm text-gray-800">
          → krane <span className="font-semibold">delete</span> app1
        </div>
      </div>
    </div>
  );
}
