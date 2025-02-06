import { Field } from '@/types/field';
import { colorVariats500 } from '../_utils';
import Image from 'next/image';
import { forwardRef } from 'react';

interface InfoFieldProps {
  field: Field;
  classNames?: string;
  buttons?: React.ReactNode;
}

const InfoField = forwardRef<HTMLDivElement, InfoFieldProps>(
  ({ field, classNames, buttons }, ref) => {
    const isHorizonatlField =
      field.index < 11 || (field.index > 20 && field.index < 31);

    const rotateImg = isHorizonatlField
      ? 'h-[13vh] w-[8vh] rotate-90'
      : 'h-[8vh] w-[13vh]';
    const bgGroup = colorVariats500[field.color];
    return (
      <div
        ref={ref}
        className={`${classNames} flex flex-col items-center rounded-xl border border-[#001125] bg-primaryGame pb-2 text-white shadow-[0px_0px_4px_2px_#ffffff40]`}
      >
        <div className="w-[90%]">
          <div className="relative mx-auto mt-[5%] flex h-[10vh] w-full items-center justify-center rounded-[10px] bg-white">
            <div
              className={`mb-[10%] ${rotateImg}`}
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
            <p className="text-base">{field.group}</p>
          </div>
          <p className="translate-y-[-45%] text-xs">
            Інвестуйте у філії, щоб примножити свої прибутки.
          </p>
          {field?.income?.length && (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm">Базовий прибуток</p>
                <p className="text-base">{field.income[0]}m</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={14}
                    height={14}
                  />
                </div>
                <p className="text-base">{field.income[1]}m</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={14}
                    height={14}
                  />
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={14}
                    height={14}
                  />
                </div>
                <p className="text-base">{field.income[2]}m</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={14}
                    height={14}
                  />
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={14}
                    height={14}
                  />
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={14}
                    height={14}
                  />
                </div>
                <p className="text-base">{field.income[3]}m</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={14}
                    height={14}
                  />
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={14}
                    height={14}
                  />
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={14}
                    height={14}
                  />
                  <Image
                    src="/images/BuildSilver.svg"
                    alt="silver-building"
                    width={14}
                    height={14}
                  />
                </div>
                <p className="text-base">{field.income[4]}m</p>
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
                <p className="text-base">{field.income[5]}m</p>
              </div>
              <div className="my-3 h-[1px] w-full bg-white"></div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Вартість поля</p>
                <p className="text-base">{field.price}m</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Застава поля</p>
                <p className="text-base">{field.pledgePrice}m</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Викуп поля</p>
                <p className="text-base">{field.redemptionPrice}m</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Купівля філії</p>
                <p className="text-base">{field.branchPrice}m</p>
              </div>
            </>
          )}
        </div>
        {buttons && buttons}
      </div>
    );
  },
);

export default InfoField;
