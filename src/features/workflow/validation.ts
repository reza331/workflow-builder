import type { Connection } from '@xyflow/react';
import type { WorkflowEdge, WorkflowNode } from './types';

export type WorkflowValidationError = {
    id: string;
    nodeId?: string;
    edgeId?: string;
    message: string;
};

export type WorkflowValidationResult = {
    isValid: boolean;
    errors: WorkflowValidationError[];
};

export const validateWorkflow = (
    nodes: WorkflowNode[],
    edges: WorkflowEdge[],
): WorkflowValidationResult => {
    const errors: WorkflowValidationError[] = [];

    validateTrigger(nodes, edges, errors);
    validateNodes(nodes, errors);
    validateEdges(nodes, edges, errors);
    validateConditionBranches(nodes, edges, errors);
    validateCycles(nodes, edges, errors);

    return {
        isValid: errors.length === 0,
        errors,
    };
};

const validateTrigger = (
    nodes: WorkflowNode[],
    edges: WorkflowEdge[],
    errors: WorkflowValidationError[],
): void => {
    const triggerNodes = nodes.filter(
        (node) => node.type === 'trigger',
    );

    if (triggerNodes.length === 0) {
        errors.push({
            id: 'missing-trigger',
            message: 'Workflow must contain a Trigger node.',
        });

        return;
    }

    triggerNodes.forEach((trigger) => {
        const hasIncomingConnection = edges.some(
            (edge) => edge.target === trigger.id,
        );

        if (hasIncomingConnection) {
            errors.push({
                id: `trigger-incoming-${trigger.id}`,
                nodeId: trigger.id,
                message: 'Trigger cannot have an incoming connection.',
            });
        }
    });
};

const validateNodes = (
    nodes: WorkflowNode[],
    errors: WorkflowValidationError[],
): void => {
    nodes.forEach((node) => {
        const { config } = node.data;

        if (!config.name.trim()) {
            errors.push({
                id: `required-name-${node.id}`,
                nodeId: node.id,
                message: 'Node name is required.',
            });
        }

        switch (config.type) {
            case 'trigger':
                if (!config.triggerType.trim()) {
                    errors.push({
                        id: `required-trigger-type-${node.id}`,
                        nodeId: node.id,
                        message: 'Trigger type is required.',
                    });
                }
                break;

            case 'condition':
                if (!config.conditionType.trim()) {
                    errors.push({
                        id: `required-condition-type-${node.id}`,
                        nodeId: node.id,
                        message: 'Condition type is required.',
                    });
                }

                if (!config.operator.trim()) {
                    errors.push({
                        id: `required-operator-${node.id}`,
                        nodeId: node.id,
                        message: 'Operator is required.',
                    });
                }

                if (!config.value.trim()) {
                    errors.push({
                        id: `required-value-${node.id}`,
                        nodeId: node.id,
                        message: 'Condition value is required.',
                    });
                }
                break;

            case 'action':
                if (!config.actionType.trim()) {
                    errors.push({
                        id: `required-action-type-${node.id}`,
                        nodeId: node.id,
                        message: 'Action type is required.',
                    });
                }

                if (!config.value.trim()) {
                    errors.push({
                        id: `required-action-value-${node.id}`,
                        nodeId: node.id,
                        message: 'Action value is required.',
                    });
                }

                break;

            case 'delay':
                if (config.amount <= 0) {
                    errors.push({
                        id: `invalid-delay-${node.id}`,
                        nodeId: node.id,
                        message: 'Delay amount must be greater than zero.',
                    });
                }
                break;
        }
    });
};

const validateEdges = (
    nodes: WorkflowNode[],
    edges: WorkflowEdge[],
    errors: WorkflowValidationError[],
): void => {
    const nodeIds = new Set(
        nodes.map((node) => node.id),
    );

    const connectionKeys = new Set<string>();

    edges.forEach((edge) => {
        if (
            !nodeIds.has(edge.source) ||
            !nodeIds.has(edge.target)
        ) {
            errors.push({
                id: `invalid-edge-${edge.id}`,
                edgeId: edge.id,
                message: 'Connection references an invalid node.',
            });

            return;
        }

        if (edge.source === edge.target) {
            errors.push({
                id: `self-connection-${edge.id}`,
                edgeId: edge.id,
                message: 'A node cannot connect to itself.',
            });
        }

        const connectionKey = [
            edge.source,
            edge.sourceHandle ?? '',
            edge.target,
            edge.targetHandle ?? '',
        ].join(':');

        if (connectionKeys.has(connectionKey)) {
            errors.push({
                id: `duplicate-edge-${edge.id}`,
                edgeId: edge.id,
                message: 'Duplicate connections are not allowed.',
            });
        }

        connectionKeys.add(connectionKey);
    });
};

const validateConditionBranches = (
    nodes: WorkflowNode[],
    edges: WorkflowEdge[],
    errors: WorkflowValidationError[],
): void => {
    nodes
        .filter((node) => node.type === 'condition')
        .forEach((condition) => {
            const hasTrueBranch = edges.some(
                (edge) =>
                    edge.source === condition.id &&
                    edge.sourceHandle === 'true',
            );

            const hasFalseBranch = edges.some(
                (edge) =>
                    edge.source === condition.id &&
                    edge.sourceHandle === 'false',
            );

            if (!hasTrueBranch) {
                errors.push({
                    id: `condition-true-${condition.id}`,
                    nodeId: condition.id,
                    message: 'Condition must have a True branch.',
                });
            }

            if (!hasFalseBranch) {
                errors.push({
                    id: `condition-false-${condition.id}`,
                    nodeId: condition.id,
                    message: 'Condition must have a False branch.',
                });
            }
        });
};

const validateCycles = (
    nodes: WorkflowNode[],
    edges: WorkflowEdge[],
    errors: WorkflowValidationError[],
): void => {
    const adjacency = new Map<string, string[]>();

    nodes.forEach((node) => {
        adjacency.set(node.id, []);
    });

    edges.forEach((edge) => {
        const connections = adjacency.get(edge.source);

        if (connections) {
            connections.push(edge.target);
        }
    });

    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const hasCycle = (nodeId: string): boolean => {
        if (recursionStack.has(nodeId)) {
            return true;
        }

        if (visited.has(nodeId)) {
            return false;
        }

        visited.add(nodeId);
        recursionStack.add(nodeId);

        const neighbors = adjacency.get(nodeId) ?? [];

        for (const neighbor of neighbors) {
            if (hasCycle(neighbor)) {
                return true;
            }
        }

        recursionStack.delete(nodeId);

        return false;
    };

    for (const node of nodes) {
        if (hasCycle(node.id)) {
            errors.push({
                id: 'workflow-cycle',
                message: 'Workflow cannot contain cycles.',
            });

            break;
        }
    }
};

const createsCycle = (
    connection: Connection,
    edges: WorkflowEdge[],
): boolean => {
    const adjacency = new Map<string, string[]>();

    edges.forEach((edge) => {
        const neighbors =
            adjacency.get(edge.source) ?? [];

        neighbors.push(edge.target);

        adjacency.set(edge.source, neighbors);
    });

    const visited = new Set<string>();

    const hasPath = (current: string): boolean => {
        if (current === connection.source) {
            return true;
        }

        if (visited.has(current)) {
            return false;
        }

        visited.add(current);

        const neighbors =
            adjacency.get(current) ?? [];

        return neighbors.some(hasPath);
    };

    return hasPath(connection.target);
};

export const canConnect = (connection: Connection, nodes: WorkflowNode[], edges: WorkflowEdge[],): boolean => {

    if (!connection.source || !connection.target) {
        return false;
    }

    // Prevent self connection
    if (connection.source === connection.target) {
        return false;
    }

    // Prevent duplicate connection
    const isDuplicate = edges.some(
        (edge) =>
            edge.source === connection.source &&
            edge.target === connection.target &&
            edge.sourceHandle ===
            connection.sourceHandle &&
            edge.targetHandle ===
            connection.targetHandle,
    );

    if (isDuplicate) {
        return false;
    }

    const sourceNode = nodes.find(
        (node) => node.id === connection.source,
    );

    const targetNode = nodes.find(
        (node) => node.id === connection.target,
    );

    if (!sourceNode || !targetNode) {
        return false;
    }

    // Trigger cannot have incoming connections
    if (targetNode.type === 'trigger') {
        return false;
    }


    // Condition must use a valid branch
    if (
        sourceNode.type === 'condition' &&
        connection.sourceHandle !== 'true' &&
        connection.sourceHandle !== 'false'
    ) {
        return false;
    }

    // Condition branches can only have one outgoing connection
    if (
        sourceNode.type === 'condition' &&
        connection.sourceHandle
    ) {
        const hasExistingBranchConnection = edges.some(
            (edge) =>
                edge.source === connection.source &&
                edge.sourceHandle === connection.sourceHandle,
        );

        if (hasExistingBranchConnection) {
            return false;
        }
    }

    if (createsCycle(connection, edges)) {
        return false;
    }

    return true;

};