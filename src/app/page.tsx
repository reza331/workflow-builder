import Inspector from "@/components/inspector/Inspector";
import NodeLibrary from "@/components/node-library/NodeLibrary";
import WorkflowToolbar from "@/components/toolbar/WorkflowToolbar";
import WorkflowCanvas from "@/components/WorkflowCanvas";

export default function Home() {
  return (
    <>
      <div className="h-dvh flex flex-col">
        <WorkflowToolbar />
        <div className="w-full h-[calc(100dvh-64px)] flex">
          <NodeLibrary />
          <WorkflowCanvas />
          <Inspector />
        </div>
      </div>
    </>
  );
}
