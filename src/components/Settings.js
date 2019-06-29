import React from 'react';


const Settings = ({ id, children }) => (
	<div className="modal" id={id} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Settings</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    { children }
                </div>
            </div>
        </div>
    </div>
);

export default Settings;
