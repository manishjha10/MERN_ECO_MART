import React, { useEffect } from 'react'
import '../AdminStyles/UsersList.css';  
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { clearMessage, deleteUser, removeError } from '../features/admin/adminSlice';
import { fetchUsers } from '../features/admin/adminSlice';


function UsersList() { 
  const {users, loading, error, message}=useSelector(state=>state.admin); 
  const dispatch=useDispatch(); 
  const navigate=useNavigate(); 

  useEffect(() => {
        dispatch(fetchUsers())
  }, [dispatch]) 


  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeError());
    }
  }, [dispatch, error])
  
  const handleDelete=(userId)=>{
      const confirm = window.confirm('Are you sure you want to delete this user?'); 
      if(confirm)
      {
         dispatch(deleteUser(userId)); 
      }
    }
  
  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeError());
    }
    if(message)
    {
      toast.success(message, { position: 'top-center', autoClose: 3000 });
      dispatch(clearMessage()); 
      dispatch(fetchUsers());
      navigate('/admin/dashboard');  
    }
  }, [dispatch, message, error])


  return (
    <>
      {loading?(<Loader/>):(<>
        <Navbar />
        <PageTitle title="All Users" />
        <div className="usersList-container">
          <h1 className="usersList-title">All Users</h1>
          <div className="usersList-table-container">
            <table className='usersList-table'>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index)=>(
                  <tr key={user._id}>
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/admin/user/${user._id}`} className="action-icon edit-icon">
                        <Edit /></Link>
                      <button className="action-icon delete-icon" onClick={() => handleDelete(user._id)}><Delete /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </>)}
    </>
   
  )
}

export default UsersList