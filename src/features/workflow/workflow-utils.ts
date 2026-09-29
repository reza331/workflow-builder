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

// 

const STORAGE_KEY = 'workflow-builder-draft';

type WorkflowDraft = {
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
};

export const saveWorkflowDraft = (
    nodes: WorkflowNode[],
    edges: WorkflowEdge[],
) => {
    const draft: WorkflowDraft = {
        nodes,
        edges,
    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(draft),
    );
};

export const loadWorkflowDraft = (): WorkflowDraft | null => {
    const draft = localStorage.getItem(STORAGE_KEY);

    if (!draft) return null;

    try {
        return JSON.parse(draft) as WorkflowDraft;
    } catch {
        return null;
    }
};