import React from 'react'
import Modal from './components/Modal'
import { useCssHandles } from "vtex.css-handles";
import './components/ModalStyles.css'


const modalPayments = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false)

  const CSS_HANDLES = [
    "openModalPayments"
  ]
  const { handles } = useCssHandles(CSS_HANDLES);
  return (
    <>
    <button className={handles.openModalPayments} onClick={()=> setModalIsOpen(true)}>mais opções de pagamento</button>

    {modalIsOpen && <Modal closeModal={()=> setModalIsOpen(false)}/>}
    </>
  )
}

export default modalPayments