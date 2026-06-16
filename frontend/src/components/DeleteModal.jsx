import React from 'react';
import Button from './Button';

const DeleteModal = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-background max-w-lg w-full p-8 md:p-12 shadow-2xl animate-fade-in-up">
        <h3 className="text-[24px] font-medium text-primary tracking-tight mb-4">
          Confirm Deletion
        </h3>
        <p className="text-[14px] text-secondary mb-10 leading-relaxed">
          Are you certain you wish to delete <span className="text-primary font-medium">"{title}"</span>? This action is irreversible and will permanently remove the record from the archive.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-3 text-[12px] font-medium uppercase tracking-widest text-secondary hover:text-primary transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-8 py-3 text-[12px] font-medium uppercase tracking-widest text-white bg-error hover:bg-black transition-colors"
          >
            Purge Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
