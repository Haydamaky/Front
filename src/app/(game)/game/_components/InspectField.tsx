import { Field } from '@/types/field';
import { findIfCloseToCorner } from '../_utils/findIfCloseToCorner';
import { colorVariats500, fieldPositionCoors } from '../_utils';
import Image from 'next/image';
import { forwardRef } from 'react';

const cornersPositions = {
  'upper-left': 'left-[17%] top-[20%]',
  'bottom-left': 'left-[17%] bottom-[20%]',
  'upper-right': 'right-[17%] top-[20%]',
  'bottom-right': 'right-[17%] bottom-[20%]',
} as Record<string, string>;

interface InspectFieldProps {
  field: Field;
  buttons?: React.ReactNode;
}

const InspectField = forwardRef<HTMLDivElement, InspectFieldProps>(
  ({ field, buttons }, ref) => {
    const corner = buttons
      ? findIfCloseToCorner(field.index, 4)
      : findIfCloseToCorner(field.index, 3);
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
    const rotateImg = isHorizonatlField
      ? 'h-[12vh] w-[6vh] rotate-90'
      : 'h-[6vh] w-[12vh]';
    const bgGroup = colorVariats500[field.color];
    console.log({ field });
    return (
      <div
        ref={ref}
        className={`absolute flex flex-col items-center pb-2 ${position} w-[24%] ${translate} rounded-xl border border-[#001125] bg-primaryGame text-white shadow-[0px_0px_4px_2px_#ffffff40]`}
      >
        <div className="w-[90%]">
          <div className="relative mx-auto mt-[5%] flex h-[9vh] w-full items-center justify-center rounded-[10px] bg-white">
            <div
              className={`mb-[15%] ${rotateImg}`}
              style={{
                backgroundImage: `url(${field.imageUrl})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
          </div>
          <div
            className={`flex h-[2.6vh] w-full translate-y-[-96%] items-center justify-center rounded-b-[10px] ${bgGroup}`}
          >
            <p>{field.group}</p>
          </div>
          <p className="translate-y-[-45%] text-[10px]">
            Інвестуйте у філії, щоб примножити свої прибутки.
          </p>
          {field?.income?.length && (
            <>
              <div className="flex items-center justify-between">
                <p className="text-[10px]">Базовий прибуток</p>
                <p className="text-[13px]">{field.income[0]}m</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={10}
                    height={10}
                  />
                </div>
                <p className="text-[13px]">{field.income[1]}m</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={10}
                    height={10}
                  />
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={10}
                    height={10}
                  />
                </div>
                <p className="text-[13px]">{field.income[2]}m</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={10}
                    height={10}
                  />
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={10}
                    height={10}
                  />
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={10}
                    height={10}
                  />
                </div>
                <p className="text-[13px]">{field.income[3]}m</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={10}
                    height={10}
                  />
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={10}
                    height={10}
                  />
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={10}
                    height={10}
                  />
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={10}
                    height={10}
                  />
                </div>
                <p className="text-[13px]">{field.income[4]}m</p>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div>
                  <Image
                    src="/images/BuildGold.svg"
                    alt="silver-building"
                    width={20}
                    height={20}
                  />
                </div>
                <p className="text-[13px]">{field.income[5]}m</p>
              </div>
              <div className="my-3 h-[1px] w-full bg-white"></div>
              <div className="flex items-center justify-between">
                <p className="text-[10px]">Вартість поля</p>
                <p className="text-[13px]">{field.price}m</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px]">Застава поля</p>
                <p className="text-[13px]">{field.pledgePrice}m</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px]">Викуп поля</p>
                <p className="text-[13px]">{field.redemptionPrice}m</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px]">Купівля філії</p>
                <p className="text-[13px]">{field.branchPrice}m</p>
              </div>
            </>
          )}
        </div>
        {buttons && buttons}
      </div>
    );
  },
);

export default InspectField;
