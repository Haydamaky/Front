import { Field } from '@/types/field';

const cornersPositions = {
  'upper-left': 'left-[17%] top-[20%]',
  'bottom-left': 'left-[17%] bottom-[20%]',
  'upper-right': 'right-[17%] top-[20%]',
  'bottom-right': 'right-[17%] bottom-[20%]',
};

interface InspectFieldProps {
  field: Field;
}

const InspectField = ({ field }: InspectFieldProps) => {
  return (
    <div
      className={`absolute bottom-[20%] right-[17%] h-[30%] w-[17%] bg-purple-600`}
    >
      {field.name}
    </div>
  );
};

export default InspectField;
