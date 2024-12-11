interface SmallFieldProps {
  name: string;
  price: number;
  outerDivClass?: string;
  innerDivClass?: string;
  users?: string[];
}

export default function SmallField({
  name,
  price,
  outerDivClass,
  innerDivClass,
  users,
}: SmallFieldProps) {
  return (
    <div className={`sm-box ${outerDivClass && outerDivClass}`}>
      <div className={`sm-box ${outerDivClass && innerDivClass}`}>
        <span className="title">
          <h3>{name}</h3>
          {users?.map((user: any) => <p key={user}>{user}</p>)}
        </span>
        <span className="price">{price}</span>
      </div>
    </div>
  );
}
