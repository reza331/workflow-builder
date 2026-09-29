import { useCallback, useEffect, useState } from 'react';
import { createWorkflowNode } from '@/features/workflow/node-factory';
import type { WorkflowNodeType } from '@/features/workflow/types';
import {
    useEdges,
    useIsDirty,
    useNodes,
    useSelectedNodeId,
    useWorkflowActions,
} from '@/features/workflow/store';
import { validateWorkflow } from '@/features/workflow/validation';

import {
    loadWorkflowDraft,
    saveWorkflowDraft,
} from '@/features/workflow/workflow-utils';

const AUTOSAVE_DELAY = 3_000;

export default function useWorkflowHandlers() {

    const edges = useEdges();
    const isDirty = useIsDirty()
    const nodes = useNodes();
    const selectedNodeId = useSelectedNodeId();
    const [autosaveSeconds, setAutosaveSeconds] = useState(0);

    const {
        addNode,
        deleteNode,
        deleteEdge,
        duplicateNode,
        undo,
        redo,
        setValidationErrors,
        loadWorkflow,
        setSaveStatus,
        markAsSaved,
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
        setSaveStatus('saving');

        saveWorkflowDraft(nodes, edges);

        markAsSaved();
    }, [nodes, edges, setSaveStatus, markAsSaved]);

    const handleLoadDraft = useCallback(() => {

        const draft = loadWorkflowDraft();

        if (!draft) return;

        loadWorkflow(draft.nodes, draft.edges);

    }, [loadWorkflow]);


    const handleAddNode = useCallback(
        (type: WorkflowNodeType) => {
            const node = createWorkflowNode(type);

            addNode(node);
        },
        [addNode],
    );


    useEffect(() => {
        if (!isDirty) {
            setAutosaveSeconds(0);
            return;
        }

        setAutosaveSeconds(AUTOSAVE_DELAY / 1000);

        const interval = setInterval(() => {
            setAutosaveSeconds((seconds) =>
                Math.max(seconds - 1, 0),
            );
        }, 1000);

        const timeout = setTimeout(() => {
            setSaveStatus('saving');

            saveWorkflowDraft(nodes, edges);

            markAsSaved();
            setAutosaveSeconds(0);
        }, AUTOSAVE_DELAY);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [
        nodes,
        edges,
        isDirty,
        setSaveStatus,
        markAsSaved,
    ]);

    return {
        handleUndo,
        handleRedo,
        handleDuplicate,
        handleDelete,
        handleValidate,
        handleExport,
        handleSaveDraft,
        handleLoadDraft,
        handleAddNode,
        autosaveSeconds
    };
}