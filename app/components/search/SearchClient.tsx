

import React from 'react'

interface Props {
    searchText: string;
}

const SearchClient: React.FC<Props> = ({ searchText }) => {
    return (
        <div>
            {searchText}
        </div>
    )
}

export default SearchClient
