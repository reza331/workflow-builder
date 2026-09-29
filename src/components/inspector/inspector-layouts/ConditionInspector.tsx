import type { ConditionConfig } from '@/features/workflow/types';

type Props = {
    config: ConditionConfig;
    onChange: (
        updates: Partial<ConditionConfig>,
    ) => void;
};

export default function ConditionInspector({ config, onChange, }: Props) {
    return (
        <div className="space-y-4">
            <label className="form-control">
                <span className="mb-2 text-sm font-medium">
                    Name
                </span>

                <input
                    type="text"
                    value={config.name}
                    onChange={(event) =>
                        onChange({
                            name: event.target.value,
                        })
                    }
                    className="input input-bordered w-full"
                />
            </label>

            <label className="form-control">
                <span className="mb-2 text-sm font-medium">
                    Condition Type
                </span>

                <select
                    value={config.conditionType}
                    onChange={(event) =>
                        onChange({
                            conditionType:
                                event.target
                                    .value as ConditionConfig['conditionType'],
                        })
                    }
                    className="select select-bordered w-full"
                >
                    <option value="customer_value">
                        Customer Value
                    </option>

                    <option value="order_total">
                        Order Total
                    </option>
                </select>
            </label>

            <label className="form-control">
                <span className="mb-2 text-sm font-medium">
                    Operator
                </span>

                <select
                    value={config.operator}
                    onChange={(event) =>
                        onChange({
                            operator:
                                event.target
                                    .value as ConditionConfig['operator'],
                        })
                    }
                    className="select select-bordered w-full"
                >
                    <option value="greater_than">
                        Greater than
                    </option>

                    <option value="less_than">
                        Less than
                    </option>

                    <option value="equals">
                        Equals
                    </option>
                </select>
            </label>

            <label className="form-control">
                <span className="mb-2 text-sm font-medium">
                    Value
                </span>

                <input
                    type="text"
                    value={config.value}
                    onChange={(event) =>
                        onChange({
                            value: event.target.value,
                        })
                    }
                    className="input input-bordered w-full"
                />
            </label>
        </div>
    );
}