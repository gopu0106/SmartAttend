import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Camera, Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import AppShell from '../components/layout/AppShell';
import GlowButton from '../components/ui/GlowButton';
import Card from '../components/ui/Card';

const QRScanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [fileError, setFileError] = useState('');
    const scannerRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(console.error);
            }
        };
    }, []);

    const onScanSuccess = (decodedText, decodedResult) => {
        console.log(`Scan result: ${decodedText}`, decodedResult);
        setScanResult(decodedText);
        toast.success('QR Code Detected!');

        if (scannerRef.current && isScanning) {
            scannerRef.current.stop().then(() => {
                scannerRef.current.clear();
                setIsScanning(false);
            }).catch(console.error);
        }
    };

    const onScanFailure = (error) => {
        // console.warn(`Code scan error = ${error}`);
    };

    const startScanning = async () => {
        try {
            const tempScanner = new Html5Qrcode("reader");
            scannerRef.current = tempScanner;

            await tempScanner.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0
                },
                onScanSuccess,
                onScanFailure
            );
            setIsScanning(true);
            setScanResult(null);
        } catch (err) {
            console.error("Error starting scanner:", err);
            toast.error("Failed to start camera. Please ensure permissions are granted.");
        }
    };

    const stopScanning = async () => {
        if (scannerRef.current && isScanning) {
            try {
                await scannerRef.current.stop();
                await scannerRef.current.clear();
                setIsScanning(false);
            } catch (err) {
                console.error("Failed to stop scanner", err);
            }
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileError('');
        setScanResult(null);

        try {
            const tempScanner = new Html5Qrcode("reader"); // Can reuse or new instance
            // Note: Scanning file doesn't require "starting" the camera
            const result = await tempScanner.scanFileV2(file, true);
            setScanResult(result.decodedText);
            toast.success('File Scanned Successfully!');
        } catch (err) {
            console.error("Error scanning file", err);
            setFileError('Could not decode QR code from this image.');
            toast.error('Failed to decode QR code');
        }
    };

    return (
        <AppShell>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Scanner</h1>
                    <p className="text-gray-600">Scan student ID or transaction QR codes</p>
                </header>

                <div className="grid gap-8">
                    {/* Scanner Section */}
                    <Card className="p-6">
                        <div className="flex justify-center mb-6 gap-4">
                            {!isScanning ? (
                                <GlowButton onClick={startScanning} className="gap-2">
                                    <Camera className="w-5 h-5" />
                                    Start Camera Scan
                                </GlowButton>
                            ) : (
                                <button
                                    onClick={stopScanning}
                                    className="px-6 py-2 rounded-button bg-red-500 text-white font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
                                >
                                    <X className="w-5 h-5" />
                                    Stop Camera
                                </button>
                            )}
                        </div>

                        {/* Hidden File Input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileUpload}
                        />

                        <div className="text-center mb-6">
                            <div
                                id="reader"
                                className={`mx-auto overflow-hidden rounded-xl bg-black border-2 border-dashed border-gray-300 ${isScanning ? 'h-[300px]' : 'h-0 opacity-0'} transition-all duration-300 w-full max-w-sm relative`}
                            ></div>
                            {!isScanning && (
                                <div className="py-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-gray-400">
                                    <Camera className="w-12 h-12 mb-2 opacity-50" />
                                    <p>Camera is off</p>
                                    <p className="text-sm mt-2">OR</p>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="mt-4 px-4 py-2 text-primary-violet font-medium hover:bg-primary-violet/10 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <Upload className="w-4 h-4" />
                                        Upload QR Image
                                    </button>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Result Section */}
                    {scanResult && (
                        <div className="animate-fade-in-up">
                            <Card className="p-6 border-l-4 border-emerald-500 bg-emerald-50/50">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-emerald-100 rounded-full text-emerald-600 mt-1">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Scan Successful!</h3>
                                        <p className="text-sm text-gray-600 mb-3">Decoded Content:</p>
                                        <div className="p-3 bg-white rounded-lg border border-emerald-200 font-mono text-sm text-emerald-800 break-all">
                                            {scanResult}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {fileError && (
                        <div className="animate-fade-in-up">
                            <Card className="p-4 border-l-4 border-red-500 bg-red-50/50">
                                <div className="flex items-center gap-3 text-red-700">
                                    <AlertCircle className="w-5 h-5" />
                                    <span>{fileError}</span>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
};

export default QRScanner;
