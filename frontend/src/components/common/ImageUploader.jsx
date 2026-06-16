import React, { useState } from 'react';

const ImageUploader = ({ onChange, currentImage }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange(file);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-secondary mb-3">
        Cover Image (Optional)
      </label>
      <div 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative border border-dashed transition-colors duration-300 flex flex-col items-center justify-center p-8 min-h-[200px] cursor-pointer group ${
          isDragging ? 'border-primary bg-subtle' : 'border-border hover:border-primary'
        }`}
      >
        <input 
          type="file" 
          accept="image/jpeg, image/png, image/webp" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />
        
        {preview ? (
          <div className="absolute inset-0 p-2">
            <img src={preview} alt="Preview" className="w-full h-full object-cover object-center transition-all duration-700" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="text-white text-[10px] uppercase tracking-widest">Replace Image</span>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <svg className="mx-auto h-8 w-8 text-secondary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-[12px] font-medium text-primary">Drag & drop high-res imagery</p>
            <p className="text-[10px] text-secondary mt-2 tracking-wide">JPG, PNG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
