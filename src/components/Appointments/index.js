import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: [], isClicked: false}
  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }
  onChangeDate = event => {
    this.setState({date: event.target.value})
  }
  onAddApp = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppoint = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppoint],
      title: '',
      date: '',
    }))
  }
  changeIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }
  onStarredApp = () => {
    this.setState(prevState => ({
      isClicked: !prevState.isClicked,
    }))
  }

  render() {
    const {title, date, appointmentList, isClicked} = this.state
    const backgroundColor = isClicked ? 'btnColor' : ''
    const filteredLists = isClicked
      ? appointmentList.filter(eachApp => {
          if (eachApp.isStarred === true) {
            return {...eachApp}
          }
        })
      : appointmentList
    return (
      <div className="container">
        <div className="container2">
          <div className="topOfCont2">
            <div>
              <h1>Add Appointment </h1>
              <form className="formCont" onSubmit={this.onAddApp}>
                <label>
                  Title
                  <input
                    type="text"
                    defaultValue="Title"
                    className="inpt1"
                    onChange={this.onChangeTitle}
                  />
                </label>
                <label>
                  Date
                  <input
                    type="date"
                    className="inpt1"
                    onChange={this.onChangeDate}
                  />
                </label>
                <button className="addBtn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appImg"
              />
            </div>
          </div>
          <hr />
          <div>
            <div className="btmContTop">
              <h1>Appointments</h1>
              <button
                className={`starBtn ${backgroundColor}`}
                onClick={this.onStarredApp}
              >
                Starred
              </button>
            </div>
            <ul className="appointList">
              {filteredLists.map(eachApp => (
                <AppointmentItem
                  eachApp={eachApp}
                  key={eachApp.id}
                  changeIsStarred={this.changeIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
