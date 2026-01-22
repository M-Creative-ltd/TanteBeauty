import Image from '../Image/Image';

interface ProductCardProps {
  productName: string;
  productImage: string;
  productPrice: number;
  productCurrency: string;
  productDescription: string;
  productCategory: string;
  ProductInStock:boolean;
  onClick?: () => void;
}


export const ProductCard: React.FC<ProductCardProps> = (props) => {
  return (
    <div 
      className="relative flex flex-col min-w-[358px] w-full h-full min-h-[358px] border-2 border-primary
     pl-[24px] pr-[24px] pt-[20px] py-[16px] cursor-pointer hover:opacity-90 transition-opacity"
      onClick={props.onClick}
    >
      <div className='absolute top-[11px] left-[24px] w-[calc(100%-48px)] z-10 flex flex-row items-center'>
        <h2 className="text-primary text-xsm font-semibold font-sans">{props.productCategory}</h2>
        <h2 className='absolute text-sm right-0 text-primary border-1 border-primary w-fit rounded-lg px-2 font-sans'>{props.ProductInStock?"in stock": "out of stock"}</h2>
      </div>
      <Image src={props.productImage} alt={props.productName} fill />
      <div className="absolute bottom-[11px] left-[24px] flex flex-row items-start gap-auto w-[calc(100%-48px)] z-10">
       <h3 className="text-primary text-xsm font-semibold font-sans">{props.productName}</h3>
       <div className="absolute right-0 flex flex-row items-center justify-start gap-[3px]">
          <p className="text-primary text-sm font-regular font-sans">{props.productPrice}</p>
          <p className="text-primary text-sm font-regular font-sans">{props.productCurrency}</p>
       </div>
      </div>
    </div>
  );
}; 