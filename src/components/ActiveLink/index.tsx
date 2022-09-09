import Link, {LinkProps} from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    activeClassName: string;
}

export function ActiveLink({children,activeClassName, ...otherProps}:ActiveLinkProps) { //other são as propriedades de LinkProps
    const {asPath} = useRouter(); //asPath é a rota atual

    const className = asPath === otherProps.href ? activeClassName : '';

    return (
        <Link {...otherProps}>
            {cloneElement(children,{
                className,
            })}
        </Link>
    )//cloneElement porque não poderia passar a prop className diretamente a children
}