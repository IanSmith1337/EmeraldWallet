import React from 'react';

import {Helmet} from "react-helmet";

export default function NotFound(){
    return(
        <div className="NotFound">
            <Helmet>
                <title>Error 404</title>
                <meta
                    name={"Social Media site for college students to find roommates"}
                />
               // Insert Image
            </Helmet>
            <body className="Body">
            //Insert Image
            <h1>Error 404</h1>
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
