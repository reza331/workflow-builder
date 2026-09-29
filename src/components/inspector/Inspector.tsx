'use client';
import { useMemo } from 'react';
import { useNodes, useSelectedNodeId, useWorkflowActions } from '@/features/workflow/store';
import TriggerInspector from './inspector-layouts/TriggerInspector';
import ConditionInspector from './inspector-layouts/ConditionInspector';
import ActionInspector from './inspector-layouts/ActionInspector';
import DelayInspector from './inspector-layouts/DelayInspector';
import { MousePointerClick } from 'lucide-react';
import useWorkflowHandlers from '@/hooks/workflow-handlers';

export default function Inspector() {

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

    if (!selectedNode) {
        return (
            <aside className="flex h-full w-72 items-center justify-center bg-B shadow-md p-6">
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
            </aside>
        );
    }

    const { config, errors } = selectedNode.data;

    const updateConfig = (
        updates: Partial<Omit<typeof config, 'type'>>,
    ) => {
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
        <aside className="h-full w-75 bg-B text-C shadow-md relative">

            <div className="border-b border-C/10 p-4">
                <h2 className="mt-1 text-sm font-semibold">
                    Inspector
                </h2>
            </div>

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

            <div className='p-3 absolute bottom-0 left-0 w-full flex items-center gap-2 border-t border-C/5'>
                <button onClick={handleDuplicate} className="btn btn-outline btn-primary w-1/2 btn-sm rounded-xl">Duplicate</button>
                <button onClick={handleDelete} className="btn btn-outline btn-secondary w-1/2 btn-sm rounded-xl">Delete</button>
            </div>

        </aside>
    );
}