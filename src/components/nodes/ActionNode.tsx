'use client';
import { Play } from 'lucide-react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { WorkflowNode } from '@/features/workflow/types';

const actionTypeLabels: Record<string, string> = {
    send_sms: 'Send SMS',
    send_email: 'Send Email',
    create_task: 'Create Task',
};

export default function ActionNode({ data, selected }: NodeProps<WorkflowNode>) {

    const { config, errors } = data;

    if (config.type !== 'action') {
        return null;
    }

    return (
        <div
            className={`
                relative w-56 rounded-2xl bg-B text-C shadow-sm
                ${selected
                    ? 'border-primary border-2'
                    : 'border-0'
                }
            `}
        >


            <div className="flex p-3 items-center gap-3 bg-Action/15 rounded-t-2xl">
                <div className="flex size-11 items-center justify-center rounded-lg bg-Action/25">
                    <Play
                        size={24}
                        className="text-Action"
                    />
                </div>
                <div className="min-w-0 ">
                    <p className="truncate text-sm font-semibold ">
                        {config.type === 'action'
                            ? config.name
                            : ''}
                    </p>
                    <p className="text-xs font-medium text-Action">
                        Action
                    </p>

                </div>
            </div>

            <div className='px-3 mt-2'>
                <div className='text-xs font-semibold text-C/35'>Type</div>
                <div className='text-sm font-medium'>{actionTypeLabels[config.actionType] ?? config.actionType}</div>
            </div>

            <div className='px-3 mt-2 pb-4'>
                <div className='text-xs font-semibold text-C/35'>Message</div>
                <div className='text-sm font-medium'>{config.value ? config.value : 'Message ...'}</div>
            </div>

            {errors.length > 0 && (
                <div className='bg-rose-700 text-[10px] flex items-center justify-center size-fit px-2 py-1 text-white absolute -top-2 -right-2 rounded-full'>
                    {errors.length}
                </div>
                // <div className="mt-3 flex items-center gap-2 rounded-lg bg-error/10 px-3 py-2 text-xs text-error">
                //     <AlertCircle size={14} />

                //     <span className="font-medium">
                //         {errors[0]}
                //     </span>
                // </div>
            )}

            <Handle
                type="target"
                position={Position.Left}
                className="!size-3 !bg-primary"
            />

            <Handle
                type="source"
                position={Position.Right}
                className="!size-3 !bg-info"
            />
        </div>
    );
}