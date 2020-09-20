import React from 'react';

const MenuButton = (props) => (

    <div>
        <button onClick={props.clicked}>{props.children}</button>
    </div>

)

export default MenuButton;