import MutualChat from './_components/MutualChat';

const RoomsPage = () => {
  return (
    <div className="mx-auto grid h-[300vh] w-11/12 max-w-7xl grid-cols-1 md:w-full md:grid-cols-[45fr_55fr] md:gap-8 lg:gap-16">
      <MutualChat />
    </div>
  );
};

export default RoomsPage;
