import { Button, ButtonProps } from '../ui/button';

interface DoubleLayerBtnProps extends ButtonProps {
  outerClasses?: string;
}

const DoubleLayerBtn = ({ outerClasses, ...props }: DoubleLayerBtnProps) => {
  const defaultOuterClasses = 'group relative inline-block h-[45px] w-[200px]';
  return (
    <div className={`${defaultOuterClasses} ${outerClasses}`}>
      <span className="absolute inset-0 translate-x-1 translate-y-1 rounded-[5px] border border-white transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-primaryGame"></span>
      <Button {...props} variant={'startGame'} size={'empty'}></Button>
    </div>
  );
};

export default DoubleLayerBtn;
