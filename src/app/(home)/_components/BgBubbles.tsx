import Image from 'next/image';
import buble1 from '/public/images/buble1.svg';
import ellipse7 from '/public/images/Ellipse 7.svg';
import ellipse8 from '/public/images/Ellipse 8.png';
import photo13 from '/public/images/13.svg';
import photo14 from '/public/images/14.svg';
import ellipse10 from '/public/images/Ellipse 10.svg';

interface BgBubblesProps {
  isMainPage?: boolean;
}

const BgBubbles = ({ isMainPage }: BgBubblesProps) => {
  return (
    <div className="absolute left-0 top-0 h-full w-screen">
      <div className="relative h-full w-full">
        <div className="absolute left-[15%] top-[22vh] h-[17vh] w-[9vw]">
          <Image src={buble1} alt="" fill className="object-cover" priority />
        </div>
        <div className="absolute right-[-4%] top-[22vh] h-[60vh] w-[30vw]">
          <Image src={ellipse7} alt="" fill priority />
        </div>
        <div className="absolute left-0 top-[70vh] h-[50vh] w-[15vw]">
          <Image src={ellipse8} alt="" fill priority />
        </div>
        {isMainPage && (
          <>
            <div className="absolute right-[17%] top-[110vh] h-[20vh] w-[11vw]">
              <Image src={photo13} alt="" fill priority />
            </div>
            <div className="absolute left-[7%] top-[150vh] h-[16vh] w-[8.5vw]">
              <Image src={photo14} alt="" fill priority />
            </div>
          </>
        )}
        <div className="absolute right-0 top-[170vh] h-[50vh] w-[15vw]">
          <Image src={ellipse10} alt="" fill priority />
        </div>
      </div>
    </div>
  );
};

export default BgBubbles;
