import React from 'react';

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
            <div>{children}</div>
        </>
    );
};

export default MainLayout;
