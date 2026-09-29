export default function ShortcutsBoard() {
    return (
        <div className="hidden lg:flex items-center px-5 py-2 rounded-full w-fit border-2 border-C/20  bg-B text-C fixed bottom-2 -translate-x-1/2 left-1/2 right-1/2 z-999">
            <div className="text-xs font-medium whitespace-nowrap">Keyboard Shortcuts :</div>
            {/* undo */}
            <div className="flex items-center ms-5">
                <kbd className="kbd kbd-xs">ctrl</kbd>
                +
                <kbd className="kbd kbd-xs">z</kbd>
                <div className="text-xs ms-2">Undo</div>
            </div>
            {/* redo */}
            <div className="flex items-center ms-5">
                <kbd className="kbd kbd-xs">ctrl</kbd>
                +
                <kbd className="kbd kbd-xs">shift</kbd>
                +
                <kbd className="kbd kbd-xs">z</kbd>
                <div className="text-xs ms-2">Redo</div>
            </div>
            {/* save */}
            <div className="flex items-center ms-5">
                <kbd className="kbd kbd-xs">ctrl</kbd>
                +
                <kbd className="kbd kbd-xs">s</kbd>
                <div className="text-xs ms-2">Save</div>
            </div>
            {/* export */}
            <div className="flex items-center ms-5">
                <kbd className="kbd kbd-xs">ctrl</kbd>
                +
                <kbd className="kbd kbd-xs">shift</kbd>
                +
                <kbd className="kbd kbd-xs">e</kbd>
                <div className="text-xs ms-2">Export</div>
            </div>
        </div>
    )
}
