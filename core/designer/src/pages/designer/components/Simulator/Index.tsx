// import "@lowcode/types";
import React, { useRef, useState } from "react";
import { applicationSchema } from "./application";
import Handler from "./Handler";

const Simulator: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <>
      <iframe
        title="renderer"
        className="iframe"
        src="/renderer/vue/simulator.html"
        ref={iframeRef}
        onLoad={() => {
          const iframe = iframeRef.current;
          if (!iframe) return;
          iframe.contentWindow?.__X_RENDERER_API__.updateSchema(applicationSchema);
          setIframeLoaded(true);
        }}
      />
      {iframeLoaded && iframeRef.current && <Handler iframeElement={iframeRef.current} />}
    </>
  );
};

export default Simulator;
