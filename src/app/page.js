import React from 'react';
import Image from 'next/image';

import './menu.css';

const Page = () => {
    return (
        <div className="menuBoardContainer">
            <Image src="/meals.svg" title="Meals" alt="Meals" width={1260} height={896}/>
            <Image src="/entrees.svg" title="Meals" alt="Meals" width={1260} height={896}/>
            <Image src="/sides.svg" title="Meals" alt="Meals" width={1260} height={896}/>
            <Image src="/more.svg" title="Meals" alt="Meals" width={1260} height={896}/>
        </div>
    );
};

export default Page;