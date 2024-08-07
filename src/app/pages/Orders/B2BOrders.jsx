import { Box, Button, Card, CardContent, Tab,InputAdornment, Tabs, Typography, TextField,FormControl,InputLabel,MenuItem,Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { InfoCard } from '../../../Components/InfoCard';
import Grid from "@mui/material/Grid";
import { OrdersCard } from '../../../Components/OrdersCard';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import { B2BOrdersCard } from '../../../Components/B2BOrderCard';
import { JobCard } from '../../../Components/JobCard';
import { GenralTabel } from '../../TabelComponents/GenralTable';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ThemColor } from '../../Them/ThemColor';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth:"500px",
  
  bgcolor: 'background.paper',
  borderRadius:"10px",
  boxShadow: 24,
  p: 2,
};
const orangeTheme = createTheme({
  palette: {
    primary: {
      main: '#EE731B', // Set the main color to your desired shade of orange
    },
  },
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const column = [
  { name: "Name" },
  { name: "Job Date" },
  {name: "Start Time"},
  { name: "Stop Time" },
  { name: "Parts Required" },
  { name: "Client" },
  { name: "Assigned Worker" },
  { name: "Assigned SparePart Worker" },
  { name: "Status" },
  { name: "CreatedAt" },
  { name: "Action" },
  { name: "Delete" },
];

export const B2BOrders = () => {
  const navigate = useNavigate()
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
};

const thTdStyle = {
   fontSize:"16px",
    textAlign: 'center',
    padding: '8px',
};
  const [value, setValue] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [Jobs,setJobs] = useState([])
  const [open, setOpen] = useState(false);

  const [JobData,setJobData] = useState([]);
  const [update,setupdate] = useState(0)
  const [filteredJobData, setFilteredJobData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const handleClose = () => {
    setOpen(false);
    setSelectedOrderData(null)
  }
  const [SelectedOrderData,setSelectedOrderData] = useState(null);

  const handleChangetabs = (event, newValue) => {
    setValue(newValue);
  };


  const handelViewClick=(id)=>{
    navigate(`jobs_view/${id}`);
  }

  const deleteUser = async(ID) => {
    try{
      const res = await axios.delete(`${Base_url}api/job/${ID}`);
      console.log(res)
      setupdate((prev)=>prev+1)
    }
    catch(err){
      console.log("Error",err)
    }
  }


 const getOrders = async () => {
    try {
      const response = await axios.get(`${Base_url}api/job`);
      console.log(response.data);
      const Jobs = response.data

      setJobs(Jobs)

      const FormatedData = Jobs.map((el,index)=>({
        "Name":el.jobName,
        "jobDate":el.jobDate,
   
        "startTime":el.startTime,
        "stopTime":el.stopTime,
        "partsRequired":el.partsRequired && el.partsRequired.map(part => part.partName).join(", "),
        
        "client":el.client && el.client.name,
        "assignedWorker":el.assignedWorker && el.assignedWorker.name,
        "assignedSparePartWorker":el.assignedSparePartWorker && el.assignedSparePartWorker.name,
        "status":<Button variant='contained' color='success'> {el.status}</Button>,
        "CreatedAt":el.createdAt,
        "Action":<EditIcon onClick={()=>handelViewClick(el._id)} style={{ color: `${ThemColor.icon}` }} />,
        "Delete":<DeleteIcon color="error" onClick={()=>deleteUser(el._id)} />
      }))

      setJobData(FormatedData)
      setFilteredJobData(FormatedData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
 

  const handelOrderClick = ()=>{
    // navigate("add")
    window.open("/jobs/add", "_blank");
  }

  

 useEffect(() => {
    const filterData = () => {
      const filtered = Jobs.filter(job => {
        const matchesSearch = 
          job.jobName.toLowerCase().includes(searchInput.toLowerCase()) ||
          (job.client && job.client.name.toLowerCase().includes(searchInput.toLowerCase())) ||
          (job.assignedWorker && job.assignedWorker.name.toLowerCase().includes(searchInput.toLowerCase())) ||
          (job.assignedSparePartWorker && job.assignedSparePartWorker.name.toLowerCase().includes(searchInput.toLowerCase()));
        
        const matchesStatus = 
          statusFilter === 'All' ||
          job.status.toLowerCase() === statusFilter.toLowerCase();
        
        return matchesSearch && matchesStatus;
      }).map((el, index) => ({
        "Name": el.jobName,
        "jobDate": el.jobDate,
        "startTime": el.startTime,
        "stopTime": el.stopTime,
        "partsRequired": el.partsRequired && el.partsRequired.map(part => part.partName).join(", "),
        "client": el.client && el.client.name,
        "assignedWorker": el.assignedWorker && el.assignedWorker.name,
        "assignedSparePartWorker": el.assignedSparePartWorker && el.assignedSparePartWorker.name,
        "status": <Button variant='contained' color='success'>{el.status}</Button>,
        "CreatedAt": el.createdAt,
        "Action": <EditIcon onClick={() => handelViewClick(el._id)} style={{ color: `${ThemColor.icon}` }} />,
        "Delete": <DeleteIcon color="error" onClick={() => deleteUser(el._id)} />
      }));

      setFilteredJobData(filtered);
    };

    // if(searchInput !== ""){
    //   filterData();
    //   return;
    // }
    filterData();
  //  if(searchInput === ""){
  //   setFilteredJobData(JobData);
  //   return;
  //  }
  }, [searchInput, statusFilter]);
 


  useEffect(()=>{
    getOrders();
  },[update])

  return (
    <Box >

       <Card sx={{minHeight:"100vh"}}>
        <CardContent>

          <Box >
          <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Box>
            <Typography style={{fontSize:"40px",fontWeight:600,fontFamily:"sans-serif"}} >
             Jobs
            </Typography>
            </Box>
           

            <Box>
              
              <Button variant="contained" style={{marginLeft:"20px",background:"#FF8604"}} startIcon={<AddIcon />} onClick={handelOrderClick} >Job</Button>
            </Box>
          </Box>
             

          <Box sx={{ borderBottom: 1, borderColor: 'divider',marginTop:"20px" }}>
      <ThemeProvider theme={orangeTheme}>
        <Tabs value={value} onChange={handleChangetabs} aria-label="basic tabs example" textColor="primary"
        indicatorColor="primary"
       
        >
          <Tab label="Jobs" {...a11yProps(0)}  style={{fontSize:"16px",fontWeight:600,color:`${value === 0 ? "#EE731B" : "#555555"}`,marginRight:"10px",borderRadius:"10px",marginBottom:"10px"}}/>
          
          
        </Tabs>
        </ThemeProvider>
      </Box>

      <Box sx={{display:"flex",marginTop:"20px",justifyContent:"left",alignItems:"center"}}>
       
            
            <TextField
          label="Search"
          id="outlined-start-adornment"
          size='small'
          sx={{ m: 1, width: '250px' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
          }}
          value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
        />

<FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="status-filter-label">Status</InputLabel>
        <Select
          labelId="status-filter-label"
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          label="Status"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
        </Select>
      </FormControl>

<Button variant="contained" style={{marginLeft:"20px",background:"black",height:"33px"}} startIcon={<FilterListIcon />} >A-Z</Button>
            </Box>
          </Box>
         

          <Box sx={{ width: '100%',marginTop:"20px",height:"70vh",overflow:"auto" }}>
      

      

      <CustomTabPanel value={value} index={0}>
       
      <GenralTabel column={column} rows={filteredJobData} />
        
      </CustomTabPanel>

    

     


    </Box>
    
        </CardContent>
       </Card>


       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

{SelectedOrderData && 
<Box>
<Box style={{display:"flex",justifyContent:"right",alignItems:"center",marginTop:"20px"}}>
            <CloseIcon onClick={handleClose} sx={{marginTop:"-20px",fontSize:"23px"}}/>
          </Box>


<Box sx={{marginTop:"20px"}}>


<Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box >
      <Typography sx={{fontSize:"16px",fontWeight:"bold"}}>status :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px",width:"130px",padding:"5px",textAlign:"center",borderRadius:"10px",bgcolor:"green"}}>
        <Typography sx={{fontSize:"14px",color:"#fff"}}>{SelectedOrderData.status}</Typography>
      </Box>
    </Box>
<Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box >
      <Typography sx={{fontSize:"16px",fontWeight:"bold"}}>Date :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"15px"}}>{SelectedOrderData.date}</Typography>
      </Box>
    </Box>

  <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
      <Typography sx={{fontSize:"16px",fontWeight:"bold"}}>Assigned Worker :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"15px",color:"blue",cursor:"pointer"}}>{SelectedOrderData.assignedWorker.name}</Typography>
      </Box>
    </Box>

    <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
      <Typography sx={{fontSize:"16px",fontWeight:"bold"}}>User :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"15px",color:"blue",cursor:"pointer"}}>{SelectedOrderData.user.name}</Typography>
      </Box>
    </Box>

    <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
      <Typography sx={{fontSize:"16px",fontWeight:"bold"}}>Category :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        {/* <Typography sx={{fontSize:"15px"}}>{SelectedOrderData.details.category}</Typography> */}
      </Box>
    </Box>

    <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
      <Typography sx={{fontSize:"16px",fontWeight:"bold"}}>Sub Category :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        {/* <Typography sx={{fontSize:"15px"}}>{SelectedOrderData.details.sub_category}</Typography> */}
      </Box>
    </Box>

    <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
      <Typography sx={{fontSize:"16px",fontWeight:"bold"}}>Quantity :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        {/* <Typography sx={{fontSize:"15px"}}>{SelectedOrderData.details.quantity} Kg</Typography> */}
      </Box>
    </Box>

 
</Box>

</Box>
}
          
          
         
        </Box>
      </Modal>

       
   </Box>
  )
}

