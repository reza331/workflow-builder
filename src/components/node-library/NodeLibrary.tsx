'use client';
import { Zap, GitBranch, Play, Clock } from 'lucide-react';
import type { WorkflowNodeType } from '@/features/workflow/types';

const nodeItems: { type: WorkflowNodeType; label: string; description: string; color: string, bg: string }[] = [
    {
        type: 'trigger',
        label: 'Trigger',
        description: 'Start your workflow',
        color: 'text-Trigger',
        bg: 'bg-Trigger/20',
    },
    {
        type: 'condition',
        label: 'Condition',
        description: 'Branches your workflow',
        color: 'text-Condition',
        bg: 'bg-Condition/20',

    },
    {
        type: 'action',
        label: 'Action',
        description: 'Perform an action',
        color: 'text-Action ',
        bg: 'bg-Action/20',
    },
    {
        type: 'delay',
        label: 'Delay',
        description: 'Waits for a special time',
        color: 'text-Delay',
        bg: 'bg-Delay/20',
    },
];

const icons = {
    trigger: Zap,
    condition: GitBranch,
    action: Play,
    delay: Clock,
};

export default function NodeLibrary() {

    const handleDragStart = (
        event: React.DragEvent,
        type: WorkflowNodeType,
    ) => {
        event.dataTransfer.setData(
            'application/reactflow',
            type,
        );

        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="flex h-full w-80 flex-col text-C bg-B shadow-lg">
            {/*  */}
            <div className="ps-4 pt-4">
                <h2 className="font-semibold">
                    Node Library
                </h2>
                <p className="mt-1 font-semibold text-xs text-C/35">
                    Drag and drop nodes on Canvas
                </p>
            </div>
            {/*  */}
            <div className="flex flex-col gap-5 p-3 mt-4">
                {nodeItems.map((item) => {
                    const Icon = icons[item.type];
                    return (
                        <button
                            draggable
                            key={item.type}
                            type="button"
                            onDragStart={(event) =>
                                handleDragStart(event, item.type)
                            }
                            className="flex items-center shadow-md gap-3 rounded-3xl p-2 text-left border-2 border-black/20"
                        >
                            <div className={`badge size-12 border-0 rounded-2xl ${item.color} ${item.bg}`}>
                                <Icon
                                    size={20}
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-semibold">
                                    {item.label}
                                </p>

                                <p className="mt-0.5 text-[10px] font-semibold text-C/35">
                                    {item.description}
                                </p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </aside>
    );
}