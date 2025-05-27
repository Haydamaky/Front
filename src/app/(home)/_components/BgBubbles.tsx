import Image from 'next/image';
import buble1 from '/public/images/buble1.svg';
import ellipse7 from '/public/images/Ellipse 7.svg';
import ellipse8 from '/public/images/Ellipse 8.png';
const BgBubbles = () => {
  return (
    <div className="absolute left-0 top-0 h-full w-screen">
      <div className="relative h-full w-full">
        <div className="absolute left-[15%] top-[22vh] h-[16vh] w-[9vw]">
          <Image src={buble1} alt="" fill className="object-cover" priority />
        </div>
        <div className="absolute right-[-4%] top-[22vh] h-[60vh] w-[30vw]">
          <Image src={ellipse7} alt="" fill priority />
        </div>
        <div className="absolute left-0 top-[70vh] h-[50vh] w-[15vw]">
          <Image src={ellipse8} alt="" fill priority />
        </div>
      </div>
    </div>
  );
};

export default BgBubbles;
