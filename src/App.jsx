// src/App.jsx

import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';                      // useNavigate() is a hook that allows us to redirect a user back to the hoot list page after submitting a new hoot.
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService';                         // Import the authservice component to SET the default value of our user in state. 
import HootList from './components/HootList/HootList';
import * as hootService from './services/hootService';
import HootDetails from './components/HootDetails/HootDetails';
import HootForm from './components/HootForm/HootForm';
import CommentForm from './components/CommentForm/CommentForm';


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());                         // Using `authService.getUser()` from the authService. 
  const [hoots, setHoots] = useState([]);

const navigate = useNavigate()

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      console.log('hootsData:', hootsData);
      setHoots(hootsData);                                                         // Set the state.
    };
    if (user) fetchAllHoots();
  }, [user]);

const handleAddHoot = async (hootFormData) => {
  const newHoot = await hootService.create(hootFormData);
  setHoots([newHoot, ...hoots]);
  //console.log('hootFormData is:', hootFormData);
  navigate('./hoots');
}

const handleSignout = () => {
  authService.signout()
  setUser(null)
}

const handleDeleteHoot = async (hootId) => {
  console.log('hootId to be deleted:', hootId)
  const deletedHoot = await hootService.deleteHoot(hootId);
  setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
  navigate('/hoots');
}

const handleUpdateHoot = async (hootId, hootFormData) => {
  const updateHoot = await hootService.update(hootId, hootFormData);
  setHoots(hoots.map((hoot) => (hootId === hoot._id ? updateHoot : hoot)));
  console.log('hootId is:', hootId, 'hootFormData is:', hootFormData);
  navigate(`/hoots/${hootId}`);
};


  //---------------------------------------------------------------------\\
  return (
    <>
      <AuthedUserContext.Provider value={user}>
      <NavBar user={user} handleSignout={handleSignout} />                        
      <Routes>

        { user ? (
          <> 
          {/* PROTECTED ROUTES */}
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/hoots" element={<HootList hoots={hoots} />} />
          <Route path="/hoots/:hootId" element={<HootDetails handleDeleteHoot={handleDeleteHoot} /> }/>
          <Route path="/hoots/new" element={<HootForm handleAddHoot={handleAddHoot} />} />  
          <Route path="/hoots/:hootId/edit" element={<HootForm handleUpdateHoot={handleUpdateHoot} />} />
          <Route path="/hoots/:hootId/comments/:commentId/edit" element={<CommentForm /> } />
          </>
        ) : ( 
          // PUBLIC ROUTE:
          <Route path="/" element={<Landing />} />
        )}

      
       <Route path="/signup" element={<SignupForm setUser={setUser} />} />  
       <Route path="/signin" element={<SigninForm setUser={setUser} /> } />
      </Routes>
      </AuthedUserContext.Provider>
    </>
  )
}

export default App
