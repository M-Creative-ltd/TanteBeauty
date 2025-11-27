export default function ProductDetailLoading() {
  return (
    <section className="flex relative overflow-hidden h-fit md:snap-start bg-secondary">
      <div className="flex flex-col md:flex-row w-full md:h-screen">
        {/* Left side - Content */}
        <div className="relative md:w-1/2 flex flex-col py-10 md:py-16 gap-8 md:gap-12 mx-auto px-2 md:px-10xl">
          {/* Logo and product name skeleton */}
          <div className="flex size-fit items-center flex-row mx-auto gap-2">
            {/* Logo skeleton */}
            <div className="w-12 h-12 bg-gray-300 rounded animate-pulse" />
            {/* Product name skeleton */}
            <div className="h-16 md:h-24 lg:h-32 w-64 md:w-96 bg-gray-300 rounded animate-pulse" />
          </div>

          {/* Product description skeleton */}
          <div className="text-center px-2 md:px-10 space-y-3">
            <div className="h-6 md:h-7 bg-gray-300 rounded animate-pulse mx-auto max-w-2xl" />
            <div className="h-6 md:h-7 bg-gray-300 rounded animate-pulse mx-auto max-w-xl" />
            <div className="h-6 md:h-7 bg-gray-300 rounded animate-pulse mx-auto max-w-lg" />
          </div>
        </div>

        {/* Right side - Product image skeleton */}
        <div className="h-full md:h-[90%] overflow-hidden flex items-center justify-center">
          <div className="relative top-1/4 left-1/2 -translate-x-1/2 translate-y-1 md:top-1/2 md:left-0 md:translate-x-0 lg:left-1/6 lg:translate-x-0 lg:-translate-y-1/2 md:-translate-y-1/2">
            {/* Outer circle skeleton */}
            <div className="bg-[#8e9f84] p-3 md:p-4 rounded-full">
              {/* Inner circle skeleton */}
              <div className="bg-primary p-4 md:p-6 rounded-full w-[90vw] md:w-[80vh] aspect-square flex items-center justify-center">
                {/* Product image skeleton */}
                <div className="w-[70%] h-[70%] bg-gray-300 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Button skeleton */}
        <div className="relative mx-auto my-5 md:my-10 md:absolute md:bottom-5 md:left-1/2 md:-translate-x-1/2">
          <div className="h-12 w-32 bg-gray-300 rounded-lg animate-pulse" />
        </div>
      </div>
    </section>
  );
}


