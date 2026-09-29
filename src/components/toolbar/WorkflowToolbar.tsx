'use client';
import { Redo2, Undo2 } from 'lucide-react';
import { useWorkflowActions, usePast, useFuture } from '@/features/workflow/store';
import { CircleCheck } from 'lucide-react';
import { FileJson } from 'lucide-react';
import { Save } from 'lucide-react';
import useWorkflowHandlers from '@/hooks/workflow-handlers';
import { useEffect } from 'react';


export default function WorkflowToolbar() {

    const past = usePast();
    const future = useFuture();
    const { handleUndo, handleRedo, handleValidate, handleExport, handleLoadDraft, handleSaveDraft } = useWorkflowHandlers()

    useEffect(() => {
        handleLoadDraft();
    }, [handleLoadDraft]);

    return (
        <header className="flex relative z-50 h-16 shrink-0 justify-between items-center shadow-lg bg-B px-4 text-C">
            <h2 className='font-bold text-2xl'>Workflow Builder</h2>
            <div className='flex items-center gap-2'>
                {/* undo / redo */}
                <div className="flex items-center me-5">
                    <button
                        type="button"
                        className="btn bg-transparent border-0 outline-0 ring-0 btn-sm text-C disabled:text-C/30"
                        disabled={past.length === 0}
                        onClick={handleUndo}
                        aria-label="Undo"
                        title="Undo"
                    >
                        <Undo2 size={18} />
                        Undo
                    </button>
                    <button
                        type="button"
                        className="btn bg-transparent border-0 outline-0 ring-0 btn-sm text-C disabled:text-C/30"
                        disabled={future.length === 0}
                        onClick={handleRedo}
                        aria-label="Redo"
                        title="Redo"
                    >
                        <Redo2 size={18} />
                        Redo
                    </button>
                </div>
                {/* validate  */}
                <button onClick={handleValidate} className="btn btn-outline bg-transparent ring-0 border-Btn text-Btn rounded-xl btn-sm border-2">
                    <CircleCheck size={18} />
                    Validate
                </button>
                {/* export json  */}
                <button onClick={handleExport} className="btn btn-outline bg-transparent ring-0 border-Btn text-Btn  rounded-xl btn-sm border-2">
                    <FileJson size={18} />
                    Export JSON
                </button>
                {/* export json  */}
                <button onClick={handleSaveDraft} className="btn ring-0  border-Btn bg-Btn rounded-xl h-8 border-2 btn-sm">
                    <Save size={18} />
                    Save Draft
                </button>
            </div>
        </header>
    );
}