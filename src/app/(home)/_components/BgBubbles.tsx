import Image from 'next/image';
import buble1 from '/public/images/buble1.svg';
import ellipse7 from '/public/images/Ellipse 7.svg';
import ellipse8 from '/public/images/Ellipse 8.png';
import photo13 from '/public/images/13.svg';
import photo14 from '/public/images/14.svg';
import ellipse10 from '/public/images/Ellipse 10.svg';
import ellipse11 from '/public/images/Ellipse 11.svg';
import base from '/public/images/base.svg';
import photo20 from '/public/images/20.svg';
import ellipse13 from '/public/images/Ellipse 13.svg';
import ellipse14 from '/public/images/Ellipse 14.svg';

interface BgBubblesProps {
  isMainPage?: boolean;
  isRoomsPage?: boolean;
}

const BgBubbles = ({ isMainPage, isRoomsPage }: BgBubblesProps) => {
  return (
    <div className="absolute left-0 top-0 h-full w-screen">
      <div className="relative h-full w-full">
        <div className="absolute left-[15%] top-[22vh] h-[16vh] w-[16vh] min-w-20">
          <Image src={buble1} alt="" fill className="object-cover" priority />
        </div>
        <div className="absolute right-[-4%] top-[22vh] h-[60vh] w-[30vw]">
          <Image src={ellipse7} alt="" fill priority />
        </div>
        <div className="absolute left-0 top-[70vh] h-[50vh] w-[15vw]">
          <Image src={ellipse8} alt="" fill priority />
        </div>
        {isMainPage ||
          (isRoomsPage && (
            <>
              <div className="absolute right-[-2%] top-[140vh] h-[40vh] w-[40vh]">
                <Image src={ellipse10} alt="" fill priority />
              </div>
              <div className="absolute left-[5%] top-[190vh] h-[16vh] w-[16vh]">
                <Image src={ellipse11} alt="" fill priority />
              </div>
            </>
          ))}
        {isRoomsPage && (
          <div className="absolute left-[50%] top-[125vh] h-[16vh] w-[16vh]">
            <Image src={ellipse14} alt="" fill priority />
          </div>
        )}
        {isMainPage && (
          <>
            <div className="absolute right-[17%] top-[110vh] h-[20vh] w-[11vw]">
              <Image src={photo13} alt="" fill priority />
            </div>
            <div className="absolute left-[7%] top-[150vh] h-[16vh] w-[8.5vw]">
              <Image src={photo14} alt="" fill priority />
            </div>
            <div className="absolute right-[11%] top-[198vh] h-[16vh] w-[16vh]">
              <Image src={base} alt="" fill priority />
            </div>
            <div className="absolute left-[8%] top-[290vh] h-[16vh] w-[16vh]">
              <Image src={photo20} alt="" fill priority />
            </div>
            <div className="absolute right-[8%] top-[300vh] h-[16vh] w-[16vh]">
              <Image src={ellipse13} alt="" fill priority />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BgBubbles;
