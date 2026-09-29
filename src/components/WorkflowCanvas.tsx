'use client';
import '@xyflow/react/dist/style.css';
import { Background, Controls, ReactFlow, type NodeTypes } from '@xyflow/react';
import { useEdges, useNodes, useWorkflowActions } from '@/features/workflow/store';
import TriggerNode from './nodes/TriggerNode';
import ConditionNode from './nodes/ConditionNode';
import ActionNode from './nodes/ActionNode';
import DelayNode from './nodes/DelayNode';
import useWorkflowKeyboardHandlers from '@/hooks/workflow-keyboard-handlers';
import useWorkflowCanvasHandlers from '@/hooks/workflow-canvas-handlers';

const nodeTypes: NodeTypes = {
    trigger: TriggerNode,
    condition: ConditionNode,
    action: ActionNode,
    delay: DelayNode,
};

export default function WorkflowCanvas() {

    const nodes = useNodes();
    const edges = useEdges();
    const { handleConnect, handleDragOver, handleDrop, handleNodeClick, handlePaneClick } = useWorkflowCanvasHandlers()
    useWorkflowKeyboardHandlers()
    const { startNodeDrag, finishNodeDrag, applyNodeChanges, applyEdgeChanges } = useWorkflowActions();

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
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <Background />
                <Controls style={{ color: '#00000075' }} />
            </ReactFlow>
        </div>
    );

}