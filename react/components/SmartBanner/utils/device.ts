export function isSafari(): boolean | null {
  const userAgent = navigator?.userAgent
  console.log(userAgent, 'UserAgent: ')

  const safariRegex = /Safari/i

  if (!userAgent) {
    return null
  }

  return safariRegex.test(userAgent) && !/Chrome/i.test(userAgent)
}

// Function to check if you are in a WebView on Android or iOS
export function isWebView(): any {
  const userAgent = navigator?.userAgent
  
  if (!userAgent) {
    return null
  }

  const androidRegex = /Android/i  
  const androidWebViewRegex = /wv/i

  const iosRegex = /iPhone|iPad|iPod/i;
  const iosWebViewRegex = /AppleWebKit/i;
  const safariRegex = /Safari/i;
  const isIOSWebView = !safariRegex.test(userAgent) || iosWebViewRegex.test(userAgent);

  if (androidRegex.test(userAgent)) {
    return { isWebView: androidWebViewRegex.test(userAgent), platform: 'Android' } as const;
  }

  if (iosRegex.test(userAgent)) {
    return { isWebView: isIOSWebView, platform: 'iOS' } as const;
  }

  return { isWebView: false, platform: 'Unknown' } as const;
}