import React from 'react';

function NotFound() {
    return (
        <div className="NotFound">

            <title>Error 404 Not Found</title>

            <body className="Body">

            <a href={'./'}><img src={Lost} className="Site-logo" alt="logo"/></a>
            <h1> Error 404</h1>
            <h3>Page Not Found</h3>
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