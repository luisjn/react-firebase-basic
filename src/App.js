import React, { Component } from 'react'
import firebase from 'firebase'
import config from './config'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    firebase.initializeApp(config)

    this.state = {
      developers: []
    }
  }

  componentDidMount() {
    this.getUserData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData()
    }
  }

  writeUserData = () => {
    firebase.database()
      .ref("/")
      .set(this.state)
  }

  getUserData = () => {
    let ref = firebase.database().ref('/')

    ref.on('value', snapshot => {
      const state = snapshot.val()
      this.setState(state)
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let name = this.name.value
    let role = this.role.value
    let uid = this.refs.uid.value

    if (uid && name && role) {
      const { developers } = this.state
      const devIndex = developers.findIndex(data => {
        return data.uid === uid
      })

      developers[devIndex].name = name
      developers[devIndex].role = role

      this.setState({ developers })
    } else if (name && role) {
      const uid = new Date().getTime().toString()
      const { developers } = this.state
      developers.push({ uid, name, role })
      this.setState({ developers })
    }

    this.name.value = ''
    this.role.value = ''
    this.refs.uid.value = ''
  }

  removeData = developer => {
    const { developers } = this.state
    const newState = developers.filter(data => {
      return data.uid !== developer.uid
    })
    this.setState({ developers: newState })
  }

  render() {
    const { developers } = this.state
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
              {developers.map((developer) => (
                <Grid item key={developer.uid}>
                  <Card className='card'>
                    <CardContent>
                      <Typography variant='h5'>
                        {developer.name}
                      </Typography>
                      <Typography variant='subtitle1' color="textSecondary">
                        {developer.role}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => this.removeData(developer)}>Delete</Button>
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
          <form onSubmit={this.handleSubmit} autoComplete='off'>
            <input type="hidden" ref="uid" />
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Name"
                margin="normal"
                inputRef={el => this.name = el}
                ref='name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="role"
                label="Role"
                margin="normal"
                inputRef={el => this.role = el}
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
