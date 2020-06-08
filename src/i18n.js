import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        Login: 'Login',
        Logout: 'Logout',
        'Sign Up': 'Sign Up',
        Username: 'Username',
        'Display Name': 'Display Name',
        Password: 'Password',
        'Password Repeat': 'Password Repeat',
        'Password mismatch': 'Password mismatch',
        Users: 'Users',
        Next: 'Next >',
        Previous: '< Previous',
        Loading: 'Loading',
        'Load Failure': 'Load Failure',
        'User not found': 'User not found',
      },
    },
    tr: {
      translations: {
        Login: 'Giriş yap',
        Logout: 'Çıkış Yap',
        'Sign Up': 'Kayıt Ol',
        Username: 'Kullanıcı Adı',
        'Display Name': 'Görünen İsim',
        Password: 'Şifre',
        'Password Repeat': 'Şifre Tekrarı',
        'Password mismatch': 'Aynı şifreyi giriniz',
        Users: 'Kullanıcılar',
        Next: 'Sonraki >',
        Previous: '< Önceki',
        Loading: 'Yükleniyor',
        'Load Failure': 'Yükleme hatası',
        'User not found': 'Kullanıcı bulunamadı',
      },
    },
    pl: {
      translations: {
        Login: 'Zaloguj sie',
        Logout: 'Wyloguj',
        'Sign Up': 'Zapisz się',
        Username: 'Nazwa Użytkownika',
        'Display Name': 'Wyświetlana nazwa',
        Password: 'Hasło',
        'Password Repeat': 'Powtórz hasło',
        'Password mismatch': 'Hasło różni się',
        Users: 'Użytkownicy',
        Next: 'Dalej >',
        Previous: '< Poprzedni',
        Loading: 'Ładowanie',
        'Load Failure': 'Błąd ładowania',
        'User not found': 'Użytkownik nie znaleziony',
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
