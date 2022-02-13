import React from 'react'
import App from 'next/app'
import {createGlobalStyle, keyframes} from 'styled-components'
import colors from '../colors'

const fadeIn = keyframes`
  from: {opacity: 0;}
  to:   {opacity: 1;}
`

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Untitled Sans';
    src: url('/static/fonts/untitled-sans-test-medium.woff');
    font-weight: 500;
    font-display: auto;
    font-style: normal;
  }
  @font-face {
    font-family: 'Untitled Sans';
    src: url('/static/fonts/untitled-sans-test-regular.woff');
    font-weight: normal;
    font-display: auto;
    font-style: normal;
  }
  
  html, body {
    background-color: ${colors.bg}; 
    font-family: 'Untitled Sans', 'Helvetica', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
  
  canvas {
    animation: ${fadeIn} 5s;
    margin: 10px auto;
  }
`

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <GlobalStyle/>
        <Component {...pageProps} />
      </>
      )
  }
}

export default MyApp