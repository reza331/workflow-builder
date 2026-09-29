'use client';
import '@xyflow/react/dist/style.css';
import { Background, Controls, MarkerType, ReactFlow, type NodeTypes, type Connection, } from '@xyflow/react';
import { useEdges, useNodes, useSelectedNodeId, useWorkflowActions } from '@/features/workflow/store';
import { useCallback, useEffect } from 'react';
import { WorkflowNode, WorkflowEdge } from '@/features/workflow/types';
import TriggerNode from './nodes/TriggerNode';
import ConditionNode from './nodes/ConditionNode';
import ActionNode from './nodes/ActionNode';
import DelayNode from './nodes/DelayNode';
import { canConnect } from '@/features/workflow/validation';

const nodeTypes: NodeTypes = {
    trigger: TriggerNode,
    condition: ConditionNode,
    action: ActionNode,
    delay: DelayNode,
};

export default function WorkflowCanvas() {

    const nodes = useNodes();
    const edges = useEdges();
    const selectedNodeId = useSelectedNodeId();

    const { startNodeDrag, finishNodeDrag, applyNodeChanges, applyEdgeChanges, selectNode, addEdge, deleteNode, deleteEdge, duplicateNode, redo, undo } = useWorkflowActions();

    const handleNodeClick = useCallback(
        (_event: React.MouseEvent, node: WorkflowNode) => {
            selectNode(node.id);
        },
        [selectNode],
    );

    const handlePaneClick = useCallback(() => {
        selectNode(null);
    }, [selectNode]);

    const handleConnect = useCallback(
        (connection: Connection) => {

            const isValid = canConnect(
                connection,
                nodes,
                edges,
            );

            if (!isValid) {
                return;
            }

            if (
                !connection.source ||
                !connection.target
            ) {
                return;
            }

            const edge: WorkflowEdge = {
                id: `${connection.source}-${connection.sourceHandle ?? 'default'}-${connection.target}-${connection.targetHandle ?? 'default'}`,
                source: connection.source,
                target: connection.target,
                sourceHandle: connection.sourceHandle,
                targetHandle: connection.targetHandle,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                },
            };

            addEdge(edge);
        },
        [addEdge, nodes, edges],
    );

    useEffect(() => {

        const handleKeyDown = (event: KeyboardEvent) => {

            // Undo / Redo ==> Cntrl + Z / Cntrl + Shift + Z

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === 'z'
            ) {
                const target = event.target as HTMLElement;

                if (
                    target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA'
                ) {
                    return;
                }

                event.preventDefault();

                if (event.shiftKey) {
                    redo();
                } else {
                    undo();
                }

                return;
            }


            // Duplicate ==> Cntrl + D

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === 'd'
            ) {
                const target = event.target as HTMLElement;

                if (
                    target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA'
                ) {
                    return;
                }

                if (selectedNodeId) {
                    event.preventDefault();
                    duplicateNode(selectedNodeId);
                }

                return;
            }


            // Delete key ==> delete nodes and edges

            if (event.key !== 'Delete') {
                return;
            }

            const target = event.target as HTMLElement;

            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA'
            ) {
                return;
            }

            if (selectedNodeId) {
                deleteNode(selectedNodeId);
                return;
            }

            const selectedEdge = edges.find(
                (edge) => edge.selected,
            );

            if (selectedEdge) {
                deleteEdge(selectedEdge.id);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener(
                'keydown',
                handleKeyDown,
            );
        };
    }, [selectedNodeId, edges, deleteNode, deleteEdge, duplicateNode, undo, redo]);

    return (
        <div className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={applyNodeChanges}
                onEdgesChange={applyEdgeChanges}
                onNodeClick={handleNodeClick}
                onPaneClick={handlePaneClick}
                onConnect={handleConnect}
                onNodeDragStart={startNodeDrag}
                onNodeDragStop={finishNodeDrag}
            >
                <Background />
                <Controls style={{ color: '#00000075' }} />
            </ReactFlow>
        </div>
    );
}