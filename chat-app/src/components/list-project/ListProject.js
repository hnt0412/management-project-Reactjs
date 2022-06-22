import { Link } from 'react-router-dom'
import Avatar from './../avatar/Avatar'

// styles
import './ListProject.css'

const ListProject = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>Chưa có dự án!</p>}
      {projects.map(project => (
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
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ListProject