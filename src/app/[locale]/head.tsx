import Script from 'next/script';

export default function Head() {
  return (
    <>
      <title>KakiGaming - 게임 가이드 &amp; 계산기</title>
      <meta name="description" content="디아블로4, 토치라이트 등 다양한 게임의 공략과 계산기를 제공합니다." />
      <meta name="google-adsense-account" content="ca-pub-6995816590006068" />
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-VNF9KXKBDY" />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VNF9KXKBDY');
          `,
        }}
      />
      <Script
        id="adsense-main"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6995816590006068"
        crossOrigin="anonymous"
      />
    </>
  );
}
