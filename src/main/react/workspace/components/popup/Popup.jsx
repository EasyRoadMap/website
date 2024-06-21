import PopupBase from "./PopupBase.jsx";

const Popup = ({ ...props }) => {
  const close = (params) => {
    props.onClose(params);
  };

  const { isOpen } = props;

  return (
    <PopupBase
      isOpen={isOpen}
      close={() => close(null)}
      type={props?.popup?.props?.type}
    >
      {props.popup.component({ ...props.popup.props, close: close })}
    </PopupBase>
  );
};

export default Popup;
