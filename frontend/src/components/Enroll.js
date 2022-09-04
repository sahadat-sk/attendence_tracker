import React, { useEffect, useState } from 'react'
import { Box, List, ListItem, Toolbar, Drawer, ListItemText, ListItemButton, CssBaseline, AppBar, Button, IconButton, ListItemIcon, Typography, Accordion, AccordionSummary, AccordionDetails, LinearProgress, Paper, OutlinedInput, InputLabel, FormControl, Snackbar, Alert} from '@mui/material';
import axios from 'axios';
const Enroll = () => {
    const [courses, setCourses] = useState([]);
    const [expanded, setExpanded] = useState(-1);
    const [enrollKey, setEnrollKey] = useState();
    const [open, setOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('UserOnline'));
    useEffect(() => {
        async function fetch(){
            try{
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    }
                }
                const {data}=await axios.get('/course/getcourses/',config);
                setCourses(data);
            }
            catch(Error){
                console.log(Error);
            }
        }
        fetch();
    }, [])
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function handleClose(){
        setOpen(false)
    }

   async function submitHandler(idx){
            try{
                if(!enrollKey){
                    setOpen(true);
                    return;
                }
                console.log(idx)
                const studentId = user._id;
                const classId = courses[idx]._id;
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    }
                }
                const {data}=await axios.post('/course/enroll/',{enrollKey,studentId,classId},config);

            }
            catch(Error){
                console.log(Error);
            }
   }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' sx={{flexFlow:'column',marginTop:'9vh'}}>
        <Typography variant='h2' component='div' sx={{fontFamily:'Roboto Slab',color:'#434343',marginBottom:'4vh'}}>
            Courses Available
        </Typography>
        {courses.map((item,idx)=>(
              <Accordion key={idx} expanded={expanded === idx}  onChange={handleChange(idx)} sx={{margin:'10px'}}>
                    <AccordionSummary
                    expandIcon={<i class="material-icons">add</i>}
                    aria-controls="panel1bh-content"
                    id={idx}
                    sx={{height:'8vh',width:'60vw',border:'1.5px solid grey'}}
                    >
                        <Box display='flex' justifyContent='center' sx={{flexFlow:'column'}}>
                            <Typography variant='h6' sx={{ width:'30vw', flexShrink: 0 }}>
                                {item.module}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                {item.educator.username}    
                            </Typography>                           
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{display:'flex',alignItems:'flex-start',justifyContent:'center',flexFlow:'column'}}>
                         <Box display='flex' justifyContent='center' alignItems='center'>   
                            <FormControl sx={{width:'20vw',minWidth:'350px',marginRight:'5vw'}}>
                                <InputLabel htmlFor="ID">Enter Key</InputLabel>
                                <OutlinedInput
                                id="ID"
                                type='password'
                                label='Enter Key'
                                sx={{borderRadius:'5px',backgroundColor:'#FEFFFF'}}
                                onChange={(e)=>setEnrollKey(e.target.value)}
                                />
                            </FormControl>
                            <Button display='flex' onClick={(e)=>submitHandler(idx)} justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'8vw',height:'5vh',color:'#17252A',borderRadius:'50px','&:hover':{backgroundColor:'#CF9D6E'}}}>
                                <Typography sx={{color:'#FEFFFF'}}> 
                                    Enroll
                                </Typography>
                            </Button>
                        </Box>
                        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                                Please Fill All Fields!
                            </Alert>
                        </Snackbar>
                    </AccordionDetails>
                </Accordion>
        ))}
    </Box>
  )
}

export default Enroll