import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Helmet, canUseDOM } from 'vtex.render-runtime'
import { isSafari, isWebView } from '../SmartBanner/utils/device'

import { SMART_BANNER_DEFAULT_PROPS, schemaSmartBanner } from '../SmartBanner/schema'
import type { SmartBannerProps } from '../SmartBanner/typings'
import { Image } from 'vtex.store-image'

import './ButtonToLinkApp.css'

const CSS_HANDLES = [
  'buttonToAppLinkContainer',
  'buttonToAppLink'
] as const

const ButtonToLinkApp: StorefrontFunctionComponent<SmartBannerProps> = ({
  iOSAppID,
  iOSAppUrl,
  androidAppUrl,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const handleCallToActionButtonClick = () => {
    const url = isSafari() ? iOSAppUrl : androidAppUrl

    window?.open(url, '_blank')
  }

  if (!canUseDOM) {
    return null
  }

  const { isWebView: platform } = isWebView();

  if (platform === 'IOS') {
    return (
      <Helmet>
        <meta name="apple-itunes-app" content={`app-id=${iOSAppID}`} />
      </Helmet>
    )
  }

  return (
    <section className={handles.buttonToAppLinkContainer}>
      <button
        className={handles.buttonToAppLink}
        onClick={handleCallToActionButtonClick}
      >
        BAIXAR O APP!
        <Image 
          src={'https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/74e9e8c2-dca2-4dc5-9cbf-f8c463ac4a1f___906c2161206215869179a44ff54fec80.svg'} 
          alt="Icone de voltar do botão" 
        />
      </button>
    </section>
  )
}

ButtonToLinkApp.defaultProps = SMART_BANNER_DEFAULT_PROPS
ButtonToLinkApp.schema = schemaSmartBanner

export default ButtonToLinkApp
