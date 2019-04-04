import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <Typography variant='h2' gutterBottom>Firebase Development Team</Typography>
        <Grid container className='demo'>
          <Grid item xs={12}>
            <Grid
              container
              spacing={16}
              direction='row'
              justify='center'
              alignItems='center'
            >
              {([0, 1, 2, 3, 4]).map(value => (
                <Grid item key={value}>
                  <Card className='card'>
                    <CardContent>
                      <Typography variant='h5'>
                        Luis Jaramillo
                      </Typography>
                      <Typography variant='subtitle1' color="textSecondary">
                        Full Stack
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button>Delete</Button>
                      <Button>Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Typography variant='h2' gutterBottom>Add new team member here</Typography>
        <Grid item xs={12}>
          <form onSubmit={this.handleSubmit}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Name"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="role"
                label="Role"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type='submit'>Save</Button>
            </Grid>
          </form>
        </Grid>
      </div>
    )
  }
}

export default App
