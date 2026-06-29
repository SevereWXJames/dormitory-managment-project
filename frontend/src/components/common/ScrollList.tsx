import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import * as React from "react";

type useScrollListProps = {
    children: React.ReactNode;
    subheader: string;
}
export function ScrollList(props : useScrollListProps) {
    return (<div className={"scroll-list"}>
        <ScrollArea className="h-60 w-[350px] rounded-md border p-4">
            <h4 className="mb-4 text-sm leading-none font-bold sticky top-0 bg-background z-10 py-2">{props.subheader}</h4>
            {props.children}
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    </div>)
}