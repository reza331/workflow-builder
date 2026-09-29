import type { ActionConfig } from '@/features/workflow/types';
import { AlertCircle, Play } from 'lucide-react';

type Props = {
    config: ActionConfig;
    onChange: (updates: Partial<Omit<ActionConfig, 'type'>>) => void
    errors: string[];
};

export default function ActionInspector({ config, onChange, errors }: Props) {
    return (
        <div className="flex flex-col gap-5">


            <div className="flex items-center gap-1">
                <div className="flex size-7 items-center justify-center rounded-lg bg-Action/25">
                    <Play
                        size={18}
                        className="text-Action"
                    />
                </div>
                <div className="min-w-0 ">
                    <p className="truncate text-xs font-semibold ">
                        Action
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
                    Action Type
                </span>

                <select
                    value={config.actionType}
                    onChange={(event) =>
                        onChange({
                            actionType: event.target.value,
                        })
                    }
                    className="select w-full bg-A border-2 border-C/5 rounded-2xl textarea-xs mt-2"
                >
                    <option value="send_sms">
                        Send SMS
                    </option>

                    <option value="send_email">
                        Send Email
                    </option>

                    <option value="create_task">
                        Create Task
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
                    placeholder="Enter value..."
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