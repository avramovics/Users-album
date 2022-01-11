import React, { useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import Breadcrumb from '../component/breadcrumb';
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, updateUsersStatus } from '../actions/usersDispatch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'

{/* Finde favorites */}
import filter from '../helper/favorites'

function Users() {

    let location = useLocation(); 

    const users = useSelector(state => state.users)

    const dispatch = useDispatch();
    
    const handleOnClick = (e) =>{
      if(e.key && e.key !== 'Enter')
      return
      e.preventDefault()
      let id = e.currentTarget.getAttribute('data-id');
      dispatch(updateUsersStatus(id))
    }

    useEffect(() => {
        
      dispatch(getUsers())

      }, [location]);

    let { favorit, regular } = filter(users, (a) => a.favorit );

    let display = [];

    display.push([favorit, regular].map((group, i) =>{ 
        return( group.map(user=>{
          return <Link className="users__card" key={user.id} to= {["/user/",user.id].join('')} aria-label="User card">
              <div className="users__top"><h3 tabIndex="0" className="users__top_heading">{user.name}</h3> 
                { /* A little hack, the hollow star was missing in free-solid-svg-icons package :) */ }
                <button className="icon-button" data-id={ user.id }  tabIndex="0" onKeyDown={handleOnClick} onClick={handleOnClick} aria-label={i === 1 ? "Add to favorites":"Remove from favorites" }>
                   <FontAwesomeIcon className={i === 1 ? "icon-star":"icon-star-border" } icon={ faStar } size="2x"  /> 
                   <FontAwesomeIcon className={i === 1 ? "icon-star-border" : "d-none" } icon={ faStar } size="2x"  /> 
                </button>
                  <span className="users__top_star"> {user.favorit} </span>
              </div>
              <p tabIndex="0" aria-label={['Company name:',user.company.name].join(' ') } >{user.company.name}</p>   
              <p tabIndex="0" aria-label={['Email:', user.email].join(' ')} >{user.email}</p>    
          </Link> 
          })
        )
      }))

    return (
        <div className="wraper">
           { <Breadcrumb /> } 
            <div className="users">
                {[favorit, regular].map((c,i) => {
                      return ( 
                        c.length > 0 ?  
                        <div className="users__category" key={i}>
                                <h2 tabIndex="0" className="users__category_heading">{['Favorites', 'Users'][i]}</h2>
                                <div className="users__category_cards" >{ display[0][i] } 
                                </div>
                        </div> : "" )    
                    })}
             </div>
        </div>
    );
}

export default Users;