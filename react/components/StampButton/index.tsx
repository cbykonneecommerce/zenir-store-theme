import React from 'react'
import { Helmet } from 'react-helmet'

const CustomHelmet = Helmet as any

const StampReclameAqui: any = () => {
  return (
    <>
      <div id="reputation-ra" className="flex justify-center">
        <CustomHelmet>
          <script
            type="text/javascript"
            id="ra-embed-reputation"
            src="https://s3.amazonaws.com/raichu-beta/selos/bundle.js"
            data-id="Nzg3NzE6emVuaXItbW92ZWlzLWUtZWxldHJv"
            data-target="reputation-ra"
            data-model="2"
          />
        </CustomHelmet>
      </div>
    </>
  )
}

export default StampReclameAqui
