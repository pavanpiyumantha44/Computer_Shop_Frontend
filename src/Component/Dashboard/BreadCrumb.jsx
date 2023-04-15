import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumb = ({path,backTo,current}) => {
  return (
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb mt-5 px-5">
                <li className="breadcrumb-item">
                    <Link to={path} className='text-decoration-none'>{backTo}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    {current}
                </li>
            </ol>
        </nav>
    </div>
  )
}

export default BreadCrumb