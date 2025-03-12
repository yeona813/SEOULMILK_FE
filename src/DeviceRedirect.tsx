import { useEffect } from "react";

const DeviceRedirect = () => {
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);

    if (isMobile) {
      
      window.location.href = "https://m.milksajo.store";
    } else {
      
      window.location.href = "https://milksajo.store";
    }
  }, []);

  return null; 
};

export default DeviceRedirect;
