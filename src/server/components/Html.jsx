
import { appName, inlineName, isDev, outputPath, statsName, vendorName } from '../../../webpack/env'
import React, { PropTypes as PT } from 'react'
import fs from 'fs'

const stats = isDev ? null : JSON.parse(
  fs.readFileSync(`${outputPath}/${statsName}.json`)
)

export const getScript = (name) => {
  if (isDev) return `/${name}.js`
  return `/${stats.assetsByChunkName[name]}`
}

export const getWebpackJsonpInlineScript = () => isDev
  ? false
  : fs.readFileSync(`${outputPath}/${inlineName}.js`)

const Html = ({
  app,
  content,
  initalState,
  inline,
  vendor,
}) => (
  <html
    className='no-js'
    lang='en_US'
    >
    <head>
      <meta charSet='utf-8'/>
      <meta content='IE=edge,chrome=1' httpEquiv='X-UA-Compatible'/>

      <title>Get the ball to the goal!</title>

      <meta content='' name='description'/>
      <meta content='' name='keywords'/>

      {/* Spiders must use meta description */}
      <meta content='noodp, noydir' name='robots'/>

      {/* No Google Translate toolbar */}
      <meta content='notranslate' name='google'/>

      {/* Viewport and mobile */}
      <meta content={`width = device-width,
                     initial-scale = 1,
                     user-scalable = no,
                     maximum-scale = 1,
                     minimum-scale = 1`}
        name='viewport'
        />
      <meta content='true' name='HandheldFriendly'/>
      <meta content='320' name='MobileOptimized'/>

      <link href='/apple-icon-57x57.png' rel='apple-touch-icon' sizes='57x57'/>
      <link href='/apple-icon-60x60.png' rel='apple-touch-icon' sizes='60x60'/>
      <link href='/apple-icon-72x72.png' rel='apple-touch-icon' sizes='72x72'/>
      <link href='/apple-icon-76x76.png' rel='apple-touch-icon' sizes='76x76'/>
      <link href='/apple-icon-114x114.png' rel='apple-touch-icon' sizes='114x114'/>
      <link href='/apple-icon-120x120.png' rel='apple-touch-icon' sizes='120x120'/>
      <link href='/apple-icon-144x144.png' rel='apple-touch-icon' sizes='144x144'/>
      <link href='/apple-icon-152x152.png' rel='apple-touch-icon' sizes='152x152'/>
      <link href='/apple-icon-180x180.png' rel='apple-touch-icon' sizes='180x180'/>
      <link href='/android-icon-192x192.png' rel='icon' sizes='192x192' type='image/png'/>
      <link href='/favicon-32x32.png' rel='icon' sizes='32x32' type='image/png'/>
      <link href='/favicon-96x96.png' rel='icon' sizes='96x96' type='image/png'/>
      <link href='/favicon-16x16.png' rel='icon' sizes='16x16' type='image/png'/>

      <meta content='#ffffff' name='msapplication-TileColor'/>
      <meta content='/ms-icon-144x144.png' name='msapplication-TileImage'/>
      <meta content='#ffffff' name='theme-color'/>
    </head>
    <body style={{
      background: '#fff',
      fontFamily: '\'Gotham\', sans-serif',
      padding: '0',
      margin: '0',
      border: '0',
    }}>
      <div id='app'>
        <div dangerouslySetInnerHTML={{ __html: content }}/>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `window.__INITAL_STATE__ = ${JSON.stringify(initalState)}` }}/>
      {inline && <script dangerouslySetInnerHTML={{ __html: inline }}/>}
      <script src={vendor}/>
      <script src={app}/>
    </body>
  </html>
)

Html.propTypes = {
  app: PT.string.isRequired,
  content: PT.string.isRequired,
  initalState: PT.object.isRequired,
  vendor: PT.string.isRequired,
  inline: isDev ? PT.bool : PT.string.isRequired,
}

Html.defaultProps = {
  app: getScript(appName),
  inline: getWebpackJsonpInlineScript(),
  vendor: getScript(vendorName),
}

export default Html
