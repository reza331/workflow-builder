'use client';
import { Redo2, Undo2 } from 'lucide-react';
import { useWorkflowActions, usePast, useFuture } from '@/features/workflow/store';

export default function WorkflowToolbar() {

    const past = usePast();
    const future = useFuture();
    const { undo, redo } = useWorkflowActions()

    return (
        <header className="flex h-16 shrink-0 justify-between items-center shadow-lg bg-B px-4 text-C">
            <h2 className='font-bold text-2xl'>Workflow Builder</h2>
            <div className='flex items-center gap-2'>
                {/* undo / redo */}
                <div className="flex items-center me-5">
                    <button
                        type="button"
                        className="btn bg-transparent border-0 outline-0 ring-0 btn-sm text-C disabled:text-C/30"
                        disabled={past.length === 0}
                        onClick={undo}
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
                        onClick={redo}
                        aria-label="Redo"
                        title="Redo"
                    >
                        <Redo2 size={18} />
                        Redo
                    </button>
                </div>
                {/* validate  */}
                <button className="btn btn-outline btn-primary rounded-xl h-8 border-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                    Validate
                </button>
                {/* export json  */}
                <button className="btn btn-outline btn-primary rounded-xl h-8 border-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                    Export JSON
                </button>
                {/* export json  */}
                <button className="btn btn-primary rounded-xl h-8 border-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                    Save
                </button>
            </div>
        </header>
    );
}