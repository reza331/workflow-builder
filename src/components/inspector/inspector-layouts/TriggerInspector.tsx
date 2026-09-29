import type { TriggerConfig } from '@/features/workflow/types';

type Props = {
    config: TriggerConfig;
    onChange: (
        updates: Partial<TriggerConfig>,
    ) => void;
}

export default function TriggerInspector({ config, onChange }: Props) {
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
                    Trigger Type
                </span>

                <select
                    value={config.triggerType}
                    onChange={(event) =>
                        onChange({
                            triggerType:
                                event.target
                                    .value as TriggerConfig['triggerType'],
                        })
                    }
                    className="select select-bordered w-full"
                >
                    <option value="new_customer">
                        New Customer
                    </option>

                    <option value="new_order">
                        New Order
                    </option>

                    <option value="payment_received">
                        Payment Received
                    </option>
                </select>
            </label>
        </div>
    );
}