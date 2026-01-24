import Script from 'next/script'

/**
 * Advanced Analytics & Conversion Tracking
 * Implements multiple tracking systems for lead generation optimization
 */
export function AdvancedAnalytics() {
  return (
    <>
      {/* Google Analytics 4 - Essential for tracking */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-G764C3CGSP"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-G764C3CGSP', {
            page_path: window.location.pathname,
          });
          
          // Track custom events for lead generation
          window.trackLead = function(type, value) {
            gtag('event', 'generate_lead', {
              lead_type: type,
              value: value || 0
            });
          };
          
          // Track button clicks
          window.trackButtonClick = function(buttonName) {
            gtag('event', 'button_click', {
              button_name: buttonName
            });
          };
        `}
      </Script>

      {/* Facebook Pixel - For retargeting ads */}
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
          fbq('init', 'YOUR_PIXEL_ID');
          fbq('track', 'PageView');
          
          // Track lead events
          window.trackFBLead = function() {
            fbq('track', 'Lead');
          };
        `}
      </Script>

      {/* LinkedIn Insight Tag - B2B tracking */}
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "YOUR_PARTNER_ID";
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

      {/* Hotjar - Heatmaps and session recording */}
      <Script id="hotjar" strategy="afterInteractive">
        {`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>

      {/* Microsoft Clarity - Free heatmaps */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
        `}
      </Script>

      {/* Conversion tracking helper */}
      <Script id="conversion-helpers" strategy="afterInteractive">
        {`
          // Track form submissions
          window.trackFormSubmission = function(formType) {
            if (typeof gtag !== 'undefined') {
              gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                'value': 1.0,
                'currency': 'USD',
                'event_category': 'Form',
                'event_label': formType
              });
            }
            if (typeof fbq !== 'undefined') {
              fbq('track', 'Lead');
            }
            if (typeof lintrk !== 'undefined') {
              lintrk('track', { conversion_id: YOUR_CONVERSION_ID });
            }
          };

          // Track scroll depth
          let scrollDepths = [25, 50, 75, 100];
          let scrollTracked = [];
          window.addEventListener('scroll', function() {
            let scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollDepths.forEach(function(depth) {
              if (scrollPercent >= depth && !scrollTracked.includes(depth)) {
                scrollTracked.push(depth);
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'scroll_depth', {
                    'percent': depth
                  });
                }
              }
            });
          });

          // Track time on page
          let startTime = Date.now();
          window.addEventListener('beforeunload', function() {
            let timeSpent = Math.round((Date.now() - startTime) / 1000);
            if (typeof gtag !== 'undefined' && timeSpent > 10) {
              gtag('event', 'time_on_page', {
                'value': timeSpent,
                'event_category': 'Engagement'
              });
            }
          });
        `}
      </Script>
    </>
  )
}

export default AdvancedAnalytics
