interface SetCookieParams {
  name: string
  value: string
  expires?: {
    days?: number
    hours?: number
    minutes?: number
    seconds?: number
  }
}

export const getCookie = (name: string): string => {
  const cookie =
    window?.document?.cookie.split(';').find((splitedCookie: string) => {
      return splitedCookie.trim().startsWith(`${name}=`)
    }) ?? ''

  return cookie.trim().replace(`${name}=`, '')
}

export const setCookie = ({ name, value, expires }: SetCookieParams) => {
  if (!window?.document) {
    return
  }

  const expirationDate = new Date()

  if (expires?.days) {
    expirationDate.setDate(expirationDate.getDate() + expires.days)
  }

  if (expires?.hours) {
    expirationDate.setHours(expirationDate.getHours() + expires.hours)
  }

  if (expires?.minutes) {
    expirationDate.setMinutes(expirationDate.getMinutes() + expires.minutes)
  }

  if (expires?.seconds) {
    expirationDate.setSeconds(expirationDate.getSeconds() + expires.seconds)
  }

  document.cookie =
    `${name}=${value};domain=${window.location.hostname};path=/` +
    `;expires=${expirationDate.toUTCString()}`
}

export const deleteCookie = (name: string) => {
  if (!getCookie(name)) {
    return
  }

  setCookie({ name, value: '', expires: { seconds: 1 } })
}