import React , {useRef} from "react";

const Alert = ({title, message , CancelBooking, id}) => {

  const closeRef = useRef();

  const action = ()=>{

    CancelBooking(id)
    closeRef.current.click()
  }

  return (
    <div>
      <button
        type="button"
        className ="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
  Cancel
      </button>

      <div
        className ="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className ="modal-dialog">
          <div className ="modal-content">
            <div className ="modal-header">
              <h1 className ="modal-title fs-5" id="exampleModalLabel">
              {title}
              </h1>
              {/* <p>{message}</p> */}
              <button
                type="button"
                className ="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className ="modal-body">{message}</div>
            <div className ="modal-footer">
              <button
                type="button"
                className ="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {closeRef}
              >
                Close
              </button>
              <button type="button" className ="btn btn-danger" onClick={action}>
             Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
