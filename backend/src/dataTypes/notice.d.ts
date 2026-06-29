export declare class Notice {
    id: string;
    createdBy: string;
    viewableBy: [string] | null;
    title: string;
    text: string;
    createAt: number;
    constructor({ id, createdBy, viewableBy, title, text, createdAt }: {
        id: string;
        createdBy: string;
        viewableBy: [string] | null;
        title: string;
        text: string;
        createdAt: number;
    });
}
//# sourceMappingURL=notice.d.ts.map