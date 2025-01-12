export function formatShortDate(date: Date) {
    return date.toLocaleDateString("sv", { day: "2-digit", month: "2-digit" });
}

export function formatLongDate(date: Date) {
    return date.toLocaleDateString("sv", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatTime(date: Date) {
    return date.toLocaleTimeString("sv", { hour: "2-digit", minute: "2-digit" });
}

export function formatOpeningHours(start: Date, end: Date) {
    return `${formatTime(start)} - ${formatTime(end)}`;
}
