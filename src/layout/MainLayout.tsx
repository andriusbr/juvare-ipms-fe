import React from 'react';

import Footer from '../view/component/Footer/Footer';
import NavBar from '../view/component/NavBar/NavBar';

interface ILayout {
    authenticated?: boolean;
    children?: React.ReactNode;
}

const MainLayout: React.FC<ILayout> = ({ children, authenticated }) => {
    return (
        <>
            <header>
                <NavBar authenticated={authenticated} />
            </header>
            <div className="content content-margin container">{children}</div>
            <Footer />
        </>
    );
};

export default MainLayout;
