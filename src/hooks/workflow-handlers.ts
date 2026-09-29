import { useCallback } from 'react';
import {
    useEdges,
    useNodes,
    useSelectedNodeId,
    useWorkflowActions,
} from '@/features/workflow/store';
import { validateWorkflow } from '@/features/workflow/validation';

import {
    loadWorkflowDraft,
    saveWorkflowDraft,
} from '@/features/workflow/workflow-utils';

export default function useWorkflowHandlers() {

    const edges = useEdges();
    const nodes = useNodes();
    const selectedNodeId = useSelectedNodeId();

    const {
        deleteNode,
        deleteEdge,
        duplicateNode,
        undo,
        redo,
        setValidationErrors,
        loadWorkflow
    } = useWorkflowActions();

    const handleValidate = useCallback(() => {
        const result = validateWorkflow(nodes, edges);
        setValidationErrors(result.errors);
    }, [nodes, edges, setValidationErrors]);

    const handleUndo = useCallback(() => {
        undo();
    }, [undo]);

    const handleRedo = useCallback(() => {
        redo();
    }, [redo]);

    const handleDuplicate = useCallback(() => {
        if (!selectedNodeId) return;

        duplicateNode(selectedNodeId);
    }, [duplicateNode, selectedNodeId]);

    const handleDelete = useCallback(() => {
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
    }, [
        selectedNodeId,
        edges,
        deleteNode,
        deleteEdge,
    ]);

    const handleExport = useCallback(() => {
        const workflow = {
            nodes: nodes.map(({ data, ...node }) => ({
                ...node,
                data: {
                    config: data.config,
                },
            })),
            edges,
        };

        const blob = new Blob(
            [JSON.stringify(workflow, null, 2)],
            { type: 'application/json' },
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'workflow.json';
        link.click();

        URL.revokeObjectURL(url);
    }, [nodes, edges]);

    const handleSaveDraft = useCallback(() => {
        saveWorkflowDraft(nodes, edges);
    }, [nodes, edges]);

    const handleLoadDraft = useCallback(() => {

        const draft = loadWorkflowDraft();

        if (!draft) return;

        loadWorkflow(draft.nodes, draft.edges);

    }, [loadWorkflow]);

    return {
        handleUndo,
        handleRedo,
        handleDuplicate,
        handleDelete,
        handleValidate,
        handleExport,
        handleSaveDraft,
        handleLoadDraft,
    };
}