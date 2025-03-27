import React from 'react'
import { useCssHandles } from "vtex.css-handles";
import './InfoPaymentsStyles.css'
import CreditCard from './CreditCard';
import Pix from './Pix';
// import CaixaTem from './CaixaTem';

const InfoPayments = () => {
  const [tabIndex, setTabIndex] =  React.useState(0)
 
  const CSS_HANDLES = [
    "modalPaymentsTabs", 
    "modalPaymentsTabsList",
    "modalPaymentsTabHead",
    "imgModalPayments",
    "labelModalPayments",
    "containetModalPaymentsTabs",
    "tabActiveCard",
    "tabActivePix",
    "tabActiveCaixa"
  ]
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <div className={handles.containetModalPaymentsTabs}>
    <div className={handles.modalPaymentsTabs}>

        <div className={handles.modalPaymentsTabsList}>
            <div className={handles.modalPaymentsTabHead} onClick={()=>{setTabIndex(0)}}>
           
                <span className={`${handles.imgModalPayments}`}>
                  {tabIndex !== 0 ?
                  <svg width="38" height="26" viewBox="0 0 38 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4.3774C0 3.25633 0.48855 2.18117 1.35817 1.38845C2.2278 0.595735 3.40726 0.150391 4.6371 0.150391H32.4597C33.6895 0.150391 34.869 0.595735 35.7386 1.38845C36.6082 2.18117 37.0968 3.25633 37.0968 4.3774V21.2855C37.0968 22.4065 36.6082 23.4817 35.7386 24.2744C34.869 25.0671 33.6895 25.5125 32.4597 25.5125H4.6371C3.40726 25.5125 2.2278 25.0671 1.35817 24.2744C0.48855 23.4817 0 22.4065 0 21.2855V4.3774ZM4.6371 2.2639C4.02218 2.2639 3.43245 2.48657 2.99764 2.88293C2.56282 3.27929 2.31855 3.81687 2.31855 4.3774V6.49091H34.7782V4.3774C34.7782 3.81687 34.5339 3.27929 34.0991 2.88293C33.6643 2.48657 33.0746 2.2639 32.4597 2.2639H4.6371ZM34.7782 10.7179H2.31855V21.2855C2.31855 21.846 2.56282 22.3836 2.99764 22.7799C3.43245 23.1763 4.02218 23.399 4.6371 23.399H32.4597C33.0746 23.399 33.6643 23.1763 34.0991 22.7799C34.5339 22.3836 34.7782 21.846 34.7782 21.2855V10.7179Z" fill="#BDBDBD"/>
                  </svg>
                  :
                  <svg width="38" height="26" viewBox="0 0 38 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4.3774C0 3.25633 0.48855 2.18117 1.35817 1.38845C2.2278 0.595735 3.40726 0.150391 4.6371 0.150391H32.4597C33.6895 0.150391 34.869 0.595735 35.7386 1.38845C36.6082 2.18117 37.0968 3.25633 37.0968 4.3774V21.2855C37.0968 22.4065 36.6082 23.4817 35.7386 24.2744C34.869 25.0671 33.6895 25.5125 32.4597 25.5125H4.6371C3.40726 25.5125 2.2278 25.0671 1.35817 24.2744C0.48855 23.4817 0 22.4065 0 21.2855V4.3774ZM4.6371 2.2639C4.02218 2.2639 3.43245 2.48657 2.99764 2.88293C2.56282 3.27929 2.31855 3.81687 2.31855 4.3774V6.49091H34.7782V4.3774C34.7782 3.81687 34.5339 3.27929 34.0991 2.88293C33.6643 2.48657 33.0746 2.2639 32.4597 2.2639H4.6371ZM34.7782 10.7179H2.31855V21.2855C2.31855 21.846 2.56282 22.3836 2.99764 22.7799C3.43245 23.1763 4.02218 23.399 4.6371 23.399H32.4597C33.0746 23.399 33.6643 23.1763 34.0991 22.7799C34.5339 22.3836 34.7782 21.846 34.7782 21.2855V10.7179Z" fill="#001D7E"/>
                  </svg>
                  }
                </span>
              <span className={`${handles.labelModalPayments} ${tabIndex === 0 ? handles.tabActiveCard : null}`}>
                <p>Cartão</p>
              </span>
            </div>
        </div>

        <div className={handles.modalPaymentsTabsList}>
          <div className={handles.modalPaymentsTabHead} onClick={()=>{setTabIndex(1)}}>
             
            <span className={`${handles.imgModalPayments} ${tabIndex === 1 ? handles.tabActivePix : null}`}>
                {tabIndex !== 1 ?
                  <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8132 0.910471C14.7997 -0.10297 13.1573 -0.10297 12.1438 0.910471L7.07137 5.98466L13.9785 12.8935L20.8874 5.98466L15.8114 0.910471H15.8132ZM22.121 7.22001L15.2156 14.1289L22.1245 21.0378L27.1987 15.9618C28.2121 14.9484 28.2121 13.3076 27.1987 12.296L22.1245 7.22001H22.121ZM20.8874 22.2714L13.9785 15.366L7.06962 22.2749L12.1456 27.349C13.159 28.3625 14.7997 28.3625 15.8114 27.349L20.8874 22.2749V22.2714ZM5.83602 21.0378L12.7414 14.1289L5.83427 7.22001L0.760081 12.296C-0.25336 13.3094 -0.25336 14.9501 0.760081 15.9618L5.83427 21.0378H5.83602Z" fill="#BDBDBD"/>
                  </svg>
                  :
                  <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8132 0.910471C14.7997 -0.10297 13.1573 -0.10297 12.1438 0.910471L7.07137 5.98466L13.9785 12.8935L20.8874 5.98466L15.8114 0.910471H15.8132ZM22.121 7.22001L15.2156 14.1289L22.1245 21.0378L27.1987 15.9618C28.2121 14.9484 28.2121 13.3076 27.1987 12.296L22.1245 7.22001H22.121ZM20.8874 22.2714L13.9785 15.366L7.06962 22.2749L12.1456 27.349C13.159 28.3625 14.7997 28.3625 15.8114 27.349L20.8874 22.2749V22.2714ZM5.83602 21.0378L12.7414 14.1289L5.83427 7.22001L0.760081 12.296C-0.25336 13.3094 -0.25336 14.9501 0.760081 15.9618L5.83427 21.0378H5.83602Z" fill="#001D7E"/>
                  </svg>
                }
              </span>
              <span className={`${handles.labelModalPayments} ${tabIndex === 1 ? handles.tabActivePix : null}`}>
                <p>Pix</p>
              </span>

          </div>
          </div>

          {/* <div className={handles.modalPaymentsTabsList}>
            <div className={handles.modalPaymentsTabHead} onClick={()=>{setTabIndex(2)}}>
            <span className={`${handles.imgModalPayments} ${tabIndex === 1 ? handles.tabActivePix : null}`}>
                {tabIndex !== 2 ?
                    <img src='https://tfcvih.vtexassets.com/arquivos/caixa-tem.png' />
                  :
                  <img src='https://tfcvih.vtexassets.com/arquivos/caixa-tem-active.png' />
                }
              </span>

              <span className={`${handles.labelModalPayments} ${tabIndex === 2 ? handles.tabActiveCaixa : null}`}>
                <p>Caixa tem</p>
              </span>
              
            </div>
          </div> */}
    </div>
    <div className={handles.modalPaymentsTabsContent}>
      {tabIndex === 0 ? <CreditCard/> : null}
      {tabIndex === 1 ? <Pix/> : null}
      {/* {tabIndex === 2 ? <CaixaTem/> : null} */}
    </div>
  </div>
  )
}

export default InfoPayments