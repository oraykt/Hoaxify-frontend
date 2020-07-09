import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { register } from 'timeago.js'
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
        Edit: 'Edit',
        Save: 'Save',
        Cancel: 'Cancel',
        'Change Display Name': 'Change Display Name',
        'My Profile': 'My Profile',
        'There are no hoaxes': 'There are no hoaxes',
        'Load old Hoaxes': 'Load old Hoaxes',
        'There are new Hoaxes': 'There are new Hoaxes',
        'Delete Hoax': 'Delete Hoax',
        'Are you sure to delete hoax?': 'Are you sure to delete hoax?',
        'Delete Account' : 'Delete Account',
        'Are you sure to delete your account?' : 'Are you sure to delete your account?'
      }
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
        Edit: 'Düzenle',
        Save: 'Kaydet',
        Cancel: 'İptal',
        'Change Display Name': 'Görünen Adı Değiştir',
        'My Profile': 'Hesabım',
        'There are no hoaxes': 'Hoax bulunamadı',
        'Load old Hoaxes': 'Eskileri getir',
        'There are new Hoaxes': 'Yeni hoaxlar var',
        'Delete Hoax': 'Hoax\'u sil',
        'Are you sure to delete hoax?': 'Silmek istediğinize emin misiniz?',
        'Delete Account': 'Hesabi sil',
        'Are you sure to delete your account?' : 'Hesabınızı silmek istediğinizden emin misiniz?'
      }
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
        Edit: 'Edytować',
        Save: 'Zapisz',
        Cancel: 'Anuluj',
        'Change Display Name': 'Zmień wyświetlaną nazwę',
        'My Profile': 'Mój Profil',
        'There are no hoaxes': 'Hoax nie znaleziono',
        'Load old Hoaxes': 'Przynieś stare ',
        'There are new Hoaxes': 'Załaduj nowe',
        'Delete Hoax': 'Usuń przedmiot',
        'Are you sure to delete hoax?': 'czy jesteś pewny że chcesz usunąć?',
        'Delete Account': 'Usuń konto',
        'Are you sure to delete your account?': 'Czy na pewno chcesz usunąć swoje konto?'
      }
    }
  },
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ','
  },
  react: {
    wait: true
  }
})

const timeAgoTr = (number, index) => {
  return [
    ['az önce', 'şimdi'],
    ['%s saniye önce', '%s saniye içinde'],
    ['1 dakika önce', '1 dakika içinde'],
    ['%s dakika önce', '%s dakika içinde'],
    ['1 saat önce', '1 saat içinde'],
    ['%s saat önce', '%s saat içinde'],
    ['1 gün önce', '1 gün içinde'],
    ['%s gün önce', '%s gün içinde'],
    ['1 hafta önce', '1 hafta içinde'],
    ['%s hafta önce', '%s hafta içinde'],
    ['1 ay önce', '1 ay içinde'],
    ['%s ay önce', '%s ay içinde'],
    ['1 yıl önce', '1 yıl içinde'],
    ['%s yıl önce', '%s yıl içinde']
  ][index]
}

register('tr', timeAgoTr)

const pl = [
  ['w tej chwili', 'za chwilę'],
  ['%s sekund temu', 'za %s sekund'],
  ['1 minutę temu', 'za 1 minutę'],
  ['%s minut temu', 'za %s minut'],
  ['1 godzinę temu', 'za 1 godzinę'],
  ['%s godzin temu', 'za %s godzin'],
  ['1 dzień temu', 'za 1 dzień'], // ['wczoraj', 'jutro'],
  ['%s dni temu', 'za %s dni'],
  ['1 tydzień temu', 'za 1 tydzień'],
  ['%s tygodni temu', 'za %s tygodni'],
  ['1 miesiąc temu', 'za 1 miesiąc'],
  ['%s miesięcy temu', 'za %s miesięcy'],
  ['1 rok temu', 'za 1 rok'],
  ['%s lat temu', 'za %s lat'],
  ['%s sekundy temu', 'za %s sekundy'],
  ['%s minuty temu', 'za %s minuty'],
  ['%s godziny temu', 'za %s godziny'],
  ['%s dni temu', 'za %s dni'],
  ['%s tygodnie temu', 'za %s tygodnie'],
  ['%s miesiące temu', 'za %s miesiące'],
  ['%s lata temu', 'za %s lata']
]

const timeAgoPl = (number, index) => {
  // to determine which plural form must be used check the last 2 digits
  // and calculate new index value to get the nominative form (14-20)
  // for all other cases use index value as it is (0-13)
  return pl[
    index & 1
      ? number % 10 > 4 || number % 10 < 2 || ~~(number / 10) % 10 === 1
        ? index
        : ++index / 2 + 13
      : index
  ]
}

register('pl', timeAgoPl)
export default i18n
