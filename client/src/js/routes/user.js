import React, { useEffect, useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import Breadcrumb from '../component/breadcrumb';
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../actions/usersDispatch';

function User() {

    let location = useLocation(); 

    const dispatch = useDispatch();

    const users = useSelector( state => state.users )
  
    const id = location.pathname.replace(/(?:\/+(\?))/, '$1').replace(/\/+$/, '').split('/')

    const user =  Array.isArray( users ) ? users.filter( user=> user.id === Number(id[2]) ) : false

    const [ album, setAlbum ] = useState([]);  

    useEffect(() => {
      dispatch(getUsers())
      
      fetch(`https://jsonplaceholder.typicode.com/users/${id[2]}/albums`)
      .then(response => response.json())
      .then(json =>  setAlbum(json))

      }, [location]);

      const {name, address, company, email} = user ? user[0] : false;

      const {street, suite, city} = address ? address : false;

      const adressParts = [street, suite, city].join(', ');

      const companyName = company ? company.name : false;

      let albumLinks = album.map( album => 
          <Link className="user_album_card" 
                key={ album.id } 
                to={ id.concat(['album', album.id]).join("/") } >
            { album.title }
          </Link> );
     
    return (
        <div className="wraper">
          { <Breadcrumb /> }

          <div className="user">
            <section className="user__info" aria-label="User information" tabIndex="0">
              <h1 tabIndex="0" className="user__info_name">{ name }</h1>
              <p tabIndex="0" className="user__info_adress"> 
                { [companyName, email, adressParts].join(' — ')}
              </p>
            </section>
            <h2 tabIndex="0" className="user__album_heading">Albums</h2>
              { albumLinks }
          </div>

        </div>
    );
}

export default User;