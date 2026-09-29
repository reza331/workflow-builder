import type { DelayConfig } from '@/features/workflow/types';

type Props = {
    config: DelayConfig;
    onChange: (
        updates: Partial<Omit<DelayConfig, 'type'>>,
    ) => void;
};

export default function DelayInspector({
    config,
    onChange,
}: Props) {
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
                    Amount
                </span>

                <input
                    type="number"
                    min={1}
                    value={config.amount}
                    onChange={(event) =>
                        onChange({
                            amount: Number(
                                event.target.value,
                            ),
                        })
                    }
                    className="input input-bordered w-full"
                />
            </label>

            <label className="form-control">
                <span className="mb-2 text-sm font-medium">
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
                    className="select select-bordered w-full"
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
        </div>
    );
}