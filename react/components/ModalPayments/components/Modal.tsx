import React from 'react'
import { useCssHandles } from "vtex.css-handles";
import InfoPayments from './InfoPayments';
import './ModalStyles.css'

export default function Modal({closeModal}: any ) {

  const CSS_HANDLES = [
    "modalPaymentsOverlay",
    "modalPaymentsContainer",
    "btnCloseModalPayments",
    "titleModalPayments",
    "infosPayments"


]
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <>
      <div className={handles.modalPaymentsOverlay}>
        <div className={handles.modalPaymentsContainer}>
          <button onClick={closeModal} className={handles.btnCloseModalPayments}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.58 17.561C19.7131 17.6938 19.8187 17.8514 19.8908 18.0251C19.9629 18.1987 20 18.3849 20 18.5729C20 18.7609 19.9629 18.9471 19.8908 19.1207C19.8187 19.2943 19.7131 19.452 19.58 19.5847C19.3105 19.8508 18.9471 20 18.5684 20C18.1898 20 17.8264 19.8508 17.5569 19.5847L10 12.0256L2.44313 19.5847C2.17364 19.8508 1.81023 20 1.43158 20C1.05293 20 0.689514 19.8508 0.420027 19.5847C0.286893 19.452 0.181258 19.2943 0.109181 19.1207C0.0371029 18.9471 0 18.7609 0 18.5729C0 18.3849 0.0371029 18.1987 0.109181 18.0251C0.181258 17.8514 0.286893 17.6938 0.420027 17.561L7.9769 10.0019L0.420027 2.44282C0.151747 2.17446 0.00102915 1.81049 0.00102915 1.43097C0.00102915 1.24305 0.0380315 1.05698 0.109923 0.883362C0.181815 0.709749 0.287188 0.552 0.420027 0.419122C0.552866 0.286244 0.710568 0.180839 0.88413 0.108926C1.05769 0.0370133 1.24371 0 1.43158 0C1.81098 0 2.17485 0.150763 2.44313 0.419122L10 7.97823L17.5569 0.419122C17.8252 0.150763 18.189 0 18.5684 0C18.9478 0 19.3117 0.150763 19.58 0.419122C19.8483 0.687481 19.999 1.05145 19.999 1.43097C19.999 1.81049 19.8483 2.17446 19.58 2.44282L12.0231 10.0019L19.58 17.561Z" fill="#4F4F4F"/>
            </svg>
          </button>
          <h2 className={handles.titleModalPayments}>Formas de pagamento</h2>
          <div className={handles.infosPayments}>
          <InfoPayments/>
          </div>
        </div>
      </div>
    </>
  )
}
