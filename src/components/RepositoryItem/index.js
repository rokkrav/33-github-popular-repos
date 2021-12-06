import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, name, forksCount, issuesCount, starsCount} = repoDetails
  return (
    <li className="repository-item">
      <img src={avatarUrl} alt={name} className="repo-img" />
      <h1 className="repo-name">{name}</h1>

      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="count-img"
        />
        <p className="count-text">{starsCount} stars</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="count-img"
        />
        <p className="count-text">{forksCount} stars</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="count-img"
        />
        <p className="count-text">{issuesCount} stars</p>
      </div>
    </li>
  )
}

export default RepositoryItem
