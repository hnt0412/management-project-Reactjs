import './Project.css';
import {useDocument} from '../../hooks/hooks/useDocument';
import { useParams } from 'react-router-dom';
import ProjectSummary from '../../components/project-summary/ProjectSummary';
import ProjectComments from '../../components/project-summary/ProjectComment';

const Project = () => {
    const { id } = useParams()
    const { document, error } = useDocument('projects', id)
  
    if (error) {
      return <div className="error">{error}</div>
    }
    if (!document) {
      return <div className="loading">Đang tải...</div>
    }
  
    return (
      <div className="project-details">
        <ProjectSummary project={document} />
        <ProjectComments project={document} />
      </div>
    )
}

export default Project