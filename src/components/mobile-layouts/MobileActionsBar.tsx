'use client'
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import NodeLibraryBottomsheet from './NodeLibraryBottomsheet';
import InspectorBottomSheet from './InspectorBottomSheet';

export default function MobileActionsBar() {

    const [showNodeLibrary, setShowNodeLibrary] = useState(false)
    const [showInspector, setShowInspector] = useState(false)

    return (
        <div className="bg-B p-3 flex items-center gap-3 justify-center text-xs fixed bottom-0 w-dvw shadow-lg lg:hidden">
            <button onClick={() => setShowNodeLibrary(true)} className="btn btn-outline btn-primary w-1/2 rounded-xl btn-sm">+ Add Node</button>
            <button onClick={() => setShowInspector(true)} className="btn btn-outline btn-primary w-1/2 rounded-xl btn-sm">
                <SlidersHorizontal size={16} />
                Inspector
            </button>
            <NodeLibraryBottomsheet showNodeLibrary={showNodeLibrary} setShowNodeLibrary={setShowNodeLibrary} />
            <InspectorBottomSheet showInspector={showInspector} setShowInspector={setShowInspector} />
        </div>
    )
}
