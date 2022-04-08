import { PDFDocument } from "pdf-lib";
import React from "react";
import { useDropzone } from "react-dropzone";

export function App() {
  const [results, setResults] = React.useState<any[]>([]);
  const onDrop = React.useCallback((acceptedFiles: Blob[]) => {
    acceptedFiles.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.onabort = (e) => {
        console.log("Document upload aborted");
      };
      fileReader.onerror = (e) => {
        console.log("Error uploading document");
        alert("oops, a fucko wucko happened");
      };
      fileReader.onload = async (e) => {
        console.log("Loaded documents");
        const binaryStr = fileReader.result as ArrayBuffer;
        const pdf = await PDFDocument.load(binaryStr);
        const resultPdf = await pdf.copy();
        resultPdf.getPages().forEach((page) => {
          const { width, height } = page.getSize();
          page.setSize(width * 2, height);
        });
        const url = await resultPdf.saveAsBase64({ dataUri: true });
        const preview: HTMLIFrameElement = document.getElementById("pdf-preview")! as any;
        preview.src = url;
      };

      fileReader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <div {...getRootProps()}>
        <input {...getInputProps()}></input>
        <div
          style={{
            margin: "auto",
            fontFamily: "'Open Sans', Arial, Helvetica, sans-serif",
            border: "1px solid dodgerblue",
            width: "500px",
            backgroundColor: "#1E90FF16",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <p>Drag 'n' drop or click to select files.</p>
        </div>
      </div>
      <br />
      <iframe id="pdf-preview" style={{ width: "800px", maxWidth: "100vw", height: "80vh" }}></iframe>
    </div>
  );
}
