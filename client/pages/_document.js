import { Html, Head, Main, NextScript } from "next/document";

function MyDocument() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <div id='myportal' /> {/* Our portal is here */}
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;