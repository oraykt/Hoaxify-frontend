import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import ButtonWithProgress from './ButtonWithProgress';

const Modal = ({visible, onClickDelete, onClickCancel, message, pendingApiCall}) => {

  const {t:translate} = useTranslation();

  let className = 'modal fade'
  if(visible){
    className += ' show d-block'
  }

  return (
    <div className={className} style={{backgroundColor: '#000000b0'}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{translate('Delete Hoax')}</h5>
          </div>
          <div className="modal-body">
            {message}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" disabled={pendingApiCall} onClick={onClickCancel}>{translate('Cancel')}</button>
            <ButtonWithProgress className="btn btn-danger" onClick={onClickDelete} pendingApiCall={pendingApiCall} text={translate('Delete Hoax')} disabled={pendingApiCall}/>
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes={
  visible: PropTypes.bool,
  onClickDelete: PropTypes.func,
  onClickCancel: PropTypes.func,
  message: PropTypes.any,
  pendingApiCall: PropTypes.bool
}

export default Modal