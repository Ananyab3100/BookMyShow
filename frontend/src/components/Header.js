import React, { useEffect, useState } from 'react';
import { AppBar, Box, IconButton, Tab,Tabs, Toolbar } from '@mui/material';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import {Autocomplete , TextField} from '@mui/material';
import { getAllMovies } from '../api-helpers/api-helpers';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';




const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

    // const dummy =['Brahmastra' ,'PK' ,'Gadar' ,'Sholay'];
    const[value, setValue] = useState(0);
    const[movies,setMovies] =useState([]);


    useEffect(() =>{
    getAllMovies()
    .then((data) => setMovies(data.movies))
    .catch((err) =>console.log(err))
    },[])

    const logout = (isAdmin) =>{
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
    }

    const handleChange = (e,val) =>{
    
    const movie = movies.find((m) => m.title=== val);
    console.log(movie);
    if(isUserLoggedIn){
      navigate(`/booking/${movie._id}`)
    }
    }

  return (
    <AppBar position="sticky" sx={{bgcolor :'#2b2d42'}}>
      <Toolbar>
        <Box width={'20%'}>
          <IconButton LinkComponent={Link} to="/">
        <MovieCreationIcon/>
        </IconButton>
        </Box>
      <Box width= {'30%'}>
      <Autocomplete onChange={handleChange}
      sx={{input: {color:'white'}}}
        id="free-solo-demo"
        freeSolo
        options={movies && movies.map((option) => option.title)}
        renderInput={(params) => <TextField variant='standard'{...params} placeholder="Search Across Multiple Movies" />}
      />
      </Box>
      <Box width={'30%'}>

      </Box>
      <Box display={'flex'}>
      <Tabs value={value} textColor="inherit" indicatorColor ='secondary' 
      onChange={(e, val) => {
      //console.log(val);
        setValue(val)}}>
        <Tab LinkComponent={Link} to='/movies' label='Movies'/>
        {!isAdminLoggedIn && !isUserLoggedIn && <>
        <Tab LinkComponent={Link} to='/admin' label ='Admin'/>
        <Tab LinkComponent={Link}  to='/auth' label ='Auth'/>
        </> 
        }
        {isUserLoggedIn && <>
        <Tab LinkComponent={Link} to='/user' label ='Profile'/>
        <Tab  LinkComponent={Link}  to='/' label ='Logout' onClick={() =>logout(false)}/>
        </> 
        }
        {isAdminLoggedIn && <>
        <Tab LinkComponent={Link} to='/add' label ='Add Movie'/>
        <Tab LinkComponent={Link} to='/user-admin' label ='Profile'/>
        <Tab  LinkComponent={Link}  to='/' label ='Logout' onClick={() =>logout(true)} />
        </> 
        }
        
       
      </Tabs>
      </Box>
       
      </Toolbar>
    </AppBar>
  )
}

export default Header;
