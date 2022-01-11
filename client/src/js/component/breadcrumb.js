import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, Link } from "react-router-dom";
import { getUsers } from '../actions/usersDispatch';

function Breadcrumb(){
    
    let location = useLocation();
 
    const dispatch = useDispatch();

    const [crumbs, setCrumbs] = useState([]);  

    const [album, setAlbum] = useState([]);  

    const users = useSelector(state => state.users)

    const id = location.pathname.replace(/(?:\/+(\?))/, '$1').replace(/\/+$/, '').split('/')

    useEffect(() => {
        
        dispatch(getUsers())
        if(id[4]){
         fetch(`https://jsonplaceholder.typicode.com/albums/${id[4]}`)
         .then(response => response.json())
         .then(json => setAlbum(json) )
        }
        {/* Remove trailing slash from the url */} 
        setCrumbs(location.pathname.replace(/(?:\/+(\?))/, '$1').replace(/\/+$/, '').split('/'))
      }, [location]);
  
    
      let path = [];
      let name = null;
      let displayName = null;

      /**
       * 
       * Create crumb links 
       * 
       */
      let dCrumbs = crumbs.map(( key , index) => {

        path.push(key);

        //Finde user
        if(Number(key)  && crumbs[index -1] == 'user' ){
            name = users.filter(obj => {
                    return obj.id === Number(crumbs[ index  ])
            })   
        }
        
        //Set display name
        if(name && crumbs[ index -1 ] != 'user'){
            displayName = album.title
        }else if( name && Number(crumbs[ index ])){
            displayName = name[0].name
        }

        //If path doesn't exists, there is no need for url.. 
        if(crumbs.length == 1 && key == ''){
            return <span tabIndex="0" key={index} className="breadcrumb__no_link"> Users </span>
        }
         //If key empty set base link
        else if(key == '' ){
            return <Link tabIndex="0" key={index} to="/" className='breadcrumb__link' >Users</Link> 
        //If last one, no link neaded
        }else if(crumbs.length === (index + 1) && index % 2 === 0){
            return  <span tabIndex="0" key={index} className="breadcrumb__no_link"> {displayName} </span>
        //if not last one, display link
        }else if(index % 2 === 0){
            return <Link tabIndex="0" key={index} to={path.join('/')} className='breadcrumb__link'> { displayName } </Link>
        }
     })

      return (
          <section aria-label="breadcrumb" tabIndex="0">
                <nav className="breadcrumb">
                    {dCrumbs}
                </nav>
        </section>
      );

};

export default Breadcrumb;