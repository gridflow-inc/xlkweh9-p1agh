document.addEventListener('DOMContentLoaded', function () {
    const typeformContainer = document.getElementById('typeform-container');
    const options = {
      rootMargin: '0px',
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          loadTypeform();
        }
      });
    }, options);
  
    observer.observe(typeformContainer);
  
    function loadTypeform() {
      const iframe = document.createElement('iframe');
      iframe.id = 'typeform-full';
      iframe.width = '100%';
      iframe.height = '1000px';
      iframe.frameBorder = '0';
      iframe.allow = 'camera; microphone; autoplay; encrypted-media;';
      iframe.src = 'https://akhemka.typeform.com/to/sXTdFZVc';
  
      typeformContainer.appendChild(iframe);
  
      const script = document.createElement('script');
      script.src = 'https://embed.typeform.com/embed.js';
      typeformContainer.appendChild(script);
    }
  });
  