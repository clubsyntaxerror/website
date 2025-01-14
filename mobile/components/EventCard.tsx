import type { schema } from "database";

type DatesToStrings<T> = {
    [K in keyof T]: T[K] extends Date ? string : T[K];
};

type Props = {
    event: DatesToStrings<typeof schema.events.$inferSelect>;
    callToAction: typeof schema.callToAction.$inferSelect | null;
};

export default function EventCard({ event, callToAction }: Props) {
    // TODO: Implement
    return null;
}
