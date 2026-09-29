import type { ActionConfig } from '@/features/workflow/types';

type Props = {
    config: ActionConfig;
    onChange: (updates: Partial<Omit<ActionConfig, 'type'>>) => void
};

export default function ActionInspector({ config, onChange }: Props) {
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
                    Action Type
                </span>

                <select
                    value={config.actionType}
                    onChange={(event) =>
                        onChange({
                            actionType: event.target.value,
                        })
                    }
                    className="select select-bordered w-full"
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
                    placeholder="Enter value..."
                    className="input input-bordered w-full"
                />
            </label>
        </div>
    );
}