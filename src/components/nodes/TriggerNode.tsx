'use client';
import { Handle, Position, type NodeProps, } from '@xyflow/react';
import type { WorkflowNode } from '@/features/workflow/types';
import { Zap, AlertCircle } from 'lucide-react';

export default function TriggerNode({ data, selected }: NodeProps<WorkflowNode>) {

    const { config, errors } = data

    return (
        <div
            className={`
                min-w-55
                rounded-xl
                border-2
                bg-base-100
                p-4
                shadow-sm
                transition-colors
                ${selected
                    ? 'border-primary'
                    : 'border-base-300'}
                ${errors.length > 0
                    ? 'border-error'
                    : ''}
            `}
        >
            <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <Zap
                        size={18}
                        className="text-primary"
                    />
                </div>

                <div className="min-w-0">
                    <p className="text-xs font-medium text-base-content/60">
                        Trigger
                    </p>

                    <p className="truncate text-sm font-semibold">
                        {config.type === 'trigger'
                            ? config.name
                            : ''}
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
                id="output"
                className="!size-3 !border-2 !border-base-100 !bg-primary"
            />
        </div>
    );
}