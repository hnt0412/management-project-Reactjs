// import { useEffect, useState } from 'react'
// import { useCollection } from '../../hooks/hooks/useCollection';
// import { useAuthContext } from '../../hooks/hooks/useAuthContext';
// import { timestamp } from '../../firebase/config';
// import { useFirestore } from '../../hooks/hooks/useFirestore';
// import { useHistory } from 'react-router-dom';
// import Select from 'react-select'


// import './Create.css';


// const categories = [
//     { value: 'development', label: 'Lập trình viên' },
//     { value: 'design', label: 'Thiết kê' },
//     { value: 'sales', label: 'Bán hàng' },
//     { value: 'marketing', label: 'Marketing' }
// ]

// const Create = () => {
//     const history = useHistory()
//     const { addDocument,response } = useFirestore('projects')
//     const { user } = useAuthContext()
//     const { documents } = useCollection('users')
//     const [users,setUsers] = useState([])

//     const [name, setName] = useState('')
//     const [details, setDetails] = useState('')
//     const [dueDate, setDueDate] = useState('')
//     const [category, setCategory] = useState('')
//     const [assignedUser, setAssignedUser] = useState('')
//     const [error, setError] = useState(null)


//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setError(null)

//         if(!category) {
//             setError('Hãy điền tên dự án của bạn')
//             return
//         }

//         if(assignedUser.length < 1) {
//             setError('Hãy chỉ định ít nhất 1 người')
//             return
//         }

//         const createdBy = {
//             displayName: user.displayName,
//             photoURL: user.photoURL,
//             id: user.id
//         } 

//         const assignedUserList = assignedUser.map((item) => {
//             return { 
//                 displayName: item.value.displayName,
//                 photoURL: item.value.photoURL,
//                 id: item.value.id
//             }
//         })

//         const project = {
//             name,
//             details,
//             category: category.value,
//             dueDate: timestamp.fromDate(new Date(dueDate)),
//             comment: [],
//             createdBy,
//             assignedUserList
//         }

//         await addDocument(project)

//     }

//     useEffect(() => {
//         if(documents){
//         const options = documents.map((user) => {
//             return {
//                 value: user,
//                 label: user.displayName
//             }
//         })
//         setUsers(options)
//         }
//     },[documents])

//     return (
//         <div className='create-form'>
//             <h2 className='page-title'>Tạo phòng chat mới</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     <span>Tên phòng:</span>
//                     <input type='text' value={name} required onChange={(e) => setName(e.target.value)} />
//                 </label>
//                 <label>
//                     <span>Mô tả chi tiết nhóm:</span>
//                     {/* <input type='text' value={details} required onChange={(e) => setDetails(e.target.value)} /> */}
//                     <textarea type='text' value={details} required onChange={(e) => setDetails(e.target.value)} ></textarea>
//                 </label>
//                 <label>
//                     <span>Ngày kết thúc:</span>
//                     <input type='date' value={dueDate} required onChange={(e) => setDueDate(e.target.value)} />
//                 </label>
//                 <label>
//                     <span>Loại dự án:</span>
//                     <Select options={categories} value={category} onChange={option => setCategory(option)} />
//                 </label>
//                 <label>
//                     <span>Người được chỉ định:</span>
//                     <Select options={users} onChange={option => setAssignedUser(option)} isMulti />
//                 </label>
//                 <button className='btn'>Thêm dự án</button>
//                 {error && <p className='error'>{error}</p>}
//             </form>
//         </div>
//     )
// }

// export default Create

import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/hooks/useCollection'
import { useAuthContext } from '../../hooks/hooks/useAuthContext'
import { timestamp } from '../../firebase/config'
import { useFirestore } from '../../hooks/hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'

// styles
import './Create.css'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
  const history = useHistory()
  const { addDocument, response } = useFirestore('projects')
  const { user } = useAuthContext()
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])

  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  // create user values for react-select
  useEffect(() => {
    if(documents) {
      setUsers(documents.map(user => {
        return { value: {...user, id: user.id}, label: user.displayName }
      }))
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!category) {
      setFormError('Please select a project category.')
      return
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least 1 user')
      return
    }

    const assignedUsersList = assignedUsers.map(u => {
      return { 
        displayName: u.value.displayName, 
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })
    const createdBy = { 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      id: user.uid
    }

    const project = {
      name,
      details,
      assignedUsersList, 
      createdBy,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      closedProject: false
    }

    await addDocument(project)
    if (!response.error) {
      history.push('/')
    }
  }
  return (
    <div className="create-form">
      <h2 className="page-title">Tạo một dự án mới</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Tên project:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Chi tiết project:</span>
          <textarea 
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details} 
          ></textarea>
        </label>
        <label>
          <span>Thiết lập ngày đến hạn:</span>
          <input
            required 
            type="date" 
            onChange={(e) => setDueDate(e.target.value)} 
            value={dueDate}
          />
        </label>
        <label>
          <span>Loại project:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Chỉ định đến:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        <button className="btn">Tạo mới</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}