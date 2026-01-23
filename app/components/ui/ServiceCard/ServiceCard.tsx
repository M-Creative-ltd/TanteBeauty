"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

interface ServiceData {
  title: string;
  image: string | null;
  description: string;
  whatsappBaseUrl: string;
  phoneNumber: string;
  displayOrder: number | null;
  slug: string;
}

const ServiceCard = ({ service }: { service: ServiceData }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div className="group perspective-1000 w-[200px] h-[438px] cursor-pointer">
      <div 
        className={`relative w-full h-fit transform-3d transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={isFlipped ? handleFlip : undefined}
      >
        
        {/* --- FRONT SIDE --- */}
        <div className="relative backface-hidden flex flex-col items-center p-[8px] gap-[16px] w-full h-full bg-primary border-2 border-primary box-border">
          {/* Title Frame */}
          <div className="flex flex-row justify-center items-center p-2 w-[184px] h-[48px] stretch-0">
            <h3 className="text-white text-center font-bold text-[15px] leading-4 w-[168px]">
              {service.title}
            </h3>
          </div>

          {/* Image Rectangle */}
          <div className="relative aspect-square w-full h-fit">
            <Image 
              src={service.image || '/uploads/services/customized-skincare-routines-copy/image.png'} 
              alt={service.title} 
              fill 
              className="object-cover"
            />
          </div>

          {/* Learn More Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); handleFlip(); }}
            className="flex flex-row justify-center items-center py-[8px] px-[16px]  w-fit h-fit border border-white rounded-[16px] hover:bg-white/10 transition-colors"
          >
            <span className="text-white font-semibold text-[11px]">Learn More</span>
          </button>
        </div>

        {/* --- BACK SIDE --- */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center p-2 gap-4 w-full h-fit bg-primary border-2 border-primary box-border">
          {/* Title Frame */}
          <div className="flex flex-row justify-center items-center p-2 w-[184px] h-[48px] stretch-0">
            <h3 className="text-white text-center font-bold text-[15px] leading-4 w-[168px]">
              {service.title}
            </h3>
          </div>

          {/* Description Frame */}
          <div className="flex flex-col justify-center items-center w-full h-fit">
            <p className="text-white text-justify font-thin text-[12px]">
              {service.description}
            </p>
          </div>

          {/* Contact Frame */}
          <div className="flex flex-row items-center p-2 gap-[10px] w-full h-fit border-t border-white">
            <div className="flex flex-row justify-between items-center w-full">
              <a 
                href={service.whatsappBaseUrl}
                className="flex items-center gap-2 hover:opacity-80"
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-white font-semibold text-[12px]">Get In Touch</span>
              </a>

              <a 
                href={service.whatsappBaseUrl}
                className="flex items-center gap-2 hover:opacity-80"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp className="text-white w-[20px] h-[20px]" />
              </a>
              
              <a href={`tel:${service.phoneNumber}`} className="hover:opacity-80">
                <FaPhoneAlt className="text-white w-[20px] h-[20px]" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceCard;