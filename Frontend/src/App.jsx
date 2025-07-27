import React from 'react'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import AdminDashboard from './Components/Dashboard/AdminDashboard'
import UserDashboard from './Components/Dashboard/UserDashboard'
import { Route, Routes } from 'react-router-dom'
import CreatePoll from './Components/Pages/CreatePoll'
import ViewAllPolls from './Components/Pages/ViewAllPolls'
import ViewOpenPolls from './Components/Pages/ViewOpenPolls'
import ViewVotedResult from './Components/Pages/ViewVotedResult'
import EditPoll from './Components/Pages/EditPoll'
import VoteOpenPoll from './Components/Pages/VoteOpenPoll'
import DeletePoll from './Components/Pages/DeletePoll'
import ViewVoter from './Components/Pages/ViewVoter'

const App = () => {

  return (
   <>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />}/>
      <Route path='/user-dashboard' element={<UserDashboard />}/>
      <Route path='/admin-dashboard' element={<AdminDashboard />}/>
      <Route path='/create-poll' element={<CreatePoll />} />
      <Route path='/view-all-polls/:id' element={<ViewAllPolls />} />
      <Route path='/view-open-polls' element={<ViewOpenPolls />} />
      <Route path='/view-voted-result' element={<ViewVotedResult />} />
      <Route path='/vote-open-poll/:id' element={<VoteOpenPoll />} />
      <Route path='/edit-open-poll/:id' element={<EditPoll />} />
      <Route path='/delete-open-poll/:id' element={<DeletePoll />} />
      <Route path='/view-voters/:id' element={<ViewVoter />} />
    </Routes>
   </>
  )
}

export default App