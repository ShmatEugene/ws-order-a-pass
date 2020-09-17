import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Button from './UI/Button';
import { changeImage, setUploadedImg } from '../store/actions/pass';

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
  //const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const dispatch = useDispatch();
  const state = useSelector(({ pass }) => pass);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => dispatch(setUploadedImg(reader.result)));
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

  function generateDownload(event, previewCanvas, crop) {
    event.preventDefault();
    if (!crop || !previewCanvas) {
      return;
    }

    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

    canvas.toBlob(
      (blob) => {
        props.onUpload(blob);
        dispatch(changeImage(window.URL.createObjectURL(blob)));
        console.log(blob);
      },
      'image/png',
      1,
    );
  }

  return (
    <div>
      <div className="ui-photo-picker">
        <label htmlFor="photo">
          <p>Фотография</p>
        </label>
        <input type="file" name="photo" accept="image/*" onChange={onSelectFile} />
      </div>
      <ReactCrop
        src={state.uploadedImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <div className="preview">
        <canvas
          ref={previewCanvasRef}
          style={{
            width: completedCrop?.width ?? 0,
            height: completedCrop?.height ?? 0,
          }}
        />
      </div>
      <br />
      <Button
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={(event) => generateDownload(event, previewCanvasRef.current, completedCrop)}>
        Применить фотографию
      </Button>
    </div>
  );
}
