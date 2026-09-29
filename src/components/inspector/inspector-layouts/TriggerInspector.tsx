import type { TriggerConfig } from '@/features/workflow/types';
import { AlertCircle } from 'lucide-react';

type Props = {
    config: TriggerConfig;
    onChange: (
        updates: Partial<TriggerConfig>,
    ) => void;
    errors: string[];

}

export default function TriggerInspector({ config, onChange , errors }: Props) {
    return (
        <div className="flex flex-col gap-5">
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
                    className="select w-full bg-A border-2 border-C/5 rounded-2xl textarea-xs mt-2"
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