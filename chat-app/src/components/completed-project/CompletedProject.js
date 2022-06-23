import { Link } from 'react-router-dom'
import Avatar from '../avatar/Avatar'
import './CompletedProject.css'

import { useCollection } from '../../hooks/hooks/useCollection'
import { useAuthContext } from '../../hooks/hooks/useAuthContext'

const CompletedProject = () => {
    const { documents, error } = useCollection('projects') 
    const { user } = useAuthContext()
    console.log(user)
    console.log(documents)
    return (
        <div className="project-list">
         {documents && documents.map((project) => {
        if(project.closedProject === true){
            return (
                <Link to={`/projects/${project.id}`} key={project.id}>
                    <h4>{project.name}</h4>
                    <p>Ngày hết hạn: {project.dueDate.toDate().toDateString()}</p>
                    <div className="assigned-to">
                    <p><strong>Người được chỉ định:</strong></p>
                    <ul>
                    {project.assignedUsersList.map(user => (
                        <li key={user.photoURL}>
                        <Avatar src={user.photoURL} />
                        </li>
              ))}
                    </ul>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
            <p><strong style={{marginRight: '30px'}}>Người đóng góp nhiều nhất:</strong><Avatar src={user.photoURL} /></p>
          </div>
        </Link>
            )
        }
      }
      )} 
    </div>
    )
}

export default CompletedProject