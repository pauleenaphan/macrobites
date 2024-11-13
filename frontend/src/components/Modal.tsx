import React from 'react';

interface ModalProps {
  isOpen: boolean; // Controls whether the modal is visible
  onClose: () => void; // Function to close the modal
  title?: string; // Optional title for the modal
  children: React.ReactNode; // Content of the modal
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {title && <h2>{title}</h2>}
                <div className="modal-body">{children}</div>
                <button className="modal-close" onClick={onClose}>
                Close
                </button>
            </div>
        </div>
    );
};