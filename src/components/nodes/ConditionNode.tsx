'use client';
import { GitBranch } from 'lucide-react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { WorkflowNode } from '@/features/workflow/types';

const conditionTypeLabels: Record<string, string> = {
    customer_value: 'Customer Value',
    order_total: 'Order Total',
};

const operatorLabels: Record<string, string> = {
    greater_than: 'Greater than ( > )',
    less_than: 'Less than ( < )',
    equals: 'Equals ( = )',
};

export default function ConditionNode({ data, selected, }: NodeProps<WorkflowNode>) {

    const { config, errors } = data;

    if (config.type !== 'condition') {
        return null;
    }

    return (
        <div
            className={`
                relative w-56 shadow-sm
                rounded-2xl
                bg-B
                text-C
                ${selected
                    ? 'border-primary border-2'
                    : 'border-0'
                }
            `}
        >


            <div className="flex p-3 items-center gap-3 bg-Condition/15 rounded-t-2xl">
                <div className="flex size-11 items-center justify-center rounded-lg bg-Condition/25">
                    <GitBranch
                        size={24}
                        className="text-Condition"
                    />
                </div>
                <div className="min-w-0 ">
                    <p className="truncate text-sm font-semibold ">
                        {config.type === 'condition'
                            ? config.name
                            : ''}
                    </p>
                    <p className="text-xs font-medium text-Condition">
                        Condition
                    </p>
                </div>
            </div>

            <div className='px-3 mt-3'>
                <div className='text-xs font-semibold text-C/35'>Condition type</div>
                <div className='text-sm font-medium'>{conditionTypeLabels[config.conditionType]}{' '}</div>
            </div>
            <div className='px-3 mt-2'>
                <div className='text-xs font-semibold text-C/35'>Operator</div>
                <div className='text-sm font-medium'> {operatorLabels[config.operator]}{' '}</div>
            </div>
            <div className='px-3 mt-2 pb-5'>
                <div className='text-xs font-semibold text-C/35'>Value</div>
                <div className='text-sm font-medium'>{config.value}</div>
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
                id="true"
                position={Position.Right}
                style={{ top: '35%' }}
                className="!size-3 !bg-success"
            />

            <Handle
                type="source"
                id="false"
                position={Position.Right}
                style={{ top: '65%' }}
                className="!size-3 !bg-error"
            />

        </div>
    );
}