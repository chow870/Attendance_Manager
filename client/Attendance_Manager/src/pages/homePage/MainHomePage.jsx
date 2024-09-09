

function MainhomePage() {
  return (
    
    <>
      <div id="default-carousel" className=" w-200px h-200px position: relative bg-black" data-carousel="slide">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96 ">
          
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <div className="p-4 text-center">
              <h2 className="text-2xl font-bold text-gray-200">Slide 1 Title</h2>
              <p className="mt-2">This is the content for the first slide. You can add images, text, or other elements here.</p>
            </div>
          </div>

          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <div className="p-4 text-center">
              <h2 className="text-2xl font-bold">Slide 2 Title</h2>
              <p className="mt-2">This is the content for the second slide. You can add your desired content here.</p>
            </div>
          </div>

          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <div className="p-4 text-center">
              <h2 className="text-2xl font-bold">Slide 3 Title</h2>
              <p className="mt-2">This is the content for the third slide. You can customize this as well.</p>
            </div>
          </div>
        </div>

        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
          <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
          <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        </div>

        {/* Slider controls */}
        <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </>
  );
}

export default MainhomePage;
