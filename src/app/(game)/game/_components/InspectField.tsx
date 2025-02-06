import { Field } from '@/types/field';
import { findIfCloseToCorner } from '../_utils/findIfCloseToCorner';
import { fieldPositionCoors } from '../_utils';
import InfoField from './InfoField';

const cornersPositions = {
  'upper-left': 'left-[17%] top-[20%]',
  'bottom-left': 'left-[17%] bottom-[20%]',
  'upper-right': 'right-[17%] top-[20%]',
  'bottom-right': 'right-[17%] bottom-[20%]',
} as Record<string, string>;

interface InspectFieldProps {
  field: Field;
  buttons?: React.ReactNode;
  infoFieldRef?: React.Ref<HTMLDivElement>;
}

const InspectField = ({ field, buttons, infoFieldRef }: InspectFieldProps) => {
  const corner = findIfCloseToCorner(field.index, 4);

  let position = '';
  const indexInFieldPositionsArray = field.index - 1;
  position = fieldPositionCoors[indexInFieldPositionsArray];
  const isHorizonatlField =
    field.index < 11 || (field.index > 20 && field.index < 31);
  let translate = isHorizonatlField
    ? 'translate-x-[-45%]'
    : 'translate-y-[-40%]';
  if (corner) {
    position = cornersPositions[corner];
    translate = '';
  }
  const classNames = `${position} ${translate} absolute w-[27%]`;
  return (
    <InfoField
      classNames={classNames}
      field={field}
      buttons={buttons}
      ref={infoFieldRef}
    />
  );
};

export default InspectField;
