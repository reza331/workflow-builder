import { useCallback } from 'react';
import {
    MarkerType,
    useReactFlow,
    type Connection,
} from '@xyflow/react';

import type {
    DragEvent,
} from 'react';

import type {
    WorkflowEdge,
    WorkflowNode,
    WorkflowNodeType,
} from '@/features/workflow/types';

import { canConnect } from '@/features/workflow/validation';
import { createWorkflowNode } from '@/features/workflow/node-factory';

import {
    useEdges,
    useNodes,
    useWorkflowActions,
} from '@/features/workflow/store';

export default function useWorkflowCanvasHandlers() {
    const nodes = useNodes();
    const edges = useEdges();

    const {
        addNode,
        selectNode,
        addEdge,
    } = useWorkflowActions();

    const { screenToFlowPosition } = useReactFlow();

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

            if (!isValid) return;

            if (!connection.source || !connection.target) {
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

    const handleDragOver = useCallback(
        (event: DragEvent) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        },
        [],
    );

    const handleDrop = useCallback(
        (event: DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData(
                'application/reactflow',
            ) as WorkflowNodeType;

            if (!type) return;

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const node = createWorkflowNode(
                type,
                position,
            );

            addNode(node);
        },
        [addNode, screenToFlowPosition],
    );

    return {
        handleNodeClick,
        handlePaneClick,
        handleConnect,
        handleDragOver,
        handleDrop,
    };
}