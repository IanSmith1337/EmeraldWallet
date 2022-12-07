import React from 'react';
function clickMe(){
    alert('You clicked me!');
}
export default function Home() {

    return (
        <div>
            <button onClick={clickMe}>
                Join Raffle
            </button>
        </div>

    )
}