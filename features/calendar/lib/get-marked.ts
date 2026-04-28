import { getImportanceColor } from "@/features/tasks/libs/get-importance-color"




export const getMarked = (events: Record<string, any[]>) => {
    const mark: any = {};

    Object.keys(events).forEach((date) => {
        const eventsOnDate = events[date];
        
        mark[date] = {
            dots: eventsOnDate.map(event => ({
                key: `${event.id || event.title}`,
                color: getImportanceColor(event.typeEvent, event.importance),
                selectedDotColor: 'blue' 
            })),
            marked: eventsOnDate.length > 0
        };
    });

    return mark;
};