import { getImportanceColor } from "@/features/tasks/libs/get-importance-color"




export const getMarked = (events: Record<string, any[]>) => {
    const mark: any = {};

    Object.keys(events).forEach((date) => {
        const eventsOnDate = events[date];
        const firstEvent = eventsOnDate[0];
        
        mark[date] = {
            marked: true,
            dotColor: getImportanceColor(firstEvent.typeEvent, firstEvent.importance)
        };
    });

    return mark;
};