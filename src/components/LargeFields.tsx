interface LargeFieldProps {
  name: string;
  innerDivClass?: string;
  users?: string[];
}

export default function LargeField({
  name,
  innerDivClass,
  users,
}: LargeFieldProps) {
  return (
    <div className={`lg-box`}>
      <div className={`lg-rot ${innerDivClass}`}>
        <h3>{name}</h3>
        {users?.map((user: any) => <p key={user}>{user}</p>)}
      </div>
    </div>
  );
}
