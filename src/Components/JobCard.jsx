import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Box, Button, Typography } from '@mui/material';

export const JobCard = ({Fun,Data}) => {
  return (
    <Box sx={{height:"400px",border:"0.5px dashed grey",borderRadius:"5px", overflow:"auto",position:"relative"}} >
           <Box sx={{padding:"20px"}}>
      
      <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
      <Typography sx={{fontSize:"16px"}}>Job :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"14px"}}>{Data && Data.jobName}</Typography>
      </Box>
    </Box>
    <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
      <Typography sx={{fontSize:"16px"}}>Worker :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"14px"}}>{Data && Data.assignedWorker.name},{Data && Data.assignedSparePartWorker.name}</Typography>
      </Box>
    </Box>
   

    <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
      <Typography sx={{fontSize:"16px"}}>Worker Mobile :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"14px"}}>{Data && Data.assignedWorker.mobile},{Data && Data.assignedSparePartWorker.mobile}</Typography>
      </Box>
    </Box>

    <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
      <Typography sx={{fontSize:"16px"}}>User Name :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"14px"}}>{Data && Data.user.name}</Typography>
      </Box>
    </Box>

    <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
        <LocalPhoneIcon sx={{fontSize:"30px"}}/>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"14px"}}>{Data && Data.user.mobileNumber}</Typography>
      </Box>
    </Box>

    <Box sx={{display:"flex",justifyContent:"left",marginTop:"15px"}}>
      <Box>
        <FmdGoodIcon sx={{fontSize:"30px"}}/>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"14px"}}>{Data && Data.user.address},{Data && Data.user.pincode},{Data && Data.user.city},{Data && Data.user.country}</Typography>
      </Box>
    </Box>

    

    

</Box>
<Box sx={{position:"absolute",bottom:10,left:"38%"}}>
      <Button variant='contained' size='large' onClick={()=>Fun()} expand sx={{backgroundColor:"black"}}>View</Button>
    </Box>
    </Box>
   
  )
}
