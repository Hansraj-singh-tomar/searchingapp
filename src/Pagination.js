import React from 'react'
import { useGlobalContext } from './Context'

const Pagination = () => {
  const {page, nbPages, getPrevPage, getNextPage} = useGlobalContext();
  return (
    <>
      <div className='pagination_btn'>
          <button onClick={() => getPrevPage()}>PREV</button>
          <p>{page} of {nbPages}</p>
          <button onClick={() => getNextPage()}>Next</button>
      </div>
    </>
  )
}

export default Pagination