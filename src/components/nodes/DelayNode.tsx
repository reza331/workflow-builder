'use client';

import {
    AlertCircle,
    Clock3,
} from 'lucide-react';
import {
    Handle,
    Position,
    type NodeProps,
} from '@xyflow/react';

import type { WorkflowNode } from '@/features/workflow/types';

export default function DelayNode({
    data,
    selected,
}: NodeProps<WorkflowNode>) {
    const { config, errors } = data;

    if (config.type !== 'delay') {
        return null;
    }

    return (
        <div
            className={`
                relative w-56 rounded-xl border bg-base-100 p-4 shadow-sm
                ${
                    selected
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-base-300'
                }
            `}
        >
            <Handle
                type="target"
                position={Position.Left}
                className="!size-3 !border-2 !border-base-100 !bg-primary"
            />

            <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <Clock3
                        size={18}
                        className="text-secondary"
                    />
                </div>

                <div className="min-w-0">
                    <p className="text-xs text-base-content/50">
                        Delay
                    </p>

                    <p className="truncate text-sm font-semibold">
                        {config.name}
                    </p>
                </div>
            </div>

            {errors.length > 0 && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-error/10 px-3 py-2 text-xs text-error">
                    <AlertCircle size={14} />

                    <span className="font-medium">
                        {errors[0]}
                    </span>
                </div>
            )}

            <Handle
                type="source"
                position={Position.Right}
                className="!size-3 !border-2 !border-base-100 !bg-secondary"
            />
        </div>
    );
}