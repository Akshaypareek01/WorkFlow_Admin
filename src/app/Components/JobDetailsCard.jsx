import React from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { Base_url } from '../Config/BaseUrl';

const JobDetailsCard = ({ job }) => {
  const {
    jobName,
    description,
    status,
    assignedSparePartWorker,
    assignedWorker,
    client,
    jobDate,
    startTime,
    stopTime,
    travelTime,
    updatedDetails,
    images
  } = job;

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Job : {jobName}
        </Typography>
        
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {description && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">Description: {description}</Typography>
            </Grid>
          )}
          {status && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">Status: {status}</Typography>
            </Grid>
          )}
          {assignedSparePartWorker && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                Assigned Spare Part Worker: {assignedSparePartWorker.name}
              </Typography>
            </Grid>
          )}
          {assignedWorker && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                Assigned Worker: {assignedWorker.name}
              </Typography>
            </Grid>
          )}
          {client && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">Client: {client.business_Name}</Typography>
            </Grid>
          )}
          {jobDate && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">Job Date: {new Date(jobDate).toLocaleString()}</Typography>
            </Grid>
          )}
          {startTime && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">Start Time: {new Date(startTime).toLocaleString()}</Typography>
            </Grid>
          )}
          {stopTime && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">Stop Time: {new Date(stopTime).toLocaleString()}</Typography>
            </Grid>
          )}
          {travelTime && (
            <Grid item xs={12} sm={6} >
              <Typography variant="body1">Travel Time: {travelTime} minutes</Typography>
            </Grid>
          )}
          {updatedDetails && (
            <Grid item xs={12} sm={6} >
              <Typography variant="body1">Updated Details: {updatedDetails}</Typography>
            </Grid>
          )}
          {images && images.length > 0 && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">Images:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {images.map((image, index) => (
                  <img key={index} src={Base_url+"api/" + image.path} alt={`job_image_${index}`} style={{ width: '100px', height: '100px' }} />
                ))}
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default JobDetailsCard;
