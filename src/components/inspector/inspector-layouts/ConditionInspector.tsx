import type { ConditionConfig } from '@/features/workflow/types';
import { AlertCircle, GitBranch } from 'lucide-react';

type Props = {
    config: ConditionConfig;
    onChange: (
        updates: Partial<ConditionConfig>,
    ) => void;
    errors: string[];

};

export default function ConditionInspector({ config, onChange, errors }: Props) {
    return (
        <div className="flex flex-col gap-5">

            <div className="flex items-center gap-1">
                <div className="flex size-7 items-center justify-center rounded-lg bg-Condition/25">
                    <GitBranch
                        size={18}
                        className="text-Condition"
                    />
                </div>
                <div className="min-w-0 ">
                    <p className="truncate text-xs font-semibold ">
                        Condition
                    </p>
                </div>
            </div>

            <label className="form-control">
                <span className="text-xs font-medium">
                    Node Name
                </span>
                <input
                    type="text"
                    value={config.name}
                    onChange={(event) =>
                        onChange({
                            name: event.target.value,
                        })
                    }
                    className="input input-bordered w-full bg-A border-2 border-C/5 rounded-2xl text-[10px] mt-2"
                />
            </label>

            <label className="form-control">
                <span className="text-xs font-medium">
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
                    className="select w-full bg-A border-2 border-C/5 rounded-2xl textarea-xs mt-2"
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
                <span className="text-xs font-medium">
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
                    className="select w-full bg-A border-2 border-C/5 rounded-2xl textarea-xs mt-2"
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
                <span className="text-xs font-medium">
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
                    className="input input-bordered w-full bg-A border-2 border-C/5 rounded-2xl text-[10px] mt-2"
                />
            </label>


            {errors.length > 0 && (
                <div className="mt-3 flex items-center gap-1 rounded-lg bg-error/10 px-2 py-2 text-xs text-error">
                    <AlertCircle size={14} />
                    <span className="font-medium text-[10px]">
                        {errors[0]}
                    </span>
                </div>
            )}

        </div>
    );
}