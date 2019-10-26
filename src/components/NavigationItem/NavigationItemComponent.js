import React from 'react';

export const NavigationItemComponent = ({label, route, callback = () => {}}) => {
    return (<button className="bp3-button bp3-minimal bp3-icon-home" onClick={callback}>{label}</button>);
}