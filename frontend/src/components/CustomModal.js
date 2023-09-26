import React from 'react';
import {Modal} from "antd";
import "../CSS/Admin.css"

const CustomModal = (props) => {
    const {open, hideModal, performAction, title} = props;
    return (
        <Modal
            title = "Modal"
            open = {open}
            onOk = {performAction}
            onCancel = {hideModal}
            okText = "Ok"
            cancelText = "Cancel"
        >
            <p>{title}</p>
        </Modal>
    );
};



export default CustomModal;