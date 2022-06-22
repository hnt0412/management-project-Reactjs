import { useState } from "react"

const filterList = ['tất cả', 'của tôi', 'lập trình viên', 'thiết kế', 'marketing', 'bán hàng']

const DashBoardFilter = ({filter, changeFilter}) => {

    const handleClick = (params) => {
        changeFilter(params)
    }
    return (
        <div className="project-filter">
            <nav>
                <p>Tìm kiếm theo</p>
                {       
                filterList.map((f) => (
                <button 
                key={f}
                onClick={() => handleClick(f)}
                className={f === filter ? 'active' : ''} 
                >{f}</button>
                    ))}
            </nav>
        </div>
    )
}

export default DashBoardFilter

// return (
//   <div className="project-filter">
//     <nav>
//       <p>Filter by: </p>
//       {filterList.map((f) => (
//         <button key={f}
//           onClick={() => handleClick(f)}
//           className={currentFilter === f ? 'active' : ''}
//         >{f}</button>
//       ))}
//     </nav>
//   </div>
// )