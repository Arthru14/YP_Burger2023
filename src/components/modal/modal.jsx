import ReactDOM from "react-dom";

export default function Modal(props) {
  React.useEffect(() => {
    const escFunc = (e) => e.key === "Escape" && props.setModalVisible(false);
    document.addEventListener("keydown", escFunc);

    return () => {
      document.removeEventListener("keydown", escFunc);
    };
  }, [props]);

  const portalContent = (
    <div
      onClick={() => {
        props.setModalVisible(false);
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div>
          <span>{props.header}</span>
          <img
            src={null}
            alt={"Закрыть"}
            onClick={() => props.setModalVisible(false)}
          />
        </div>

        {/*Компонент-содержание*/}
        {props.children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    portalContent,
    document.getElementById("react-modals")
  );
}
