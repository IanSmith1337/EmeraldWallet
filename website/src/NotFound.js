import React from 'react';
import Lost from './image/favpng_compass.png';
import './components/Styles/Site.css'
function NotFound() {
    return (
        <div className="NotFound">

            <title>Error 404 Not Found</title>

            <body className="Body">
            <h1>Error 404</h1>
            <a href={'./'}><img src={Lost} className="Site-logo" alt="logo"/></a>

            <h3>Page not found</h3>
            </body>
            <footer className={"Footer"}>
                <div className={'Back'}>
                    <a href={'./'}>Home</a>
                </div>
            </footer>
        </div>


    );
}
export default NotFound;