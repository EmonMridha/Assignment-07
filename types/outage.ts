export type Outage = {
    id: string;
    type: "SCHEDULED" | "UNSCHEDULED";
    title: string;
    description: string;
    cause: string;
    startTime: string;
    endTime: string;
    duration: number;
    status: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    zone: {
        id: string;
        name: string;
        code: string;
    };
};