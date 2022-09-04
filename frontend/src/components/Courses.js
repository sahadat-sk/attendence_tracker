import React, { useEffect, useState } from 'react'
import { Box, List, ListItem, Toolbar, Drawer, ListItemText, ListItemButton, CssBaseline, AppBar, Button, IconButton, ListItemIcon, Typography, Accordion, AccordionSummary, AccordionDetails, LinearProgress, CircularProgress} from '@mui/material';
import './styles/course.css'
import axios from 'axios';
const Courses = () => {
    const [expanded, setExpanded] = useState(-1);
    const [attendencePer,setAttendencePer] = useState(90);
    const [enrolledCourses, setEnrolledCourses] = useState(['Physics']);
    const [loading,setLoading] = useState(false);
    const [daysPresent, setDaysPresent] = useState(0);
    const [totalDays, setTotalDays] = useState(0);
    
    const user = JSON.parse(localStorage.getItem('UserOnline'))
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        fetchAttendence(panel);
    };
    async function fetchAttendence(idx){
        try{
            const config={
                headers:{
                    Authorization: `Bearer ${user.accessToken}`,
                }
            }
            const classId = enrolledCourses[idx]._id;
            setLoading(true);
            const total = await axios.post('/attendence/gettotalattendence/',{classId},config);
            setTotalDays(total.data.length);
            const present = await axios.post('/attendence/getattendence',{classId},config);
            setDaysPresent(present.data.length);
            if(total.data.length===0){
                setAttendencePer(0);
            }
            else{
                const percent = present.data.length/total.data.length * 100;
                setAttendencePer(percent);
            }
            setLoading(false);
        }
        catch(Error){
            setLoading(false);
            console.log(Error);
        }
    }
    useEffect(() => {
        async function fetch(){
            try{
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    }
                }
                const {data}=await axios.get('/course/getenrolledcourses/',config);
                setEnrolledCourses(data);
            }
            catch(Error){
                console.log(Error);
            }
        }
        fetch();
    }, [])
  return (
    <Box display='flex' justifyContent='center' alignItems='center' sx={{flexFlow:'column',marginTop:'9vh'}}>
        <Typography variant='h2' component='div' sx={{fontFamily:'Roboto Slab',color:'#434343',marginBottom:'4vh'}}>
            Courses Enrolled
        </Typography>
        {enrolledCourses.map((item,idx)=>(
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
                        <Typography sx={{ color: 'text.secondary' }}>Some Sir</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{display:'flex',alignItems:'flex-start',justifyContent:'center',flexFlow:'column'}}>
                        <Typography variant="h6" sx={{fontFamily:'Sans Sherif',marginLeft:'1vw'}}>
                            Attendence: {attendencePer} %
                        </Typography>
                        <Box sx={{width:'80%',marginLeft:'1vw',height:'2vh',padding:'30px'}}>
                            {(loading)?<LinearProgress color="success" />:<LinearProgress  variant="determinate" value={attendencePer} />}
                        </Box>
                        <Box display={(loading)?'none':'flex'} justifyContent='space-around' alignItems='center' sx={{width:'40vw'}}>
                            <Box  display='flex' justifyContent='center' alignItems='center' sx={{width:'40%',height:'6vh',borderRadius:'5px',backgroundColor:'#CF823A',marginLeft:'1vw'}}>
                                <Typography variant='subtitle2' sx={{fontFamily:'Roboto Slab', color:'#FEFFFF'}}>
                                    Days Present: {daysPresent}
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='center' alignItems='center' sx={{width:'40%',height:'6vh',borderRadius:'5px',backgroundColor:'#2B7A78'}}>
                                <Typography variant='subtitle2' sx={{fontFamily:'Roboto Slab',color:'#FEFFFF'}}>
                                    Total Days: {totalDays}
                                </Typography>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
        ))}
    </Box>
  )
}

export default Courses