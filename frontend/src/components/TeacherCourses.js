import React, { useState } from 'react'
import { Box, List, ListItem, Toolbar, Drawer, ListItemText, ListItemButton, CssBaseline, AppBar, Button, IconButton, ListItemIcon, Typography, Accordion, AccordionSummary, AccordionDetails, LinearProgress, CircularProgress} from '@mui/material';


const TeacherCourses = () => {

    const [expanded, setExpanded] = useState(-1);
    const [courses, setCourses] = useState([]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
                            
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{display:'flex',alignItems:'flex-start',justifyContent:'center',flexFlow:'column'}}>
                    </AccordionDetails>
                </Accordion>
        ))}
    </Box>
  )
}

export default TeacherCourses