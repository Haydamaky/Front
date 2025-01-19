import { Field } from '@/types/field';
import { findIfCloseToCorner } from '../_utils/findIfCloseToCorner';
import { fieldPositionCoors } from '../_utils';

const cornersPositions = {
  'upper-left': 'left-[17%] top-[20%]',
  'bottom-left': 'left-[17%] bottom-[20%]',
  'upper-right': 'right-[17%] top-[20%]',
  'bottom-right': 'right-[17%] bottom-[20%]',
} as Record<string, string>;

interface InspectFieldProps {
  field: Field;
}

const InspectField = ({ field }: InspectFieldProps) => {
  const corner = findIfCloseToCorner(field.index);
  let position = '';
  const indexInFieldPositionsArray = field.index - 1;
  position = fieldPositionCoors[indexInFieldPositionsArray];
  const isHorizonatlField =
    field.index < 11 || (field.index > 20 && field.index < 31);
  let translate = isHorizonatlField
    ? 'translate-x-[-40%]'
    : 'translate-y-[-40%]';
  if (corner) {
    position = cornersPositions[corner];
    translate = '';
  }
  return (
    <div
      className={`absolute ${position} h-[30%] w-[17%] bg-purple-600 ${translate}`}
    >
      {field.name}
    </div>
  );
};

export default InspectField;
