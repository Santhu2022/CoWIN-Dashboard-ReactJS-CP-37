import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    last7DaysData: [],
    vaccinationByAgeData: [],
    vaccinationByGenderData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchVaccinationData()
  }

  fetchVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)

    if (response.ok === true) {
      const data = await response.json()
      const last7DaysData = data.last_7_days_vaccination.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))

      const vaccinationByAgeData = data.vaccination_by_age
      const vaccinationByGenderData = data.vaccination_by_gender

      this.setState({
        last7DaysData,
        vaccinationByAgeData,
        vaccinationByGenderData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-description">Something went wrong</h1>
    </div>
  )

  renderData = () => {
    const {
      apiStatus,
      last7DaysData,
      vaccinationByGenderData,
      vaccinationByAgeData,
    } = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <>
            <VaccinationCoverage last7DaysData={last7DaysData} />
            <VaccinationByGender
              vaccinationByGenderData={vaccinationByGenderData}
            />
            <VaccinationByAge vaccinationByAgeData={vaccinationByAgeData} />
          </>
        )
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="app-header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="app-logo"
            />
            <h1 className="app--logo-name">Co-WIN</h1>
          </div>
          <h1 className="app-heading">CoWIN Vaccination in India</h1>
          {this.renderData()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
