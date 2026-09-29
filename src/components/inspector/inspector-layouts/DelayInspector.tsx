import type { DelayConfig } from '@/features/workflow/types';
import { AlertCircle, Clock3 } from 'lucide-react';

type Props = {
    config: DelayConfig;
    onChange: (
        updates: Partial<Omit<DelayConfig, 'type'>>,
    ) => void;
    errors: string[];

};

export default function DelayInspector({
    config,
    onChange,
    errors
}: Props) {
    return (
        <div className="flex flex-col gap-5">


            <div className="flex items-center gap-1">
                <div className="flex size-7 items-center justify-center rounded-lg bg-Delay/25">
                    <Clock3
                        size={18}
                        className="text-Delay"
                    />
                </div>
                <div className="min-w-0 ">
                    <p className="truncate text-xs font-semibold ">
                        Delay
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
                    Amount
                </span>

                <input
                    type="text"
                    min={1}
                    value={config.amount}
                    onChange={(event) =>
                        onChange({
                            amount: Number(
                                event.target.value,
                            ),
                        })
                    }
                    className="input input-bordered w-full bg-A border-2 border-C/5 rounded-2xl text-[10px] mt-2"
                />
            </label>

            <label className="form-control">
                <span className="text-xs font-medium">
                    Unit
                </span>

                <select
                    value={config.unit}
                    onChange={(event) =>
                        onChange({
                            unit: event.target
                                .value as DelayConfig['unit'],
                        })
                    }
                    className="select w-full bg-A border-2 border-C/5 rounded-2xl textarea-xs mt-2"
                >
                    <option value="minutes">
                        Minutes
                    </option>

                    <option value="hours">
                        Hours
                    </option>

                    <option value="days">
                        Days
                    </option>
                </select>
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