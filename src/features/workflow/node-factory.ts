import type { XYPosition } from '@xyflow/react';
import { nanoid } from 'nanoid';

import type {
    WorkflowNode,
    WorkflowNodeConfig,
    WorkflowNodeType,
} from './types';

const DEFAULT_POSITION: XYPosition = {
    x: 100,
    y: 100,
};

const createDefaultConfig = (
    type: WorkflowNodeType,
): WorkflowNodeConfig => {
    switch (type) {
        case 'trigger':
            return {
                type: 'trigger',
                name: 'New Customer',
                triggerType: 'new_customer',
            };

        case 'condition':
            return {
                type: 'condition',
                name: 'Customer Value > 100',
                conditionType: 'customer_value',
                operator: 'greater_than',
                value: '100',
            };

        case 'action':
            return {
                type: 'action',
                name: 'Send SMS',
                actionType: 'send_sms',
                value: '',
            };

        case 'delay':
            return {
                type: 'delay',
                name: 'Wait 2 Days',
                amount: 2,
                unit: 'days',
            };
    }
};

export const createWorkflowNode = (
    type: WorkflowNodeType,
    position: XYPosition = DEFAULT_POSITION,
): WorkflowNode => ({
    id: nanoid(),
    type,
    position,
    data: {
        config: createDefaultConfig(type),
        errors: [],
    },
});