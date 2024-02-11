import { Box, Button, Card, CardContent, TextField, TextareaAutosize, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

export const CreateInvoice = () => {
    const handelGoBack = () => {
        window.history.back();
      }
  return (
    <Card>
        <CardContent>
             <Box>
                  <CloseIcon onClick={handelGoBack} sx={{fontSize:"25px"}}/>
             </Box>

             <Box sx={{marginLeft:"25px",marginTop:"20px"}}>
                <Typography sx={{fontSize:"25px"}}>Create Invoice</Typography>
                <Typography sx={{fontSize:"16px"}}>Status : credited</Typography>
             </Box>

             <Box sx={{width:"60%",marginLeft:"25px"}}>
                <Box sx={{marginTop:"25px"}}>
                    <Typography sx={{color:"#9E9E9E",fontSize:"16px"}}>Enter Customer Name</Typography>
                    <TextField sx={{marginTop:"10px"}} fullWidth placeholder='Name...'></TextField>
                </Box>

                <Box sx={{marginTop:"25px"}}>
                    <Typography sx={{color:"#9E9E9E",fontSize:"16px"}}>GSTIN / LLP Reg No. / Prop. Number</Typography>
                    <TextField sx={{marginTop:"10px"}} fullWidth placeholder='Number...'></TextField>
                </Box>


                <Box sx={{marginTop:"25px"}}>
                    <Typography sx={{color:"#9E9E9E",fontSize:"16px"}}>Enter Address</Typography>
                    <TextField sx={{marginTop:"10px"}} minRows={4} fullWidth 
                    placeholder='eg:101-103 Chanda Tower, Opp. Grand Utsave Marriage Garden, Main Gandhi Path Road, 
                    Vaishali Nagar, Jaipur , Rajasthan - 302021 India...'></TextField>
                </Box>


                <Box sx={{marginTop:"25px"}}>
                    <Typography sx={{color:"#9E9E9E",fontSize:"16px"}}>Enter Email</Typography>
                    <TextField sx={{marginTop:"10px"}} fullWidth placeholder='eg:example@gmail.com'></TextField>
                </Box>


                <Box sx={{marginTop:"25px"}}>
                    <Typography sx={{color:"#9E9E9E",fontSize:"16px"}}>Enter Contact Number</Typography>
                    <TextField sx={{marginTop:"10px"}} fullWidth placeholder='+91 0000000000...'></TextField>
                </Box>

                <Box sx={{marginTop:"25px"}}>
                    <Typography sx={{fontSize:"36px"}}> Product Details</Typography>
                    <TextField fullWidth placeholder='Product Name' sx={{marginTop:"20px"}}></TextField>
                   <TextareaAutosize  minRows={5} style={{width:"100%",marginTop:"10px",padding:"10px"}} placeholder='Product description ...' />
                     
                     <Box sx={{marginTop:"20px"}}>
                     <TextField label="Enter Price/Unit"></TextField>

                  <TextField sx={{marginLeft:"10px"}} label="Enter Qty"></TextField>
                     </Box>
                   
                </Box>


                <Box sx={{marginTop:"30px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <Box sx={{width:"293px",height:"96px",border:"1px solid #BFBFBF",textAlign:"center"}}>
                             <Typography sx={{fontSize:"22px"}}>Total Amount</Typography>
                             <Typography sx={{fontSize:"25px",fontWeight:"bold",marginTop:"10px"}}>₹ 120000</Typography>
                    </Box>

                    <Box>
                        <Button size='large' sx={{backgroundColor:"#FF8604",color:"#fff"}}>Setup payment</Button>
                    </Box>
                </Box>
             </Box>
        </CardContent>
    </Card>
  )
}
