// Notification.js
import React, { useEffect, useState } from 'react';

const Notification = ({ message, type, }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000); // 3 seconds

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    if (!visible) return null; // Don't render if not visible

    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            case 'info':
                return 'bg-blue-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className={`fixed top-4 right-4 p-4 rounded shadow-lg z-99999 transition-opacity duration-300 ${getTypeStyles()}`}>
            {message}
        </div>
    );
};

export default Notification;
