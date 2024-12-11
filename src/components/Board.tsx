export default function Board({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grid justify-center text-xs"
      style={{
        gridTemplateColumns: '120px repeat(5, 75px) 120px',
        gridTemplateRows: '120px repeat(5, 75px) 120px',
      }}
    >
      {children}
    </div>
  );
}
