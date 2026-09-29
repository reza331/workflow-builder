'use client';
import { X } from 'lucide-react';
import { useMemo } from 'react';
import { useNodes, useSelectedNodeId, useWorkflowActions } from '@/features/workflow/store';
// import TriggerInspector from './inspector-layouts/TriggerInspector';
// import ConditionInspector from './inspector-layouts/ConditionInspector';
// import ActionInspector from './inspector-layouts/ActionInspector';
// import DelayInspector from './inspector-layouts/DelayInspector';
import { MousePointerClick } from 'lucide-react';
import useWorkflowHandlers from '@/hooks/workflow-handlers';
import TriggerInspector from '../inspector/inspector-layouts/TriggerInspector';
import ConditionInspector from '../inspector/inspector-layouts/ConditionInspector';
import ActionInspector from '../inspector/inspector-layouts/ActionInspector';
import DelayInspector from '../inspector/inspector-layouts/DelayInspector';

type Props = {
    showInspector: boolean;
    setShowInspector: (open: boolean) => void;
};



export default function InspectorBottomSheet({
    showInspector,
    setShowInspector,
}: Props) {


    const nodes = useNodes();
    const selectedNodeId = useSelectedNodeId();
    const { updateNode } = useWorkflowActions();
    const { handleDelete, handleDuplicate } = useWorkflowHandlers()

    const selectedNode = useMemo(
        () =>
            nodes.find(
                (node) =>
                    node.id === selectedNodeId,
            ),
        [nodes, selectedNodeId],
    );


    const config = selectedNode?.data.config;
    const errors = selectedNode?.data.errors;

    const updateConfig = (
        updates: Partial<Omit<typeof config, 'type'>>,
    ) => {
        if (!selectedNode || !config) return;

        updateNode(selectedNode.id, {
            data: {
                ...selectedNode.data,
                config: {
                    ...config,
                    ...updates,
                },
            },
        });
    };


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
                    ${showInspector
                        ? 'opacity-100'
                        : 'pointer-events-none opacity-0'}
                `}
                onClick={() => setShowInspector(false)}
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
                    ${showInspector
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
                            Inspector
                        </h3>
                        <p className='text-C/35 text-xs font-semibold'>Edit Node</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowInspector(false)}
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
                    {
                        !selectedNode &&
                        <div className='flex flex-col items-center gap-2'>
                            <MousePointerClick
                                size={32}
                                className="text-C/35"
                            />
                            <p className="text-center text-xs text-C font-semibold">
                                No node selected
                            </p>
                            <p className="text-center text-[10px] text-C/35 font-semibold">
                                Select a node on the canvas to edit its settings.
                            </p>
                        </div>
                    }
                    {
                        (config && errors) &&
                        <>
                            <div className="space-y-4 p-4">
                                {config.type === 'trigger' && (
                                    <TriggerInspector
                                        errors={errors}
                                        config={config}
                                        onChange={updateConfig}
                                    />
                                )}

                                {config.type === 'condition' && (
                                    <ConditionInspector
                                        errors={errors}
                                        config={config}
                                        onChange={updateConfig}
                                    />
                                )}

                                {config.type === 'action' && (
                                    <ActionInspector
                                        errors={errors}
                                        config={config}
                                        onChange={updateConfig}
                                    />
                                )}

                                {config.type === 'delay' && (
                                    <DelayInspector
                                        errors={errors}
                                        config={config}
                                        onChange={updateConfig}
                                    />
                                )}

                            </div>

                            <div className='p-3 w-full flex items-center gap-2 border-t border-C/5'>
                                <button onClick={handleDuplicate} className="btn btn-outline btn-primary w-1/2 btn-sm rounded-xl">Duplicate</button>
                                <button onClick={handleDelete} className="btn btn-outline btn-secondary w-1/2 btn-sm rounded-xl">Delete</button>
                            </div>
                        </>
                    }
                </div>

            </div>

        </>
    );
}