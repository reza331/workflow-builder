'use client';
import { GitBranch, AlertCircle } from 'lucide-react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

import type { WorkflowNode } from '@/features/workflow/types';

export default function ConditionNode({ data, selected, }: NodeProps<WorkflowNode>) {

    const { config, errors } = data;

    if (config.type !== 'condition') {
        return null;
    }

    return (
        <div
            className={`
                relative w-56 rounded-xl border bg-base-100 p-4 shadow-sm
                ${selected
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
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-warning/10">
                    <GitBranch
                        size={18}
                        className="text-warning"
                    />
                </div>

                <div className="min-w-0">
                    <p className="text-xs text-base-content/50">
                        Condition
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
                id="true"
                position={Position.Right}
                style={{ top: '35%' }}
                className="!size-3 !border-2 !border-base-100 !bg-success"
            />

            <Handle
                type="source"
                id="false"
                position={Position.Right}
                style={{ top: '65%' }}
                className="!size-3 !border-2 !border-base-100 !bg-error"
            />
        </div>
    );
}