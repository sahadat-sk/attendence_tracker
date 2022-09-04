import React, { useState } from 'react'
import { Box, List, ListItem, Toolbar, Drawer, ListItemText, ListItemButton, CssBaseline, AppBar, Button, IconButton, ListItemIcon, Typography} from '@mui/material'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AddCourses from '../components/AddCourses';
import TeacherCourses from '../components/TeacherCourses';
const Teacher = () => {
    const [isOpen, setisOpen] = useState(false);
    const [show, setshow] = useState(0);
    const history = useHistory();
  
  
    const logoutHandler = async ()=>{
    localStorage.setItem('isAuth', false);
    localStorage.setItem("UserOnline",false); 
    const {data} = await axios.get('/logout');
    history.push('/')
  }

  function componentSelect(){
    switch(show){
        case 0:
            return <TeacherCourses />;
        case 1:
            return <AddCourses />;
    }
  }
  
  return (
    <Box>
      <CssBaseline />
        <Drawer variant='permanent' open={isOpen} onMouseOver={(e)=>{setisOpen(true)}} onMouseOut={(e)=>{setisOpen(false)}} 
        sx={{width: isOpen? '20vw': '6vw',
        '& .MuiDrawer-paper': {
            width: isOpen? '20vw': '60px',
            boxSizing: 'border-box',
            transition:'width 0.3s',
            backgroundColor:'#DEDEDE'
          }}}>
          <List>
            {['Courses','Add Courses'].map((text,idx)=>(
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={()=>setshow(idx)} sx={{
                  height:'8vh',
                  justifyContent: isOpen ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover':{
                    color:'#FEFFFF',
                    backgroundColor:'#193D47'
                  }
                }}>
                  <ListItemIcon sx={{
                    minWidth: 0,
                    mr: isOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
                    <i class="material-icons" style={{fontSize:'1.5rem'}}>{(idx%2===0)? 'mouse' : 'colorize'}</i>
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: isOpen? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box display='flex' justifyContent='flex-end' alignItems='center' sx={{width:'95vw',height:'8vh',marginLeft:'60px',marginTop:'0px'}}>
          <Typography variant='h6' component='div' fontFamily='Sans Serif'>
            {JSON.parse(localStorage.getItem('UserOnline')).name}
          </Typography>
          <Button onClick={logoutHandler} sx={{backgroundColor:'#7DD2D2',marginLeft:'3vw',width:'6vw',height:'4.5vh',borderRadius:'20px',color:'#17252A','&:hover':{backgroundColor:'#AFD6D6'}}}>
            Logout
          </Button>
        </Box>
        {componentSelect()}
    </Box>      
  )
}

export default Teacher