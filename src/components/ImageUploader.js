import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Button from './UI/Button';

const pixelRatio = 4;

function getResizedCanvas(canvas, newWidth, newHeight) {
  const tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext('2d');
  ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newWidth, newHeight);

  return tmpCanvas;
}

export default function ImageUploader(props) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
  }, [completedCrop]);

  function generateDownload(previewCanvas, crop) {
    if (!crop || !previewCanvas) {
      return;
    }

    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);
    // canvas.toBlob(function (blob) {
    //   var newImg = document.createElement('img'),
    //     url = URL.createObjectURL(blob);

    //   newImg.onload = function () {
    //     // больше не нужно читать blob, поэтому он отменен
    //     URL.revokeObjectURL(url);
    //   };
    //   props.onUpload(newImg);
    //   newImg.src = url;
    // });

    canvas.toBlob(
      (blob) => {
        //const previewUrl = window.URL.createObjectURL(blob);
        // console.log(previewUrl);
        // const anchor = document.createElement('a');
        // anchor.download = 'cropPreview.png';
        // anchor.href = URL.createObjectURL(blob);
        // anchor.click();

        // window.URL.revokeObjectURL(previewUrl);
        props.onUpload(blob);
        console.log(blob);
      },
      'image/png',
      1,
    );
  }

  return (
    <div>
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <div>
        <canvas
          ref={previewCanvasRef}
          style={{
            width: completedCrop?.width ?? 0,
            height: completedCrop?.height ?? 0,
          }}
        />
      </div>
      <Button
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() => generateDownload(previewCanvasRef.current, completedCrop)}>
        Download cropped image
      </Button>
    </div>
  );
}
