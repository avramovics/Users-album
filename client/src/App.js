import * as React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Album from './js/routes/album';
import User from './js/routes/User';
import Users from './js/routes/Users';

export default function App() {
  return (
    <div className="container">
    <Routes>
      <Route exact path="/" users={true} element={<Users />} />  
      <Route exact path="user/:id" element={<User />} />  
      <Route exact path="user/:id/album/:id" element={<Album />}/>
      <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
  </Routes>
  </div>
  );
}


