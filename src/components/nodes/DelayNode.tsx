'use client';

import {
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
                relative w-47 rounded-2xl  bg-B text-C  shadow-sm
                ${selected
                    ? 'border-primary border-2'
                    : 'border-0'
                }
            `}
        >


            <div className="flex p-3 items-center gap-3 rounded-t-2xl bg-Delay/15">
                <div className="flex size-11 items-center justify-center rounded-lg bg-Delay/25">
                    <Clock3
                        size={24}
                        className="text-Delay"
                    />
                </div>
                <div className="min-w-0 ">
                    <p className="truncate text-sm font-semibold ">
                        {config.type === 'delay'
                            ? config.name
                            : ''}
                    </p>
                    <p className="text-xs font-medium text-Delay">
                        Delay
                    </p>

                </div>
            </div>


            <div className='p-3 mb-2'>
                <div className='text-xs font-semibold text-C/35'>Duration</div>
                <div className='text-sm font-medium'>{config.amount} {config.unit}</div>
            </div>

            {errors.length > 0 && (
                <div className='bg-rose-700 text-[10px] flex items-center justify-center size-fit px-2 py-1 text-white absolute -top-2 -right-2 rounded-full'>
                    {errors.length}
                </div>
            )}

            <Handle
                type="target"
                position={Position.Left}
                className="!size-3 !bg-primary"
            />

            <Handle
                type="source"
                position={Position.Right}
                className="!size-3 !bg-secondary"
            />
        </div>
    );
}