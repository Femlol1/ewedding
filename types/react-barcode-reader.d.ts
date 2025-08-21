declare module 'react-barcode-reader' {
    import { Component } from 'react';
  
    interface BarcodeReaderProps {
      onError: (err: any) => void;
      onScan: (data: string | null) => void;
    }
  
    export default class BarcodeReader extends Component<BarcodeReaderProps> {}
  }
  