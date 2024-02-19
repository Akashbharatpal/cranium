import React from 'react';
import jsPDF from 'jspdf';
import {TextField} from '@mui/material';

function PrintComponent() {
  const handlePrint = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Load the custom TTF font
    const customFont = require('./Font/GT-Haptik-Bold.ttf');
    
    // Add the custom font to jsPDF
    // pdf.addFileToVFS('GT-Haptik-Regular.ttf', customFont);
    pdf.addFont(customFont);

    // Set the custom font
    pdf.setFont('custom'); // 'custom' is the alias you can use for the font
    pdf.setFontSize(32);

    // Calculate the text width and height
    pdf.text(85,20,"Cranium");


    // Save the PDF
    pdf.save('my-document.pdf');
  };

  return (
    <div style={{width:'100%', height:'100vh', display:'flex',justifyContent:'center', alignItems:'center'}}>
      {/* <button onClick={handlePrint}>Generate PDF</button> */}
      <input color='white' placeholder='Search...' style={{borderRadius:'50px', border:'none',height:'30px',
      background:'linear-gradient(to right,#2c6dd5 0%,#2c6dd5 28%,#ff4b5a 91%,#ff4b5a 100%)',
      color:'#fff'}}/>
    </div>
  );
}

export default PrintComponent;
