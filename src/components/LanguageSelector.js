import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { changeHeaderLanguage } from '../api/apiCalls'

// TODO @Create selector from array
// const Countries = [
//   {
//     flag: 'us',
//     language: 'en',
//   },
//   {
//     flag: 'tr',
//     language: 'tr',
//   },
//   {
//     flag: 'pl',
//     language: 'pl',
//   },
// ]

const LanguageSelector = (props) => {
  const { i18n } = useTranslation()

  const onChangeLanguage = (langCode) => {
    i18n.changeLanguage(langCode)
    changeHeaderLanguage(langCode)
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

export default LanguageSelector
