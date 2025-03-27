import type { SmartBannerProps } from '../typings'

export const SMART_BANNER_DEFAULT_PROPS: SmartBannerProps = {
  iOSAppID: '6471994896',
  iOSAppUrl: 'https://apps.apple.com/br/app/zenir-m%C3%B3veis/id6471994896?itsct=apps_box_link&itscg=30200',
  androidAppUrl:
    'https://play.google.com/store/apps/details?id=br.com.neomode.zenir&pcampaignid=web_share',
  imageUrl:
    'https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/6874da4e-3cb9-482a-ab91-9e05aef11da7___9373bbf209cf20157c8bfc87a6af8d60.svg?width=309&height=204&aspect=true',
  title: 'Lançamento App Zenir',
  subtitle: 'O melhor do Ceará na palma da sua mão!',
  callToActionButtonText: 'Baixar',
}

export const schemaSmartBanner = {
  title: 'Smart Banner',
  type: 'object',
  default: SMART_BANNER_DEFAULT_PROPS,
  properties: {
    iOSAppID: {
      title: 'ID do App na App Store (iOS)',
      type: 'string',
    },
    iOSAppUrl: {
      title: 'URL do App na App Store (iOS)',
      type: 'string',
    },
    androidAppUrl: {
      title: 'URL do App no Google Play (android)',
      type: 'string',
    },
    imageUrl: {
      title: 'ID do APP na APP Store',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    title: {
      title: 'Título do Smart Banner',
      type: 'string',
    },
    subtitle: {
      title: 'Subtítulo do Smart Banner',
      type: 'string',
    },
    callToActionButtonText: {
      title: 'Texto do botão Call To Action',
      type: 'string',
    },
  },
}
