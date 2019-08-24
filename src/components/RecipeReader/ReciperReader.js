import React from 'react';

const reciperReader = (props) => {
    return (
        <div>
            <h3>Prints Reciper microformat</h3>
            {props.toString()}
        </div>
    );
}

export default reciperReader;