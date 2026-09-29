'use client';
import { Redo2, Undo2 } from 'lucide-react';
import { usePast, useFuture, useSaveStatus } from '@/features/workflow/store';
import { CircleCheck } from 'lucide-react';
import { FileJson } from 'lucide-react';
import { Save } from 'lucide-react';
import useWorkflowHandlers from '@/hooks/workflow-handlers';
import { useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';


export default function WorkflowToolbar() {

    const past = usePast();
    const future = useFuture();
    const saveStatus = useSaveStatus();
    const { handleUndo, handleRedo, handleValidate, handleExport, handleLoadDraft, handleSaveDraft, autosaveSeconds } = useWorkflowHandlers()

    useEffect(() => {
        handleLoadDraft()
    }, [handleLoadDraft])

    return (
        <header className="flex relative z-999 h-16 shrink-0 justify-between items-center shadow-lg bg-B px-4 text-C">
            <div className='flex flex-col lg:flex-row lg:items-center lg:gap-5'>
                <h2 className='font-bold  lg:text-2xl'>Workflow Builder</h2>
                <span className="text-[10px] lg:text-xs text-C/40">
                    {saveStatus === 'saving' && 'Saving...'}
                    {saveStatus === 'saved' && 'Saved'}
                    {saveStatus === 'unsaved' && `Auto save in ${autosaveSeconds} seconds`}
                </span>
            </div>
            <div className='flex items-center gap-2'>
                {/* undo / redo */}
                <div className="hidden lg:flex items-center me-5">
                    <button
                        type="button"
                        className="btn bg-transparent border-0 outline-0 ring-0 btn-sm text-C disabled:text-C/30"
                        disabled={past.length === 0}
                        onClick={handleUndo}
                    >
                        <Undo2 size={18} />
                        Undo
                    </button>
                    <button
                        type="button"
                        className="btn bg-transparent border-0 outline-0 ring-0 btn-sm text-C disabled:text-C/30"
                        disabled={future.length === 0}
                        onClick={handleRedo}
                    >
                        <Redo2 size={18} />
                        Redo
                    </button>
                </div>
                {/* validate  */}
                <button onClick={handleValidate} className="px-2 sm:px-3 btn btn-outline bg-transparent ring-0 border-Btn text-Btn rounded-xl btn-sm border-2">
                    <CircleCheck size={18} />
                    Validate
                </button>
                {/* export json  */}
                <button onClick={handleExport} className="hidden lg:inline-flex btn btn-outline bg-transparent ring-0 border-Btn text-Btn  rounded-xl btn-sm border-2">
                    <FileJson size={18} />
                    Export JSON
                </button>
                {/* export json  */}
                <button onClick={handleSaveDraft} className="px-2 sm:px-3 btn ring-0 border-Btn bg-Btn rounded-full sm:rounded-xl h-8 border-2 btn-sm">
                    <Save size={18} />
                    <span className='hidden sm:block'>Save Draft</span>
                </button>

                {/* mobile 3 dot */}

                <details className="lg:hidden dropdown dropdown-end">
                    <summary className="p-0 btn bg-transparent text-C border-0 ring-0"><MoreHorizontal size={20} /></summary>
                    <ul className="mt-2 items-start dropdown-content menu border-C/20 bg-B rounded-box w-fit p-2 shadow-md">
                        <li>
                            <button
                                type="button"
                                className="btn whitespace-nowrap bg-transparent border-0 outline-0 ring-0 btn-sm text-C disabled:text-C/30"
                                disabled={past.length === 0}
                                onClick={handleUndo}
                            >
                                <Undo2 size={18} />
                                Undo
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="btn whitespace-nowrap bg-transparent border-0 outline-0 ring-0 btn-sm text-C disabled:text-C/30"
                                disabled={future.length === 0}
                                onClick={handleRedo}
                            >
                                <Redo2 size={18} />
                                Redo
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="btn bg-transparent whitespace-nowrap border-0 outline-0 ring-0 btn-sm text-C disabled:text-C/30"
                                onClick={handleExport}
                            >
                                <FileJson size={18} />
                                Export JSON
                            </button>
                        </li>
                    </ul>
                </details>


            </div>
        </header>
    );
}