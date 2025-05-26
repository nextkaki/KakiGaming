interface AdContainerProps {
  size?: 'vertical' | 'horizontal' | 'square';
  className?: string;
}

export default function AdContainer({ size = 'vertical', className = '' }: AdContainerProps) {
  let dimensions = '';
  let text = '';
  
  switch (size) {
    case 'vertical':
      dimensions = 'h-[600px] w-[300px]';
      text = '광고 영역 기다립니다.';
      break;
    case 'horizontal':
      dimensions = 'h-[90px] w-full';
      text = '광고 영역 기다립니다.';
      break;
    case 'square':
      dimensions = 'h-[250px] w-[300px]';
      text = '광고 영역 기다립니다.';
      break;
  }
  
  return (
    <div className={`${dimensions} ${className} bg-gray-100 flex items-center justify-center border border-dashed border-gray-300 rounded`}>
      <p className="text-gray-400">{text}</p>
    </div>
  );
}
