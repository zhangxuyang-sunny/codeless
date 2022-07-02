const Simulator: React.FC = () => {
  return (
    <iframe
      title="renderer"
      className="iframe"
      src="/renderer/vue"
      ref={ref => {
        if (!ref) return;
        ref.onload = () => {
          const rendererApi = (ref?.contentWindow as any)?.__X_RENDERER_API__;

          // rendererApi.updateProjectSchema(project);
          // rendererApi.updatePageSchemaList([page1]);
          // let f = false;
          // setInterval(() => {
          //   rendererApi.updatePageSchemaList(f ? [page1] : [page2]);
          //   f = !f;
          // }, 1000);
        };
      }}
    />
  );
};

export default Simulator;
