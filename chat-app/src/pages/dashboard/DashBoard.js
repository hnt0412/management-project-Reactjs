import { useCollection } from '../../hooks/hooks/useCollection'
import { useState } from 'react'

// components
import ProjectList from '../../components/list-project/ListProject'
import DashBoardFilter from './DashBoardFilter';
import { useAuthContext } from '../../hooks/hooks/useAuthContext';

import './DashBoard.css';

const DashBoard = () => {
    const { documents, error } = useCollection('projects')
    const [filter,setFilter] = useState('tất cả')
    const { user } = useAuthContext()
    const changeFilter = (params) => {
      setFilter(params)
    }
    const projects = documents ? documents.filter(document => {
     if(document.closedProject === false){
      switch(filter) {
        case 'tất cả':
          return true
        case 'của tôi':
          let assignedToMe = false
          document.assignedUsersList.forEach(u => {
            if(u.id === user.uid) {
              assignedToMe = true
            }
          })
          return assignedToMe
        case 'lập trình viên':
        case 'thiết kế':
        case 'bán hành':
        case 'marketing':
          console.log(document.category, filter)
          return document.category === filter
        default:
          return true
        }
      }
    }) : null
  
    return (
        <div>
        <h2 className="page-title">Trang chủ</h2>
        {error && <p className="error">{error}</p>}
        {documents && <DashBoardFilter filter={filter} changeFilter={changeFilter} />}
        {documents && <ProjectList projects={projects} />}
      </div>
    )
}

export default DashBoard 