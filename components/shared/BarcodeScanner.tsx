// components/BarcodeScanner.tsx
"use client";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import BarcodeReader from 'react-barcode-reader';

const BarcodeScanner = () => {
  const { toast } = useToast();
  const [scannedCode, setScannedCode] = useState('');

  const handleScan = (data: string | null) => {
    if (data) {
      setScannedCode(data);
      // Fetch and validate the RSVP data using the scanned code
      validateRSVP(data);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    toast({
      variant: "destructive",
      description: "Error scanning the barcode.",
    });
  };

  const validateRSVP = async (code: string) => {
    try {
      const response = await fetch(`/api/validate-rsvp?code=${code}`);
      const result = await response.json();

      if (result.valid) {
        toast({
          variant: "default",
          title: "RSVP Validated",
          description: `Welcome, ${result.name}!`,
        });
      } else {
        toast({
          variant: "destructive",
          description: "Invalid RSVP Code.",
        });
      }
    } catch (error) {
      console.error('Error validating RSVP:', error);
      toast({
        variant: "destructive",
        description: "Error validating RSVP.",
      });
    }
  };

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Scan Barcode to Confirm Presence</h1>
      <BarcodeReader
        onError={handleError}
        onScan={handleScan}
      />
      {scannedCode && <p className="mt-4">Scanned Code: {scannedCode}</p>}
      <Toaster />
    </div>
  );
};

export default BarcodeScanner;
