import Script from 'next/script'

/**
 * Advanced Analytics & Conversion Tracking
 * Implements multiple tracking systems for lead generation optimization
 */
export default function AdvancedAnalytics() {
  const GA_ID = "G-G764C3CGSP";
  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const LI_PARTNER_ID = process.env.NEXT_PUBLIC_LI_PARTNER_ID;
  const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID;
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
          
          window.trackLead = function(type, value) {
            gtag('event', 'generate_lead', { lead_type: type, value: value || 0 });
          };
          
          window.trackButtonClick = function(buttonName) {
            gtag('event', 'button_click', { button_name: buttonName });
          };
        `}
      </Script>

      {/* Facebook Pixel */}
      {FB_PIXEL_ID && FB_PIXEL_ID !== 'YOUR_PIXEL_ID' && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* LinkedIn Insight Tag */}
      {LI_PARTNER_ID && LI_PARTNER_ID !== 'YOUR_PARTNER_ID' && (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${LI_PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
        </Script>
      )}

      {/* Hotjar */}
      {HOTJAR_ID && HOTJAR_ID !== 'YOUR_HOTJAR_ID' && (
        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      )}

      {/* Microsoft Clarity */}
      {CLARITY_ID && CLARITY_ID !== 'YOUR_CLARITY_ID' && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}

      {/* Conversion tracking helper */}
      <Script id="conversion-helpers" strategy="afterInteractive">
        {`
          window.trackFormSubmission = function(formType) {
            if (typeof gtag !== 'undefined') {
              gtag('event', 'conversion', {
                'event_category': 'Form',
                'event_label': formType
              });
            }
            if (typeof fbq !== 'undefined') fbq('track', 'Lead');
            if (typeof lintrk !== 'undefined') lintrk('track', { conversion_id: formType });
          };

          let scrollDepths = [25, 50, 75, 100];
          let scrollTracked = [];
          window.addEventListener('scroll', function() {
            let scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollDepths.forEach(function(depth) {
              if (scrollPercent >= depth && !scrollTracked.includes(depth)) {
                scrollTracked.push(depth);
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'scroll_depth', { 'percent': depth });
                }
              }
            });
          });
        `}
      </Script>
    </>
  )
}
