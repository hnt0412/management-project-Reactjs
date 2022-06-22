import Avatar from "../avatar/Avatar"
import { useFirestore } from "../../hooks/hooks/useFirestore"
import { useHistory } from 'react-router-dom'
import { useAuthContext } from "../../hooks/hooks/useAuthContext"

export default function ProjectSummary({ project }) {
  const { updateDocument } = useFirestore('projects')
  const { user } = useAuthContext()
  const history = useHistory()
 
  const handleClick = async (params) => {
    console.log(params)
    await updateDocument(params,{
      closedProject: true
    })
    history.push('/')
  }

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">
          Ngày hoàn thành {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">
          {project.details}
        </p>
        <h4>Người được chỉ định:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map(user => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={() => handleClick(project.id)}>Hoàn thành dự án</button>
      )}
    </div>
  )
}