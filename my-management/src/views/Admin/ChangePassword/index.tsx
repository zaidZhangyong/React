import React, { useState } from 'react';
export default function ChangePassword() {
    const [number, setData] = useState(0);
    return (
        <div onClick={() => setData(number + 1)}>修改密码{number}</div>
    )
}
