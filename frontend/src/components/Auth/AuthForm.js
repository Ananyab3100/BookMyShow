import { Dialog, TextField, Typography ,Box, FormLabel,Button} from '@mui/material'
import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {IconButton} from '@mui/material';
import { useState } from 'react';


const AuthForm = ({onSubmit, isAdmin}) => {
    const[inputs, setInputs] = useState({
        name: "",
        email :"",
        password : "",
    })
    const [isSignUp , setIsSignUp] = useState(false);

    const handleChange = (e) =>{ 
     setInputs((prevState) => ({
        ...prevState ,
        [e.target.name] : e.target.value,
     }))
    //  console.log(inputs);
    }


    const handleSubmit = (e) =>{
      e.preventDefault();
      //console.log(inputs);
      onSubmit({inputs, signup : isAdmin ? false : isSignUp});
    }
  return (
    <Dialog PaperProps={{style:{borderRadius:20}}} open= {true}>

        <Box sx={{ml:"auto" ,}}>
            <IconButton>
                <CloseRoundedIcon/>
            </IconButton>
        </Box>
        <Typography  variant="h5" textAlign={"center"}>
        {isSignUp ? "SIGNUP" : "LOGIN"}
        </Typography>
        <form onSubmit={handleSubmit}>
        <Box
          padding={6}
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          width={400}
          margin="auto"
          alignContent={"center"}
        >
            {!isAdmin && isSignUp && ( <>
            <FormLabel sx={{mt:1 ,mb:1}}>Name</FormLabel>
            <TextField  value={inputs.name} onChange ={handleChange}
            margin='normal' variant="standard" type="text" name='name'/>
            </>
             )}
            <FormLabel sx={{mt:1 ,mb:1}}>Email</FormLabel>
            <TextField value={inputs.email} onChange ={handleChange}
             margin='normal' variant="standard" type="email" name='email'/>
            <FormLabel sx={{mt:1 ,mb:1}}>Password</FormLabel>
            <TextField value={inputs.password} onChange ={handleChange}
             margin='normal' variant="standard" type="password" name='password'/>

            <Button 
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            type="submit"
            fullWidth
            variant="contained">{isSignUp ? "SignUp" : "Login"}</Button>

              { !isAdmin && (<Button onClick={() => setIsSignUp(!isSignUp)}
            sx={{ mt: 2, borderRadius: 10 }}
            fullWidth 
            >Switch To {isSignUp ? "Login" : "SignUp"}</Button>)}
        </Box>
        </form>
    </Dialog>
  )
}

export default AuthForm
