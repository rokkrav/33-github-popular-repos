import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    reposList: [],
    status: statusConstants.initial,
  }

  componentDidMount() {
    this.getGithubRepos()
  }

  getGithubRepos = async () => {
    this.setState({status: statusConstants.inProgress})
    const {activeLanguageId} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(githubReposApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.popular_repos.map(each => ({
        id: each.id,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      this.setState({reposList: formattedData, status: statusConstants.success})
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderReposList = () => {
    const {reposList} = this.state
    return (
      <ul className="repos-list">
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderGithubPopularRepos = () => {
    const {status} = this.state
    switch (status) {
      case statusConstants.inProgress:
        return this.renderLoader()
      case statusConstants.success:
        return this.renderReposList()
      case statusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  languageChange = languageId => {
    this.setState({activeLanguageId: languageId}, this.getGithubRepos)
  }

  renderLanguagesFilterList = () => {
    const {activeLanguageId} = this.state
    return (
      <ul className="language-filter-list">
        {languageFiltersData.map(language => (
          <LanguageFilterItem
            key={language.id}
            languageDetails={language}
            isActive={language.id === activeLanguageId}
            languageChange={this.languageChange}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="main-heading">Popular</h1>
          {this.renderLanguagesFilterList()}
          {this.renderGithubPopularRepos()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
