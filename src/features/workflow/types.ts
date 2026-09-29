import type { Edge, Node } from '@xyflow/react';

export type WorkflowNodeType =
    | 'trigger'
    | 'condition'
    | 'action'
    | 'delay';

export type TriggerConfig = {
    type: 'trigger';
    name: string;
    triggerType: string;
};

export type ConditionConfig = {
    type: 'condition';
    name: string;
    conditionType: string;
    operator: string;
    value: string;
};

export type ActionConfig = {
    type: 'action';
    name: string;
    actionType: string;
    value: string;
};

export type DelayConfig = {
    type: 'delay';
    name: string;
    amount: number;
    unit: 'minutes' | 'hours' | 'days';
};

export type WorkflowNodeConfig =
    | TriggerConfig
    | ConditionConfig
    | ActionConfig
    | DelayConfig;

export type WorkflowNodeData = {
    config: WorkflowNodeConfig;
    errors: string[];
};

export type WorkflowNode = Node<WorkflowNodeData, WorkflowNodeType>;

export type WorkflowEdge = Edge;

export type WorkflowSnapshot = {
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
};

export type WorkflowState = {
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
    selectedNodeId: string | null;
    isDirty: boolean;
    past: WorkflowSnapshot[];
    future: WorkflowSnapshot[];
};