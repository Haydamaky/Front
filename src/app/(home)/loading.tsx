import { Spinner } from '@nextui-org/react';

function loading() {
  return (
    <div className="fixed right-1/2 top-[35%]">
      <Spinner color="primary" size="lg" />
    </div>
  );
}

export default loading;
