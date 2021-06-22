import { createPortal } from "react-dom"
import classes from "./Modal.module.css"

const Backdrop = (props) => {
  const { onClick } = props
  return <div className={classes.backdrop} onClick={onClick} />
}
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById("overlays")

const Modal = (props) => {
  const { onModalClose } = props
  console.log(onModalClose)
  return (
    <>
      {createPortal(<Backdrop onClick={onModalClose} />, portalElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  )
}

export default Modal
