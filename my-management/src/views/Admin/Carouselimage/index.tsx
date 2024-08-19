import React, { useState } from 'react';
export default function Carouselimage() {
    const [number, setData] = useState(0);
    return (
        <>
            <div onClick={() => setData(number + 1)}>轮播图管理{number}</div>
        </>
    )
}