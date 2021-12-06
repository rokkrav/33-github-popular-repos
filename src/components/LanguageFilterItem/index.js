import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, languageChange} = props
  const {language, id} = languageDetails
  const languageClassName = isActive
    ? 'language-button active'
    : 'language-button'

  const onClickLanguage = () => {
    languageChange(id)
  }

  return (
    <li>
      <button
        type="button"
        className={languageClassName}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
