import useWorkflowHandlers from './workflow-handlers';
import { useEffect } from 'react';

export default function useWorkflowKeyboardHandlers() {
    const {
        handleUndo,
        handleRedo,
        handleDuplicate,
        handleDelete,
    } = useWorkflowHandlers();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement;

            const isTyping =
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable;

            if (isTyping) {
                return;
            }

            const isModifierPressed =
                event.ctrlKey || event.metaKey;

            // Undo / Redo
            // Ctrl/Cmd + Z
            // Ctrl/Cmd + Shift + Z

            if (
                isModifierPressed &&
                event.code === 'KeyZ'
            ) {
                event.preventDefault();

                if (event.shiftKey) {
                    handleRedo();
                } else {
                    handleUndo();
                }

                return;
            }

            // Duplicate
            // Ctrl/Cmd + D

            if (
                isModifierPressed &&
                event.code === 'KeyD'
            ) {
                event.preventDefault();

                handleDuplicate();

                return;
            }

            // Delete / Backspace

            if (
                event.code === 'Delete' ||
                event.code === 'Backspace'
            ) {
                event.preventDefault();

                handleDelete();
            }
        };

        window.addEventListener(
            'keydown',
            handleKeyDown,
        );

        return () => {
            window.removeEventListener(
                'keydown',
                handleKeyDown,
            );
        };
    }, [
        handleUndo,
        handleRedo,
        handleDuplicate,
        handleDelete,
    ]);
}