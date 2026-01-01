import React from 'react';
import { Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function SentinelBadge({ status, latency }) {
    const statusConfig = {
        operational: {
            color: 'bg-green-100 text-green-700 border-green-200',
            icon: <CheckCircle className="w-3 h-3" />,
            text: 'Operativo'
        },
        degraded: {
            color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            icon: <AlertTriangle className="w-3 h-3" />,
            text: 'Latencia Alta'
        },
        down: {
            color: 'bg-red-100 text-red-700 border-red-200',
            icon: <XCircle className="w-3 h-3" />,
            text: 'Caído'
        }
    };

    const config = statusConfig[status] || statusConfig.operational;

    return (
        <div className={`flex items-center gap-2 px-2 py-1 rounded-full border ${config.color} shadow-sm backdrop-blur-sm bg-opacity-90`}>
            {config.icon}
            <span className="text-[10px] font-bold uppercase tracking-wider">{config.text}</span>
            <span className="text-[10px] opacity-70 border-l border-current pl-2 ml-1">
                {latency}ms
            </span>
        </div>
    );
}