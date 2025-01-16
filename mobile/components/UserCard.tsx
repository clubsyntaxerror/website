import { useIsSwedish } from "../state";
import type { AppRouter } from "trpc";

type Props = {
    user: Awaited<ReturnType<AppRouter["getCrew"]>>[number];
};

export default function UserCard({ user }: Props) {
    const swede = useIsSwedish();

    // TODO: Implement
    return null;
}
