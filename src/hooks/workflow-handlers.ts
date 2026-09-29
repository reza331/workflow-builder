import { useWorkflowActions } from "@/features/workflow/store";

export default function useWorkflowHandlers() {

    const { addNode, startNodeDrag, finishNodeDrag, applyNodeChanges, applyEdgeChanges, selectNode, addEdge, deleteNode, deleteEdge, duplicateNode, redo, undo } = useWorkflowActions();


}
