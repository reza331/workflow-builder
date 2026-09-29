import type {
    WorkflowEdge,
    WorkflowNode,
} from './types';

export const findNodeById = (
    nodes: WorkflowNode[],
    nodeId: string,
): WorkflowNode | undefined => {
    return nodes.find((node) => node.id === nodeId);
};

export const findEdgeById = (
    edges: WorkflowEdge[],
    edgeId: string,
): WorkflowEdge | undefined => {
    return edges.find((edge) => edge.id === edgeId);
};

export const hasConnection = (
    edges: WorkflowEdge[],
    source: string,
    target: string,
): boolean => {
    return edges.some(
        (edge) =>
            edge.source === source &&
            edge.target === target,
    );
};

export const hasIncomingConnection = (
    edges: WorkflowEdge[],
    nodeId: string,
): boolean => {
    return edges.some(
        (edge) => edge.target === nodeId,
    );
};

export const hasOutgoingConnection = (
    edges: WorkflowEdge[],
    nodeId: string,
): boolean => {
    return edges.some(
        (edge) => edge.source === nodeId,
    );
};