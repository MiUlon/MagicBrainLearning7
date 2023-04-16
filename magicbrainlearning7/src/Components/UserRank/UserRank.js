import React from 'react';

const UserRank = ( {name, entries} ) => {
    return (
        <div>
            <div className='f3 white'>
                {`${name}, your current entries count is:`}
            </div>
            <div className='f3 white'>
                {entries}
            </div>
        </div>
    )
}

export default UserRank;