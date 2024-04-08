import {format} from 'date-fns'
import './index.css'
const AppointmentItem = props => {
  const {eachApp, changeIsStarred} = props
  const {id, title, date, isStarred} = eachApp
  const changeImage = () => {
    changeIsStarred(id)
  }
  const image = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="listPa">
      <div className="listStyle">
        <div className="fontTxt">
          <p>{title}</p>
          <p>Date: format(new Date ({date}), 'dd MMMM yyyy, EEEE')</p>
        </div>
        <button onClick={changeImage} className="btnImgae" data-testid="star">
          <img src={image} className="starImg" alt="star" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
