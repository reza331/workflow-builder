'use client';
import { useMemo } from 'react';
import { useNodes, useSelectedNodeId, useWorkflowActions } from '@/features/workflow/store';
import TriggerInspector from './inspector-layouts/TriggerInspector';
import ConditionInspector from './inspector-layouts/ConditionInspector';
import ActionInspector from './inspector-layouts/ActionInspector';
import DelayInspector from './inspector-layouts/DelayInspector';

export default function Inspector() {

    const nodes = useNodes();
    const selectedNodeId = useSelectedNodeId();
    const { updateNode } = useWorkflowActions();

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
            <aside className="flex h-full w-72 items-center justify-center border-l border-base-300 bg-base-100 p-6">
                <p className="text-center text-sm text-base-content/50">
                    Select a node to edit its settings.
                </p>
            </aside>
        );
    }

    const { config } = selectedNode.data;

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
        <aside className="h-full w-72 border-l border-base-300 bg-base-100">
            
            <div className="border-b border-base-300 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-base-content/50">
                    {config.type}
                </p>
                <h2 className="mt-1 text-base font-semibold">
                    Settings
                </h2>
            </div>

            <div className="space-y-4 p-4">
                {config.type === 'trigger' && (
                    <TriggerInspector
                        config={config}
                        onChange={updateConfig}
                    />
                )}

                {config.type === 'condition' && (
                    <ConditionInspector
                        config={config}
                        onChange={updateConfig}
                    />
                )}

                {config.type === 'action' && (
                    <ActionInspector
                        config={config}
                        onChange={updateConfig}
                    />
                )}

                {config.type === 'delay' && (
                    <DelayInspector
                        config={config}
                        onChange={updateConfig}
                    />
                )}

            </div>
        </aside>
    );
}