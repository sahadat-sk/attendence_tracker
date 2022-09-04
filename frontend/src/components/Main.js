import React from 'react'
import { Box, Button,AppBar,Typography} from '@mui/material'
const Main = ({setShown}) => {
  return (
            <Box display='flex' justifyContent='center' sx={{height:'80vh',flexFlow:'column',marginLeft:'10vw',zIndex:'1000'}}>
                <Typography variant='h3' component='div' fontFamily='Roboto Slab'>
                    Solves all your
                </Typography>
                <Typography variant='h1' component='div' fontFamily='Roboto Slab'>
                    Attendence
                </Typography>
                <Typography variant='h1' component='div' sx={{color:'#7DD2D2',fontFamily:'Sans Sherif',align:'left'}}>
                    Problems
                </Typography>
                <Box display='flex' justifyContent='space-between' sx={{width:'25vw'}}>
                    <Button onClick={()=>{setShown(1)}} variant='outlined' sx={{marginTop:'30px',width:'8vw',height:'5vh' }}>
                        <Typography variant='subtitle2' component='div' sx={{color:'#7DD2D2',fontFamily:'Sans Sherif',align:'left'}}>
                            Login
                        </Typography>
                    </Button>
                    <Button onClick={()=>{setShown(2)}} sx={{marginTop:'30px',width:'8vw',height:'5vh',backgroundColor:'#7DD2D2','&:hover':{backgroundColor:'#AFD6D6'} }}>
                        <Typography variant='subtitle2' component='div' sx={{color:'#7DD2D2',fontFamily:'Sans Sherif',align:'left',color:'#FEFFFF'}}>
                            Sign Up
                        </Typography>
                    </Button>
                </Box>
            </Box>
  )
}

export default Main