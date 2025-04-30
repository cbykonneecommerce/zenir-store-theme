import React from 'react'
import { Helmet } from 'react-helmet'
import './Head.css'

const CustomHelmet = Helmet as any

export default function Head() {
  return (
    <>
      <CustomHelmet>
        <meta
          name="facebook-domain-verification"
          content="fvhp776wdnmtc1327ll4l7zga5fgb4"
        />
        <meta
          name="google-site-verification"
          content="8PAkBhJPh0D4vLatzLDni0gCCLLNJYO_7VKyTmxlikM"
        />
        <meta
          name="robots"
          content="index, follow"
          data-react-CustomHelmet="true"
        />
        <script
          type="text/javascript"
          async
          src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/5ed8881b-a78d-45d2-b318-9bf13e2cfc4a-loader.js"
        />

        <script
          type="text/javascript"
          async
          src="//tm.jsuol.com.br/uoltm.js?id=76wmsp"
        />

        <script src="https://cdn.lightwidget.com/widgets/lightwidget.js" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </CustomHelmet>
    </>
  )
}
