import {Head, Html, Main, NextScript} from "next/document"

export default function Document() {
  return (
    <Html lang="en" className="bg-slate-100">
      <Head>
        <link rel="stylesheet" href="/fonts/inter.css"/>
      </Head>
      <body>
        <Main/>
        <NextScript />
      </body>
    </Html>
  )
}
