import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { Box, Card, CardContent, FormControl, InputLabel, Typography,Autocomplete } from '@mui/material';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import { DatePicker, LocalizationProvider,TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import "./AddJobs.css"
import { alignProperty } from '@mui/material/styles/cssUtils';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
export const AddB2BOrder = () => {
  const initalData = {
    assignedWorker: '',
    assignedSparePartWorker:'',
    jobName:"",
    description:"",
    partsRequired:[],
    name:"",
    email:"",
    mobileNumber:"",
    client:"",
    jobDate:"",
    startTime:"",
    stopTime:"",
    travelTime:""
    
  }
  const [formData, setFormData] = useState(initalData);

  const [b2bVendors, setB2BVendors] = useState([]);
  const [CollectorsData,setCollectorsData] = useState([]);
  const [WholesalersData,setWholesalersData] = useState([]);
  const [MediatorsData,setMediatorsData] = useState([]);
  const [FactoryData,setFactoryData] = useState([]);
  const [update,setupdate] = useState(0)
  const [toData,setToData] = useState([])
  const [fromData,setFromData] = useState([])
  const [subCategoryData,setSubCategoryData] = useState([])
  const [totalAmount,setTotalAmount] = useState("")
  const [selectedSubcategoryData,setSelectedSubcategoryData] = useState({})
  const [TechnicianData,setTechnicianData] = useState([])
  const [SparePartsData,setSparePratsTechnicianData] = useState([])
  const [TeamMemberData,setTeamMemberData] = useState([])
  const [ClientData,setClientData] = useState([])
  const [PartsData, setPartsData] = React.useState([]);
  const [AllSparePartsData, setAllSparePartsData] = useState([])
  const [selectedClient, setSelectedClient] = useState(null);
  const handlePartsChange = (event) => {
    const {
      target: { value },
    } = event;
    setPartsData(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
   if(name === "client"){
    const client = ClientData.find(client => client._id === value);
    setSelectedClient(client || null);
   }
  };

  const handleCategoryChange = (index, value) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index].category = value;
    setFormData({
      ...formData,
      details: updatedDetails,
    });
  };

  const handleQuantityChange = (index, value) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index].quantity = value;
    setFormData({
      ...formData,
      details: updatedDetails,
    });
  };

  const handleAddCategory = () => {
    setFormData({
      ...formData,
      details: [...formData.details, { category: '', quantity: 0 }],
    });
  };

  const handleRemoveCategory = (index) => {
    const updatedDetails = [...formData.details];
    updatedDetails.splice(index, 1);
    setFormData({
      ...formData,
      details: updatedDetails,
    });
  };

  const handleSubmit = () => {
    const userDetails ={
      name:formData.name,
      email:formData.email,
      mobileNumber:formData.mobileNumber,
      address:formData.address,
      pincode:formData.pincode,
      city:formData.city,
      country:formData.country
    }

    const filteredPartsData = AllSparePartsData.filter(part => PartsData.includes(part.partName));

// Extract IDs from the filtered objects
const matchingIds = filteredPartsData.map(part => part._id);

// Now matchingIds contains the IDs of objects where partName matches

// Create an array of objects with partsRequired field
// const partsRequiredArray = matchingIds.map(id => ({
//   id,
// }));
 
console.log("All Parts DAta ====>",matchingIds)
    const Data ={
      assignedWorker: formData.assignedWorker,
      assignedSparePartWorker:formData.assignedSparePartWorker,
      jobName:formData.jobName,
      description:formData.description,
      jobDate:formData.jobDate,
      startTime:formData.startTime,
      stopTime:formData.stopTime,
      user:userDetails,
      client:formData.client,
      travelTime:formData.travelTime
    }

    console.log("Data ==>",formData)
    createJob(Data);
    
    
  };

  const createJob = async (data) => {
    try {
      const response = await axios.post(`${Base_url}api/job`,data );
      setFormData(initalData)
    setPartsData([])
      handelBack();
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const fetchTeamMember = async () => {
    try {
      const response = await axios.get(`${Base_url}api/worker`);

      if (response.status === 200) {
        const fetchedB2BUsers = response.data;
         setTeamMemberData(fetchedB2BUsers)
         getOrders(fetchedB2BUsers)
         console.log("TEam Members Data ====>",fetchedB2BUsers)
         

      } else {
        console.error('Error fetching categories:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const fetchClients = async () =>{
    try {
      const response = await axios.get(`${Base_url}api/client`);

      if (response.status === 200) {
        const Client = response.data;
        setClientData(Client)


      } else {
        console.error('Error fetching categories:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  const getOrders = async (TeamData) => {
    try {
      const response = await axios.get(`${Base_url}api/job`);
      console.log(response.data);
      const Jobs = response.data

       console.log("Active Jobs Data =====>",Jobs)
       const formatTeamMemberAvailability = (teamMembers, activeJobs) => {
        return teamMembers.map(member => {
          const isAssigned = activeJobs.some(job => 
            (job.assignedWorker._id === member._id || job.assignedSparePartWorker._id === member._id ) && job.status !== 'completed'
          );
          return {
            ...member,
            availability: isAssigned ? 'unavailable' : 'available'
          };
        });
      };
      
      const formattedTeamMembers = formatTeamMemberAvailability(TeamData, Jobs);
      console.log("Data of avilabel worker   ==> ",formattedTeamMembers)
      const TechnicianData= formattedTeamMembers.filter((el)=>{
        return el.role === "technician"
      })
        
      const SparePartsData= formattedTeamMembers.filter((el)=>{
        return el.role === "spare parts"
      })

  
       
      setTechnicianData(TechnicianData);
      setSparePratsTechnicianData(SparePartsData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handelBack = ()=>{
    window.history.back();
   }

   const getAllParts = async () => {
    try {
      const response = await axios.get(`${Base_url}api/parts`);
      setAllSparePartsData(response.data);
      console.log("Categories all", response.data)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      jobDate: date
    });
  };

  const handleStartTimeChange = (time) => {
    setFormData({
      ...formData,
      startTime: time
    });
  };

  const handleStopTimeChange = (time) => {
    setFormData({
      ...formData,
      stopTime: time
    });
  };
  
  const handelNewClientAdd = ()=>{
    window.open("/client_add", "_blank");
  }
  const handelEditClient = (id)=>{
    window.open(`/client_view/${id}`, "_blank");
  }

  const handelClientRefresh = ()=>{
    fetchClients()
  }
  const openGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  };


  useEffect(()=>{
    fetchClients()
    fetchTeamMember()
    getAllParts()
    
  },[update])
  return (
    <div>
      <Card sx={{minHeight:"100vh"}}>
        <CardContent>
        <div onClick={handelBack} style={{backgroundColor:"#7265bd",width:"35px",height:"35px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"10px",marginBottom:"15px"}}>
                <ArrowBackIosIcon style={{fontSize:"16px",color:"#fff"}}/>
            </div>
          <Box >
          <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Box>
            <Typography style={{fontSize:"30px",fontWeight:600,fontFamily:"sans-serif"}} >
             Create Jobs
            </Typography>
            </Box>
           

            {/* <Box>
              
              <Button variant="contained" style={{marginLeft:"20px",background:"#FF8604"}} startIcon={<AddIcon />} onClick={handelOrderClick} >Add Order</Button>
            </Box> */}
          </Box>
             
          <Grid container spacing={2} sx={{marginTop:"20px"}}>

          <Grid item xs={12} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Job Date"
            value={formData.jobDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start Time"
            value={formData.startTime}
            onChange={handleStartTimeChange}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Stop Time"
            value={formData.stopTime}
            onChange={handleStopTimeChange}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={3}>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Travel Time"
            value={formData.travelTime}
            onChange={handleTravelTimeChange}
            ampm={false}
          views={['minutes']}
          />
        </LocalizationProvider> */}
        <TextField
        label="Travel Time In Min"
        variant="outlined"
        name='travelTime'
        value={formData.travelTime}
        onChange={handleInputChange}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          maxLength: 2,
        }}
      />
      </Grid>

          <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Job Name"
          name="jobName"
          value={formData.jobName}
          onChange={handleInputChange}
        />
      </Grid>
     
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Job Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Assigne Worker</InputLabel>
        <Select
          fullWidth
          label="From"
          name="assignedWorker"
          value={formData.assignedWorker}
          onChange={handleInputChange}
        >
          {TechnicianData.map((el) => (
            <MenuItem key={el._id} value={el._id}>
              {el.name} {el.availability === "available" ? <span style={{fontSize:"12px",color:"green",marginLeft:"20px"}}> ({el.availability.toUpperCase()})</span>:<span style={{fontSize:"12px",color:"crimson",marginLeft:"20px"}}> ({el.availability.toUpperCase()})</span>}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Assigne Spare Part Worker</InputLabel>
        <Select
          fullWidth
          label="From"
          name="assignedSparePartWorker"
          value={formData.assignedSparePartWorker}
          onChange={handleInputChange}
        >
          {SparePartsData.map((el) => (
            <MenuItem key={el._id} value={el._id}>
              {el.name} {el.availability === "available" ? <span style={{fontSize:"12px",color:"green",marginLeft:"20px"}}> ({el.availability.toUpperCase()})</span>:<span style={{fontSize:"12px",color:"crimson",marginLeft:"20px"}}> ({el.availability.toUpperCase()})</span>}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      </Grid>
     
     

      {/* <Grid item xs={12} sm={6}>
      
         <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">Parts Required</InputLabel>
        <Select
        fullWidth
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={PartsData}
          onChange={handlePartsChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {AllSparePartsData.map((el,index) => (
            <MenuItem key={index} value={el.partName}>
              <Checkbox checked={PartsData.indexOf(el.partName) > -1} />
              <ListItemText primary={el.partName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Grid> */}

      <Grid item xs={12} >
        <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}> 
        <Typography>Client Details</Typography>
         
         <Box>
         <Button variant='outlined'  color='success' onClick={handelNewClientAdd}><AddIcon /></Button>
         <Button variant='outlined' style={{marginLeft:"10px"}}  color='error' onClick={handelClientRefresh}><RefreshIcon /></Button>
         </Box> 
         
        </Box>
         
      </Grid>

      <Grid item xs={12} sm={12}>
      <FormControl fullWidth>
        <Autocomplete
        
          options={ClientData}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Client"
              variant="outlined"
            />
          )}
          value={ClientData.find(client => client._id === formData.client) || null}
          onChange={(event, newValue) => {
            handleInputChange({
              target: {
                name: 'client',
                value: newValue ? newValue._id : ''
              }
            });
          }}
        />
      </FormControl>
      </Grid>

      {selectedClient && (
       
          <Card>
            <CardContent>
              <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <Typography variant="h6">Client Details</Typography>

              <Button variant='outlined'  color='success' onClick={()=>handelEditClient(selectedClient._id)}><ModeEditIcon /></Button>
              </Box>
             
              <Grid container spacing={2} sx={{marginTop:"20px"}}>
              <Grid item xs={12} sm={6}>
              <Typography  variant="body1"><strong>Name:</strong> {selectedClient.name}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
              <Typography variant="body2"><strong>Email:</strong> {selectedClient.email}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
              <Typography variant="body2"><strong>Mobile:</strong> {selectedClient.mobile}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
              <Typography variant="body2"><strong>Address:</strong> {selectedClient.address}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
              <Typography variant="body2"><strong>Alternate Name:</strong> {selectedClient.alter_name}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
              <Typography variant="body2"><strong>Alternate Mobile:</strong> {selectedClient.alter_mobile}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
              <Typography variant="body2"><strong>Alternate Email:</strong> {selectedClient.alter_email}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
              <Typography variant="body2"><strong>City:</strong> {selectedClient.city}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
              <Typography variant="body2"><strong>Pincode:</strong> {selectedClient.pincode}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
              <Typography variant="body2"><strong>Country:</strong> {selectedClient.country}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
              <Typography variant="body2"><strong>Status:</strong> {selectedClient.status}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
              <Typography variant="body2"><strong>Type:</strong> {selectedClient.type}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
              <Typography variant="body2"><strong>Status:</strong> {selectedClient.status}</Typography>
              </Grid>

              
              
              

              {selectedClient.type !== 'Individual' && (
                <>
                <Grid item xs={12} sm={12}>
                <Typography variant="h6">Business Details</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography variant="body2"><strong>Business Name:</strong> {selectedClient.business_Name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography variant="body2"><strong>Business Email:</strong> {selectedClient.business_Email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography variant="body2"><strong>Business Phone:</strong> {selectedClient.business_Phone}</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                <Typography variant="body2"><strong>Business Website:</strong> {selectedClient.business_Website}</Typography>
                </Grid>
             
                
             
                  
                  
                  
                 
                </>
              )}

{
                  selectedClient.lat !== "" && selectedClient.lng !== "" && <Grid item xs={12} sm={12}>
                  <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => openGoogleMaps(selectedClient.lat, selectedClient.lng)}
                >
                Google Maps
                </Button>
               
                  </Grid>
                }
              
              
              </Grid>
              
             
              
            
              {/* Add more fields as necessary */}
            </CardContent>
          </Card>
       
      )}


  
   
      <Grid item xs={12} sx={{textAlign:"right"}}>
        <Button variant="contained" sx={{bgcolor:"orange"}} size='large' onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
     
          </Box>
      
    
        </CardContent>
       </Card>
    
  </div>
  );
};
