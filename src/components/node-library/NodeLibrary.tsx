'use client';
import { Zap, GitBranch, Play, Clock } from 'lucide-react';
import type { WorkflowNodeType } from '@/features/workflow/types';

const nodeItems: { type: WorkflowNodeType; label: string; description: string; }[] = [
    {
        type: 'trigger',
        label: 'Trigger',
        description: 'Start your workflow',
    },
    {
        type: 'condition',
        label: 'Condition',
        description: 'Branch based on a condition',
    },
    {
        type: 'action',
        label: 'Action',
        description: 'Perform an action',
    },
    {
        type: 'delay',
        label: 'Delay',
        description: 'Wait before continuing',
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
        <aside className="flex h-full w-64 flex-col border-r border-base-300 bg-base-100">
            <div className="border-b border-base-300 p-4">
                <h2 className="text-sm font-semibold">
                    Node Library
                </h2>

                <p className="mt-1 text-xs text-base-content/60">
                    Add nodes to your workflow
                </p>
            </div>

            <div className="flex flex-col gap-2 p-3">
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
                            className="flex items-center gap-3 rounded-xl border border-base-300 p-3 text-left transition-colors hover:border-primary hover:bg-base-200"
                        >
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <Icon
                                    size={18}
                                    className="text-primary"
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm font-medium">
                                    {item.label}
                                </p>

                                <p className="mt-0.5 text-xs text-base-content/60">
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