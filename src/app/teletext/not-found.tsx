import { PAGES } from "../../themes/teletext/directory";
import { Button, DH, Gap, TeletextPage } from "../../themes/teletext/ui";

export default function NotFound() {
    return (
        <TeletextPage number={404}>
            <Gap />
            <DH as="h1" color="red" center>
                ?SYNTAX ERROR
            </DH>
            <p className="tt-center fg-white">PAGE NOT FOUND</p>
            <Gap />
            <p className="fg-cyan">
                The page you asked for is not being broadcast. It may have ended, or never existed.
            </p>
            <Gap />
            <Button href={PAGES.index.href} bg="yellow" big>
                100 INDEX
            </Button>
        </TeletextPage>
    );
}
