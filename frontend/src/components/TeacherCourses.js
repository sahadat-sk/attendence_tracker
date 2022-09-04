import React, { useEffect, useState } from 'react'
import { Box, List, ListItem, Toolbar, Drawer, ListItemText, ListItemButton, CssBaseline, AppBar, Button, IconButton, ListItemIcon, Typography, Accordion, AccordionSummary, AccordionDetails, LinearProgress, CircularProgress, FormControl, InputLabel, OutlinedInput, Paper} from '@mui/material';
import axios from 'axios';


const TeacherCourses = () => {

    const [expanded, setExpanded] = useState(-1);
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState();
    const [student, setStudent] = useState([]);
    const user = JSON.parse(localStorage.getItem('UserOnline'))

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        async function fetch(){
            try{
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    }
                }
                const educatorId = user._id;
                const {data}=await axios.post('/course/geteducatorcourses/',{educatorId},config);
                setCourses(data);
                console.log(data);
            }
            catch(Error){
                console.log(Error);
            }  
        }
        fetch();
    }, [])
    
const searchResult = async()=>{
    const newdata =  courses.studentsEnrolled.filter(element=>element.username===search);
    setStudent(newdata)
    console.log(newdata);
}

  return (
    <Box display='flex' justifyContent='center' alignItems='center' sx={{flexFlow:'column',marginTop:'9vh'}}>
        <Typography variant='h2' component='div' sx={{fontFamily:'Roboto Slab',color:'#434343',marginBottom:'4vh'}}>
            Courses
        </Typography>
        {courses.map((item,idx)=>(
              <Accordion key={idx} expanded={expanded === idx}  onChange={handleChange(idx)} sx={{margin:'10px'}}>
                    <AccordionSummary
                    expandIcon={<i class="material-icons">arrow_drop_down</i>}
                    aria-controls="panel1bh-content"
                    id={idx}
                    sx={{height:'8vh',width:'60vw',border:'1.5px solid grey'}}
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {item.module}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            {item.educator.username}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails id={idx} sx={{display:'flex',alignItems:'flex-start',justifyContent:'center',flexFlow:'column'}}>
                        <Box sx={{ marginTop:'2vh',marginLeft:'2vw'}} display='flex' justifyContent='center'>
                            <FormControl sx={{width:'20vw',minWidth:'350px'}}>
                                <InputLabel htmlFor="ID">Search Students</InputLabel>
                                <OutlinedInput
                                id="ID"
                                label='Search Students'
                                sx={{borderRadius:'5px 0px 0px 5px',backgroundColor:'#FEFFFF'}}
                                onChange={(e)=>{setSearch(e.target.value)}}
                                />
                            </FormControl>
                            <Button display='flex' onclick={searchResult} justifyContent='center' alignItems='center' sx={{backgroundColor:'#2B7A78',width:'56px',height:'56px',color:'#17252A',borderRadius:'0px 5px 5px 0px','&:hover':{backgroundColor:'#CF9D6E'}}}>
                                <i class="material-icons" style={{color:'#FEFFFF',fontSize:'2.5rem'}}>search</i>
                            </Button>
                        </Box>
                        {
                            student.map((item,idx)=>(
                                <Box sx={{height:'30vh',marginLeft:'2vw',marginTop:'1vh'}} key={idx} display='flex' alignItems='center' justifyContent='center'>
                                    <Box elevation={2} sx={{width:'50vw',height:'8vh',border:'1.5px solid grey',borderRadius:'5px'}} display='flex' alignItems='center' justifyContent='space-between'>
                                        <Typography sx={{marginLeft:'3vw'}}>
                                            {item.username}
                                        </Typography>
                                        <Typography sx={{marginRight:'3vw'}}>
                                            No
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        }
                    </AccordionDetails>
                </Accordion>
        ))}
    </Box>
  )
}

export default TeacherCourses