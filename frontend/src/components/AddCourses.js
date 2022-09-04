import React, { useState } from 'react'
import { Box, Button,Typography, FormControl, InputLabel, OutlinedInput, Alert, AlertTitle, Snackbar} from '@mui/material'
import axios from 'axios';
const AddCourses = () => {
    const [module, setModule] = useState();
    const [key, setKey] = useState();
    const [open, setOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('UserOnline'))
    const [success, setSuccess] = useState(false);  

    const submitHandler= async()=>{
            try{
                if(!key||!module){
                    setOpen(true);
                    return;
                }
                const educatorId = user._id; 
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    }
                }
                const {data}=await axios.post('/course/addcourses/',{key,educatorId,module},config);
                setSuccess(true);
            }
            catch(Error){
                console.log(Error);
            }
    }
function handleClose(){
    setOpen(false)
}
function handleCloseSuccess(){
    setSuccess(false)
}
  return (
    <Box display='flex' justifyContent='center' alignItems='center' sx={{height:'70vh'}}>
    <Box display='flex' justifyContent='center' alignItems='center' sx={{flexFlow:'column',marginTop:'9vh',width:'30vw',border:'1.5px solid grey',paddingTop:'8vh',paddingBottom:'8vh',borderRadius:'15px'}}>
        <Typography variant='h3' component='div' sx={{fontFamily:'Roboto Slab',color:'#434343',marginBottom:'4vh'}}>
            Add Courses
        </Typography>       
        <Box sx={{ marginTop:'5vh'}} display='flex' justifyContent='center'>
            <FormControl sx={{width:'20vw',minWidth:'350px'}}>
                <InputLabel htmlFor="ID">Module</InputLabel>
                <OutlinedInput
                id="ID"
                label='Module'
                onChange={(e)=>{setModule(e.target.value)}}
                sx={{borderRadius:'5px',backgroundColor:'#FEFFFF'}}
                />
            </FormControl>
        </Box>
        <Box sx={{ marginTop:'5vh'}} display='flex' justifyContent='center'>
            <FormControl sx={{width:'20vw',minWidth:'350px'}}>
                <InputLabel htmlFor="ID">Educator Name</InputLabel>
                <OutlinedInput
                id="ID"
                label='Educator Name'
                value={JSON.parse(localStorage.getItem('UserOnline')).name}
                sx={{borderRadius:'5px',backgroundColor:'#FEFFFF'}}
                disabled
                />
            </FormControl>
        </Box>
        <Box sx={{ marginTop:'5vh'}} display='flex' justifyContent='space-between'>
            <Box sx={{width:'20vw',minWidth:'350px'}} display='flex' justifyContent='space-between'>
                <FormControl sx={{width:'40%'}}>
                    <InputLabel htmlFor="ID">Key</InputLabel>
                    <OutlinedInput
                    id="ID"
                    label='Key'
                    type='password'
                    onChange={(e)=>{setKey(e.target.value)}}                  
                    sx={{borderRadius:'5px',backgroundColor:'#FEFFFF'}}
                    />
                </FormControl>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Button onClick={submitHandler} sx={{backgroundColor:'#CF823A', color:'#FEFFFF',width:'8vw',height:'5vh',borderRadius:'25px','&:hover':{backgroundColor:'#CF9D6E'}}}>
                        Create
                    </Button>    
                </Box>
            </Box>
        </Box>
    </Box>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                Please Fill All Fields!
            </Alert>
        </Snackbar>
        <Snackbar open={success} autoHideDuration={4000} onClose={handleCloseSuccess}>
            <Alert severity="success" onClose={handleCloseSuccess} sx={{ width: '100%' }}>
                Module Created!
            </Alert>
        </Snackbar>
    </Box>

  )
}

export default AddCourses