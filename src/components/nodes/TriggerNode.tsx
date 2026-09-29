'use client';
import { Handle, Position, type NodeProps, } from '@xyflow/react';
import type { WorkflowNode } from '@/features/workflow/types';
import { Zap } from 'lucide-react';

const triggerTypeLabels: Record<string, string> = {
    new_customer: 'New Customer',
    new_order: 'New Order',
    payment_received: 'Payment Received',
};

export default function TriggerNode({ data, selected }: NodeProps<WorkflowNode>) {

    const { config, errors } = data

    if (config.type !== 'trigger') return null

    return (
        <div
            className={`
                min-w-47
                rounded-xl
                overflow-hidden
                bg-B
                text-C
                shadow-sm
                transition-colors
                ${selected
                    ? 'border-primary border-2'
                    : 'border-transparent'}
                ${errors.length > 0
                    ? 'border-error'
                    : ''}
            `}
        >
            <div className="flex p-3 items-center gap-3 bg-Trigger/15">
                <div className="flex size-11 items-center justify-center rounded-lg bg-Trigger/25">
                    <Zap
                        size={24}
                        className="text-Trigger"
                    />
                </div>
                <div className="min-w-0 ">
                    <p className="truncate text-sm font-semibold ">
                        {config.type === 'trigger'
                            ? config.name
                            : ''}
                    </p>
                    <p className="text-xs font-medium text-Trigger">
                        Trigger
                    </p>

                </div>
            </div>

            <div className='p-3 mb-2'>
                <div className='text-xs font-semibold text-C/35'>Trigger type</div>
                <div className='text-sm font-medium'>{triggerTypeLabels[config.triggerType] ?? config.triggerType}</div>
            </div>

            {errors.length > 0 && (
                <div className='bg-rose-700 text-[10px] flex items-center justify-center size-fit px-2 py-1 text-white absolute -top-2 -right-2 rounded-full'>
                    {errors.length}
                </div>
            )}

            <Handle
                type="source"
                position={Position.Right}
                id="output"
                className="!size-3 !bg-Trigger"
            />
        </div>
    );

}