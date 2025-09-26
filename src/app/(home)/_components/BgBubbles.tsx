import Image from 'next/image';
import photo13 from '/public/images/13.svg';
import photo14 from '/public/images/14.svg';

const BgBubbles = () => {
  return (
    <div className="absolute left-0 top-0 h-full w-screen">
      <div className="relative h-full w-full">
        <div className="absolute right-[17%] top-[110vh] h-[20vh] w-[11vw]">
          <Image src={photo13} alt="" fill priority />
        </div>
        <div className="absolute left-[7%] top-[150vh] h-[16vh] w-[8.5vw]">
          <Image src={photo14} alt="" fill priority />
        </div>
      </div>
    </div>
  );
};

export default BgBubbles;
