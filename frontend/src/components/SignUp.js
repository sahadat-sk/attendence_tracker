import React, { useState } from 'react'
import { Box, Button,Typography,FormControl, InputLabel, OutlinedInput, Snackbar, Alert} from '@mui/material'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const SignUp = () => {
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setpassword] = useState();
    const [open, setOpen] = useState(false);
    const history = useHistory();
  const submitHandler = async()=>{
    if(!name||!username||!password){
        setOpen(true)
        return;
    }
    try {
        const config = {
            headers: {
                "Content-type":"application/json"
            },
        }
        const {data} = await axios.post('/register/',{name,username,password},config)
        localStorage.setItem("UserOnline", JSON.stringify(data))
        localStorage.setItem('isAuth',true);
        history.push('/student');

    } catch (error) {
        console.log(error);
    }

}
function handleClose(){
    setOpen(false)
}
  return (
    <Box display='flex' justifyContent='center' sx={{height:'80vh',flexFlow:'column',marginLeft:'8vw',zIndex:'1000'}}>
        <Typography variant='h2' component='div' sx={{fontFamily:'Roboto Slab' ,textAlign:'center'}}>
            Sign Up
        </Typography>
        <Box sx={{ marginTop:'8vh',alignSelf:'start' }} display='flex' justifyContent='center'>
            <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
                <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>create</i>
            </Box>
            <FormControl sx={{width:'20vw',minWidth:'350px'}}>
                <InputLabel htmlFor="ID">Name</InputLabel>
                <OutlinedInput
                id="ID"
                label='Name'
                sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
                onChange={(e)=>{setName(e.target.value)}}
                />
            </FormControl>
        </Box>
        <Box sx={{ marginTop:'4vh',alignSelf:'start' }} display='flex' justifyContent='center'>
            <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
                <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>person</i>
            </Box>
            <FormControl sx={{width:'20vw',minWidth:'350px'}}>
                <InputLabel htmlFor="ID">Username</InputLabel>
                <OutlinedInput
                id="ID"
                label='UserName'
                sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
                onChange={(e)=>{setUsername(e.target.value)}}
                />
            </FormControl>
        </Box>
        <Box sx={{ marginTop:'4vh',alignSelf:'start'}} display='flex' justifyContent='center'>
            <Box display='flex' justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'5px 0px 0px 5px'}}>
                <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>lock_outline</i>
            </Box>
            <FormControl sx={{width:'20vw',minWidth:'350px'}}>
                <InputLabel htmlFor="ID">Password</InputLabel>
                <OutlinedInput
                id="ID"
                label='Password'
                sx={{borderRadius:'0px 5px 5px 0px',backgroundColor:'#FEFFFF'}}
                onChange={(e)=>{setpassword(e.target.value)}}
                />
            </FormControl>
        </Box>
        <Box display='flex' justifyContent='center'>
            <Button onClick={submitHandler} sx={{backgroundColor:'#CF823A', color:'#FEFFFF',width:'8vw',height:'5vh',borderRadius:'25px',marginTop:'5vh','&:hover':{backgroundColor:'#CF9D6E'}}}>
                Submit
            </Button>
        </Box>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                Please Fill All Fields!
            </Alert>
        </Snackbar>
    </Box>
  )
}

export default SignUp