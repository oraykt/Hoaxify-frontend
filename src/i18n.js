import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        Login: 'Login',
        'Sign Up': 'Sign Up',
        Username: 'Username',
        'Display Name': 'Display Name',
        Password: 'Password',
        'Password Repeat': 'Password Repeat',
        'Password mismatch': 'Password mismatch',
      },
    },
    tr: {
      translations: {
        Login: 'Giriş yap',
        'Sign Up': 'Kayıt Ol',
        Username: 'Kullanıcı Adı',
        'Display Name': 'Görünen İsim',
        Password: 'Şifre',
        'Password Repeat': 'Şifre Tekrarı',
        'Password mismatch': 'Aynı şifreyi giriniz',
      },
    },
    pl: {
      translations: {
        Login: 'Zaloguj sie',
        'Sign Up': 'Zapisz się',
        Username: 'Nazwa Użytkownika',
        'Display Name': 'Wyświetlana nazwa',
        Password: 'Hasło',
        'Password Repeat': 'Powtórz hasło',
        'Password mismatch': 'Hasło różni się',
      },
    },
  },
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    wait: true,
  },
})

export default i18n
