import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@300;400;600;700&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
            rel="stylesheet"
          />

          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt-BR" />
          <meta
            property="og:url"
            content="https://casadecarnesrotadoboi.com.br/"
          />
          <meta property="og:site_name" content="Rota do Boi" />
          <meta
            property="og:title"
            content="Rota do Boi | Os melhores cortes
            premium para o seu churrasco"
          />
          <meta
            property="og:description"
            content="A casa de carnes com as melhores carnes para o seu churras!"
          />
          <meta
            property="title"
            content="Rota do Boi | Os melhores cortes
            premium para o seu churrasco"
          />
          <meta
            name="description"
            content="A casa de carnes com as melhores carnes para o seu churras!"
          />
          <meta
            property="og:image"
            content="https://rota-do-boi.vercel.app/images/og.jpg"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta httpEquiv="cache-control" content="no-cache" />
          <meta httpEquiv="expires" content="0" />
          <meta httpEquiv="pragma" content="no-cache" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
