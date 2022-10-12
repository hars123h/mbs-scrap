import * as React from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../../styling/InvoicePdf.css"
const MainWrapper = {
  width: "38vw",
  height: "70vh",
  position: "relative",
  border: "1px solid grey"
};
const AInvoicePrint = (props) => {
  const transformComponentRef = React.useRef(null);
  const [scale, setScale] = React.useState(0.7);

  const updateScale = (e) => {
    const targetScale = parseFloat(e.target.value);
    const factor = Math.log(targetScale / scale);
    const { zoomIn, zoomOut } = transformComponentRef.current;

    /*
      how react-zoom-pan-pinch calculate new scale :
      targetScale = scale * Math.exp(1 * factor);

      we need factor(step) for zoomIn and zoomOut, just reverse the previous equation to get factor
      factor = Math.log(targetScale / currentScale);
    */
    // console.log(scale * Math.exp(1 * factor), newScale);

    // const targetScale = scale * Math.exp(1 * factor);

    if (targetScale > scale) {
      zoomIn(factor, 0);
    } else {
      zoomOut(-factor, 0);
    }

    setScale(targetScale);
  };

  const componentRef = React.useRef(null);
  const onBeforeGetContentResolve = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const handleOnBeforeGetContent = React.useCallback(() => {
    setLoading(true);

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);

        resolve();
      }, 2000);
    });
  }, [setLoading]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
    onBeforeGetContent: handleOnBeforeGetContent,
    removeAfterPrint: true
  });


  return (
    <div className="invPrint">
      {
        props.propsData &&
        <div style={MainWrapper}>
          <TransformWrapper
            ref={transformComponentRef}
            onZoomStop={(e) => {
              setScale(e.state.scale);
            }}
            initialScale={scale}
            minScale={0.1}
            maxScale={1.5}
            doubleClick={{
              disabled: true
            }}
            // wheel={{
            //   activationKeys: ["z"]
            // }}
            // panning={{
            //   activationKeys: ["x"],
            // }}
            limitToBounds={false}
            zoomAnimation={{ disabled: true }}
            centerOnInit
            onZoom={(e) => {
              setScale(e.state.scale);
            }}
          >
            {({ zoomIn, zoomOut, setTransform, ...rest }) => {
              return (
                <TransformComponent
                  wrapperStyle={{
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <ComponentToPrint ref={componentRef} data={props.propsData} />
                </TransformComponent>
              );
            }}
          </TransformWrapper>
        </div>
      }

      {
        props.propsData && <button className="PdfButton" onClick={handlePrint}>
          {loading ? "Loading.." : "Print"}
        </button>
      }
    </div>
  );
};
export default AInvoicePrint