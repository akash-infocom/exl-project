import React, { useState } from 'react';

import { Viewer, PdfJs } from '@react-pdf-viewer/core';
//import Viewer, { PdfJs } from '@phuocng/react-pdf-viewer';

import './index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import pdfFile from './pdf/Akash.pdf';
import pdfFile1 from './pdf/Akash1.pdf';




export const App = () => {

  const [defaultPdfFile, setPdfFile] = useState(pdfFile);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // pdf file error state
  const [pdfError, setPdfError] = useState('');

  const [inputField, setInputField] = useState({ first_name: '', });
  const [count, setCount] = useState({ count: 1 });


  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const submitButton = (e) => {
    if (defaultPdfFile.match("Akash1")) {
      setPdfFile(pdfFile);
    } else {
      setPdfFile(pdfFile1);
    }
    setCount((prevState) => ({
      ...prevState,
      count: inputField.first_name,
    }));

  }


  const allowedFiles = ['application/pdf'];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError('');
          setPdfFile(e.target.result);
        }
      }
      else {
        setPdfError('Not a valid pdf: Please select only PDF');
        setPdfFile('');
      }
    }
    else {
      console.log('please select a PDF');
    }
  }

  return (
    <div>

      <div class="view-container">
        {/* Upload PDF */}
        <form>


          <label><b>Upload PDF :  </b></label>
          <input type='file' className="form-control"
            onChange={handleFile}></input>

          {pdfError && <span className='text-danger'>{pdfError}</span>}
        </form>

        <div className='newcontainer'>
          <label><b>Enter your resolution:  </b>

            <input
              type="number"
              step=".1"
              name="first_name"
              onChange={inputsHandler}
              placeholder="resolution in percentage"
              value={inputField.first_name} />


          </label>
        </div>
        <div className='newinput'>

          <button onClick={submitButton}>Submit</button><br />

        </div>
      </div>
      <div className='pdf-container'>
        {<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
          <Viewer fileUrl={defaultPdfFile} defaultScale={parseFloat(count.count)}
            plugins={[defaultLayoutPluginInstance]} />
        </Worker>}
      </div>
    </div>
  )
}
export default App
