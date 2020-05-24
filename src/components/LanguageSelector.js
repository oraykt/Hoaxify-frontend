import React, { Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { changeHeaderLanguage } from '../api/apiCalls'

// TODO @Create selector from array
// eslint-disable-next-line no-unused-vars
const Countries = [
  {
    flag: 'us',
    language: 'en',
  },
  {
    flag: 'tr',
    language: 'tr',
  },
  {
    flag: 'pl',
    language: 'pl',
  },
]

const LanguageSelector = ({ i18n }) => {
  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language)
    changeHeaderLanguage(language)
  }
  return (
    <Fragment>
      <img
        src='https://www.countryflags.io/us/flat/24.png'
        alt='US Flag'
        onClick={() => onChangeLanguage('us')}
        style={{ cursor: 'pointer' }}
      />
      <img
        src='https://www.countryflags.io/pl/flat/24.png'
        alt='Polish Flag'
        onClick={() => onChangeLanguage('pl')}
        style={{ cursor: 'pointer' }}
      />
      <img
        src='https://www.countryflags.io/tr/flat/24.png'
        alt='Turkish Flag'
        onClick={() => onChangeLanguage('tr')}
        style={{ cursor: 'pointer' }}
      />
    </Fragment>
  )
}

export default withTranslation()(LanguageSelector)
