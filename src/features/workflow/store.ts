import { create } from 'zustand';
import type { WorkflowEdge, WorkflowNode, WorkflowSnapshot, WorkflowState } from './types';
import type { NodeChange, EdgeChange } from '@xyflow/react';
import { nanoid } from 'nanoid';

type WorkflowActions = {
    addNode: (node: WorkflowNode) => void;
    updateNode: (
        nodeId: string,
        updates: Partial<WorkflowNode>,
    ) => void;
    deleteNode: (nodeId: string) => void;
    duplicateNode: (nodeId: string) => void;

    addEdge: (edge: WorkflowEdge) => void;
    deleteEdge: (edgeId: string) => void;

    selectNode: (nodeId: string | null) => void;

    undo: () => void;
    redo: () => void;

    applyNodeChanges: (changes: NodeChange<WorkflowNode>[]) => void;
    applyEdgeChanges: (changes: EdgeChange[]) => void;

    startNodeDrag: () => void;
    finishNodeDrag: () => void;
}

interface WorkflowStore extends WorkflowState {
    actions: WorkflowActions;
}

const createSnapshot = (
    nodes: WorkflowNode[],
    edges: WorkflowEdge[],
): WorkflowSnapshot => ({
    nodes,
    edges,
});

const useWorkflowStore = create<WorkflowStore>((set) => ({
    nodes: [],
    edges: [],
    selectedNodeId: null,
    past: [],
    future: [],
    isDirty: false,

    actions: {

        addNode: (node) =>
            set((state) => {
                const snapshot = createSnapshot(
                    state.nodes,
                    state.edges,
                );

                return {
                    nodes: [...state.nodes, node],
                    past: [...state.past, snapshot],
                    future: [],
                    isDirty: true,
                };
            }),

        updateNode: (nodeId, updates) =>
            set((state) => {
                const snapshot = createSnapshot(
                    state.nodes,
                    state.edges,
                );

                return {
                    nodes: state.nodes.map((node) =>
                        node.id === nodeId
                            ? { ...node, ...updates }
                            : node,
                    ),
                    past: [...state.past, snapshot],
                    future: [],
                    isDirty: true,
                };
            }),

        deleteNode: (nodeId) =>
            set((state) => {
                const snapshot = createSnapshot(
                    state.nodes,
                    state.edges,
                );

                return {
                    nodes: state.nodes.filter(
                        (node) => node.id !== nodeId,
                    ),

                    edges: state.edges.filter(
                        (edge) =>
                            edge.source !== nodeId &&
                            edge.target !== nodeId,
                    ),

                    selectedNodeId:
                        state.selectedNodeId === nodeId
                            ? null
                            : state.selectedNodeId,

                    past: [...state.past, snapshot],
                    future: [],
                    isDirty: true,
                };
            }),

        duplicateNode: (nodeId) =>
            set((state) => {
                const node = state.nodes.find(
                    (node) => node.id === nodeId,
                );

                if (!node) {
                    return state;
                }

                const snapshot = createSnapshot(
                    state.nodes,
                    state.edges,
                );

                const duplicatedNode: WorkflowNode = {
                    ...node,
                    id: nanoid(),
                    position: {
                        x: node.position.x + 40,
                        y: node.position.y + 40,
                    },
                    selected: true,
                    data: {
                        ...node.data,
                        config: {
                            ...node.data.config,
                        },
                        errors: [],
                    },
                };

                return {
                    nodes: [
                        ...state.nodes.map((node) => ({
                            ...node,
                            selected: false,
                        })),
                        duplicatedNode,
                    ],
                    selectedNodeId: duplicatedNode.id,
                    past: [...state.past, snapshot],
                    future: [],
                    isDirty: true,
                };
            }),

        addEdge: (edge) =>
            set((state) => {
                const snapshot = createSnapshot(
                    state.nodes,
                    state.edges,
                );

                return {
                    edges: [...state.edges, edge],
                    past: [...state.past, snapshot],
                    future: [],
                    isDirty: true,
                };
            }),

        deleteEdge: (edgeId) =>
            set((state) => {
                const snapshot = createSnapshot(
                    state.nodes,
                    state.edges,
                );

                return {
                    edges: state.edges.filter(
                        (edge) => edge.id !== edgeId,
                    ),

                    past: [...state.past, snapshot],
                    future: [],
                    isDirty: true,
                };
            }),

        selectNode: (nodeId) =>
            set({
                selectedNodeId: nodeId,
            }),

        undo: () =>
            set((state) => {
                if (state.past.length === 0) {
                    return state;
                }

                const previousState =
                    state.past[state.past.length - 1];

                const currentState = createSnapshot(
                    state.nodes,
                    state.edges,
                );

                return {
                    nodes: previousState.nodes,
                    edges: previousState.edges,

                    past: state.past.slice(0, -1),

                    future: [
                        currentState,
                        ...state.future,
                    ],

                    selectedNodeId: null,
                    isDirty: true,
                };
            }),

        redo: () =>
            set((state) => {
                if (state.future.length === 0) {
                    return state;
                }

                const nextState = state.future[0];

                const currentState = createSnapshot(
                    state.nodes,
                    state.edges,
                );

                return {
                    nodes: nextState.nodes,
                    edges: nextState.edges,

                    past: [
                        ...state.past,
                        currentState,
                    ],

                    future: state.future.slice(1),

                    selectedNodeId: null,
                    isDirty: true,
                };
            }),

        applyNodeChanges: (changes) =>
            set((state) => {
                let nodes = state.nodes;

                changes.forEach((change) => {
                    switch (change.type) {
                        case 'position':
                            nodes = nodes.map((node) =>
                                node.id === change.id && change.position
                                    ? {
                                        ...node,
                                        position: change.position,
                                    }
                                    : node,
                            );
                            break;

                        case 'select':
                            nodes = nodes.map((node) =>
                                node.id === change.id
                                    ? {
                                        ...node,
                                        selected: change.selected,
                                    }
                                    : node,
                            );
                            break;

                        case 'remove':
                            nodes = nodes.filter(
                                (node) => node.id !== change.id,
                            );
                            break;
                    }
                });

                return {
                    nodes,
                    isDirty: true,
                };
            }),

        applyEdgeChanges: (changes) =>
            set((state) => {
                let edges = state.edges;

                changes.forEach((change) => {
                    switch (change.type) {
                        case 'remove':
                            edges = edges.filter(
                                (edge) => edge.id !== change.id,
                            );
                            break;

                        case 'select':
                            edges = edges.map((edge) =>
                                edge.id === change.id
                                    ? {
                                        ...edge,
                                        selected: change.selected,
                                    }
                                    : edge,
                            );
                            break;
                    }
                });

                return {
                    edges,
                    isDirty: true,
                };
            }),

        startNodeDrag: () =>
            set((state) => {
                const snapshot = createSnapshot(
                    state.nodes,
                    state.edges,
                );

                return {
                    past: [...state.past, snapshot],
                    future: [],
                };
            }),

        finishNodeDrag: () => { },

    }

}));

export const useNodes = () => useWorkflowStore((state) => state.nodes);

export const useEdges = () => useWorkflowStore((state) => state.edges);

export const useSelectedNodeId = () => useWorkflowStore((state) => state.selectedNodeId);

export const useIsDirty = () => useWorkflowStore((state) => state.isDirty);

export const usePast = () => useWorkflowStore((state) => state.past);

export const useFuture = () => useWorkflowStore((state) => state.future);

export const useWorkflowActions = () => useWorkflowStore((state) => state.actions);