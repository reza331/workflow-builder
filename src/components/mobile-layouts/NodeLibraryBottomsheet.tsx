'use client';
import { X } from 'lucide-react';
import { Zap, GitBranch, Play, Clock } from 'lucide-react';
import type { WorkflowNodeType } from '@/features/workflow/types';
import useWorkflowHandlers from '@/hooks/workflow-handlers';

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


type Props = {
    showNodeLibrary: boolean;
    setShowNodeLibrary: (open: boolean) => void;
};

export default function NodeLibraryBottomsheet({
    showNodeLibrary,
    setShowNodeLibrary,
}: Props) {


    const { handleAddNode } = useWorkflowHandlers()

    return (
        <>
            {/* Overlay */}
            <div
                className={`
                    fixed
                    inset-0
                    z-999
                    bg-black/40
                    transition-opacity
                    duration-300
                    ${showNodeLibrary
                        ? 'opacity-100'
                        : 'pointer-events-none opacity-0'}
                `}
                onClick={() => setShowNodeLibrary(false)}
            />

            {/* Sheet */}
            <div
                className={`
                    fixed
                    bottom-0
                    left-0
                    z-999
                    w-full
                    rounded-t-3xl
                    bg-B
                    text-C
                    shadow-xl
                    pt-1
                    px-4
                    pb-4
                    transition-transform
                    duration-300
                    ease-out
                    ${showNodeLibrary
                        ? 'translate-y-0'
                        : 'translate-y-full'}
                `}
            >

                <div className='w-full flex justify-center'>
                        <div className='w-30 rounded-full h-1 bg-C/20'></div>
                </div>

                <div className="flex items-center justify-between mb-4 mt-2">
                    <div>
                        <h3 className="text-sm font-semibold">
                            Node Library
                        </h3>
                        <p className='text-C/35 text-xs font-semibold'>Click on a node to add</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowNodeLibrary(false)}
                        className="
                            flex
                            size-8
                            items-center
                            justify-center
                            rounded-full
                            hover:bg-C/10
                        "
                    >
                        <X size={18} />
                    </button>
                </div>

                <div>
                    <div className="flex flex-col gap-5 p-3 mt-4">
                        {nodeItems.map((item) => {
                            const Icon = icons[item.type];
                            return (
                                <button
                                    draggable
                                    key={item.type}
                                    type="button"
                                    onClick={() => handleAddNode(item.type)}
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
                </div>

            </div>

        </>
    );
}