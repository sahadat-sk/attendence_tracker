import React, { useState } from 'react'
import { Box, Button,AppBar,Typography} from '@mui/material'
import mainImg from '../images/frontPage.jpg'
import Main from '../components/Main'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
const Home = () => {
    const [shown, setShown] = useState(0)
    function componentSelect(){
        switch(shown){
            case 0:
                return <Main setShown={setShown}/>
            case 1:
                return <Login />
            case 2:
                return <SignUp isEducator={false}/>
            case 3:
                return <SignUp isEducator={true}/>
        }
    }
  return (
    <Box>
        <AppBar position="static" sx={{backgroundColor:'transparent',color:'black',boxShadow:'none',padding:'0px',width:'100%'}}>
            <Box display='flex' justifyContent='flex-end'>
              <Button color="inherit" onClick={()=>{setShown(0)}} sx={{
                backgroundColor:'#FEFFFF',
                borderRadius:'0px',
                width:'5vw',
                height:'7vh',
                '&:hover':{backgroundColor:'#E4E4E4'},
                borderBottom:(shown===0)? '2px solid black':'none'
                }}>
                <Typography variant='subtitle1' component='div'>
                    Home
                </Typography>
              </Button>
              <Button color="inherit" onClick={()=>{setShown(1)}} sx={{
                backgroundColor:'#FEFFFF',
                borderRadius:'0px',
                width:'5vw',
                height:'7vh',
                '&:hover':{backgroundColor:'#E4E4E4'},
                borderBottom:(shown===1)? '2px solid black':'none'
                }}>
                <Typography variant='subtitle1' component='div'>
                    Login
                </Typography>
              </Button>
              <Button color="inherit" onClick={()=>{setShown(2)}} sx={{
                backgroundColor:'#FEFFFF',
                borderRadius:'0px',
                width:'6vw',
                height:'7vh',
                '&:hover':{backgroundColor:'#E4E4E4'},
                borderBottom:(shown===2)? '2px solid black':'none'
                }}>
                <Typography variant='subtitle1' component='div'>
                    Sign Up
                </Typography>
              </Button> 
              <Button color="inherit" onClick={()=>{setShown(3)}} sx={{
                backgroundColor:'#FEFFFF',
                borderRadius:'0px',
                width:'6vw',
                height:'7vh',
                '&:hover':{backgroundColor:'#E4E4E4'},
                borderBottom:(shown===3)? '2px solid black':'none'
                }}>
                <Typography variant='subtitle1' component='div'>
                    Teacher
                </Typography>
              </Button>              
            </Box>
        </AppBar>
        <Box display='flex'>
            {componentSelect()}
            <img src={mainImg} alt='not found' style={{width:'60vw',height:'80vh',objectFit:'cover',position:'absolute',right:'0px'}}></img>
        </Box>
    </Box>
  )
}

export default Home