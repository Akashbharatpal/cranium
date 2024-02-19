import { saveAs } from 'file-saver';
import pdfMake from 'pdfmake/build/pdfmake';

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};


export default function generatePDFBlob(jsonData){

  // const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
const timestamp = formatDate(new Date());

    const fonts = {
      Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
      }
    };
  
    const docDefinition = {
      content: [
        { text: 'Datamine', fontSize: 20, bold: true },
        { text: '-------------------------------------------------------------------------------------------------------------------------------------'
        , fontSize: 14, marginBottom: 10 },
        { text: JSON.stringify(jsonData, null, 2), fontSize: 14 },
        { text: '-------------------------------------------------------------------------------------------------------------------------------------'
        , fontSize: 14 },
        {text: `Generated on ${timestamp}`, fontSize: 12, marginTop: 1},
      ],
      defaultStyle: {
        font: 'Roboto'
      },
    };
  
    pdfMake.fonts = fonts;
  
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  
    return pdfDocGenerator.getBlob((blob) => {
      saveAs(blob, `${jsonData.cname.replaceAll(' ','_')}_${timestamp}.pdf`);
    });
  };
  