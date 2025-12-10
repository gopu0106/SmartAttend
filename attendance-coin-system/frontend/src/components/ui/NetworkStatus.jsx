import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

/**
 * NetworkStatus Component
 * Real-time network status indicator using navigator.onLine and event listeners.
 * Displays a colored dot with "Online" or "Offline" text.
 */
const NetworkStatus = ({ className = '' }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isOnline
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-red-500/10 border border-red-500/30'
                } ${className}`}
        >
            {isOnline ? (
                <>
                    <div className="relative">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <Wifi className="w-4 h-4 text-green-400" />
                    <div className="flex flex-col">
                        <span className="text-green-400 font-medium text-sm">Online</span>
                        <span className="text-green-400/60 text-xs">Network Connected</span>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <WifiOff className="w-4 h-4 text-red-400" />
                    <div className="flex flex-col">
                        <span className="text-red-400 font-medium text-sm">Offline</span>
                        <span className="text-red-400/60 text-xs">No Connection</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default NetworkStatus;
