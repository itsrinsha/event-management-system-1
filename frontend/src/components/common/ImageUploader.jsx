import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

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
    <div className="w-full space-y-2">
      <label className="text-sm font-medium leading-none text-foreground">
        Cover Image (Optional)
      </label>
      <div 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative flex flex-col items-center justify-center p-8 min-h-[200px] cursor-pointer rounded-lg border-2 border-dashed transition-all duration-300 overflow-hidden group ${
          isDragging ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-primary/50 hover:bg-muted/50'
        }`}
      >
        <input 
          type="file" 
          accept="image/jpeg, image/png, image/webp" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />
        
        {preview ? (
          <div className="absolute inset-0 p-1">
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-md" />
            <div className="absolute inset-1 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-md pointer-events-none">
              <span className="text-white text-sm font-medium tracking-wide flex items-center gap-2">
                <UploadCloud size={16} /> Replace Image
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Click or drag & drop</p>
              <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
