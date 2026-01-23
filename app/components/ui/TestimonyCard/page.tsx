import React from 'react';
import Image from 'next/image';

interface TestimonialProps {
  name: string;
  role: string;
  testimony: string;
  rating: number; 
  avatar: string;
}

const TestimonialCard = ({ name, role, testimony, rating, avatar }: TestimonialProps) => {
  return (
    <div className="flex flex-col justify-center items-start p-4 gap-4 w-[303px] h-[163px] bg-(--color-primary) rounded-[16px] relative shadow-sm">
      
      {/* Star Rating Section */}
      <div className="flex flex-row items-center gap-4 w-full h-[20px]">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={i < rating ? "#F9B55B" : "#D9D9D9"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      {/* Testimony Text */}
      <p className="w-full text-(--color-accent) font-sans font-normal text-[11px] line-clamp-2 leading-[13px] flex items-center">
        {testimony}
      </p>

      {/* User Info Section */}
      <div className="flex flex-row items-center gap-2 w-full h-[53px]">
        {/* Avatar */}
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-(--color-secondary) flex-shrink-0">
          <Image 
            src={avatar} 
            alt={name}
            width={50}
            height={50}
            className="object-cover"
          />
        </div>

        {/* Name and Title */}
        <div className="flex flex-col items-start p-2 gap-2 flex-grow overflow-hidden">
          <h4 className="text-(--color-accent) font-sans font-bold text-[13px] leading-[16px] uppercase truncate w-full">
            {name}
          </h4>
          <span className="text-(--color-accent) font-sans font-medium text-[11px] opacity-80 leading-[13px] truncate w-full">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;