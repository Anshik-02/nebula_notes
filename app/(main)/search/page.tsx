
import FilterComponent from '@/components/dashboard/filterComponent';
import StarField2 from '@/components/starFeild2';
import React from 'react';

const Page = () => {
    return (
   <div
      className="h-full bg-theme overflow-auto flex  flex-col text-white"
    >
      <StarField2 />
      <div className="ml-10 mr-10 mt-8">
        <h3 className="font-semibold text-3xl text-center">Search through your notes</h3>
        <p className="text-blue-300 mt-2 font-extralight">
       Find notes, explore connections, and filter by your preferences
        </p>    
      </div>
      <div className=' flex justify-center mt-10'>
     
      </div>
     <div>
        <FilterComponent/>
     </div>

    </div>
    );
}

export default Page;
